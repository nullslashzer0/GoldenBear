require([
	"dojo/ready", "dojo/parser", "dojo/on",
	"dojo/dom", "dojo/dom-construct", "dojo/dom-style",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"
], function(
	ready, parser, on,
	dom, domConstruct, domStyle,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem, MenuSeparator,
	BorderContainer, TabContainer, ContentPane
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
      
    });
    
    domStyle.set(dom.byId('app-splash'), 'display', 'none');
	}); // End ready
  
  /*********************************************************************
   * APPLICATION MENU
   ********************************************************************/
  function applicationMenu() {
    var menubar = new MenuBar({});
    var _file = fileMenu();
    var _view = viewMenu();
    
    menubar.addChild(new PopupMenuBarItem({
      label: "File",
      popup: _file
    }));
    
    menubar.addChild(new PopupMenuBarItem({
      label: "Edit",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "Search",
      popup: new DropDownMenu({})
    }));
     
    menubar.addChild(new PopupMenuBarItem({
      label: "View",
      popup: _view
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
      label: "View",
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
    menu.addChild(newFile());
    menu.addChild(newFileWithTemplate());
    menu.addChild(new MenuSeparator());
    menu.addChild(open());
    menu.addChild(openSelectedFile());
    menu.addChild(recentFiles());
    menu.addChild(new MenuSeparator());
    menu.addChild(save());
    menu.addChild(saveAs());
    menu.addChild(saveAll());
    menu.addChild(reload());
    menu.addChild(reloadAll());
    menu.addChild(new MenuSeparator());
    menu.addChild(properties());
    menu.addChild(new MenuSeparator());
    menu.addChild(pageSetup());
    menu.addChild(print());
    menu.addChild(new MenuSeparator());
    return menu;
  }
  
  function newFile() {
    return new MenuItem({
      label: 'New',
      onClick: function() {
        openFile();
      }
    });
  }
  
  function newFileWithTemplate() {
    return new MenuItem({
      label: 'New (With Template)',
      onClick: function() {
        console.warn("File->New (With Template) - not yet implemented");
      }
    });
  }
  
  function open() {
    return new MenuItem({
      label: 'Open',
      onClick: function() {
        console.warn("File->Open - not yet implemented");
      }
    });
  }
  
  function openSelectedFile() {
    return new MenuItem({
      label: 'Open Selected File',
      onClick: function() {
        console.warn("File->Open Selected File - not yet implemented");
      }
    });
  }
  
  function recentFiles() {
    return new MenuItem({
      label: 'Recent Files',
      onClick: function() {
        console.warn("File->Recent Files - not yet implemented");
      }
    });
  }
  
  function save() {
    return new MenuItem({
      label: 'Save',
      onClick: function() {
        console.warn("File->Save - not yet implemented");
      }
    });
  }
  
  function saveAs() {
    return new MenuItem({
      label: 'Save As',
      onClick: function() {
        console.warn("File->Save As - not yet implemented");
      }
    });
  }
  
  function saveAll() {
    return new MenuItem({
      label: 'Save All',
      onClick: function() {
        console.warn("File->Save All - not yet implemented");
      }
    });
  }
  
  function reload() {
    return new MenuItem({
      label: 'Reload',
      onClick: function() {
        console.warn("File->Reload - not yet implemented");
      }
    });
  }
  
  function reloadAll() {
    return new MenuItem({
      label: 'Reload All',
      onClick: function() {
        console.warn("File->Reload All - not yet implemented");
      }
    });
  }
  
  function properties() {
    return new MenuItem({
      label: 'Properties',
      onClick: function() {
        console.warn("File->Properties - not yet implemented");
      }
    });
  }
  
  function pageSetup() {
    return new MenuItem({
      label: 'Page Setup',
      onClick: function() {
        console.warn("File->Page Setup - not yet implemented");
      }
    });
  }
  
  function print() {
    return new MenuItem({
      label: 'Print',
      onClick: function() {
        console.warn("File->Print  - not yet implemented");
      }
    });
  }
  
  function close() {
    return new MenuItem({
      label: 'Close',
      onClick: function() {
        console.warn("File->Close  - not yet implemented");
      }
    });
  }
  
  function closeOtherDocuments() {
    return new MenuItem({
      label: 'Close Other Documents',
      onClick: function() {
        console.warn("File->Close Other Documents  - not yet implemented");
      }
    });
  }
  
  function closeAll() {
    return new MenuItem({
      label: 'Close All',
      onClick: function() {
        console.warn("File->Close All  - not yet implemented");
      }
    });
  }
  
  function quit() {
    return new MenuItem({
      label: 'Quit',
      onClick: function() {
        console.warn("File->Quit  - not yet implemented");
      }
    });
  }
  
  function openFile(name) {
    var name = name || 'untitled';
    var cmid = "document." + openFiles.length;  // codemirror id
    var tc = registry.byId('documentEditor');
    var cp = new ContentPane({
      id: 'tab.' + cmid,
      title: name,
      closable: true
    });
    
    var cm = CodeMirror(cp.containerNode, {
      lineNumbers: true,
    });
    
    openFiles.push(cm);
    on(cp, 'show', function() { cm.refresh(); });
    tc.addChild(cp);
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
            var cm = openFiles[i];
            cm.setOption('theme', theme);
          }
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
