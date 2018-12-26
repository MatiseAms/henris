const fs = require("fs");
const path = require("path");
const flatten = require("flat");
const chalk = require("chalk");
const helperFunction = require("./css-functions.js");
const Table = require("cli-table");

const delimiter = "-",
  sourceFolder = "data/",
  distFolder = "src/scss/";

let fileTypes = [
  {
    type: "scss",
    dest: distFolder + "settings",
    varPattern: "${{var}}: {{value}} !default; //",
    listPatternParent: "${{var}}: (\n{{list}}\n) !default; //",
    listSubPatternParent: '\t"{{var}}": (\n{{list}}\n\t) //',
    listPattern: '\t"{{var}}": {{value}}'
  }
];

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

/**
 * Get all setting files from /data
 */
function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    if (files[i].split(".")[files[i].split(".").length - 1] === "json") {
      //	console.log(files[i]);
      var name = dir + "/" + files[i];
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
  }
  return files_;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

// Do helperFunction when necessary;
function doFunction(value) {
  let thefunc = value.replace("{{", "").replace("}}", "");
  let func = thefunc.split("(")[0];
  let parameters = value.replace(/(^.*\(|\).*$)/g, "");
  let newvalue;
  if (typeof helperFunction[func] === "function") {
    newvalue = helperFunction[func](stored, parameters);
  } else {
    newvalue = func + "(" + parameters + ")";
  }
  return newvalue;
}

// Do helperFunction when necessary;
function makeList(value) {
  let newvalue = value.replace("[[", "").replace("]]", "");
  return newvalue;
}

function stringValue(value) {
  if (typeof value == "string") {
    let quotes = true;
    let noquotes = ["normal", "regular", "lowercase", "uppercase", "none", "0"];
    if (
      value.indexOf("px") > -1 ||
      value.indexOf("ch") > -1 ||
      value.indexOf("rem") > -1 ||
      value.indexOf("%") > -1
    ) {
      quotes = false;
    }
    if (value.indexOf("(") > -1 && value.indexOf(")") > -1) {
      quotes = false;
    }
    if (value.charAt(0) === "#") {
      quotes = false;
    }
    if (noquotes.includes(value)) {
      quotes = false;
    }
    if (parseFloat(value)) {
      quotes = false;
    }
    // Do helperFunction
    if (value.indexOf("{{") > -1) {
      value = stringValue(doFunction(value));
    }
    // makeList
    if (value) {
      if (value.indexOf("[[") > -1) {
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
/**
 * Convert all files
 */

let stored = {};
getFiles(sourceFolder).forEach(file => {
  stored = mergeDeep({}, stored, JSON.parse(fs.readFileSync(file, "utf8")));
});

class JSONToCSS {
  constructor() {
    this.setBaseSettings();
    this.setFolder();
    this.setBaseFiles(this.settings.sourceFolder);

    //if init is done, go fill the files
    this.setAllFiles();
  }
  setBaseSettings() {
    this.settings = {};
    this.settings.delimiter = "-";
    this.settings.sourceFolder = "data/";
    this.settings.distFolder = "src/scss/";
    this.settings.fileTypes = [
      {
        type: "scss",
        dest: distFolder + "settings",
        varPattern: "${{var}}: {{value}} !default; //",
        listPatternParent: "${{var}}: (\n{{list}}\n) !default; //",
        listSubPatternParent: '\t"{{var}}": (\n{{list}}\n\t) //',
        listPattern: '\t"{{var}}": {{value}}'
      }
    ];
  }

  setFolder() {
    const fileTypes = this.getFileTypes();

    //for each options of fileTypes execute some tasks
    fileTypes.forEach(type => {
      const sep = path.sep;
      const initDir = path.isAbsolute(type.dest) ? sep : "";
      type.dest.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) fs.mkdirSync(curDir);
        return curDir;
      }, initDir);
    });
  }
  setBaseFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      if (files[i].split(".")[files[i].split(".").length - 1] === "json") {
        var name = dir + "/" + files[i];
        if (fs.statSync(name).isDirectory()) {
          this.setBaseFiles(name, files_);
        } else {
          files_.push(name);
        }
      }
    }
    this.baseFiles = files_;
  }
  setAllFiles() {
    //log top of table
    const table = new Table({
      head: [
        chalk.hex("#7329b1").bold("File"),
        chalk.hex("#7329b1").bold("Input"),
        chalk.hex("#7329b1").bold("To"),
        chalk.hex("#7329b1").bold("Output")
      ],
      colWidths: [20, 25, 10, 25]
    });
    //execute first log
    console.log(
      "\n\n\t" + chalk.yellow.bold("Convert json data to Sass") + "\n"
    );
    console.log(table.toString());

    //foreach filtypes
    let settingFiles = [];
    this.baseFiles.forEach((file, index) => {
      //filename is created by split on / and get the last element of it
      let fileName = file
        .split("/")
        [file.split("/").length - 1].replace(".json", "");

      //filename cant start with _
      if (fileName.charAt(0) !== "_") {
        //for each setting we want to create a file
        this.settings.fileTypes.forEach(type => {
          // Write New Files based on file and type
          let compiled = this.objToStyle({
            file: JSON.parse(fs.readFileSync(file, "utf8")),
            type
          });
          // Fix for less lists;
          compiled = compiled.replaceAll(";,", ";");

          //log output to console: file, input, to, output
          this.logNewTable({
            file: chalk.green.bold(fileName),
            input: file.split("/")[file.split("/").length - 1],
            to: chalk.green("\u2192 " + type.type),
            output: fileName + "." + type.type
          });

          fs.writeFileSync(
            type.dest + "/_" + fileName + "." + type.type,
            compiled,
            err => {
              console.log("woops, something went wrong!" + err);
            }
          );
        });

        settingFiles.push(fileName);
        //if on the end of loop createImport
        if (index + 1 === getFiles(sourceFolder).length) {
          this.setImport(settingFiles);
        }
      }
    });
  }
  setImport(files) {
    let code = "";
    const codes = files.map(file => {
      code = code + '@import "' + file + '";\n';
      return (
        "\t" +
        chalk.hex("#7329b1").bold("@import ") +
        "'" +
        chalk.green(file) +
        "';\n"
      );
    });

    console.log("\n\n\t" + chalk.yellow.bold("Create @imports") + "\n");
    console.log(codes.join(""));
    fileTypes.forEach(type => {
      fs.writeFileSync(type.dest + "/_index." + type.type, code, function(err) {
        console.log("woops, something went wrong!" + err);
      });
    });
  }
  getFileTypes() {
    return this.settings.fileTypes;
  }
  logNewTable({ file, input, to, output } = {}) {
    console.log(file);
    let table = new Table({
      head: false,
      colWidths: [20, 25, 10, 25]
    });

    table.push([file, input, to, output]);

    console.log(table.toString());
  }
  objToStyle({ file, type } = {}) {
    const self = this;
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
    Object.keys(data).forEach(key => {
      //check if the key of the data is not a number
      if (!helperFunction.isNumber(key.split("-")[key.split("-").length - 1])) {
        variable = type.varPattern
          .replace("{{var}}", self.removeKeys(key.toLowerCase()))
          .replace("{{value}}", stringValue(data[key]));
        newFile.push(self.removeKeys(variable));
      }
    });

    // Do the lists
    function stringify(object, iteration, inObjectList = false) {
      let list = [];
      Object.keys(object).forEach(key => {
        if (typeof object[key][0] === "object") {
          if (iteration > 0) {
            list.push(
              type.listSubPatternParent
                .replace("{{var}}", self.removeKeys(key.toLowerCase()))
                .replace(
                  "{{list}}",
                  stringify(object[key][0], iteration + 1, true)
                )
            );
          } else {
            list.push(
              type.listPatternParent
                .replace("{{var}}", self.removeKeys(key.toLowerCase()))
                .replace(
                  "{{list}}",
                  stringify(object[key][0], iteration + 1, true)
                )
            );
          }
        } else if (
          Object.prototype.toString.call(object[key]) === "[object Array]"
        ) {
          list.push(
            type.listPatternParent
              .replace("{{var}}", self.removeKeys(key.toLowerCase()))
              .replace("{{list}}", '"' + object[key].join('", \r\n"') + '"')
          );
        } else if (inObjectList) {
          list.push(
            type.listPattern
              .replace("{{var}}", key)
              .replace("{{value}}", stringValue(object[key]))
          );
        }
      });
      return list.join(", \r\n");
    }

    newFile.push(stringify(listData, 0));

    return newFile.join("\r\n");
  }
  removeKeys(value) {
    return value.replace("-0-", "-");
  }
}

const JSONToCSSInstance = new JSONToCSS();

//do something
