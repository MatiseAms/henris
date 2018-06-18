module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		repo: "matiseams/henris",
		editLinks: true,
		docsDir: "docs",
		lastUpdated: "Last Updated",
		editLinkText: "Edit this page on GitHub",
		nav: [{ text: "Matise", link: "https://www.matise.nl" }],
		sidebar: [
			["/documentation/typography/", "Typography"],
			["/documentation/color/", "Color"],
			["/documentation/grid/", "Grid"],
			["/kitchensink/", "Kitchensink"]
		]
		// sidebar: [
		// 	{
		// 		title: "Main",
		// 		collapsable: false,
		// 		children: ["/", ["settings", "Configuration"]]
		// 	}
		// ]
	},
	configureWebpack: {
		resolve: {
			alias: {
				"@media-img": "media/img/"
			}
		}
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
