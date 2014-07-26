var lolipop = require('../lolipop/lolipop');

lolipop.showColumns(null, 'smf_boards', function (err, columns) {
  if (err) {
    console.log(err);
  }
  console.log(columns);
});
lolipop.end();
