define([
	"dojo/cookie",
  "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
  "dojo/_base/array",
  "dojo/dom-attr",
  "dijit/registry",
  "dijit/layout/ContentPane",
  "GoldenBear/File"
], function(
	cookie,
  lang, declare, _WidgetBase,
  array,
  domAttr,
  registry,
  ContentPane,
  File
){
  // TODO: temporary until either extension map is stored in database or file and delivered by service
  var filetypeExtensions = {
    'clike':      '*.c;*.h;*.cpp;*.cxx;*.c++;*.cc;*.h;*.hpp;*.hxx;*.h++;*.hh;*.C;*.H;*.cs;',
    'css':        '*.css;',
    'd':          '*.d;*.di;',
    'diff':       '*.diff;*.patch;*.rej;*.debdiff;*.dpatch;',
    'erlang':     '*.erl;',
    'haskell':    '*.hs;*.lhs;',
    'haxe':       '*.hx;',
    'htmlmixed':  '*.htm;*.html;*.shtml;*.hta;*.htd;*.htt;*.cfm;',
    'javascript': '*.js;',
    'lua':        '*.lua;',
    'markdown':   '*.mdml;*.markdown;*.md;*.mkd;',
    'pascal':     '*.pas;*.pp;*.inc;*.dpr;*.dpk;',
    'perl':       '*.pl;*.perl;*.pm;*.agi;*.pod;',
    'php':        '*.php;*.php3;*.php4;*.php5;*.phtml;',
    'r':          '*.R;*.r;',
    'ruby':       '*.rb;*.rhtml;*.ruby;',
    'shell':      '*.sh;configure;configure.in;configure.in.in;configure.ac;*.ksh;*.zsh;*.ash;*.bash;*.m4;',
    'sql':        '*.sql;',
    'verilog':    '*.v;',
    'xml':        '*.xml;*.sgml;*.xsl;*.xslt;*.xsd;*.xhtml;',
    'yaml':       '*.yaml;*.yml;',
  };
  
  var codemirrorModeFile = {
    'clike':      ['js/CodeMirror/mode/clike/clike.js'],
    'css':        ['js/CodeMirror/mode/css/css.js'],
    'd':          ['js/CodeMirror/mode/d/d.js'],
    'diff':       ['js/CodeMirror/mode/diff/diff.js'],
    'erlang':     ['js/CodeMirror/mode/erlang/erlang.js'],
    'haskell':    ['js/CodeMirror/mode/haskell/haskell.js'],
    'haxe':       ['js/CodeMirror/mode/haxe/haxe.js'],
    'htmlmixed':  ['js/CodeMirror/mode/xml/xml.js', 'js/CodeMirror/mode/javascript/javascript.js', 'js/CodeMirror/mode/css/css.js', 'js/CodeMirror/mode/htmlmixed/htmlmixed.js'],
    'javascript': ['js/CodeMirror/mode/javascript/javascript.js'],
    'lua':        ['js/CodeMirror/mode/lua/lua.js'],
    'markdown':   ['js/CodeMirror/mode/markdown/markdown.js'],
    'pascal':     ['js/CodeMirror/mode/pascal/pascal.js'],
    'perl':       ['js/CodeMirror/mode/perl/perl.js'],
    'php':        ['js/CodeMirror/mode/php/php.js'],
    'r':          ['js/CodeMirror/mode/r/r.js'],
    'ruby':       ['js/CodeMirror/mode/ruby/ruby.js'],
    'shell':      ['js/CodeMirror/mode/shell/shell.js'],
    'sql':        ['js/CodeMirror/mode/sql/sql.js'],
    'verilog':    ['js/CodeMirror/mode/verilog/verilog.js'],
    'xml':        ['js/CodeMirror/mode/xml/xml.js'],
    'yaml':       ['js/CodeMirror/mode/yaml/yaml.js']
  };
  
  var CodeMirror = window.CodeMirror || 'undefined';
  
  var FileManager = declare("GoldenBear/FileManager", [_WidgetBase], {
    _fileCollection: undefined,
    constructor: function(props) {
      lang.mixin(props);
    },
    
    postCreate: function() {
      this._set('_fileCollection', []);
      console.debug("CODEMIRROR: ", CodeMirror);
      console.debug("FILECOLLECTION", this._fileCollection);
      this.inherited('postCreate', arguments);
    },
    
    newFile: function(filename) {
			return this.openFile(filename);
		},
    
    openFile: function(filename) {
			filename = filename || 'untitled';
			var cmid = "document." + this._fileCollection.length;
			var cp = new ContentPane({
				id: cmid,
				title: filename,
				closable: true
			});
			
			var cm = undefined;
			
			if (typeof CodeMirror === 'undefined') {
				console.debug("CodeMirror undefined: add textarea to ContentPane");
			} else {
				cm = CodeMirror(cp.containerNode, {
					//~ theme: cookie('goldenbear.editor.theme' || 'default'),
					lineNumbers: true
				});
				
				var file = new File({
					codemirror: cm,
					name: filename
				});
				
				this._fileCollection.push(file);
				domAttr.set(cp.domNode, 'data-fileid', file.get('id'));
			}
			
			return cp;
		},
		
		refreshActiveFile: function(cp) {
			var fileid = domAttr.get(cp.domNode, 'data-fileid');
			var file = registry.byId(fileid);
			var cm = file.get('codemirror');
			cm.refresh();
			cm.focus();			
		}
  }); // End declare
  
  return FileManager;
}); // End define


