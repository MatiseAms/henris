let getMenu = function() {
	let menu = ["/", "/scss/"];
	// let menu = ['scss/typography','scss/color'];
	return menu;
};

module.exports = {
	title: "Henri's",
	description: "Just playing around",
	themeConfig: {
		repo: 'matiseams/henris',
		editLinks: true,
		docsDir: 'docs',
		lastUpdated: 'Last Updated',
		editLinkText: 'Edit this page on GitHub',
		nav: [
			{ text: 'Matise.nl', link: 'https://www.matise.nl' },
		],
		sidebar: getMenu()
	}
}
