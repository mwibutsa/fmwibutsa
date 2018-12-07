var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect("mongodb://localhost:27017/mwibutsa",{ useNewUrlParser: true } )
var UserSchema = new mongoose.Schema({
	firstname:{
		type:String,
		required:[true,"Please fill the firstname field"]
	},
	lastname:{
		type:String,
		required:[true,"Please fill the lastname field"]
	},
	email:{
		type:String,
		required:[true,"Please fill the email field"]
	},
	password:{
		type:String,
		required:[true,"Please fill the password field"]
	}


});
UserSchema.pre('save',function(next){
	const user = this;

	// hashing password

	bcrypt.hash(user.password,10,function(error,encryptedPassword){
	 user.password = encryptedPassword;
	 next();
	});
 });
UserCollection = mongoose.model('User',UserSchema);
module.exports = UserCollection;