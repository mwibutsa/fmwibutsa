var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mwibutsa",{ useNewUrlParser: true });

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