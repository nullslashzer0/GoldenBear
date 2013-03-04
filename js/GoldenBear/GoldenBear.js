require([
  "dojo/ready", "dojo/parser", "dojo/on",
  "dojo/cookie", "dojo/date/locale",
  "dojo/dom", "dojo/dom-construct", "dojo/dom-style", "dojo/dom-attr",
  "dijit/registry",
  "dijit/TitlePane",
  "dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu",
  "dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator",
  "dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane",
  "GoldenBear/File", "GoldenBear/Dialog/SaveFile"
], function(
  ready, parser, on,
  cookie, locale,
  dom, domConstruct, domStyle, domAttr,
  registry,
  TitlePane,
  MenuBar, PopupMenuBarItem,DropDownMenu,
  MenuItem, PopupMenuItem, CheckedMenuItem, MenuSeparator,
  BorderContainer, TabContainer, ContentPane,
  File, SaveFile
){
  
  ready(function() {
    domStyle.set(dom.byId('app-splash'), 'display', 'none'); // hide the splash image
	}); // End ready
	
	
}); // end require
