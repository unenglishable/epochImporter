var through = require('through');
var epochBoardStream = require('../epochBoardStream');
var lolipop = require('../../lolipop/lolipop');
var lpConfig = require('../config.json');
var lp = lolipop(lpConfig);

var ebs = epochBoardStream(lp);
var boardStream = ebs.createBoardStream();

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

boardStream.pipe(tr);
