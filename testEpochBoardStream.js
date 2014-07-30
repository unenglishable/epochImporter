var through = require('through');
var epochBoardStream = require('./epochBoardStream');
var lpConfig = require('./config.json');

var ebs = epochBoardStream(lpConfig);
var boardStream = ebs.createBoardStream();

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

boardStream.pipe(tr);
