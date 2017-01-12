/* LINKED LIST SOLUTION */
function Queue(){
  this.head = false;
  this.tail = false;
}

Queue.prototype.enqueue = function(value) {
  var newNode = new Node(value);

  //if head is false, newNode is first node in list, so set it to head and tail.
  if (!this.head) {
    this.head = newNode, this.tail = newNode;
  }
  //else, add it to the tail
  else {
    var currentTail = this.tail;
    currentTail.next = newNode;
    newNode.previous = currentTail;
    this.tail = newNode;
  }
};

Queue.prototype.dequeue = function (){
  var currentHead = this.head;
  if (!currentHead) { return undefined; }

  var nextHead = currentHead.next;

  if (nextHead) {
  nextHead.previous = null;
  this.head = nextHead;
  } else {
    this.head = false, this.tail = false;
  }

  return currentHead.value;
};

Queue.prototype.size = function (){
  var count = 0;
  var index = this.head;

  while (index) {
    count+=1
    index = index.next;
  }

  return count;
};

function Node(value){
  this.value = value;
  this.previous = null;
  this.next = null;
}

/* FIXED ARRAY SOLUTION */
// function Queue(){
//   this.queue = [];
//   this.head = 0;
//   this.tail = 0;

//   this.enqueue = function (item){
//     this.queue[this.tail] = item;
//     this.tail++;
//   };

//   this.dequeue = function (){
//     if (!this.size()) {
//       return undefined
//     }
//     this.head+=1
//     return this.queue[this.head - 1];
//   };

//   this.size = function (){
//     return this.tail - this.head;
//   };
// }
