const fs = require('fs');
let meetups = [];
let reservations = Array();

const meetup = fs.readFileSync('./data/meetups.json',{encoding:'utf8'});
const reservation = fs.readFileSync('./data/reservation.json',{encoding:'utf8'});
reservations = JSON.parse(reservation);

// const comment = fs.readFileSync('./data/comments.json',{encoding:'utf8'});

meetups  = JSON.parse(meetup) || [];
reservations = JSON.parse(reservation) || [];
const getMeetups = (req, res) => res.json(meetups);

const getUpcommingMeetups = (req, res) => {
  let now = new Date();
  now = now.getTime();
  const upComming = meetups.filter(meetup =>{
    let intDate = meetup.happeningOn.split('-');
    let date = new Date(parseInt(intDate[2]),parseInt(intDate[1]),parseInt(intDate[0]));
    if(date.getTime() > (new Date()).getTime()){
      return meetup;
    }

  });
  
  if (upComming) {
    res.json(upComming);
  } else {
    res.json({
      status: 404,
      error: 'No upcomming meetups',
    });
  }
};

const getMeetupById = (req, res) => {
  const meetupById = meetups.find(meetup => parseInt(meetup.id) === parseInt(req.params.id));
  if (meetupById) {
    res.json(meetupById);
  } else {
    res.json({
      status: 404,
      error: 'The meetup with given id is not found',
    });
  }
};

const addMeetup = (req, res) => {
  let newMeetup = {
    id: meetups.length + 1 | 1,
    createdOn: new Date(),
    images: 'fileName',
    location:req.body.location,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  meetups.push(newMeetup);
  fs.writeFileSync('./data/meetups.json',JSON.stringify(meetups,null,2));
  res.json(meetups);
};

const deleteMeetup = (req, res) => {
  const meetudToDelete = meetups.find(meetup => parseInt(meetup.id )=== parseInt(req.params.id));
  const meetupIndex = meetups.indexOf(meetudToDelete);

  // deleting meetup if found
  if (meetupIndex >= 0) {
    meetups.splice(meetupIndex, 1);
    fs.writeFileSync('./data/meetups.json',JSON.stringify(meetups,null,2));
    res.json(meetups);
  } else {
    return res.json({
      status: 404,
      error: 'The meetup you are trying to delete does not exist',
    });
  }
};

const attendMeetup = (req, res) => {
  const newReservation = {
	  id: reservations.length + 1,
	  meetup_id: req.params.id,
	  user_id: 1,
	  answer: req.body.answer,
  };
  reservations.push(newReservation);
  fs.writeFileSync('./data/reservation.json',JSON.stringify(reservations,null,2));
  return res.json(reservations);
};

module.exports = {
  getMeetups, getUpcommingMeetups, getMeetupById, addMeetup, deleteMeetup, attendMeetup,meetups,reservations
};
