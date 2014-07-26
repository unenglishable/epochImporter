var lolipop = require('../lolipop/lolipop');
//var lolipop = lolipop();

rowStream = lolipop.streamRows(null, 'smf_members');
rowStream.on('error', function (err) {
  console.log('Error');
})
.on('result', function (row) {
  console.log(row);
});

columnStream = lolipop.showColumns(null, 'smf_members', function (err, columns) {
  if (err) {
    console.log(err);
  }
  console.log(columns);
});

lolipop.end(function () {
  console.log('oh noes!');
});
