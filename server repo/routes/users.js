const fs = require('fs');
let users = [];

const user = fs.readFileSync('./data/users.json',{encoding:'utf8'});

users  = JSON.parse(user) || [];
const getUsers = (req, res) => res.json(users);

const login = (req,res) => {
    const user = users.find(user => (user.username === req.body.username || user.email === req.body.email) && (user.password === req.body.password));
    if(user){
        res.json(user);
    }
    else{
        res.json({
            status:404,
            erro:"Invalid username/password"
        });
    }
}

const getUserById = (req, res) => {
  const userById = users.find(user => parseInt(user.id) === parseInt(req.params.id));
  if (userById) {
    res.json(userById);
  } else {
    res.json({
      status: 404,
      error: 'The user with given id is not found',
    });
  }
};

const addUser = (req, res) => {
  let newuser = {
    id: users.length + 1 | 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othername: req.body.othername,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    registered: new Date(),
    isAdmin: false
  };
  users.push(newuser);
  fs.writeFileSync('./data/users.json',JSON.stringify(users,null,2));
  res.json(users);
};

const deleteUser = (req, res) => {
  const userToDelete = users.find(user => parseInt(user.id )=== parseInt(req.params.id));
  const userIndex = users.indexOf(userToDelete);

  // deleting user if found
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    fs.writeFileSync('./data/users.json',JSON.stringify(users,null,2));
    res.json(users);
  } else {
    return res.json({
      status: 404,
      error: 'The user you are trying to delete does not exist',
    });
  }
};

module.exports = {
  getUsers, getUserById, addUser, deleteUser,users,login
};
