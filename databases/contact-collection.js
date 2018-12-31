var mongoose = require('mongoose');
mongoose.connect("mongodb://fmwibutsa:Mwibutsa6991@ds145704.mlab.com:45704/mwibutsa");

var ContactSchema = new mongoose.Schema({
	name:{
		type:String
	},
	email:{
	type:String
},
	message:{
	type:String,
	default:''
},
createdOn:{
	type:Date,
	default:new Date()
},
user_id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"User"
}
});

var ContactCollection = mongoose.model("Contact",ContactSchema);

module.exports = ContactCollection;