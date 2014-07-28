var lolipop = require('../lolipop/lolipop');
var config = require('./config.json');
var lp = lolipop(config);
var table = 'smf_topics';
var level = require('level');
var db = level(process.argv[2], { valueEncoding : 'json' });
var dbWriteStream = db.createWriteStream();

var through = require('through');
var tr = through(write);

// extract fields
// can use a map here on some object
// to tell how fields need to be mapped
function write(row) {
  this.queue({
    key : row.ID_BOARD+'!'+row.ID_TOPIC,
    value: row
  });
}

var rowStream = lp.createRowStream(null, table);

rowStream.pipe(tr).pipe(dbWriteStream);//dbWriteStream); // can be piped to some leveldb handler

lp.end();
