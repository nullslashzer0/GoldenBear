require([
	"dojo/ready", "dojo/parser", 
	"dojo/dom", "dojo/dom-style",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"
], function(
	ready, parser, 
	dom, domStyle,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem,
	BorderContainer, TabContainer, ContentPane
){
	ready(function() {
    var codemirror1 = CodeMirror(dom.byId('doc1'), {
      mode: 'javascript',
      lineNumbers: true,
      value: 'function myScript(){ return 100; }\n'
    });
    
    registry.byId('documentEditor').watch('selectedChildWidget', function(name, oval, nval) {
      console.debug(name, " changed from ", oval, " to ", nval);
      codemirror1.refresh();
    });
    
    applicationMenu();
    domStyle.set(dom.byId('app-splash'), 'display', 'none');
	}); // End ready
  
  function applicationMenu() {
    var menubar = new MenuBar({});
    var filemenu = fileMenu();
    
    menubar.addChild(new PopupMenuBarItem({
      label: "File",
      popup: filemenu
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
      popup: new DropDownMenu({})
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
  
  function fileMenu() {
    var dropDownMenu = new DropDownMenu({});
    dropDownMenu.addChild(new MenuItem({
      label: 'New',
      onClick: function() {
        console.error('File->New command is not defined');
      }
    }));
    return dropDownMenu;
  }
}); // end require
