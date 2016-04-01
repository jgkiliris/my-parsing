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
  myParsingView.prototype.setCount = function(count,count2,variables) {
    var displayText;
    displayText = "There are " + count + " words in this source code.";
	var mes = [];
	
	for(i=0; i<variables.length; i++){
		mes[i] = document.createElement('div');
		mes[i].textContent = "Detected leaked global variable: "+variables[i];
		mes[i].classList.add('mes[i]');
		this.element.appendChild(mes[i]);
	}
	var newposition = mes.length;
	mes[newposition] = document.createElement('div');
	mes[newposition].textContent = "There are "+count2+" function calls.";
	mes[newposition].classList.add('mes[newposition]');
	this.element.appendChild(mes[newposition]);
	
	this.element.children[0].textContent = displayText;
	
	return this.element.children.textContent;
  };
  return myParsingView;
})();
