var through = require('through');
var epochThreadStream = require('../epochThreadStream');
var lolipop = require('../../lolipop/lolipop');
var lpConfig = require('../config.json');
var lp = lolipop(lpConfig);

var ets = epochThreadStream(lp);
var threadStream = ets.createThreadStream(null, 86, 0);

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

threadStream.pipe(tr);
