var lolipop = require('../lolipop/lolipop');
var config = require('./config.json');
var lp = lolipop(config);

rowStream = lp.streamRows(null, 'smf_members');
rowStream.on('error', function (err) {
  console.log('Error');
})
.on('result', function (row) {
  console.log(row);
});

columnStream = lp.showColumns(null, 'smf_members', function (err, columns) {
  if (err) {
    console.log(err);
  }
  console.log(columns);
});

lp.end();
