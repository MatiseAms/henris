let getMenu = function() {
	let menu = ["/", "/scss"];
	// let menu = ['scss/typography','scss/color'];
	return menu;
};

module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		nav: getMenu()
	}
};
