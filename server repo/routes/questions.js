const fs = require('fs');
let questions = [];
const question = fs.readFileSync('./data/questions.json',{encoding:'utf8'});
const getQuestions = (req, res) => res.json(questions);
questions = JSON.parse(question);
const addQuestion = (req, res) => {
  const newQuestion = {
    id:questions.length + 1,
    createdOn: new Date(),
    createdBy: 1,
    meetup: req.params.id,
    title: req.body.title,
    body: req.body.question,
    votes: 0,
  };
  questions.push(newQuestion);
  fs.writeFileSync('./data/questions.json',JSON.stringify(questions,null,2));
  res.json(questions);
};

const upvoteQuestion = (req, res) => {
  questions = questions.filter((question) => {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes += 1;
    }
    return question;
  });
  fs.writeFileSync('./data/questions.json',JSON.stringify(questions,null,2));
  res.json(questions);
};

const downVoteQuestion = (req, res) => {
  questions = questions.filter((question) => {
    if (parseInt(question.id) === parseInt(req.params.id)) {
      question.votes -= 1;
    }
    return question;
  });
  fs.writeFileSync('./data/questions.json',JSON.stringify(questions,null,2));
  res.json(questions);
};

const getQuestionById = (req, res) => {
  const questionById = questions.find(question =>parseInt(question.id) === parseInt(req.params.id));
  if (questionById) {
    res.json(questionById);
  } else {
    res.json({
      status: 404,
      error: 'The question with given id can not be found',
    });
  }
};

const getQuestionsByMeetupId = (req, res) => {
  const meetupQuestions = questions.find(question => parseInt(question.meetup) === parseInt(req.params.id));
  if (meetupQuestions) {
    res.json(meetupQuestions);
  } else {
    res.json({
      status: 404,
      error: 'No questions asked on this meetup',
    });
  }
};
const getQuestionsByUserId = (req, res) => {
  const questionByUserId = questions.find(question => parseInt(question.user) === parseInt(req.params.id));
  if (questionByUserId) {
    res.json(questionByUserId);
  } else {
    res.json({
      status: 404,
      error: 'You have not asked any question',
    });
  }
};

module.exports = {
  getQuestions, addQuestion, getQuestionById, upvoteQuestion, downVoteQuestion, getQuestionsByMeetupId, getQuestionsByUserId,questions
};
