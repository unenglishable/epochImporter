var lolipop = require('../lolipop/lolipop');
var epochMap = require('./epochMap.js');
var through = require('through');

var EpochPostStream = module.exports = function EpochPostStream(lpConfig) {
  if (!(this instanceof EpochPostStream)) {
    return new EpochPostStream(lpConfig);
  }
  this.lp = lolipop(lpConfig);
}

EpochPostStream.prototype.createPostStream = function (err, oldThreadId, newThreadId) {
  var table = 'smf_messages';
  var tableMap = {
    subject : 'title',
    body : 'body'
  }

  var smfMap = {
    ID_MSG : 'post_id'
  }

  var rowStreamWhere = this.lp.createRowStreamWhere(null, table, { ID_TOPIC : oldThreadId});
  var tr = through(function (row) {
    var obj = epochMap.remapObject(row, tableMap);
    // Handling for created_at
    obj['created_at'] = row.posterTime*1000;
    obj['thread_id'] = newThreadId;
    var smfObject = epochMap.remapObject(row, smfMap);
    obj['smf'] = smfObject;
    this.queue(obj);
  });
  postStream = rowStreamWhere.pipe(tr);

  this.lp.end();

  return postStream;
}
