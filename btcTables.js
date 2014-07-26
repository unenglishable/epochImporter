var lolipop = require('../lolipop/lolipop');

lolipop.showTables(null, function (err, tables) {
  if (err) throw err;
  console.log(tables);
});
lolipop.end();
