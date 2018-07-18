const app = require('electron').remote.app;
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/fold/foldcode.js');
require(modulePath + 'codemirror/addon/fold/foldgutter.js');
require(modulePath + 'codemirror/addon/fold/markdown-fold.js');

module.exports = {

  activate() {
    global.inkdrop.on('editor:init', this.handleEditorInit.bind(this));
    inkdrop.commands.add(document.body, {
      'codefold:foldAll': () => this.foldAll(),
      'codefold:unfoldAll': () => this.unfoldAll()
    });
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
  },

  foldAll() {
    var editor = global.inkdrop.getActiveEditor();
    editor.codeMirror.execCommand('foldAll');
  },

  unfoldAll() {
    var editor = global.inkdrop.getActiveEditor();
    editor.codeMirror.execCommand('unfoldAll');
  },
};