var lolipop = require('../lolipop/lolipop');
var config = require('./config.json');
var lp = lolipop(config);
var table = process.argv[2];
//var map = require(process.argv[3]); // some json file describing the map

var through = require('through');
var tr = through(write);

// extract fields
// can use a map here on some object
// to tell how fields need to be mapped
function write(row) {
  console.log(row);
}

var rowStream = lp.createRowStream(null, table);

rowStream.pipe(tr).pipe(process.stdout); // can be piped to some leveldb handler

lp.end();
