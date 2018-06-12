let getMenu = function() {
	let menu = ["/", "/scss", ["/page-b", "Explicit link text"]];
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
