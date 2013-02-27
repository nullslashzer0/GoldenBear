define([
	"dojo/cookie",
  "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
  "dojo/_base/array", "dojo/on",
  "dojo/dom", "dojo/dom-attr", "dojo/dom-style",
  "dijit/registry",
  "dijit/layout/TabContainer", "dijit/layout/ContentPane",
  "GoldenBear/File"
], function(
	cookie,
  lang, declare, _WidgetBase,
  array, on,
  dom, domAttr, domStyle,
  registry,
  TabContainer, ContentPane,
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
    'htmlmixed':  '*.htm;*.html;*.shtml;*.hta;*.htd;*.htt;*.cfm;*.tt;*.tt2',
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
  
  var codemirror = {
    themes: [
      'ambiance', 'blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark',
      'monokai','neat','night','rubyblue','solarized','twilight','vibrant-ink','xq-dark'
    ]
  };
  
  var CodeMirror = window.CodeMirror || 'undefined';
  
  var FileManager = declare("GoldenBear/FileManager", [_WidgetBase], {
    fileCollection: undefined,
		tc: undefined,	// TabContainer should be passed in during application ready
    
    constructor: function(props) {
      lang.mixin(props);
    },
    
    postCreate: function() {
      this._set('fileCollection', []);
      this.tc.watch('selectedChildWidget', lang.hitch(this, function(name, oval, nval) {
				console.debug(name, " changed from ", oval, " to ", nval);
				this.refreshFile(nval);
			}));
				
      this.inherited('postCreate', arguments);
    },
    
    newFile: function(filename) {
			return this.openFile(filename);
		},
    
    openFile: function(filename) {
			filename = filename || 'untitled';
			var cmid = "document." + this.fileCollection.length;
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
					lineNumbers: true
				});
				
				var file = new File({
					codemirror: cm,
					name: filename
				});
				
				file.watch('modified', function(name, oval, nval) {
					var tabLabel = dom.byId('fileContainer_tablist_' + cp.containerNode['id']);
					if (nval) {
						tabLabel.innerHTML += "*";
						domStyle.set(tabLabel, 'color', 'red');
					} else {
						tabLabel = tabLabel.replace(/\*$/, '');
						domStyle.set(tabLabel, 'color', 'black');
					}
				});
				
				cm.on('change', lang.hitch(this, function(cm, obj) {
					file.set('modified', true);
				}));
				
				cp.on('close', lang.hitch(this, function (cp) { return this.closeFile(cp); }, cp));
				
				this.fileCollection.push(file);
				domAttr.set(cp.domNode, 'data-fileid', file.get('id'));
				this.tc.addChild(cp);
				this.tc.selectChild(cp);
			}
		},
		
		closeFile: function(cp) {
			var tc = this.tc;
			cp = cp || tc.get('selectedChildWidget');
			var fileid = domAttr.get(cp.domNode, 'data-fileid');
      var file = registry.byId(fileid);
      var close = false;
      
      if (file.get('modified') == false) {
        close = true;
      } else {
        console.warn("File was modified, prompt for saving before close");
      }
      
      if (close) {
				this.tc.removeChild(cp);
			}
			return close;
		},
		
		closeOtherFiles: function(cp) {
			var tc = this.tc;
			var files = tc.getChildren();
			var selected = tc.get('selectedChildWidget');
			var i = files.length;
			
			while(i) {
				var cp = files[--i];
				if ( cp !== selected ) {
					this.closeFile(files[i]);
				}
			}
		},
		
		closeAllFiles: function() {
			var tc = this.tc;
			var files = tc.getChildren();
			var i = files.length;
			
			while(i) {
				this.closeFile(files[--i]);
			}
		},
		
		refreshFile: function(cp) {
			var cm = getCodeMirror(cp);
			console.debug(cm);
			cm.refresh();
			cm.focus();			
		},
		
		setCodeMirrorTheme: function(theme) {
			var i = this.fileCollection.length;

			while(i) {
				this.fileCollection[--i].get('codemirror').setOption('theme', theme);
			}
		}
  }); // End declare
  
  function getCodeMirror(cp) {
		var fileid = domAttr.get(cp.domNode, 'data-fileid');
		var file = registry.byId(fileid);
		return file.get('codemirror');
	}
  
  return FileManager;
}); // End define


