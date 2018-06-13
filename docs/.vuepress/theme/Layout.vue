<template lang="pug">
.wrapper
    header
        h1.logo
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 200" enable-background="new 0 0 400 200" xml:space="preserve" width="100">
                <path id="XMLID_11_" d="M309.202,21.653c-33.601,0-63.601,20.398-75.604,49.197c-9.603-8.402-20.398-13.204-33.601-13.204 s-23.999,4.801-32.401,13.204c-13.204-28.8-42.003-49.197-75.604-49.197C45.202,21.653,8,58.847,8,104.451 s37.202,82.798,82.798,82.798s82.806-37.194,82.806-82.798c0-14.404,10.803-25.199,25.199-25.199 c14.404,0,25.199,10.803,25.199,25.199c0,45.604,37.202,82.798,82.798,82.798S392,150.056,392,104.451 S354.806,21.653,309.202,21.653z M90.798,165.652c-33.601,0-61.201-27.599-61.201-61.201s27.599-61.201,61.201-61.201	s61.201,27.599,61.201,61.201S125.6,165.652,90.798,165.652z M309.202,165.652c-33.601,0-61.201-27.599-61.201-61.201 s27.599-61.201,61.201-61.201s61.201,27.599,61.201,61.201S342.803,165.652,309.202,165.652z"></path>
            </svg> {{$site.title}}
        SearchBox
    Sidebar(element="aside", :items="sidebarItems")
            <slot name="sidebar-top" slot="top"/>
            <slot name="sidebar-bottom" slot="bottom"/>
    main
        .content
            Content
           
        
    footer 
        h2.logo {{$site.title}}
            span by <a href="https://matise.nl">Matise</a>
</template>

<script>
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import { resolveSidebarItems } from "./util";
export default {
	components: { SearchBox, Sidebar },
	created() {
		this.sideBarData = this.$site.themeConfig.sidebar;
		console.log(this.$site.themeConfig.sidebar);
		console.log(this);
		console.log(this.$site);
		console.log(this.$page);
	},
	computed: {
		sidebarItems() {
			return resolveSidebarItems(
				this.$page,
				this.$route,
				this.$site,
				this.$localePath
			);
		}
	}
};
</script>

<style lang="scss">
$output-components-code-prism: true;
@import "../../../index.scss";
@import url("https://fonts.googleapis.com/css?family=Slabo+27px|IBM+Plex+Mono");
@import url("https://fonts.googleapis.com/css?family=Slabo+27px");

.logo {
	// font-family: "Slabo 27px", serif;
	span {
		font-family: sans-serif;
		font-size: 1rem;
		font-weight: normal;
		padding: 0 1rem;
	}
}

// notes
.header-anchor {
	position: absolute;
	transform: translateX(-100%);
	text-decoration: none;
	color: $link;
	opacity: 0.5;
	padding: 0 0.5rem;
	font-size: 1rem;
}

// // code
// pre code {
// 	background-color: color(Black, 0.8);
// 	color: color(White);
// 	padding: 2rem;
// 	width: 100%;
// 	line-height: 1.5;
// 	border-radius: $base-border-radius;
// 	&,
// 	span {
// 		font-family: "IBM Plex Mono";
// 	}
// }

// nav

.nav {
	&__list {
		width: 100%;
		// background-color: color(Purple, 0.2);
	}
	&__item {
		display: block;
		width: 100%;
		&.is-current {
			background-color: rgba($primary, 0.05);
			box-shadow: -1px 0 0 0 $primary inset;
		}
		.nav__list {
			.nav__item {
				padding-left: 0.8em;
				font-size: 0.8em;
			}
		}
	}
	&__link {
		display: block;
		text-decoration: none;
		padding: 0.5rem grid(1);
		&:hover {
			.nav__text {
				color: color($primary, 0.75);
			}
		}
	}
	&__text {
		color: color(Black, 0.75);
	}
	//
	// The normal navigation
	&-links {
		background-color: color(Purple, 0.25);
		padding: 2rem 0;
		margin-top: grid(1);
		&__item {
			display: block;
		}
		&__link {
			display: block;
			text-decoration: none;
			padding: 0.5rem grid(1);
			&:hover {
				.nav__text {
					color: color($primary, 0.75);
				}
			}
		}
	}
}

// body,html
body,
html {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
	font-family: sans-serif;
	background-color: color(Black);
}
.search {
	position: relative;
	display: block;
	padding: grid(0.5 1);
}
//
.wrapper {
	display: grid;
	grid-template-areas:
		"header header header header"
		"menu main main main"
		"footer footer footer footer";
	grid-gap: 0px;
	background-color: color(White);
}
//
header {
	grid-area: header;
	border-bottom: 1px solid color(Black, 0.1);
	display: flex;
	justify-content: space-between;
	background-color: color(White);
	h1 {
		padding: grid(0.5);
		margin: 0;
		padding: 0;
		line-height: 4rem;
		padding: 0 2rem;
		display: block;
	}
}
//
.sidebar {
	grid-area: menu;
	padding: grid(2 0 0 0);
	box-shadow: -1px 0 0 0 color(Black, 0.1) inset;
	display: flex;
	flex-direction: column;
	align-content: space-between;
	flex-wrap: wrap;
	background-color: color(White);
	width: grid(4);
	@include min-("width", 4, 240);
	@include max-("width", 4, 400);
}
//
main {
	grid-area: main;
	padding: grid(2);
	background-color: color(White);
}
.content {
	width: 100%;
	p {
		line-height: 1.75;
	}
}
// footer
footer {
	grid-area: footer;
	background-color: color(Black);
	color: color(White);
	text-align: center;
	padding: grid(2);
	a {
		color: color(White);
	}
}
</style>