var through = require('through');
var epochPostStream = require('./epochPostStream');
var lpConfig = require('./config.json');

var eps = epochPostStream(lpConfig);
var postStream = eps.createPostStream(null, 5, 0);

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

postStream.pipe(tr);
