const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
	},
});
const Article = mongoose.model("Article", articleSchema);

module.exports = {
	Article: Article,
};
