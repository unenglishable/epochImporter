var level = require('level');
var db = level(process.argv[2], { valueEncoding : 'json'});
var dbReadStream = db.createReadStream({
    start: process.argv[3],
    end: process.argv[4]
});

dbReadStream.on('data', function (data) {
  console.log('key: ', data.key);
  console.log('value: ', data.value);
});
