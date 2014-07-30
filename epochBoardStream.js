var lolipop = require('../lolipop/lolipop');
var epochMap = require('./epochMap.js');
var through = require('through');

var EpochBoardStream = module.exports = function EpochBoardStream(lpConfig) {
  if (!(this instanceof EpochBoardStream)) {
    return new EpochBoardStream(lpConfig);
  }
  this.lp = lolipop(lpConfig);
}

EpochBoardStream.prototype.createBoardStream = function (err) {
  var table = 'smf_boards';
  var tableMap = {
    name : 'name',
    description : 'description'
  }

  var smfMap = {
    ID_BOARD : 'id'
  }

  var rowStream = this.lp.createRowStream(null, table);
  var tr = through(function (row) {
    var obj = epochMap.remapObject(row, tableMap);
    var smfObject = epochMap.remapObject(row, smfMap);
    obj['smf'] = smfObject;
    this.queue(obj);
  });
  boardStream = rowStream.pipe(tr);

  this.lp.end();

  return boardStream;
}
