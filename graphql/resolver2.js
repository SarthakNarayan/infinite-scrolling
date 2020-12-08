const comments = require("../datagen");

const Query = {
  moreComments: (_, { cursor, limit }) => {
    const cursorIndex = !cursor
      ? 0
      : comments.findIndex((comment) => comment.id === cursor) + 1;

    const sliceOfComments = comments.slice(cursorIndex, cursorIndex + limit);
    const lastCursor = sliceOfComments[sliceOfComments.length - 1];
    let lastCursorId = 0;
    if (lastCursor !== undefined) lastCursorId = lastCursor.id;
    else lastCursorId = "end";

    return {
      cursor: lastCursorId,
      comments: sliceOfComments,
    };
  },
};
module.exports = { Query };
