const app = require('electron').remote.app;
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/fold/foldcode.js');
require(modulePath + 'codemirror/addon/fold/foldgutter.js');
require(modulePath + 'codemirror/addon/fold/markdown-fold.js');

module.exports = {

  activate() {
    global.inkdrop.onEditorLoad(this.handleEditorInit.bind(this));
    this.subscription = inkdrop.commands.add(document.body, {
      'code-fold:fold-all': () => this.foldAll(),
      'code-fold:unfold-all': () => this.unfoldAll(),
    });
  },

  deactivate() {
    const editor = global.inkdrop.getActiveEditor();
    if (editor && editor.cm && this.originalGutters) {
      editor.cm.setOption('gutters', this.originalGutters);
    }
    this.subscription.dispose();
  },

  handleEditorInit(editor) {
    var cm = editor.cm;
    this.originalGutters = cm.getOption('gutters');
    cm.setOption('foldGutter', true);
    cm.setOption('gutters', this.originalGutters.concat(["CodeMirror-foldgutter"]));
  },

  foldAll() {
    var editor = global.inkdrop.getActiveEditor();
    editor.cm.execCommand('foldAll');
  },

  unfoldAll() {
    var editor = global.inkdrop.getActiveEditor();
    editor.cm.execCommand('unfoldAll');
  },
};