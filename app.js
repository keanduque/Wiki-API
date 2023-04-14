/**
 * Title : Wiki API
 * Author : Kean Duque
 */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const ConnectDB = require("./db");
const article = require("./controllers/articles");
const Article = require("./models/Article").Article;

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); // postman body raw - JSON

// Connect to MongoDB
ConnectDB()
	.then(() => {
		app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
	})
	.catch((err) => console.log(err));

///////////////////// REQUEST ALL ARTICLE /////////////////////
app.route("/articles")
	.get(async (req, res) => {
		await article.readArticle(res);
	})
	.post(async (req, res) => {
		const articles = req.body;

		await article.createArticle(articles, res);
	})
	.delete(async (req, res) => {
		await article.deleteArticle(res);
	});

///////////////////// REQUEST SPECIFIC ARTICLE /////////////////////
app.route("/articles/:articleId")
	.get(async (req, res) => {
		const _id = req.params.articleId;

		await article.readOneArticle(_id, res);
	})
	.put(async (req, res) => {
		const _id = req.params.articleId;
		const update = {
			title: req.body.title,
			content: req.body.content,
		};
		await article.updateArticle(_id, update, res);
	})
	.patch(async (req, res) => {
		const _id = req.params.articleId;

		const update = {
			title: req.body.title,
			content: req.body.content,
		};

		await article.updatePatchArticle(_id, update, res);
	})
	.delete(async (req, res) => {
		const _id = req.params.articleId;

		await article.deleteOneArticle(_id, res);
	});
