// @flow
"use strict";
const makizushi = require('@mapbox/makizushi');
const fs = require('fs');
const path = require("path");

class MakizushiService {

	static getCreateImage(image: string, filePath: string): Promise<string> {

		return new Promise((resolve, reject) => {
			const regex: RegExp = /(\w+)\-(s|m|l){1}(\-\w+)?(\+[A-Fa-f0-9]{6}|\+[A-Fa-f0-9]{3})?(@2x)?.png/g;
			var imageParse = regex.exec(image);
			console.log(imageParse);
			if(null === imageParse){
				reject("image not valid");
			}
			var base = "";
			if(!imageParse[1]){
				reject("base required");
			}else{
				base = imageParse[1]; 
			}
			var size = "";
			if(!imageParse[2]){
				reject("size required");
			}else{
				size = imageParse[2]; 
			}
			var symbol = '';
			if(imageParse[3]){
				symbol = imageParse[3].substring(1);
			}
			var tint = 'ccc';
			if (imageParse[4]) {
				tint = imageParse[4].substring(1);
			}
			var retina = ("@2x" === imageParse[5]) ? true: false;

			makizushi({
					base: base,
					size: size,
					tint: tint,
					symbol: symbol,
					retina: retina
				}, function(err, buf){
					if (err) {
						reject(err);
					}else{
						fs.writeFileSync(path.join(filePath, image), buf);
						resolve(image);
					}
				});
		});
	}
}

module.exports = MakizushiService;
