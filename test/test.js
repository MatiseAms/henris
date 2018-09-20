var fs = require("fs");

function getSize(file) {
	var stats = fs.statSync(file);
	if (stats.size > 0) {
		throw `Extend file is not empty | filesize: ${stats.size}`;
	}
}

function isBigger(file1, file2) {
	var stats1 = fs.statSync(file1);
	var stats2 = fs.statSync(file2);
	if (stats1.size >= stats2.size) {
		throw `Full version is not larger than default | filesize: full (${
			stats1.size
		}), default: (${stats2.size})`;
	}
}

try {
	getSize("test/css/empty.css");
} catch (e) {
	throw new Error(e);
}

try {
	isBigger("test/css/default.css", "test/css/full.css");
} catch (e) {
	throw new Error(e);
}
