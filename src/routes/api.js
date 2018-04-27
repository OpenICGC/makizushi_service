// @flow
"use strict";

const Router = require("express").Router;
const MakizushiService = require("../services/makizushi.js");
const SendFileService = require("../services/send_file.js");
const path = require("path");

module.exports = () => {

	const api = new Router();

	api.get("/:image", async (req, res, next) => {
		console.log("Get");
		const image = req.params.image;
		const filePath = path.join(__dirname,"..","..","static","images");
		const response = await MakizushiService.getCreateImage(image, filePath);
		SendFileService.sendFile(res, filePath, response, next);
	});

	return api;

};
