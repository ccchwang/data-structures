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
        }
        else {
          currentRoot.left = newNode;
          break;
        }
      }
      else {
        if(currentRoot.right){
          currentRoot = currentRoot.right;
        }
        else {
          currentRoot.right = newNode;
          break;
        }
      }
    };
    this.count++;
};

BinarySearchTree.prototype.contains = function(value){
  var currentRoot = this;

    while(currentRoot){

      if(value === currentRoot.value){
        return true;
      }
      //if value is smaller than currentRoot
      if (value < currentRoot.value) {
        if(currentRoot.left){
          currentRoot = currentRoot.left;
        }
        else {
          return false;
        }
      }
      //if value is greater than currentRoot
      else {
        if (currentRoot.right){
          currentRoot = currentRoot.right;
        }
        else {
          return false;
        }
      }
    }

};

BinarySearchTree.prototype.depthFirstForEach = function(fn, option){

  if(!option || option === 'in-order'){
  //1) go left as far as you can
  //2) no more left, so process current node
  //2a-2b) set new current node (right or parent), and restart loop
    var currentRoot = this, parent = [], leftIsDone = false;

    while (currentRoot) {

    //1) go left as far as it can. each time, keep adding parent to stack.
      if (currentRoot.left && !leftIsDone){
        parent.push(currentRoot);
        currentRoot = currentRoot.left;
      }

    //2) no more left, so process node and turn on leftIsDone.
      else {
        fn(currentRoot.value);
        leftIsDone = true;

        //**After processing node, we need to set new current node. New node can be either the right or the parent**//

        //2a) Right Exists: Set right as new current and set leftIsDone to false so loop can happen all over again.
        if (currentRoot.right) {
          currentRoot = currentRoot.right;
          leftIsDone = false;
        }
        //2b) No Right: Set the last immediate parent (stack, LIFO) as new current.
        else {
          currentRoot = parent.pop();
        }
      }
    }
  }




  //if option pre-order, run in pre-order
  //if option is post-order, run in post-order

};

BinarySearchTree.prototype.breadthFirstForEach = function(){};

BinarySearchTree.prototype.size = function(){
  return this.count;
};

