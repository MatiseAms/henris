///
// imports
///
// const colors = require("colors");
const columnify = require("columnify");
const { lstatSync, readdirSync, readFile, writeFileSync } = require("fs");
const { join } = require("path");
const webfontsGenerator = require("webfonts-generator");

///
// Find folders
///

// Filters
const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();
const isSvg = name => name.split(".")[name.split(".").length - 1] === "svg";
const isEnabled = name =>
	name.split("/")[name.split("/").length - 1].charAt(0) !== "_";

// Get FS functions
const getDirectories = source =>
	readdirSync(source)
		.map(name => join(source, name))
		.filter(isDirectory)
		.filter(isEnabled);

const getFiles = source =>
	readdirSync(source)
		.map(name => join(source, name))
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
	console.log(settings);
};

const generateFonts = function(dir) {
	let files = getFiles(dir);
	///
	// Create settings
	///
	if (files.length > 0) {
		let font = {
			startCodePoint: 0xa001,
			types: ["svg", "ttf", "woff", "woff2", "eot"],
			files: files,
			dest: "dist/fonts/" + dirName(dir),
			fontName: dirName(dir),
			writeFiles: false
		};
		///
		// generate fonts and data
		///
		webfontsGenerator(font, function(error, result) {
			if (error) {
				console.log("Fail!", error);
			} else {
				console.log(
					"\n\x1b[32m%s\x1b[0m",
					"\t\u2713 \033[1m" +
						font.fontName +
						"\033[0m\x1b[32m - " +
						font.files.length +
						" icons"
				);
				console.log("\t  " + font.types.join(", ") + "\n");
				// font.types.forEach(type){
				// 	console.log(type);
				// }

				for (i = 0; i < font.files.length; i++) {
					let log = "";
					if (font.files[i]) {
						log = log + "\t\t\x1b[0m" + fileName(font.files[i]);
					}
					i++;
					if (font.files[i]) {
						log =
							log +
							setTabs(font.files[i - 1]) +
							"\x1b[0m" +
							fileName(font.files[i]);
					}
					i++;
					if (font.files[i]) {
						log =
							log +
							setTabs(font.files[i - 1]) +
							"\x1b[0m" +
							fileName(font.files[i]);
					}
					console.log(log);
				}
			}
			//
			// If result is ok. Check if the file is the same as the old file. If not
			// write a new file.
			//
			// let currentSvg = console.log(result.svg);
			let currentSvg = [font.dest, font.fontName + ".svg"].join("/");
			// console.log([font.dest, font.fontName + ".svg"].join("/"));
			readFile(currentSvg, "utf8", function read(err, data) {
				if (err) {
					throw err;
				} else {
					if (data == result.svg) {
						console.log("this file is the sameeee");
					} else {
						console.log("yes lets write the motherfucker");
						writeFontfiles(result, font);
					}
				}
			});
		});
	}
};

// Generate settings
console.log("\x1b[32m" + "Generating fonts from svg files");

getDirectories("src/icons").forEach(function(dir, index) {
	generateFonts(dir);
});
