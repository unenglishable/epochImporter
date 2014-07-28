var lolipop = require('../lolipop/lolipop');
var config = require('./config.json');
var lp = lolipop(config);
var table = 'smf_boards';
var level = require('level');
var db = level(process.argv[2], { valueEncoding : 'json' });
var dbWriteStream = db.createWriteStream();

var through = require('through');
var tr = through(write);

function write(row) {
  this.queue({
    key : row.ID_BOARD,
    value: row
  });
}

var rowStream = lp.createRowStream(null, table);

rowStream.pipe(tr).pipe(dbWriteStream);

lp.end();
