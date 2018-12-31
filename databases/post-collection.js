var mongoose = require('mongoose');
mongoose.connect("mongodb://fmwibutsa:Mwibutsa6991@ds145704.mlab.com:45704/mwibutsa");

var PostSchema = new mongoose.Schema({
	title:{
		type:String
	},
	body:{
	type:String
},
	file:{
	type:String,
	default:''
},
createdOn:{
	type:Date,
	default:new Date()
},
user_id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"User",
	required:true
}
});

var PostCollection = mongoose.model("Post",PostSchema);

module.exports = PostCollection;