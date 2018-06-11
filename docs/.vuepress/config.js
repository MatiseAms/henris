let getMenu = function() {
	// let menu = ["/", "/scss", ["/page-b", "Explicit link text"]];
	let menu = [];
	return menu;
};

module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		sidebar: getMenu()
	}
};
