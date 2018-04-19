require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/markdown-fold.js');

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
    console.log(cm);
  }
};