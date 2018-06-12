module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		repo: "matiseams/henris",
		editLinks: true,
		docsDir: "docs",
		lastUpdated: "Last Updated",
		editLinkText: "Edit this page on GitHub",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Matise", link: "https://www.matise.nl" }
		],
		sidebar: [
			["/", "Home"],
			["/scss/typography/", "Typography"],
			["/scss/color/", "Color"],
			["/scss/grid/", "Grid"]
		]
	},
	chainWebpack: config => {
		config.module
			.rule("pug")
			.test(/\.pug$/)
			.use("pug-plain-loader")
			.loader("pug-plain-loader")
			.end();
	}
};
