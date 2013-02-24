require([
	"dojo/ready", "dojo/parser", "dojo/on",
	"dojo/dom", "dojo/dom-construct", "dojo/dom-style",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"
], function(
	ready, parser, on,
	dom, domConstruct, domStyle,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem,
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
    menu.addChild(new MenuItem({
      label: 'New',
      onClick: function() {
        openFile();
      }
    }));
    return menu;
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
