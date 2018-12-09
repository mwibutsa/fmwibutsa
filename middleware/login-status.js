module.exports = ((req,res,next)=>{
    if(req.session.userId){
      res.locals.loggedIn = true;
    }
    else{
      res.locals.loggedIn = false;
    }
    next();
  });
  