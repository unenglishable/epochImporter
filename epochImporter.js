var through = require('through');
var epochBoardStream = require('./epochBoardStream');
var epochThreadStream = require('./epochThreadStream');
var epochPostStream = require('./epochPostStream');
var boards = require('../core/boards.js');
var posts = require('../core/posts.js');
var lpConfig = require('./config.json');

var ebs = epochBoardStream(lpConfig);
var boardStream = ebs.createBoardStream(null);

var boardStreamThrough = through(function (boardObject) {
  oldBoardId = boardObject.smf.board_id;

  // import to core and use callback to create a new thread stream
  boards.import(boardObject, function (newBoardId) {
    var ets = epochThreadStream(lpConfig);
    var threadStream = ets.createThreadStream(null, oldBoardId, newBoardId);

    var threadStreamThrough = through(function (threadObject) {
      oldThreadId = threadObject.smf.thread_id;

      // import to core and use callback to create a new post stream
      posts.import(threadObject, function (newThreadId) {
        var eps = epochPostStream(lpConfig);
        var postStream = eps.createPostStream(null, oldThreadId, newThreadId);

        var postStreamThrough = through(function (postObject) {
          posts.import(postObject);
        });
        postStream.pipe(postStreamThrough);
      });
      console.log('test: ');
      console.log(threadObject);
    });
    threadStream.pipe(threadStreamThrough);
  });
});

boardStream.pipe(boardStreamThrough);
