module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		sidebar: {
			title: "SCSS",
			collapsable: true,
			children: [
				"/",
				["/scss/typography", "Typography"],
				["/scss/color", "Color"],
				["/scss/grid", "Grid"]
			]
		},
		repo: "matiseams/henris",
		editLinks: true,
		docsDir: "docs",
		lastUpdated: "Last Updated",
		editLinkText: "Edit this page on GitHub",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Matise", link: "https://matise.nl" }
		]
	}
};
