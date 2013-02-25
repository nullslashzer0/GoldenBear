require([
	"dojo/ready", "dojo/parser", "dojo/on",
  "dojo/cookie",
	"dojo/dom", "dojo/dom-construct", "dojo/dom-style", "dojo/dom-attr",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane",
  "GoldenBear/File"
], function(
	ready, parser, on,
  cookie,
	dom, domConstruct, domStyle, domAttr,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem, MenuSeparator,
	BorderContainer, TabContainer, ContentPane,
  File
){
  
  var codemirror = {
    themes: [
      'ambiance', 'blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark',
      'monokai','neat','night','rubyblue','solarized','twilight','vibrant-ink','xq-dark'
    ]
  };
  
  var openFiles = [];
  
	ready(function() {
    applicationMenu();
    registry.byId('documentEditor').watch('selectedChildWidget', function(name, oval, nval) {
      console.debug(name, " changed from ", oval, " to ", nval);
      var file = registry.byId(domAttr.get(nval.domNode, 'data-fileid'));
      var cm = file.get('codemirror');
      cm.refresh(); // refresh codemirror to fix display issues
      cm.focus();
    });
    
    domStyle.set(dom.byId('app-splash'), 'display', 'none');
	}); // End ready
  
  /*********************************************************************
   * APPLICATION MENU
   ********************************************************************/
  function applicationMenu() {
    var menubar = new MenuBar({});
    
    menubar.addChild(new PopupMenuBarItem({
      label: "File",
      popup: fileMenu()
    }));
    
    menubar.addChild(new PopupMenuBarItem({
      label: "Edit",
      popup: editMenu()
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Search",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "View",
      popup: viewMenu()
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Document",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Project",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Build",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Tools",
      popup: new DropDownMenu({})
    }));
    
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Help",
      popup: new DropDownMenu({})
    }));
    
    menubar.placeAt('appMenu', 'replace');
    menubar.startup();
  }
  
  /*********************************************************************
   * File Menu
   ********************************************************************/  
  function fileMenu() {
    var menu = new DropDownMenu();
    menu.addChild(fileNew());
    menu.addChild(fileNewFileWithTemplate());
    menu.addChild(new MenuSeparator());
    menu.addChild(fileOpen());
    menu.addChild(fileOpenSelectedFile());
    menu.addChild(fileRecentFiles());
    menu.addChild(new MenuSeparator());
    menu.addChild(fileSave());
    menu.addChild(fileSaveAs());
    menu.addChild(fileSaveAll());
    menu.addChild(fileReload());
    menu.addChild(fileReloadAll());
    menu.addChild(new MenuSeparator());
    menu.addChild(fileProperties());
    menu.addChild(new MenuSeparator());
    menu.addChild(filePageSetup());
    menu.addChild(filePrint());
    menu.addChild(new MenuSeparator());
    menu.addChild(fileQuit());
    
    return menu;
  }
  
  function fileNew() {
    return new MenuItem({
      label: 'New',
      onClick: function() {
        openFile('text.xml');
        openFile('test.html');
        openFile();
      }
    });
  }
  
  function fileNewFileWithTemplate() {
    return new MenuItem({
      label: 'New (With Template)',
      disabled: true
    });
  }
  
  function fileOpen() {
    return new MenuItem({
      label: 'Open',
      disabled: true
    });
  }
  
  function fileOpenSelectedFile() {
    return new MenuItem({
      label: 'Open Selected File',
      disabled: true
    });
  }
  
  function fileRecentFiles() {
    return new MenuItem({
      label: 'Recent Files',
      disabled: true
    });
  }
  
  function fileSave() {
    return new MenuItem({
      label: 'Save',
      disabled: true
    });
  }
  
  function fileSaveAs() {
    return new MenuItem({
      label: 'Save As',
      disabled: true
    });
  }
  
  function fileSaveAll() {
    return new MenuItem({
      label: 'Save All',
      disabled: true
    });
  }
  
  function fileReload() {
    return new MenuItem({
      label: 'Reload',
      disabled: true
    });
  }
  
  function fileReloadAll() {
    return new MenuItem({
      label: 'Reload All',
      disabled: true
    });
  }
  
  function fileProperties() {
    return new MenuItem({
      label: 'Properties',
      disabled: true
    });
  }
  
  function filePageSetup() {
    return new MenuItem({
      label: 'Page Setup',
      disabled: true
    });
  }
  
  function filePrint() {
    return new MenuItem({
      label: 'Print',
      disabled: true
    });
  }
  
  function fileClose() {
    return new MenuItem({
      label: 'Close',
      disabled: true
    });
  }
  
  function fileCloseOtherDocuments() {
    return new MenuItem({
      label: 'Close Other Documents',
      disabled: true
    });
  }
  
  function fileCloseAll() {
    return new MenuItem({
      label: 'Close All',
      disabled: true
    });
  }
  
  function fileQuit() {
    return new MenuItem({
      label: 'Quit',
      disabled: true
    });
  }
  
  function openFile(filename) {
    var filename = filename || 'untitled';
    var cmid = "document." + openFiles.length;  // codemirror id
    var tc = registry.byId('documentEditor');
    var cp = new ContentPane({
      id: 'tab.' + cmid,
      title: filename,
      closable: true
    });
    
    var cm = CodeMirror(cp.containerNode, {
      theme: cookie('goldenbear.editor.theme') || 'default',
      lineNumbers: true,
    });

    var _file = new File({
      codemirror: cm,
      name: filename
    });
    
    console.debug(_file);
    
    domAttr.set(cp.domNode, 'data-fileid', _file.id);
    
    openFiles.push(_file);
    tc.addChild(cp);
  }
  
  /*********************************************************************
   * Edit Menu
   ********************************************************************/  
  function editMenu() {
   var menu = new DropDownMenu();
    menu.addChild(editUndo());
    menu.addChild(editRedo());
    menu.addChild(new MenuSeparator()); 
    menu.addChild(editCut());
    menu.addChild(editCopy());
    menu.addChild(editPaste());
    menu.addChild(editDelete());
    menu.addChild(new MenuSeparator());
    menu.addChild(editCommands());
    menu.addChild(editFormat());
    menu.addChild(new MenuSeparator());
    menu.addChild(editInsertComments());
    menu.addChild(editInsertDate());
    menu.addChild(editInsertInclude());
    menu.addChild(editInsertAlternativeWhiteSpace());
    menu.addChild(new MenuSeparator());
    menu.addChild(editPreferences());
    menu.addChild(editPluginPreferences());
    
    return menu;
  }
  
  function editUndo() {
    return new MenuItem({
      label: 'Undo',
      onClick: function() {
        console.warn("Edit->Undo  - not yet implemented");
      },
      disabled: true
    });
  }
  
  function editRedo() {
    return new MenuItem({
      label: 'Redo',
      disabled: true
    });
  }
  
  function editCut() {
    return new MenuItem({
      label: 'Cut',
      disabled: true
    });
  }
  
  function editCopy() {
    return new MenuItem({
      label: 'Copy',
      disabled: true
    });
  }
  
  function editPaste() {
    return new MenuItem({
      label: 'Paste',
      disabled: true
    });
  }
  
  function editDelete() {
    return new MenuItem({
      label: 'Delete',
      disabled: true
    });
  }
  
  function editCommands() {
    return new MenuItem({
      label: 'Commands',
      disabled: true
    });
  }
  
  function editFormat() {
    return new MenuItem({
      label: 'Format',
      disabled: true
    });
  }
  
  function editInsertComments() {
    return new MenuItem({
      label: 'Insert Comments',
      disabled: true
    });
  }
  
  function editInsertDate() {
    return new MenuItem({
      label: 'Insert Date',
      disabled: true
    });
  }
  
  function editInsertInclude() {
    return new MenuItem({
      label: 'Insert "include <...>"',
      disabled: true
    });
  }
  
  function editInsertAlternativeWhiteSpace() {
    return new MenuItem({
      label: 'Insert Alternative White Space',
      disabled: true
    });
  }
  
  function editPreferences() {
    return new MenuItem({
      label: 'Preferences',
      disabled: true
    });
  }
  
  function editPluginPreferences() {
    return new MenuItem({
      label: 'Plugin Preferences',
      disabled: true
    });
  }
  
  /*********************************************************************
   * View Menu
   ********************************************************************/  
  function viewMenu() {
    var menu = new DropDownMenu();
    var editorMenu = new DropDownMenu();
    var themesMenu = new DropDownMenu();
    var themes = codemirror.themes.reverse();
    var themesCount = themes.length;
    while(--themesCount) {
      themesMenu.addChild(new MenuItem({
        label: codemirror.themes[themesCount],
        onClick: function() {
          var theme = this.label;
          for(var i = 0, max = openFiles.length; i < max; i++) {
            var _file = openFiles[i];
            _file.get('codemirror').setOption('theme', theme);
          }
          cookie('goldenbear.editor.theme', theme);
        }
      }));
    }
    
    editorMenu.addChild(new PopupMenuItem({
      label: 'Themes',
      popup: themesMenu
    }));
    
    menu.addChild(new PopupMenuItem({
      label: 'Editor',
      popup: editorMenu
    }));
      
    return menu;
  }
}); // end require
