function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.count = 1;
}

BinarySearchTree.prototype.insert = function(value){
    var newNode = new BinarySearchTree(value);
    var currentRoot = this;

    while(currentRoot){

      if (newNode.value < currentRoot.value) {

        if(currentRoot.left){
          currentRoot = currentRoot.left;

        } else{

          currentRoot.left = newNode;
          break;
        }
      } else {
        if(currentRoot.right){
          currentRoot = currentRoot.right;
        } else{
          currentRoot.right = newNode;
          break;
        }
      }
    }

    this.count++;
};
BinarySearchTree.prototype.contains = function(value){
  var currentRoot = this;
    while(currentRoot){

      if(value === currentRoot.value){
        return true;
      }

      if ( value < currentRoot.value) {

        if(currentRoot.left){
          currentRoot = currentRoot.left;
        }
        else {
          return false;
        }
      } else {
        if(currentRoot.right){
          currentRoot = currentRoot.right;
        }
        else {
          return false;
        }
      }
    }

};
BinarySearchTree.prototype.depthFirstForEach = function(fn, option){
  //if no option, run in-order
  //if option 'in order', run in order
  var currentRoot = this;
  var parent;
  var leftIsDone = false;

  if(!option || option === 'in-order'){
   //left
   //root
   //right
    while(currentRoot){

      if(currentRoot.left){
        parent = currentRoot;
        currentRoot = currentRoot.left;
      }
      else {
        fn(currentRoot.value);

        if (currentRoot.right) {
          parent = currentRoot;
          currentRoot = currentRoot.right;
        } else {
          fn(currentRoot.value)
          currentRoot = parent;
          leftIsDone = true;
        }
      }

    }
  }

  //if option pre-order, run in pre-order
  //if option is post-order, run in post-order
  return [];
};
BinarySearchTree.prototype.breadthFirstForEach = function(){};

BinarySearchTree.prototype.size = function(){
  return this.count;
};
