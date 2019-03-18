"use strict";

let obj = {
	"😘": "emoji",
	"!": "character",
	"": "empty string",
	".": 404,
	"∰": "no...",
	"✪✪✪✪": "stop it..",
	"☝ஔ☔😱": "please"
}

console.log(obj["😘"]);
console.log(obj["!"]);
obj[""] = NaN;
obj["."] = obj.wwwwwwww;
console.log(obj["∰"]);
console.log(obj["✪✪✪✪"]);
console.log(obj["☝ஔ☔😱"] + " " + obj["☝ஔ☔😱"]);