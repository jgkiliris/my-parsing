var myParsingView;
module.exports = myParsingView = (function() {
  function myParsingView(serializedState) {
    var message;
    this.element = document.createElement('div');
    this.element.classList.add('my-parsing');
    message = document.createElement('div');
    message.textContent = "The MyParsing package is Alive! It's ALIVE!";
    message.classList.add('message');
    this.element.appendChild(message);
  }
  myParsingView.prototype.serialize = function() {};
  myParsingView.prototype.destroy = function() {
    return this.element.remove();
  };
  myParsingView.prototype.getElement = function() {
    return this.element;
  };
  myParsingView.prototype.setCount = function(count,count2) {
    var displayText;
    displayText = "There are " + count + " words and hello from JS with "+count2+" function calls !";
    return this.element.children[0].textContent = displayText;
  };
  return myParsingView;
})();
