define([
  "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
  "dojo/dom-construct", "dojo/dom-attr",
  "dojo/request/xhr"
], function(
  lang, declare, _WidgetBase,
  domConstruct, domAttr,
  xhr
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
  
  function getCodeMirrorMode(filename) {
    var mode = undefined;
    var found = false;
    
    for(var _mode in filetypeExtensions) {
      var extensions = filetypeExtensions[_mode].replace(/;$/, '').split(';');
      for(var i = 0, max = extensions.length; i < max && !found; i++) {
        var ext = extensions[i];
        var pattern = ext + "$";
        pattern = pattern.replace(/\./g, '\\.')
                         .replace(/\*/g, '\\.*')
                         .replace(/\+/g, '\\+');
        var patt = new RegExp(pattern);
        
        if (patt.test(filename)) {
          console.debug('found it: ', ext);
          mode = _mode;
          found = true;
          break;
        } else {
          console.debug(ext, ' did not match pattern [', pattern, ']');
        }
      }
    }
    return mode;
  }
  
  function modeScriptLoaded(mode) {
    var filename = mode + ".js";
    var scripts = document.getElementsByTagName('script')
    var loaded = false;
    for(var i = 0, max = scripts.length; i < max && !loaded; i++) {
      var src = scripts[i].src;
      var dataMode = domAttr.get(scripts[i], 'data-codemirror-mode');
      loaded = (src.match(mode) || (dataMode && dataMode.match(mode)) );
    }
    return loaded;
  }
  
  var File = declare("GoldenBear/File", [_WidgetBase], {
    codemirror: undefined,
    name: 'untitled',
    modified: false,
    
    constructor: function(props) {
      lang.mixin(props);
    },
    
    postCreate: function() {
      this.setCodeMirrorMode();
      this.inherited('postCreate', arguments);
    },
    
    extension: function() {
      var parts = this.name.split('.');
      return parts.pop();
    },
    
    
    
    setCodeMirrorMode: function() {
      var mode = getCodeMirrorMode(this.name);
      var loaded = modeScriptLoaded(mode);
      var cm = this.codemirror;
      
      // check if script was already loaded before loading again
      if (!loaded) {
        var files = codemirrorModeFile[mode];
        
        for(var i = 0, max = files.length; i < max; i++) {
          var file = files[i];
          xhr(file, { 
            sync: true,
          }).then(function(data) {
            domConstruct.create('script', {
              'data-codemirror-mode': mode,
              innerHTML: data
            }, document.getElementsByTagName('head')[0], 'last');
            cm.setOption('mode', mode);
          }, function(err) {
            console.error(err);
          });
        }
      }
    }
  }); // End declare
  
  return File;
}); // End define
