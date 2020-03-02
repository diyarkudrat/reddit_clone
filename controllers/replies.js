const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

module.exports = app => {
  // NEW REPLY
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        res.render("replies-new", { post, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // CREATE REPLY
  app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {

    // Turn reply into a comment object
    const reply = new Comment(req.body);
    reply.author = req.user._id
    // Lookup parent post
    Post.findById(req.params.postId)
        .then(post => {
            // find child comment
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // add reply
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                        console.log(comment)
                    ]);
                })
                .then(() => {
                    res.redirect(`/posts/${req.params.postId}`);
                })
                .catch(console.error);
            // save change to parent document
            return post.save();
        })
});
};