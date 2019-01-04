process.env.NODE_ENV = 'test';
const app = require('../server');
const Meetup = require('../routes/meetup');
const Question = require('../routes/questions');
const Comment = require('../routes/comments');

let chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('QUESTIONER TEST RESULTS \n ---------------------------',()=>{
    // describe('/GET /v1/api/comments',()=>{
    //     it('Should get all comments',()=>{
    //         chai.request(app).get('/v1/api/comments').end((err,res)=>{
    //             res.should.have.status(200)
    //             res.body.should.be.a('array');
    //         });
    //     });
    // });

    // describe('/GET /v1/api/users',()=>{
    //     it('Should get all users',()=>{
    //         chai.request(app).get('/v1/api/users').end((err,res)=>{
    //             res.should.have.status(200)
    //             res.body.should.be.a('array');
    //         });
    //     });
    // });
    // TEST GET MEETUP REQUEST
    describe('/GET /v1/api/meetups',()=>{
        it('Should get all meetups',()=>{
            chai.request(app).get('/v1/api/meetups').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        });
    });

    // TEST GET MEETUP BY ID
    describe('/GET /v1/api/meetups/:id',()=>{
        it('Should get a specific meetups',()=>{
            chai.request(app).get('/v1/api/meetups/1').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    });
    // TEST GET UPCOMMING MEETUPS
    describe('/GET /v1/api/meetups/up-comming',()=>{
        it('Should get a specific meetups',()=>{
            chai.request(app).get('/v1/api/meetups/up-comming').end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
        });
    });


    describe('/GET /v1/api/cuestions',()=>{
        it('Should get all questions',()=>{
            chai.request(app).get('/v1/api/questions').end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
            });
        });
    });


    describe('/POST /v1/api/meetups',()=>{
        it('Should post a meetup',()=>{
            let meetup = {
                id:1,
                createdOn:new Date(),
                location:"Telecom house",
                images:"/images/test-images.jpg",
                topic:"Andela open session",
                happeningOn:"13-01-2019",
                tags:['programming','talent development','bootcamp induction']
            }
            chai.request(app).post('/v1/api/meetups').send(meetup).end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                res.body.forEach(meetup => {
                    meetup.should.have.property('id').eql(meetup.id);
                    meetup.should.have.property('createdOn');
                    meetup.should.have.property('location');
                    meetup.should.have.property('images');
                    meetup.should.have.property('topic');
                    meetup.should.have.property('happeningOn');
                    meetup.should.have.property('tags');
                });
        
            });
        });
    });


    describe('/POST /v1/api/meetups/:id/questions',()=>{
        it('Should post a question',()=>{
            let question = {
                id:1,
                createdOn:new Date(),
                createdBy:1,
                meetup:1,
                title:"Andela open session",
                body:"Hello I am asking how does andela make money?",
                votes:0
            }
            chai.request(app).post('/v1/api/meetups/1/questions').send(question).end((err,res)=>{
                if(err) console.log(err);
                
                res.should.have.status(200)
                res.body.should.be.a('array');
                res.body.forEach(question => {
                    question.should.have.property('id').eql(question.id);
                    question.should.have.property('createdOn');
                    question.should.have.property('createdBy');
                    question.should.have.property('meetup');
                    question.should.have.property('title');
                    question.should.have.property('votes');
                });

            });

        });
    });
    // TEST RESERVE PLACE
    describe('/GET /v1/api/meetups/:id/rsvp',()=>{
        it('Should reserve place to meetup with id of 5',()=>{
            let reservation = {
                id:1,
                meetup:1,
                answer:"Yes"
            };
            chai.request(app).post('/v1/api/meetups/5/rsvp').send(reservation).end((err,res)=>{
                res.should.have.status(200);
            });
        });
    });
    // // // TEST VOTE QUESTION
    // describe('/GET /v1/api/questions/:id/upvote',()=>{
    //     it('Should increase questions votes',()=>{
    //         let question = {};
    //         chai.request(app).put('/v1/api/questions/2/upvote').send(question).end((err,res)=>{
    //             res.should.have.status(200);
    //         });
    //     });
    // });
    // // TEST VOTE QUESTION
    // describe('/GET /v1/api/questions/1/downvote',()=>{
    //     it('should decrease questions votes',()=>{
    //         let question = {};
    //         chai.request(app).put('/v1/api/questions/2/downvote').send(question).end((err,res)=>{
    //             res.should.have.status(200);
    //         });
    //     });
    // });
});