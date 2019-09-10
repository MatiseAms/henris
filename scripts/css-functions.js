let convert = require("color-convert");

let functions = {};

functions.isNumber = n => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

/*
 The function to generate grid based values
*/
functions.grid = function(data, v) {
	function gridCalc(g) {
		let grid = 100 / data.grid.columns;
		return grid * g + "vw";
	}
	if (functions.isNumber(v)) {
		return gridCalc(v);
	} else {
		if (v.split(" ").length > 1) {
			let multi = [];
			v.split(" ").forEach(function(val) {
				if (functions.isNumber(val)) {
					multi.push(gridCalc(val));
				} else {
					console.log(val, " - NaN");
				}
			});
			return multi.join(" ");
		} else {
			return v;
		}
	}
};

/*
 Return colors from the colors
*/
functions.color = (data, v) => {
	let theColor;
	let searchColor = v;
	let transparency = 1;

	let vArray = v.split(",");
	if (vArray.length > 1) {
		searchColor = vArray[0];
		transparency = vArray[1];
	}
	
	Object.keys(data.color).forEach(function(list) {
		if (list !== "title") {
			data.color[list].forEach(function(colorList) {
				Object.keys(colorList).map(function(value, key) {
					if (value.toLowerCase() === searchColor.toLowerCase()) {
						theColor = colorList[value];
						if (transparency < 1) {
							theColor =
								"rgba(" +
								convert.hex.rgb(theColor.substring(1)).join(",") +
								"," +
								transparency +
								")";
						}
					}
				});
			});
		}
	});
	return theColor;
};

/*
 Return assets setting from settings
*/
functions.assets = (data, v) => {
	let theValue = null;
	let vArray = v.split(".");
	if (vArray.length > 1) {
		if (vArray.length == 3) {
			if (data[vArray[0]][vArray[1]][vArray[2]]) {
				theValue = data[vArray[0]][vArray[1]][vArray[2]];
			} else {
				theValue = data[vArray[0]][vArray[1]][0][vArray[2]];
			}
		}
	}
	if (theValue === null) {
		theValue = v;
	}
	return theValue;
};

module.exports = functions;
