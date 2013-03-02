define([
  "dojo/_base/lang", "dojo/_base/declare", "dijit/Dialog",
  "dojo/dom", "dojo/dom-construct", "dojo/dom-attr", "dojo/dom-style",
  "dijit/registry",
  "dijit/form/Button", "dijit/form/TextBox",
  "dojo/request/xhr"
], function(
  lang, declare, Dialog,
  dom, domConstruct, domAttr, domStyle,
  registry,
  Button, TextBox,
  xhr
){
  var Dialog = declare("GoldenBear/Dialog/SaveFile", [Dialog], {
    file: undefined,
    filename: undefined,
    onRename: function() { console.warn("There isn't an implementation for Rename.") },
    onCancel: function() { console.warn("There isn't an implementation for Cancel.") },
    onSave: function() { console.warn("There isn't an implementation for Save.") },
    
    constructor: function(props) {
      lang.mixin(props);
    },
    
    postCreate: function() {
      var filename = domConstruct.create('div', { id: "filename." + this.id }, this.containerNode);
      var saveInFolder = domConstruct.create('div', { id: "saveInFolder." + this.id }, this.containerNode);
      var fileBrowser = domConstruct.create('div', { id: "fileBrowser." + this.id }, this.containerNode);
      var buttons = domConstruct.create('div', { id: "buttons." + this.id }, this.containerNode);
      
      domConstruct.create('label', { innerHTML: 'Name:' }, filename);
      new TextBox({ id: 'filename.' + this.id })
        .placeAt(filename)
        .on('change', lang.hitch(this, function(nval) { 
          this._set('filename', nval);
        }));
      domConstruct.create('label', { innerHTML: 'Save In Folder:' }, saveInFolder);
      
      new Button({ label: 'Rename', onClick: this.onRename }).placeAt(buttons);
      new Button({ label: 'Cancel', onClick: this.onCancel }).placeAt(buttons);
      new Button({ label: 'Save', onClick: this.onSave }).placeAt(buttons);
      
      this.inherited('postCreate', arguments);
    },
    
    show: function(file) {
      console.debug(file);
      if (typeof file !== 'undefined') {
        if (file.get('saved') && file.get('newFile') == false) {
          return;
        }
        registry.byId('filename.' + this.id).set('value', file.get('title'));
      }
      this.inherited('show', arguments);
    }
  }); // End declare
  
  return Dialog;
}); // End define
