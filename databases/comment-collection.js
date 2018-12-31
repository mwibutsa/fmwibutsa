var mongoose = require('mongoose');
mongoose.connect("mongodb://fmwibutsa:Mwibutsa6991@ds145704.mlab.com:45704/mwibutsa");

var CommentSchema = new mongoose.Schema({
	comment:{
	type:String,
	required:['true',"Can not add an empty comment"]
},
createdOn:{
	type:Date,
	default:new Date()
},
post_id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"Post",
	required:true
},
user_id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"User",
	required:true,
	
}
});

var CommentCollection = mongoose.model("Comment",CommentSchema);

module.exports = CommentCollection;