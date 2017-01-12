
function LinkedList() {
  this.head = false;
  this.tail = false;
}

LinkedList.prototype.addToTail = function(value){
  var newNode = new Node(value);

  //if tail doesn't exist, it's first node in list, so set head+tail to node.
  if (!this.tail) {
    this.head = newNode, this.tail = newNode;
  }
  //If there's a tail, make currentTail.next point to newTail && newTail.prev point to currentTail, then set this.tail to newTail
  else {
    var currentTail = this.tail;
    currentTail.next = newNode;
    newNode.previous = currentTail;
    this.tail = newNode;
  }
};

LinkedList.prototype.addToHead = function (value){
  var newNode = new Node(value);

  //if head doesn't exist, it's first node in list, so set head+tail to node
  if (!this.head) {
    this.head = newNode, this.tail = newNode;
  } else {
    var currentHead = this.head;
    newNode.next = currentHead;
    currentHead.previous = newNode;
    this.head = newNode;
  }
};

LinkedList.prototype.removeHead = function(){
  var currentHead = this.head;
  var nextHead = currentHead.next;

  //if nextHead doesn't exist, means currentHead is last node in list, so removing it will mean list is empty. Thus, set head and tail to false
  if (!nextHead) {
    this.head = false, this.tail = false;
  } else {
    nextHead.previous = null;
    this.head = nextHead;
  }
  return currentHead.value;
};

LinkedList.prototype.removeTail = function(){
  var currentTail = this.tail;
  var prevTail = this.tail.previous;

  if (!prevTail) {
    this.head = false, this.tail = false;
  } else {
    prevTail.next = null;
    this.tail = prevTail;
  }
  return currentTail.value;
};

LinkedList.prototype.search = function(query){
  var index = this.head;
  var fnReturn;

  while (index) {
    if (typeof query == 'function') {
      fnReturn = query(index.value);
    }
    //if the return val of the fn is true OR query is equal to index.value, return value
    if (fnReturn || query === index.value) {
      return index.value;
    }
    index = index.next;
  }
  return null;
};

function Node(value) {
  this.value = value;
  this.previous = null;
  this.next = null;
}
