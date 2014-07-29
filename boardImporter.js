var lolipop = require('../lolipop/lolipop');
var epochMap = require('./epochMap.js');
var lpConfig = require('./config.json');
var lp = lolipop(lpConfig);

var through = require('through');

var table = 'smf_boards';
var tableMap = {
    name : 'name',
    description : 'description'
}

var smfMap = {
  ID_BOARD : 'id'
}

var rowStream = lp.createRowStream(null, table);
var tr = through(function (row) {
  var obj = epochMap.remapObject(row, tableMap);
  var smfObject = epochMap.remapObject(row, smfMap);
  obj['smf'] = smfObject;
  this.queue(obj);
  console.log("pushed:");
  console.log(obj);
});
rowStream.pipe(tr); //.pipe(someWriteStream);

lp.end();
