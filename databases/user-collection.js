var mongoose = require('mongoose');
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
UserCollection = mongoose.model('User',UserSchema);
module.exports = UserCollection;