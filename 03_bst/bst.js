function BinarySearchTree(value, count) {
  this.value = value;
  this.left = null;
  this.right = null;
  if (!count) {this.count = 1};
}

BinarySearchTree.prototype.insert = function(value){
    var newNode = new BinarySearchTree(value, "noCount");
    var currentRoot = this;
    var direction;

    while(currentRoot){
      direction = value < currentRoot.value ? 'left' : 'right';

        if(currentRoot[direction]){
          currentRoot = currentRoot[direction];
        }
        else {
          currentRoot[direction] = newNode;
          break;
        }

    }
    this.count++;
};

BinarySearchTree.prototype.contains = function(value){
  var currentRoot = this;
  var direction = value < currentRoot.value ? 'left' : 'right';

    if(value === currentRoot.value){
      return true;
    }
    //check direction and if it exists, go there
    if(currentRoot[direction]){
      return currentRoot[direction].contains(value);
    }
    else {
      return false;
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


  if(option === 'pre-order'){
 //root, left right
    var currentRoot = this, parent = [], leftIsDone = processed = false;

    while (currentRoot) {

      if (!processed) {
      fn(currentRoot.value);
      }

      if (currentRoot.left && !leftIsDone){
        parent.push(currentRoot);
        currentRoot = currentRoot.left;
      }
      else {
        leftIsDone = true;

        if (currentRoot.right) {
          currentRoot = currentRoot.right;
          leftIsDone = false;
          processed = false;
        }
        else {
          currentRoot = parent.pop();
          processed = true;
        }

      }
    }
  }

  if(option === 'post-order'){
    var currentRoot = this, parent = [], leftIsDone = rightIsDone = false;

    //if no more left, check right
        //if no right, process and go up. check right if rightisnotdone. if right, go down there and start again. check rightisDone.
        //else, process, go up and check left is done/right is not done.

    while (currentRoot) {
      if (currentRoot.left && !leftIsDone) {
        parent.push(currentRoot);
        currentRoot = currentRoot.left;
      }
      else {
        if (currentRoot.right && !rightIsDone) {
          parent.push(currentRoot);
          currentRoot = currentRoot.right;
          rightIsDone = leftIsDone = false;
        }
        else {
          var childVal = currentRoot.value;
          fn(childVal);
          currentRoot = parent.pop();
          leftIsDone = true;

          if (currentRoot && childVal > currentRoot.value) {
            rightIsDone = true;
          }
          else {
            rightIsDone = false;
          }
        }
      }
    }
  }
};

BinarySearchTree.prototype.breadthFirstForEach = function(fn, currentRoots){
    var queue = [];

    if (arguments.length === 1) {
      currentRoots = [this]
    }

    currentRoots.forEach(function(root) {
      fn(root.value);
      if (root.left) {queue.push(root.left)};
      if (root.right) {queue.push(root.right)};
    })

    if (queue.length > 0) {
      return this.breadthFirstForEach(fn, queue)
    }
}

BinarySearchTree.prototype.size = function(){
  return this.count;
};
