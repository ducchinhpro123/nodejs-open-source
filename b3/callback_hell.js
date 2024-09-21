function getUserId(fn) {
  setTimeout(() => {
    fn("userId_1");
  }, 0);
}

function getPostId(userId, fn) {
  setTimeout(() => {
    fn(`${userId}: postId_1`);
  }, 0);
}

function getComment(postId, fn) {
  let comment = "";
  setTimeout(() => {
    comment = { id: postId, comment: "Comment" };
    fn(comment);
    return comment;
  }, 0);
  return comment;
}

// call-back hell
getUserId(function(userId) {
  getPostId(userId, function(postId) {
    getComment(postId, function(data) {
      console.log(data);
    })
  })
});


//let promise = new Promise((resolve, reject) => {
//  getUserId(resolve);
//});
//
//promise.then((data) => {
//  getPostId(data, function(postId) {
//    return postId;
//  });
//}).then((postId) => {
//  console.log(getComment(postId));
//}).catch((error) => {
//  console.log(error);
//})

