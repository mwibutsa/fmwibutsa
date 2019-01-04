const fs = require('fs');
let comments = [];
const comment = fs.readFileSync('./data/comments.json',{encoding:'utf8'});
const getComments = (req, res) => res.json(comments);
comments = JSON.parse(comment);
const addComment = (req, res) => {
  const newComment = {
    id:comments.length + 1,
    createdOn: new Date(),
    createdBy: 1,
    question: req.params.id,
    body: req.body.comment
  };
  comments.push(newComment);
  fs.writeFileSync('./data/comments.json',JSON.stringify(comments,null,2));
  res.json(comments);
};




const getCommentById = (req, res) => {
  const commentById = comments.find(comment =>parseInt(comment.id) === parseInt(req.params.id));
  if (commentById) {
    res.json(commentById);
  } else {
    res.json({
      status: 404,
      error: 'The comment with given id can not be found',
    });
  }
};

const getCommentsByQuestionId = (req, res) => {
  const questionComments = comments.find(comment => parseInt(comment.question) === parseInt(req.params.id));
  if (questionComments) {
    res.json(questionComments);
  } else {
    res.json({
      status: 404,
      error: 'No comments asked on this meetup',
    });
  }
};
const getCommentsByUserId = (req, res) => {
  const commentByUserId = comments.find(comment => parseInt(comment.user) === parseInt(req.params.id));
  if (commentByUserId) {
    res.json(commentByUserId);
  } else {
    res.json({
      status: 404,
      error: 'You have not asked any comment',
    });
  }
};

module.exports = {
  getComments, addComment, getCommentById, getCommentsByQuestionId, getCommentsByUserId,comments
};
