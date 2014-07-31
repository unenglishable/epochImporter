var through = require('through');
var epochBoardStream = require('./epochBoardStream');
var epochThreadStream = require('./epochThreadStream');
var epochPostStream = require('./epochPostStream');
var boards = require('../core/boards.js');
var posts = require('../core/posts.js');
var lolipop = require('../lolipop/lolipop');
var lpConfig = require('./config.json');
var lp = lolipop(lpConfig);

var ebs = epochBoardStream(lp);
var boardStream = ebs.createBoardStream(null);

var boardStreamThrough = through(function (boardObject) {
  // import to core and use callback to create a new thread stream
  boards.import(boardObject, function (err, newBoard) {
    if (err) {
      error(err);
    }
    var oldBoardId = newBoard.smf.board_id;
    console.log('boardId: '+oldBoardId);
    var newBoardId = newBoard.id;
    var ets = epochThreadStream(lp);
    var threadStream = ets.createThreadStream(null, oldBoardId, newBoardId);

    var threadStreamThrough = through(function (threadObject) {
      // import to core and use callback to create a new post stream
      posts.import(threadObject, function (err, newThread) {
        if (err) {
          error(err);
        }
        var oldThreadId = newThread.smf.thread_id;
        console.log('threadId: '+oldThreadId);
        var newThreadId = newThread.thread_id;
        var eps = epochPostStream(lp);
        var postStream = eps.createPostStream(null, oldThreadId, newThreadId);

        var postStreamThrough = through(function (postObject) {
          posts.import(postObject, function (err, newPost) {
            if (err) {
              error(err);
            }
            console.log('postId: '+newPost.smf.post_id);
          });
        });
        postStream.pipe(postStreamThrough);
      });
    });
    threadStream.pipe(threadStreamThrough);
  });
});

boardStream.pipe(boardStreamThrough);
