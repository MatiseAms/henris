const fs = require('fs');
const Table = require('cli-table');
const chalk = require('chalk');

function getSize(file) {
	var stats = fs.statSync(file);
	return stats.size;
}
function isEmpty(file) {
	if (getSize(file) > 1) {
		var stats = fs.statSync(file);
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

// instantiate
var table = new Table({
	head: [
		chalk.hex('#7329b1').bold(''),
		chalk.hex('#7329b1').bold('Empty'),
		chalk.hex('#7329b1').bold('Default'),
		chalk.hex('#7329b1').bold('Full')
	],
	colWidths: [20, 20, 20, 20]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
	[
		chalk.green.bold('Sass'),
		Math.ceil(getSize('test/css/sass/empty.css') / 1000) + 'kb',
		Math.ceil(getSize('test/css/sass/default.css') / 1000) + 'kb',
		Math.ceil(getSize('test/css/sass/full.css') / 1000) + 'kb'
	],
	[
		chalk.green.bold('Node-sass'),
		Math.ceil(getSize('test/css/node-sass/empty.css') / 1000) + 'kb',
		Math.ceil(getSize('test/css/node-sass/default.css') / 1000) + 'kb',
		Math.ceil(getSize('test/css/node-sass/full.css') / 1000) + 'kb'
	]
);

console.log('\n\n\t' + chalk.yellow.bold('Final size check') + '\n');
console.log(table.toString());
console.log('\n\n\t ' + chalk.green.bold('\u2713 All checks passed') + '\n');

try {
	isEmpty('test/css/sass/empty.css');
} catch (e) {
	throw new Error(e);
}

try {
	isBigger('test/css/sass/default.css', 'test/css/sass/full.css');
} catch (e) {
	throw new Error(e);
}
