function HashTable(){

  this.table = new Array(35);
}

Object.defineProperty(HashTable.prototype, 'numBuckets', {
  get: function(){return this.table.length}
})

HashTable.prototype.set = function(key, val){
  if (typeof key !== "string") {
    throw new TypeError('Keys must be strings')
  }
  var tableIndex = this.hash(key);
  var current = this.table[tableIndex];

  if (current) {
    var overwrite = false;

    current.forEach(function(pair) {
      if (pair[0] === key) {
        pair[1] = val;
        overwrite = true;
      }
    })

    if (!overwrite) {
    current.push([key, val])
    }
  }

  else {this.table[tableIndex] = [[key, val]];}
}

HashTable.prototype.get = function(key){
  var tableIndex = this.hash(key);
  var current = this.table[tableIndex];

  if (typeof current === 'object') {
    current.forEach(function(pair) {
      if (pair[0]===key) { current = pair[1] }
    });
  }
  return current;
}

HashTable.prototype.hasKey = function(key){
  var hasKey = false;
  var tableIndex = this.hash(key);
  var current = this.table[tableIndex];

  if (current) {
    current.forEach(function(pair) {
      if (pair[0]===key) { hasKey = true; }
    })
  }
  return hasKey;
}

HashTable.prototype.hash = function(key){
  var sumCharCodes = 0;
  key.split("").forEach(function(letter) {
    sumCharCodes += letter.charCodeAt(0)
  });
  return sumCharCodes % this.numBuckets;
}
