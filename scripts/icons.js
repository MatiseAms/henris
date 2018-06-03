///
// imports
///
// const colors = require("colors");
const columnify = require("columnify");
const {
	lstatSync,
	readdirSync,
	readFile,
	writeFile,
	existsSync,
	mkdirSync
} = require("fs");
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
	// console.log(settings);
	// console.log(settings.dest);
	let dirExist = true;
	let fontsDir = join(__dirname, "../" + settings.dest);
	if (!existsSync(fontsDir)) {
		mkdirSync(fontsDir);
	}
	//
	let newDir = join(__dirname, "../" + settings.dest, settings.fontName);
	if (!existsSync(newDir)) {
		mkdirSync(newDir);
		dirExist = false;
	}
	settings.types.forEach(function(type) {
		writeFile(
			join(newDir, settings.fontName + "." + type),
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

const logFiles = function(font, updated) {
	console.log(
		"\n\x1b[32m%s\x1b[0m",
		"\t\u2713 \033[1m" +
			font.fontName +
			"\033[0m\x1b[32m - " +
			font.files.length +
			" icons"
	);
	console.log("\t  " + font.types.join(", "));
	if (updated == 1) {
		console.log("\t\x1b[34m  " + font.fontName + " is updated.");
	} else if (updated == 2) {
		console.log("\t\x1b[32m  " + font.fontName + " is created.");
	} else {
		console.log("\t\x1b[33m  " + "nothing changed.");
	}
	console.log("\n");
	// font.types.forEach(type){
	// 	console.log(type);
	// }

	for (i = 0; i < font.files.length; i++) {
		let log = "";
		if (font.files[i]) {
			log = log + "\t\x1b[37m" + fileName(font.files[i]);
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
			dest: "dist/fonts/",
			fontName: dirName(dir),
			writeFiles: false
		};
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
				readFile(currentSvg, "utf8", function read(err, data) {
					if (err) {
						//
						// If erorr code = -2, it means the file doesnt exist. So we can create
						// it anyway.
						//
						if (err.errno === -2) {
							writeFontfiles(result, font);
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
						} else {
							writeFontfiles(result, font);
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

getDirectories("src/icons").forEach(function(dir, index) {
	generateFonts(dir);
});
