let getMenu = function() {
	// let menu = ["/", "/scss"];
	let menu = ["scss/typography", "scss/color"];
	return menu;
};

module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Matise", link: "https://matise.nl" }
		],
		sidebar: {
			title: "SCSS",
			collapsable: false,
			children: [
				"/",
				["/scss/typography", "Typography"],
				["/scss/color", "Color"],
				["/scss/grid", "Grid"]
			]
		}
	}
};
