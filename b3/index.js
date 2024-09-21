async function getUserId() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("userId_1");
    }, 0);
  });
}

function getPostId(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${userId}: postId_1`);
    }, 0);
  });
}

function getComment(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment = { id: postId, comment: "Comment" };
      resolve(comment);
    }, 0);
  });
}

async function asdf() {
  try {
    let userId = await getUserId();
    const postId = await getPostId(userId);
    const comment = await getComment(postId);
    console.log(comment);
  } catch (err) {
    console.log(err);
  }
}

asdf();
