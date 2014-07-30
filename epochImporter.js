var through = require('through');
var epochBoardStream = require('./epochBoardStream');
var epochThreadStream = require('./epochThreadStream');
var lpConfig = require('./config.json');

var ebs = epochBoardStream(lpConfig);
var boardStream = ebs.createBoardStream(null);

var boardStreamThrough = through(function (boardObject) {
  /*
  oldBoardId = boardObject.smf.board_id;

  // import to core and use callback to create a new thread stream
  importBoardMethodWithCallback(data, function (newBoardId) {
    var ets = epochThreadStream(lpConfig);
    var threadStream = ets.createThreadStream(null, oldBoardId, newBoardId);

    var threadStreamThrough = through(function (threadObject) {
      oldThreadId = threadObject.smf.thread_id;

      // import to core and use callback to create a new post stream
      importThreadMethodWithCallback(data, function (newThreadId) {
        var eps = epochPostStream(lpConfig);
        var postStream = eps.createPostStream(null, oldThreadId, newThreadId);

        var postStreamThrough = through(function (postObject) {
          importPostMethodWithCallback(data, function (newPostId) {
            // do nothing? lol.
          });
        });
        postStream.pipe(postStreamThrough);
      });
    });
    threadStream.pipe(threadStreamThrough);
  });
  */
  console.log('test: ');
  console.log(boardObject);
});

boardStream.pipe(boardStreamThrough);
