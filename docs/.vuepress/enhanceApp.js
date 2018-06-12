// export default ({
// 	Vue, // the version of Vue being used in the VuePress app
// 	options, // the options for the root Vue instance
// 	router, // the router instance for the app
// 	siteData // site metadata
// }) => {
// 	// ...apply enhancements to the app
// 	console.log(router);
// 	let newRoute = {};
// 	let routes = router.options.routes;
// 	function setName(value) {
// 		let newValue;
// 		if (value === "") {
// 			newValue = "home";
// 		} else {
// 			newValue = value.replace(".html", "");
// 		}
// 		return newValue;
// 	}
// 	for (let i = 0; i < routes.length; i++) {
// 		// console.log(routes[i].path);
// 		let path = routes[i].path.split("/");
// 		// console.log(path.length);
// 		for (let index = 0; index < path.length; index++) {
// 			// console.log("kudt");
// 			// console.log(path[a]);
// 			if (index == 1) {
// 				console.log(path[1]);
// 				if (path[1].indexOf(".html") > 0) {
// 					console.log("this is the last");
// 				}
// 				if (!newRoute[setName(path[1])]) {
// 					newRoute[setName(path[1])] = {
// 						title: `${path[1]}`,
// 						link: "#",
// 						children: []
// 					};
// 				} else {
// 				}
// 			}
// 		}
// 		// console.log(newRoute);
// 		// //
// 	}
// 	setTimeout(function() {
// 		console.log(newRoute);
// 	}, 1000);
// };
