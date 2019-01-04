const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const morgan =require('morgan');
const meetup = require('./routes/meetup');
const question = require('./routes/questions');
const user = require('./routes/users');
const comment = require('./routes/comments');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUpload());
app.use(session({
  secret:"_@1!9(9)6^%",
  resave:false,
  saveUninitialized:true,
  session:{secure:true}
}));
app.use(express.json());
app.use(express.static('data'));
app.use(morgan());
// meetup routes
app.get('/',meetup.getMeetups);
app.get('/v1/api/meetups/up-comming',meetup.getUpcommingMeetups);
app.get('/v1/api/meetups/:id',meetup.getMeetupById);
app.get('/v1/api/meetups',meetup.getMeetups);
app.delete('/v1/api/meetups/up-comming/:id',meetup.deleteMeetup);
app.delete('/v1/api/meetups/:id',meetup.deleteMeetup);
app.post('/v1/api/meetups/:id/rsvp',meetup.attendMeetup);
app.post('/v1/api/meetups/:id/questions',question.addQuestion);
app.post('/v1/api/meetups',meetup.addMeetup);

// question routes
app.get('/v1/api/questions/:id',question.getQuestionById);
app.get('/v1/api/questions',question.getQuestions);
app.put('/v1/api/questions/:id/upvote',question.upvoteQuestion);
app.put('/v1/api/questions/:id/downvote',question.downVoteQuestion);

// comments routes
app.get('/v1/api/comments/:id',comment.getCommentById);
app.get('/v1/api/comments',comment.getComments);
app.post('/v1/api/questions/:id/comments',comment.addComment);



// users routes
app.get('/v1/api/users/:id/questions/comments',comment.getCommentsByUserId);
app.get('/v1/api/users/:id',user.getUserById);
app.get('/v1/api/users',user.getUsers);
app.post('/v1/api/users/:id/questions',question.getQuestionsByUserId);
app.post('/v1/api/users/login',user.login);
app.post('/v1/api/users/sign-up',user.addUser);

app.listen(port);
module.exports = app;