const fs = require('fs');
const nodeSass = require('node-sass');
const Table = require('cli-table');
const chalk = require('chalk');

let files = ['default', 'empty', 'full', 'output'];

function getSize(file) {
	let stats = fs.statSync(file);
	return stats.size;
}

// Start with the intro
console.log('\n\n\t' + chalk.yellow.bold('Check Node-sass') + '\n');

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

// Initiate Node Sass generation.

// The loader:

// Create the
files.forEach(function(file) {
	nodeSass.render(
		{
			file: 'test/scss/' + file + '.scss'
		},
		function(error, result) {
			processFile(error, result, file, 'node-sass');
		}
	);
});

function processFile(error, result, file, dir) {
	if (!error) {
		// No errors during the compilation, write this result on the disk
		fs.writeFile('test/css/' + dir + '/' + file + '.css', result.css, function(
			err
		) {
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
					chalk.green.bold(file + '.css'),
					dir,
					time,
					Math.ceil(getSize('test/css/' + dir + '/' + file + '.css') / 1000) +
						'kb'
				]);
				console.log(table.toString());
			} else {
				console.log(err);
			}
		});
	} else {
		console.log(error);
	}
}
