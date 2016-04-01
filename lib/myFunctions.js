var exports;
exports = module.exports = {};

var scopeChain = [];
var assignments = [];
var count = 0;
exports.variables = [];

exports.enter = function (node){
  if (createsNewScope(node)){
    scopeChain.push([]);
  }
  if (node.type === 'VariableDeclarator'){
    var currentScope = scopeChain[scopeChain.length - 1];
    currentScope.push(node.id.name);
  }
  if (node.type === 'AssignmentExpression'){
    assignments.push(node.left.name);
  }
  if (node.type === 'CallExpression'){
    count++;
  }
  exports.count = count; 
};

exports.leave = function (node){
  if (createsNewScope(node)){
    checkForLeaks(assignments, scopeChain);
    scopeChain.pop();
    assignments = [];
  }
};

function isVarDefined(varname, scopeChain){
  for (var i = 0; i < scopeChain.length; i++){
    var scope = scopeChain[i];
    if (scope.indexOf(varname) !== -1){
      return true;
    }
  }
  return false;
}

function checkForLeaks(assignments, scopeChain){
  for (var i = 0; i < assignments.length; i++){
    if (!isVarDefined(assignments[i], scopeChain)){
      exports.variables.push(assignments[i]);
    }
  }
}

function createsNewScope(node){
  return node.type === 'FunctionDeclaration' ||
    node.type === 'FunctionExpression' ||
    node.type === 'Program';
}