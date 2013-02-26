require([
	"dojo/ready", "dojo/parser", "dojo/on",
  "dojo/cookie",
	"dojo/dom", "dojo/dom-construct", "dojo/dom-style", "dojo/dom-attr",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/MenuSeparator",
	"dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane",
  "GoldenBear/FileManager", "GoldenBear/File"
], function(
	ready, parser, on,
  cookie,
	dom, domConstruct, domStyle, domAttr,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem, MenuSeparator,
	BorderContainer, TabContainer, ContentPane,
  FileManager, File
){
  
  var codemirror = {
    themes: [
      'ambiance', 'blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark',
      'monokai','neat','night','rubyblue','solarized','twilight','vibrant-ink','xq-dark'
    ]
  };
  
  var fileManager = new FileManager;
  
	ready(function() {
    applicationMenu();
    registry.byId('fileContainer').watch('selectedChildWidget', function(name, oval, nval) {
      console.debug(name, " changed from ", oval, " to ", nval);
      fileManager.refreshActiveFile(nval);
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
      popup: searchMenu()
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
	  function fileNew() {
			var tc = registry.byId('fileContainer');
			return new MenuItem({
				label: 'New',
				onClick: function() {
					tc.addChild(fileManager.newFile('text.xml'));
					tc.addChild(fileManager.newFile('test.html'));
					tc.addChild(fileManager.newFile());
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
    
  /*********************************************************************
   * Edit Menu
   ********************************************************************/  
  function editMenu() {
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
  
  /*********************************************************************
   * Search Menu
   ********************************************************************/  
  function searchMenu() {
		function searchFind() {
			return new MenuItem({
				label: 'Find',
				disabled: true
			});
		}
		
		function searchFindNext() {
			return new MenuItem({
				label: 'Find Next',
				disabled: true
			});
		}
		
		function searchFindPrevious() {
			return new MenuItem({
				label: 'Find Previous',
				disabled: true
			});
		}
		
		function searchFindInFiles() {
			return new MenuItem({
				label: 'Find In Files',
				disabled: true
			});
		}
		
		function searchReplace() {
			return new MenuItem({
				label: 'Replace',
				disabled: true
			});
		}
		
		function searchNextMessage() {
			return new MenuItem({
				label: 'Next Message',
				disabled: true
			});
		}

		function searchPreviousMessage() {
			return new MenuItem({
				label: 'Previous Message',
				disabled: true
			});
		}
		
		function searchGoToNextMarker() {
			return new MenuItem({
				label: 'Go To Next Marker',
				disabled: true
			});
		}
		
		function searchGoToPreviousMarker() {
			return new MenuItem({
				label: 'Go To Previous Marker',
				disabled: true
			});
		}
		
		function searchGoToLine() {
			return new MenuItem({
				label: 'Go To Line',
				disabled: true
			});
		}
		
		function searchMore() {
			return new MenuItem({
				label: 'More',
				disabled: true
			});
		}
		
		var menu = new DropDownMenu();
		menu.addChild(searchFind());
		menu.addChild(searchFindNext());
		menu.addChild(searchFindPrevious());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(searchFindInFiles());
		menu.addChild(searchReplace());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(searchNextMessage());
		menu.addChild(searchPreviousMessage());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(searchGoToNextMarker());
		menu.addChild(searchGoToPreviousMarker());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(searchGoToLine());
		menu.addChild(searchMore());
    
    return menu;
  }

  /*********************************************************************
   * View Menu
   ********************************************************************/  
  function viewMenu() {
		function viewChangeFont() {
			return new MenuItem({
				label: 'Change Font',
				disabled: true
			});
		}
		
		function viewToggleAllAdditionalWidgets() {
			return new MenuItem({
				label: 'Toggle All Additional Widgets',
				disabled: true
			});
		}
		
		function viewFullScreen() {
			return new MenuItem({
				label: 'Fullscreen',
				disabled: true
			});
		}
		
		function viewShowMessageWindow() {
			return new MenuItem({
				label: 'Show Message Window',
				disabled: true
			});
		}
		
		function viewShowToolbar() {
			return new MenuItem({
				label: 'Show Toolbar',
				disabled: true
			});
		}
		
		function viewShowSidebar() {
			return new MenuItem({
				label: 'Show Sidebar',
				disabled: true
			});
		}
		
		function viewEditor() {
			var popup = new DropDownMenu();
			popup.addChild(viewEditor_ColorSchemes());
			popup.addChild(viewEditor_ShowMarkersMargin());
			popup.addChild(viewEditor_ShowLineNumbers());
			popup.addChild(viewEditor_ShowWhiteSpace());
			popup.addChild(viewEditor_ShowLineEndings());
			popup.addChild(viewEditor_ShowIndentationGuides());
			
			var menu = new PopupMenuItem({
				label: 'Editor',
				popup: popup
			});
			
			return menu;
		}
		
		function viewEditor_ColorSchemes() {
			var popup = new DropDownMenu();
			var themes = codemirror.themes.reverse();
			var i = themes.length;
			
			while(--i) {
				popup.addChild(new MenuItem({
					label: codemirror.themes[i],
					onClick: function() {
						for(var i = 0, max = openFiles.length; i < max; i++) {
							openFiles[i].get('codemirror').setOption('theme', this.label)
						}
						cookie('goldenbear.editor.theme', this.label);
					}
				}));
			}
			
			return new PopupMenuItem({
				label: 'Color Schemes',
				popup: popup
			});
		}
		
		function viewEditor_ShowMarkersMargin() {
			return new MenuItem({
				label: 'Show Markers Margin',
				disabled: true
			});
		}
		
		function viewEditor_ShowLineNumbers() {
			return new MenuItem({
				label: 'Show Line Numbers',
				disabled: true
			});
		}
		
		function viewEditor_ShowWhiteSpace() {
			return new MenuItem({
				label: 'Show White Space',
				disabled: true
			});
		}
		
		function viewEditor_ShowLineEndings() {
			return new MenuItem({
				label: 'Show Line Endings',
				disabled: true
			});
		}
		
		function viewEditor_ShowIndentationGuides() {
			return new MenuItem({
				label: 'Show Indentation Guides',
				disabled: true
			});
		}
		
		function viewZoomIn() {
			return new MenuItem({
				label: 'Zoom In',
				disabled: true
			});
		}
		
		function viewZoomOut() {
			return new MenuItem({
				label: 'Zoom Out',
				disabled: true
			});
		}
		
		function viewNormalSize() {
			return new MenuItem({
				label: 'Normal Size',
				disabled: true
			});
		}		
		
		var menu = new DropDownMenu();
		menu.addChild(viewChangeFont());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(viewToggleAllAdditionalWidgets());
		menu.addChild(viewFullScreen());
		menu.addChild(viewShowMessageWindow());
		menu.addChild(viewShowToolbar());
		menu.addChild(viewShowSidebar());
		menu.addChild(viewEditor());
		menu.addChild(new MenuSeparator()); 
		menu.addChild(viewZoomIn());
		menu.addChild(viewZoomOut());
		menu.addChild(viewNormalSize());

		return menu;
  }
}); // end require
