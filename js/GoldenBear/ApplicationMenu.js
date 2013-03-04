require([
  "dojo/ready", "dijit/registry",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator",
  "GoldenBear/File", "GoldenBear/Dialog/SaveFile"
], function(
  ready, registry,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem, CheckedMenuItem, MenuSeparator,
  File, SaveFile
){
	
	var codemirror = {
    themes: [
      'ambiance', 'blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark',
      'monokai','neat','night','rubyblue','solarized','twilight','vibrant-ink','xq-dark'
    ]
  };
  
  var tc = undefined;
  var saveFileDialog = undefined;
	
	ready(function() {
		var menubar = new MenuBar();
		tc = registry.byId('fileContainer');
    saveFileDialog = new SaveFile({ 
      id: "saveFileDialog",
      onSave: function() {
        var dialog = registry.byId('saveFileDialog');
        var file = tc.get('selectedChildWidget').save({
          filename: dialog.get('filename')
        });
        console.error("Service needed to save file to server: ", file);
        dialog.hide();
      }
    }).placeAt(document.getElementsByTagName('body')[0]);

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
			popup: documentMenu()
		}));
		 
		menubar.addChild(new PopupMenuBarItem({
			label: "Project",
			popup: projectMenu()
		}));
		 
		menubar.addChild(new PopupMenuBarItem({
			label: "Build",
			popup: buildMenu()
		}));
		 
		menubar.addChild(new PopupMenuBarItem({
			label: "Tools",
			popup: toolsMenu()
		}));
		 
		menubar.addChild(new PopupMenuBarItem({
			label: "Help",
			popup: helpMenu()
		}));
		
		menubar.placeAt('appMenu', 'replace');
		menubar.startup();
		
		/*********************************************************************
		 * File Menu
		 ********************************************************************/  
		function fileMenu() {
			
			function fileNew() {
				return new MenuItem({
					label: 'New',
					onClick: function() {
						tc.addChild(new File({ newFile: true }));
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
					onClick: function() {
						tc.addChild(new File({ filename: 'Test.tt' }));
						tc.addChild(new File({ filename: 'Test.perl' }));
					}
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
					onClick: function() {
						registry.byId('saveFileDialog').show(tc.get('selectedChildWidget'));
					}
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
					onClick: function() {
						var files = tc.getChildren();
						var i = files.length;
						
						while(i) {
							var file = files[--i]
							registry.byId('saveFileDialog').show(file);
						}
					}
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
					onClick: function() { 
						var file = tc.get('selectedChildWidget');
						if (file.get('saved')) {
							tc.removeChild(file);
						} else {
							console.warn("file was not saved");
						}
					}
				});
			}
			
			function fileCloseOtherDocuments() {
				return new MenuItem({
					label: 'Close Other Documents',
					onClick: function() { 
						var selected = tc.get('selectedChildWidget');
						var files = tc.getChildren();
						var i = files.length;
						
						while(i) {
							var file = files[--i]
							if (file !== selected) {
								if (file.get('saved')) {
									tc.removeChild(file);
								} else {
									console.warn("file was not saved");
								}
							}
						}
					}
				});
			}
			
			function fileCloseAll() {
				return new MenuItem({
					label: 'Close All',
					onClick: function() { 
						var files = tc.getChildren();
						var i = files.length;
						
						while(i) {
							var file = files[--i];
							if (file.get('saved')) {
								tc.removeChild(file);
							} else {
								console.warn('file was not saved');
							}
						}
					}
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
			menu.addChild(fileClose());
			menu.addChild(fileCloseOtherDocuments());
			menu.addChild(fileCloseAll());
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
						tc.get('selectedChildWidget').undo()
					}
				});
			}
			
			function editRedo() {
				return new MenuItem({
					label: 'Redo',
					onClick: function() {
						tc.get('selectedChildWidget').redo()
					}
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
					onClick: function() {
						tc.get('selectedChildWidget').replaceSelection('');
					}
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
				function dateMenuItem(label, format) {
					return new MenuItem({ 
						label: label,
						onClick: function() {
							var dateString = locale.format(new Date(), { selector: 'date', datePattern: format });
							tc.get('selectedChildWidget').insertDate(dateString);
						}
					})
				}
				
				var popup = new DropDownMenu();
				popup.addChild( dateMenuItem('dd.mm.yyyy', 'dd.MM.yyyy') );
				popup.addChild( dateMenuItem('mm.dd.yyyy', 'MM.dd.yyyy') );
				popup.addChild( dateMenuItem('yyyy/mm/dd', 'yyyy/MM/dd') );
				popup.addChild(new MenuSeparator());
				popup.addChild( dateMenuItem('dd.mm.yyyy hh:mm:ss', 'dd.MM.yyyy hh:mm:ss') );
				popup.addChild( dateMenuItem('mm.dd.yyyy hh:mm:ss', 'MM.dd.yyyy hh:mm:ss') );
				popup.addChild( dateMenuItem('yyyy/mm/dd hh:mm:ss', 'yyyy/MM/dd hh:mm:ss') );
				popup.addChild(new MenuSeparator());
				popup.addChild(new MenuItem({
					label: "Use Custom Date Format",
					disabled: true
				}));
				
				popup.addChild(new MenuItem({
					label: "Set Custom Date Format",
					disabled: true
				}));
				
				
				var menu = new PopupMenuItem({
					label: 'Insert Date',
					popup: popup
				});
				
				return menu;
				
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
				
				while(i) {
					popup.addChild(new MenuItem({
						label: codemirror.themes[--i],
						onClick: function() {
							var theme = this.label;
							var files = registry.byId('fileContainer').getChildren();
							var i = files.length;
							
							while(i) {
								files[--i].setTheme(theme);
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
				return new CheckedMenuItem({
					label: 'Show Line Numbers',
					onClick: function() {
						var theme = this.label;
						var files = registry.byId('fileContainer').getChildren();
						var i = files.length;
						
						while(i) {
							files[--i].setEditorOption('lineNumbers', this.checked);
						}
						 
						cookie('goldenbear.editor.lineNumbers', this.checked);
					}
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
		
		/*********************************************************************
		 * Document Menu
		 ********************************************************************/  
		function documentMenu() {
			var menu = new DropDownMenu();
			
			menu.addChild(new CheckedMenuItem({
				label: 'Line Wrapping',
				//~ disabled: true
			}));
			
			menu.addChild(new CheckedMenuItem({
				label: 'Line Breaking',
				//~ disabled: true
			}));
			
			menu.addChild(new CheckedMenuItem({
				label: 'Auto-Indentation',
				//~ disabled: true
			}));
			
			menu.addChild(new PopupMenuItem({
				label: 'Indent Type',
				popup: (function() {
					var ddm = new DropDownMenu();
					
					ddm.addChild(new MenuItem({
						label: 'Detect From Content'
					}));
					ddm.addChild(new MenuSeparator());
					ddm.addChild(new MenuItem({
						label: 'Tabs'
					}));
					ddm.addChild(new MenuItem({
						label: 'Spaces'
					}));
					ddm.addChild(new MenuItem({
						label: 'Tabs and Spaces'
					}));
					
					return ddm;
				})()
			}));
			
			menu.addChild(new PopupMenuItem({
				label: 'Indent Width',
				popup: (function() {
					var ddm = new DropDownMenu();
					
					ddm.addChild(new MenuItem({
						label: 'Detect From Content'
					}));
					ddm.addChild(new MenuSeparator());
					ddm.addChild(new MenuItem({
						label: '1'
					}));
					ddm.addChild(new MenuItem({
						label: '2'
					}));
					ddm.addChild(new MenuItem({
						label: '3'
					}));
					ddm.addChild(new MenuItem({
						label: '4'
					}));
					ddm.addChild(new MenuItem({
						label: '5'
					}));
					ddm.addChild(new MenuItem({
						label: '6'
					}));
					ddm.addChild(new MenuItem({
						label: '7'
					}));
					ddm.addChild(new MenuItem({
						label: '8'
					}));
					
					return ddm;
				})()
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new CheckedMenuItem({
				label: 'Read Only',
				//~ disabled: true
			}));
			
			menu.addChild(new CheckedMenuItem({
				label: 'Write Unicode BOM',
				//~ disabled: true
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new PopupMenuItem({
				label: 'Set Filetype',
				popup: (function() {
					var ddm = new DropDownMenu();
					
					ddm.addChild(new PopupMenuItem({
						label: 'Programming Languages',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: '(O)Caml source file'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'Scripting Languages',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'ActionScript source file'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'Markup Languages',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Cascading StyleSheet'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'Miscellaneous Languages',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Abc file'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new MenuItem({
						label: 'None'
					}));
					
					return ddm;
				})()
			}));
			
			///
			
			menu.addChild(new PopupMenuItem({
				label: 'Set Encoding',
				popup: (function() {
					var ddm = new DropDownMenu();
					
					ddm.addChild(new PopupMenuItem({
						label: 'West European',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Celtic (ISO-8859-14)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'East European',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Baltic (ISO-8859-4)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'East Asian',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Chinese Simplified (GB18030)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'SE & SW Asian',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Armenian (ARMSCII-8)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'Middle Eastern',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Arabic (IBM864)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new PopupMenuItem({
						label: 'Unicode',
						popup: (function() {
							var ddm = new DropDownMenu();
							
							ddm.addChild(new MenuItem({
								label: 'Unicode (UTF-7)'
							}));
							
							return ddm;
						})()
					}));
					
					ddm.addChild(new MenuItem({
						label: 'Without Encoding (None)'
					}));
					
					return ddm;
				})()
			}));
			
			///
			
			menu.addChild(new PopupMenuItem({
				label: 'Set Line Endings',
				popup: (function() {
					var ddm = new DropDownMenu();
					
					ddm.addChild(new MenuItem({
						label: 'Convert and Set to CR/LF (Win)',
					}));
					
					ddm.addChild(new MenuItem({
						label: 'Convert and Set to LF (Unix)',
					}));
					
					ddm.addChild(new MenuItem({
						label: 'Convert and Set to CR (Mac)',
					}));
					
					return ddm;
				})()
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Strip Trailing White Space'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Replace Tabs By Spaces'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Replace Spaces By Tabs'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Fold All'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Unfold All'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Remove Markers'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Remove Error Indicators'
			}));
			
			return menu;
		}
		
		/*********************************************************************
		 * Project Menu
		 ********************************************************************/  
		function projectMenu() {
			var menu = new DropDownMenu();
			
			menu.addChild(new MenuItem({
				label: 'New'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Open'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Recent Projects'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Close'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Apply Default Indention'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Properties'
			}));		
			
			return menu
		}
		
		/*********************************************************************
		 * Build Menu
		 ********************************************************************/  
		function buildMenu() {
			var menu = new DropDownMenu();
			
			menu.addChild(new MenuItem({
				label: 'Make'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Make Custom Target'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Make Object'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Next Error'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Previous Error'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Execute'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Set Build Commands'
			}));
			
			return menu;
		}
		
		/*********************************************************************
		 * Tools Menu
		 ********************************************************************/  
		function toolsMenu() {
			var menu = new DropDownMenu();
			
			menu.addChild(new MenuItem({
				label: 'Reload Configuration'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Configuration Files'
			}));
					
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Color Chooser'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Word Count'
			}));
					
			menu.addChild(new MenuItem({
				label: 'Load Tags'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'Plugin Manager'
			}));
			
			return menu;
		}
		
		/*********************************************************************
		 * Help Menu
		 ********************************************************************/  
		function helpMenu() {
			var menu = new DropDownMenu();
			
			menu.addChild(new MenuItem({
				label: 'Help'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Website'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Keyboard Shortcuts'
			}));
			
			menu.addChild(new MenuItem({
				label: 'Debug Messages'
			}));
			
			menu.addChild(new MenuSeparator());
			
			menu.addChild(new MenuItem({
				label: 'About'
			}));
			
			return menu;
		}
	});	// ready
	
	
});	// require
