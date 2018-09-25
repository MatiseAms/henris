const fs = require('fs');
const nodeSass = require('node-sass');
const Sass = require('sass');
const Table = require('cli-table');
const chalk = require('chalk');
const ora = require('ora');

let files = ['default', 'empty', 'full', 'output'];

function getSize(file) {
	let stats = fs.statSync(file);
	return stats.size;
}
console.log('\n\n\t' + chalk.yellow.bold('Check Sass') + '\n');

var table = new Table({
	head: ['File', 'Type', 'Duration', 'Size'],
	colWidths: [20, 20, 20, 20]
});
console.log(table.toString());

// const spinner = ora('Loading unicorns').start();
// setTimeout(() => {
// 	spinner.color = 'yellow';
// 	spinner.text = 'Loading rainbows';
// }, 1000);

var tableSass = new Table({
	head: ['file', 'type', 'duration', 'size'],
	colWidths: [20, 20, 20, 20]
});

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
