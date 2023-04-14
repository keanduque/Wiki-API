const Article = require("../models/Article").Article;
const mongoose = require("mongoose");

const createArticle = async (article, res) => {
	return await new Article(article)
		.save()
		.then((articles) => {
			console.log("Successfully created article");
			res.status(200).json(articles);
		})
		.catch(() => {
			res.status(500).json({
				error: "Could not crate new article",
			});
		});
};

const readArticle = async (res) => {
	return await Article.find({})
		.then((articles) => {
			res.status(200).json(articles);
		})
		.catch((err) => {
			res.status(500).json({
				error: "Could not fetch the articles",
			});
		});
};

const readOneArticle = async (_id, res) => {
	if (mongoose.isValidObjectId(_id))
		return await Article.findOne({ _id: _id })
			.then((article) => {
				console.log("Successfully get the article");
				res.status(200).json(article);
			})
			.catch(() => {
				res.status(500).json({
					error: "Could not get Article",
				});
			});
};

const updateArticle = async (id, update, res) => {
	return await Article.findOneAndUpdate(
		{ _id: id },
		{ $set: update },
		{ overwrite: true }
	)
		.then((article) => {
			console.log("Successfully updated the article");
			res.status(200).json(article);
		})
		.catch(() => {
			res.status(500).json({
				error: "Could not update Article",
			});
		});
};

const updatePatchArticle = async (id, update, res) => {
	return await Article.updateOne({ _id: id }, { $set: update })
		.then((article) => {
			console.log("Successfully update part of an article");
			res.status(200).json(article);
		})
		.catch(() => {
			res.status(500).json({
				error: "Could not update part of an Article",
			});
		});
};

const deleteArticle = async (res) => {
	return await Article.deleteMany({})
		.then((articles) => {
			console.log("Successfully Deleted all Articles");
			res.status(200).json(articles);
		})
		.catch(() => {
			res.status(500).json({
				error: "Could not deleted Articles",
			});
		});
};

const deleteOneArticle = async (id, res) => {
	return await Article.deleteOne({ _id: id })
		.then((articles) => {
			console.log("Successfully Deleted the Article");
			res.status(200).json(articles);
		})
		.catch(() => {
			res.status(500).json({
				error: "Could not deleted the Article",
			});
		});
};

module.exports = {
	createArticle,
	readArticle,
	readOneArticle,
	updateArticle,
	updatePatchArticle,
	deleteArticle,
	deleteOneArticle,
	Article: Article,
};
