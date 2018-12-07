const UserCollection = require('../databases/user-collection');
module.exports = (req,res,next)=>{
    UserCollection.findById(req.session.userId,(error,user)=>{
        if(error || !user){
            return  res.redirect('/account/login');
        }
        next();
    })
}