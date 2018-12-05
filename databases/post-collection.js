var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mwibutsa",{ useNewUrlParser: true });

var PostSchema = new mongoose.Schema({
	title:{
		type:String
	},
	body:{
	type:String
},
	file:{
	type:String
},
createdOn:{
	type:Date,
	default:new Date()
}
});

var PostCollection = mongoose.model("Post",PostSchema);

module.exports = PostCollection;