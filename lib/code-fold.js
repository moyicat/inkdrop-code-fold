'use strict';

var _foldcode = require('codemirror/addon/fold/foldcode');

var _foldcode2 = _interopRequireDefault(_foldcode);

var _foldgutter = require('codemirror/addon/fold/foldgutter');

var _foldgutter2 = _interopRequireDefault(_foldgutter);

var _markdownFold = require('codemirror/addon/fold/markdown-fold.js');

var _markdownFold2 = _interopRequireDefault(_markdownFold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  activate() {
    global.inkdrop.on('editor:init', this.handleEditorInit.bind(this));
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor();
    if (editor && editor.codeMirror && this.originalGutters) {
      editor.codeMirror.setOption('gutters', this.originalGutters);
    }
  },

  handleEditorInit(editor) {
    var cm = editor.codeMirror;
    this.originalGutters = cm.getOption('gutters');
    cm.setOption('foldGutter', true);
    cm.setOption('gutters', this.originalGutters.concat(["CodeMirror-foldgutter"]));
  }
};