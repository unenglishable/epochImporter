var through = require('through');
var epochThreadStream = require('../epochThreadStream');
var lpConfig = require('../config.json');

var ets = epochThreadStream(lpConfig);
var threadStream = ets.createThreadStream(null, 1, 0);

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

threadStream.pipe(tr);
