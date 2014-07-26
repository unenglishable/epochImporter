var lolipop = require('../lolipop/lolipop');
var config = require('./config.json');
lp = lolipop(config);

lp.showColumns(null, 'smf_boards', function (err, columns) {
  if (err) {
    console.log(err);
  }
  console.log(columns);
});
lp.end();
