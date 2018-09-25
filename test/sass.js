const fs = require('fs');
const Sass = require('sass');
const Table = require('cli-table');
const chalk = require('chalk');

let files = ['default', 'empty', 'full', 'output'];

function getSize(file) {
	let stats = fs.statSync(file);
	return stats.size;
}

// Start with the intro
console.log('\n\n\t' + chalk.yellow.bold('Check Sass') + '\n');

// Set a header for the table
var table = new Table({
	head: [
		chalk.hex('#7329b1').bold('File'),
		chalk.hex('#7329b1').bold('Type'),
		chalk.hex('#7329b1').bold('Duration'),
		chalk.hex('#7329b1').bold('Size')
	],
	colWidths: [20, 20, 20, 20]
});
console.log(table.toString());

/// Do that Sasss

let sassFiles = [];

files.forEach(function(file) {
	sassFiles.push(
		Sass.renderSync({
			file: 'test/scss/' + file + '.scss'
		})
	);
});

sassFiles.forEach(function(result) {
	let filePath = result.stats.entry.split('/');
	let fileName = filePath[filePath.length - 1].replace('.scss', '.css');

	fs.writeFile('test/css/sass/' + fileName, result.css, function(err) {
		if (!err) {
			// instantiate
			var table = new Table({
				head: false,
				colWidths: [20, 20, 20, 20]
			});
			var time = Math.round(result.stats.duration / 10) + 'ms';
			if (result.stats.duration > 9999) {
				time = Math.round(result.stats.duration / 100) / 100 + 's';
			}

			table.push([
				chalk.green.bold(fileName),
				'sass',
				time,
				Math.ceil(getSize('test/css/sass/' + fileName) / 1000) + 'kb'
			]);
			console.log(table.toString());
		} else {
			console.log(err);
		}
	});
});
