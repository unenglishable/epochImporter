var epochMap = require('./epochMap.js');
var through = require('through');

var EpochThreadStream = module.exports = function EpochThreadStream(lp) {
  if (!(this instanceof EpochThreadStream)) {
    return new EpochThreadStream(lp);
  }
  this.lp = lp;
}

EpochThreadStream.prototype.createThreadStream = function (err, oldBoardId, newBoardId) {
  var table = 'smf_topics';

  var smfMap = {
    ID_TOPIC : 'thread_id',
    ID_FIRST_MSG : 'post_id'
  }

  var rowStreamWhere = this.lp.createRowStreamWhere(null, table, { ID_BOARD : oldBoardId});
  var tr = through(function (row) {
    var obj = { board_id : newBoardId };
    var smfObject = epochMap.remapObject(row, smfMap);
    obj['smf'] = smfObject;
    this.queue(obj);
  });
  threadStream = rowStreamWhere.pipe(tr);

  //this.lp.end();

  return threadStream;
}
