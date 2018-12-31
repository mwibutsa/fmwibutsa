var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect("mongodb://fmwibutsa:Mwibutsa6991@ds145704.mlab.com:45704/mwibutsa");
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
		required:[true,"Please fill the email field"],
		unique:true
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