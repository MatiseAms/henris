const fs = require('fs');
const path = require('path');
const flatten = require('flat');
const chalk = require('chalk');
const functions = require('./css-functions.js');
var Table = require('cli-table');

let delimiter = '-',
	sourceFolder = 'data/',
	distFolder = 'src/scss/';

let fileTypes = [
	{
		type: 'scss',
		dest: distFolder + 'settings',
		varPattern: '${{var}}: {{value}} !default; //',
		listPatternParent: '${{var}}: (\n{{list}}\n) !default; //',
		listSubPatternParent: '\t"{{var}}": (\n{{list}}\n\t) //',
		listPattern: '\t"{{var}}": {{value}}'
	}
];

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};
// css option
// {
// 	type: 'css',
// 	dest: distFolder + 'css/settings',
// 	varPattern: '--{{var}}: {{value}};',
// 	listPatternParent: '',
// 	listPattern: ''
// }

/**
 * Get all setting files from /data
 */
function getFiles(dir, files_) {
	files_ = files_ || [];
	var files = fs.readdirSync(dir);
	for (var i in files) {
		if (files[i].split('.')[files[i].split('.').length - 1] === 'json') {
			//	console.log(files[i]);
			var name = dir + '/' + files[i];
			if (fs.statSync(name).isDirectory()) {
				getFiles(name, files_);
			} else {
				files_.push(name);
			}
		}
	}
	//	console.log(files_);
	return files_;
}

// Store the used data before compiling;
let stored = {};
getFiles(sourceFolder).forEach((file) => {
	//	let fileName = file.split('/')[file.split('/').length - 1].replace('.json', '');
	Object.assign(stored, JSON.parse(fs.readFileSync(file, 'utf8')));
});

function removeKeys(value) {
	return value.replace('-0-', '-');
}

// Do functions when necessary;
function doFunction(value) {
	let thefunc = value.replace('{{', '').replace('}}', '');
	let func = thefunc.split('(')[0];
	let parameters = value.replace(/(^.*\(|\).*$)/g, '');
	let newvalue;
	if (typeof functions[func] === 'function') {
		newvalue = functions[func](stored, parameters);
	} else {
		newvalue = func + '(' + parameters + ')';
	}
	return newvalue;
}

// Do functions when necessary;
function makeList(value) {
	let newvalue = value.replace('[[', '').replace(']]', '');
	return newvalue;
}

function stringValue(value) {
	if (typeof value == 'string') {
		let quotes = true;
		let noquotes = ['normal', 'regular', 'lowercase', 'uppercase', 'none', '0'];
		if (
			value.indexOf('px') > -1 ||
			value.indexOf('ch') > -1 ||
			value.indexOf('rem') > -1 ||
			value.indexOf('%') > -1
		) {
			quotes = false;
		}
		if (value.indexOf('(') > -1 && value.indexOf(')') > -1) {
			quotes = false;
		}
		if (value.charAt(0) === '#') {
			quotes = false;
		}
		if (noquotes.includes(value)) {
			quotes = false;
		}
		if (parseFloat(value)) {
			quotes = false;
		}
		// Do Functions
		if (value.indexOf('{{') > -1) {
			value = stringValue(doFunction(value));
		}
		// makeList
		if (value) {
			if (value.indexOf('[[') > -1) {
				value = makeList(value);
			}
		}
		if (quotes) {
			return "'" + value + "'";
		} else {
			return value;
		}
	} else {
		return value;
	}
}

function objToStyle(file, type) {
	let variable;
	let newFile = [];

	let data = flatten(file, {
		delimiter: delimiter
	});
	let listData = flatten(file, {
		delimiter: delimiter,
		safe: true
	});

	// Do the variables
	Object.keys(data).forEach((key) => {
		if (!functions.isNumber(key.split('-')[key.split('-').length - 1])) {
			variable = type.varPattern
				.replace('{{var}}', removeKeys(key.toLowerCase()))
				.replace('{{value}}', stringValue(data[key]));
			newFile.push(removeKeys(variable));
		}
	});

	// Do the lists
	function stringify(object, iteration, inObjectList = false) {
		let list = [];

		Object.keys(object).forEach((key) => {
			if (typeof object[key][0] === 'object') {
				if (iteration > 0) {
					list.push(
						type.listSubPatternParent
							.replace('{{var}}', removeKeys(key.toLowerCase()))
							.replace(
								'{{list}}',
								stringify(object[key][0], iteration + 1, true)
							)
					);
				} else {
					list.push(
						type.listPatternParent
							.replace('{{var}}', removeKeys(key.toLowerCase()))
							.replace(
								'{{list}}',
								stringify(object[key][0], iteration + 1, true)
							)
					);
				}
			} else if (
				Object.prototype.toString.call(object[key]) === '[object Array]'
			) {
				list.push(
					type.listPatternParent
						.replace('{{var}}', removeKeys(key.toLowerCase()))
						.replace('{{list}}', '"' + object[key].join('", \r\n"') + '"')
				);
			} else if (inObjectList) {
				list.push(
					type.listPattern
						.replace('{{var}}', key)
						.replace('{{value}}', stringValue(object[key]))
				);
			}
		});
		return list.join(', \r\n');
	}

	newFile.push(stringify(listData, 0));

	return newFile.join('\r\n');
}

/**
 * Define the folder and get the files
 */
function makeDirs() {
	fileTypes.forEach((type) => {
		const sep = path.sep;
		const initDir = path.isAbsolute(type.dest) ? sep : '';
		type.dest.split(sep).reduce((parentDir, childDir) => {
			const curDir = path.resolve(parentDir, childDir);
			if (!fs.existsSync(curDir)) {
				fs.mkdirSync(curDir);
			}
			return curDir;
		}, initDir);
	});
}
makeDirs();

function createImport(files) {
	let code = '';
	let codes = [];
	files.forEach(function(file) {
		code = code + '@import "' + file + '";\n';
		codes.push(
			'\t' + chalk.magenta.bold('@import ') + "'" + chalk.green(file) + "';\n"
		);
	});
	console.log('\n\n\t' + chalk.yellow.bold('Create @imports') + '\n');

	console.log(codes.join(''));

	fileTypes.forEach((type) => {
		fs.writeFileSync(type.dest + '/_index.' + type.type, code, function(err) {
			console.log('woops, something went wrong!' + err);
		});
	});
}

/**
 * Convert all files
 */

let settingFiles = [];
let i = 0;
var table = new Table({
	head: ['file', 'input', 'to', 'output'],
	colWidths: [20, 25, 10, 25]
});
console.log('\n\n\t' + chalk.yellow.bold('Convert json data to Sass') + '\n');
console.log(table.toString());
getFiles(sourceFolder).forEach((file) => {
	i++;

	let fileName = file
		.split('/')
		[file.split('/').length - 1].replace('.json', '');
	if (fileName.charAt(0) !== '_') {
		fileTypes.forEach((type) => {
			// Write New Files
			let compiled = objToStyle(
				JSON.parse(fs.readFileSync(file, 'utf8')),
				type
			);

			// Fix for less lists;
			compiled = compiled.replaceAll(';,', ';');
			var table = new Table({
				head: false,
				colWidths: [20, 25, 10, 25]
			});
			table.push([
				chalk.green.bold(fileName),
				file.split('/')[file.split('/').length - 1],
				chalk.green('\u2192 ' + type.type),
				fileName + '.' + type.type
			]);
			console.log(table.toString());

			fs.writeFileSync(
				type.dest + '/_' + fileName + '.' + type.type,
				compiled,
				function(err) {
					console.log('woops, something went wrong!' + err);
				}
			);
		});
		settingFiles.push(fileName);
		if (i === getFiles(sourceFolder).length) {
			createImport(settingFiles);
		}
	}
});
