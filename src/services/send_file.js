// @flow
"use strict";

class SendFileService {

	static sendFile(res: Object, path: string, file: string, next: Function) {

		const options = {
			root: path,
			dotfiles: "deny",
			headers: {
				"x-timestamp": Date.now(),
				"x-sent": true
			}
		};
		res.sendFile(file, options, function (err) {
			if (err) {
				next(err);
			} else {
				console.log('Sent:', file);
			}
		});
	}
}

module.exports = SendFileService;
