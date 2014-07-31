var through = require('through');
var epochPostStream = require('../epochPostStream');
var lolipop = require('../../lolipop/lolipop');
var lpConfig = require('../config.json');
var lp = lolipop(lpConfig);

var eps = epochPostStream(lp);
var postStream = eps.createPostStream(null, 5, 0);

var tr = through(function (data) {
  console.log('test: ');
  console.log(data);
});

postStream.pipe(tr);
