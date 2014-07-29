var lolipop = require('../lolipop/lolipop');
var lpConfig = require('./config.json');
var lp = lolipop(lpConfig);

var through = require('through');

var importMap = require('./importMap.json');

for (table in importMap) {
  var tableMap = importMap[table];
  var rowStream = lp.createRowStream(null, table);
  var tr = through(function (row) {
    var obj = {};
    for (oldKey in tableMap) {
      var newKey = tableMap[oldKey];
      obj[newKey] = row[oldKey];
    }
    this.queue(obj);
    console.log("pushed:");
    console.log(obj);
  });
  rowStream.pipe(tr); //.pipe(someWriteStream);
}

lp.end();
