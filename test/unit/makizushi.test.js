"use strict";

require("flow-remove-types/register");
const test = require("tap").test;
const path = require("path");
const Makizushi = require("../../src/services/makizushi");

test("Makizushi", (t) => {

	t.test("#createImage", async (t) => {
		var result = await Makizushi.getCreateImage("pin-l-s+ce0000@2x.png", path.join(__dirname,"..","..","static","images"));
		await t.test('check result', function (t) {
			t.equal(result, "pin-l-s+ce0000@2x.png");
			t.end();
		});
	});

	t.end();
});
