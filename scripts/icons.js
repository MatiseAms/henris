///
// imports
///
const columnify = require("columnify");
const fs = require("fs");
const path = require("path");
const webfontsGenerator = require("webfonts-generator");
const handlebars = require("handlebars");
const _ = require("underscore");

//
// Arguments
//
let customArgs = {
	src: process.argv[2] || "icons",
	dist: process.argv[3] || "fonts"
};
///
// Find folders
///

// Filters
const isDirectory = source => fs.lstatSync(source).isDirectory();
const isFile = source => fs.lstatSync(source).isFile();
const isSvg = name => name.split(".")[name.split(".").length - 1] === "svg";
const isEnabled = name =>
	name.split("/")[name.split("/").length - 1].charAt(0) !== "_";

// Get FS functions
const getDirectories = source =>
	fs
		.readdirSync(source)
		.map(name => path.join(source, name))
		.filter(isDirectory)
		.filter(isEnabled);

const getFiles = source =>
	fs
		.readdirSync(source)
		.map(name => path.join(source, name))
		.filter(isFile)
		.filter(isSvg)
		.filter(isEnabled);

const dirName = function(dir) {
	return dir.split("/")[dir.split("/").length - 1];
};
const fileName = function(dir) {
	return dir.split("/")[dir.split("/").length - 1].replace(".svg", "");
};

const setTabs = function(value) {
	let chars = fileName(value).length;
	// if (chars < 3) {
	// 	return "\t\t\t\t";
	// }
	if (chars < 8) {
		return "\t\t\t";
	}
	if (chars < 16) {
		return "\t\t";
	}
	if (chars < 20) {
		return "\t";
	}
	if (chars >= 20) {
		return "\t";
	}
};

const writeFontfiles = function(font, settings) {
	// console.log(settings);
	// console.log(settings.dest);
	let dirExist = true;
	let fontsDir = path.join(__dirname, "../" + settings.dest);
	if (!fs.existsSync(fontsDir)) {
		fs.mkdirSync(fontsDir);
	}
	//
	let newDir = path.join(__dirname, "../" + settings.dest, settings.fontName);
	if (!fs.existsSync(newDir)) {
		fs.mkdirSync(newDir);
		dirExist = false;
	}
	settings.types.forEach(function(type) {
		fs.writeFile(
			path.join(newDir, settings.fontName + "." + type),
			font[type],
			function(err, result) {
				if (err) {
					console.log(err);
					// throw err;
				} else {
					// console.log(join(newDir, settings.fontName + "." + type));
				}
			}
		);
	});
	console.log("\n");
};
const createJsonData = function(options) {
	let source = fs.readFileSync(options.jsonTemplate, "utf8");
	let template = handlebars.compile(source);
	let codepoints = _.object(
		_.map(options.codepoints, function(codepoint, name) {
			return [name, codepoint.toString(16)];
		})
	);
	let ctx = _.extend(
		{
			names: options.names,
			fontName: options.fontName,
			codepoints: codepoints
		},
		options.templateOptions
	);
	fs.writeFile(options.jsonDest, template(ctx));
};
const logFiles = function(font, updated) {
	//
	// The file name and how many files
	//
	console.log(
		"\n\x1b[32m%s\x1b[0m",
		"\u2713 \033[1m" +
			font.fontName +
			"\033[0m\x1b[32m - " +
			font.files.length +
			" icons"
	);
	//
	// Give the types
	//
	console.log("  " + font.types.join(", "));

	//
	// Give back what is happening, will it create new files, update
	// them or do nothing
	//
	if (updated == 1) {
		console.log("\x1b[34m  " + font.fontName + " is updated.");
	} else if (updated == 2) {
		console.log("\x1b[32m  " + font.fontName + " is created.");
	} else {
		console.log("\x1b[33m  " + "nothing changed.");
	}
	console.log("\t");

	//
	// Show all svg files in 3 columns
	//
	for (i = 0; i < font.files.length; i++) {
		let log = "";
		if (font.files[i]) {
			log = log + "\x1b[37m" + fileName(font.files[i]);
		}
		i++;
		if (font.files[i]) {
			log =
				log + setTabs(font.files[i - 1]) + "\x1b[37m" + fileName(font.files[i]);
		}
		i++;
		if (font.files[i]) {
			log =
				log + setTabs(font.files[i - 1]) + "\x1b[37m" + fileName(font.files[i]);
		}
		console.log(log);
	}
};

const makeCodepoints = function(index, files) {
	let codepoints = {};
	for (let i = 0; i < files.length; i++) {
		let hex = parseInt("0x" + String.fromCharCode(97 + index) + "001");
		codepoints[fileName(files[i])] = hex + i;
	}
	return codepoints;
};
const makeCodenames = function(index, files) {
	let names = [];
	for (let i = 0; i < files.length; i++) {
		names[i] = fileName(files[i]);
	}
	return names;
};
const generateFonts = function(dir, customArgs, index) {
	let files = getFiles(dir);
	///
	// Create settings
	///
	if (files.length > 0) {
		let font = {
			startCodePoint: parseInt("0x" + String.fromCharCode(97 + index) + "001"),
			types: ["svg", "ttf", "woff", "woff2", "eot"],
			files: files,
			dest: customArgs.dist,
			fontName: dirName(dir),
			writeFiles: false,
			codepoints: makeCodepoints(index, files),
			names: makeCodenames(index, files),
			jsonTemplate: path.join(__dirname, "../src/templates/icon-json.hbs"),
			json: true,
			jsonDest: path.join(
				__dirname,
				"../data/iconset-" + dirName(dir) + ".json"
			)
		};
		// console.log(font);
		///
		// generate fonts and data
		///
		webfontsGenerator(font, function(err, result) {
			if (err) {
				console.log("Fail!", err);
			} else {
				//
				// If result is ok. Check if the file is the same as the old file. If not
				// write a new file.
				//
				font.filePath = [font.dest, font.fontName, font.fontName].join("/");
				let currentSvg = font.filePath + ".svg";
				// console.log([font.dest, font.fontName + ".svg"].join("/"));
				fs.readFile(currentSvg, "utf8", function read(err, data) {
					if (err) {
						//
						// If erorr code = -2, it means the file doesnt exist. So we can create
						// it anyway.
						//
						if (err.errno === -2) {
							writeFontfiles(result, font);
							createJsonData(font);
							logFiles(font, 2);
						} else {
							throw err;
						}
					} else {
						//
						// Check if the svg is the same as the original file. If so, it doesnt
						// make sense to write it again.
						// Also this will create new versions every time in git. Which is annoying
						//
						if (data == result.svg) {
							logFiles(font, false);
							// needs to be removed

							createJsonData(font);
						} else {
							writeFontfiles(result, font);
							createJsonData(font);
							logFiles(font, 1);
						}
					}
				});
			}
		});
	}
};

// Generate settings
console.log("\x1b[32m" + "Generating fonts from svg files");

getDirectories(customArgs.src).forEach(function(dir, index) {
	generateFonts(dir, customArgs, index);
});

// console.log("\x1b[32m" + "0" + "\x1b[m" + " icon fonts created");
