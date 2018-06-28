module.exports = {
	title: "Henri's",
	description: "Matise Style Basis",
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
			["/kitchensink/", "Kitchensink"],
			["/documentation/output/", "Output"]
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
	}
};
