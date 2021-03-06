var epochMap = require('./epochMap.js');
var through2 = require('through2');

var EpochBoardStream = module.exports = function EpochBoardStream(lp) {
  if (!(this instanceof EpochBoardStream)) {
    return new EpochBoardStream(lp);
  }
  this.lp = lp;
}

EpochBoardStream.prototype.createBoardStream = function (err) {
  var table = 'smf_boards';
  var tableMap = {
    name : 'name',
    description : 'description'
  }

  var smfMap = {
    ID_BOARD : 'board_id'
  }

  var rowStream = this.lp.createRowStream(null, table);
  var tr = through2.obj(function (row, enc, cb) {
    var obj = epochMap.remapObject(row, tableMap);
    var smfObject = epochMap.remapObject(row, smfMap);
    obj['smf'] = smfObject;
    this.push(obj);
    return cb();
  });
  boardStream = rowStream.pipe(tr);

  return boardStream;
}
