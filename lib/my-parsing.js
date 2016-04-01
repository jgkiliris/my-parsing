var CompositeDisposable, Parsing, myParsingView;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
myParsingView = require('./my-parsing-view');
CompositeDisposable = require('atom').CompositeDisposable;
module.exports = MyParsing = {
  myParsingView: null,
  modalPanel: null,
  subscriptions: null,
  activate: function(state) {
    this.myParsingView = new myParsingView(state.myParsingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myParsingView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable;
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-parsing:toggle': __bind(function() {
        return this.toggle();
      }, this)
    }));
  },
  deactivate: function() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.myParsingView.destroy();
  },
  serialize: function() {
    return {
      myParsingViewState: this.myParsingView.serialize()
    };
  },
  toggle: function() {
    var editor, words, code, ast;
    var count = 0;
    console.log('MyWordCount was toggled!');
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      editor = atom.workspace.getActiveTextEditor();
      words = editor.getText().split(/\s+/).length;
      code = editor.getText();

      var esprima = require('esprima');
      var estraverse = require('estraverse');

      ast = esprima.parse(code);
	  	
	  var myFunctions = require("./myFunctions.js");
		
      estraverse.traverse(ast, {
        enter: myFunctions.enter,
        leave: myFunctions.leave
      });

      this.myParsingView.setCount(words,myFunctions.count,myFunctions.variables);
      return this.modalPanel.show();
    }
  }

};
