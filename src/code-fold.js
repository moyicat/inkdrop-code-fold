import foldCode from 'codemirror/addon/fold/foldcode'
import foldGutter from 'codemirror/addon/fold/foldgutter'
import foldMd from 'codemirror/addon/fold/markdown-fold.js'

module.exports = {

  activate () {
    global.inkdrop.on('editor:init', ::this.handleEditorInit)
  },

  deactivate () {
    const editor = global.inkdrop.getActiveEditor()
    if (editor && editor.codeMirror && this.originalGutters) {
      editor.codeMirror.setOption('gutters', this.originalGutters)
    }
  },

  handleEditorInit (editor) {
    var cm = editor.codeMirror
    this.originalGutters = cm.getOption('gutters')
    cm.setOption('foldGutter', true)
    cm.setOption('gutters', this.originalGutters.concat(["CodeMirror-foldgutter"]))
  }
};
