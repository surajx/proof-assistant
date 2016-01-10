var FOLListener = require('./gen/FOLListener').FOLListener;

FOLTreeWalker = function() {
  FOLListener.call(this); // inherit default listener
  return this;
};

// inherit default listener
FOLTreeWalker.prototype = Object.create(FOLListener.prototype);
FOLTreeWalker.prototype.constructor = FOLTreeWalker;

module.exports = FOLTreeWalker;
