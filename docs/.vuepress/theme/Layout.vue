<template lang="pug">
.wrapper
    header
        h1.logo {{$site.title}}
        SearchBox
    aside
        nav.nav
            ul.nav__list
                li.nav__item(v-for="(item,index) in sideBarData",:class="{'is-current': $page.path == item[0] }")
                    a.nav__link(:href="item[0]") 
                        span.nav__text {{item[1]}}

    main
        .content
            Content
           
        
    footer 
        h2.logo {{$site.title}}
            span by <a href="https://matise.nl">Matise</a>
</template>

<script>
import SearchBox from "./SearchBox";
export default {
	components: { SearchBox },
	created() {
		this.sideBarData = this.$site.themeConfig.sidebar;
		console.log(this.$site.themeConfig.sidebar);
		console.log(this);
		console.log(this.$site);
		console.log(this.$page);
	}
};
</script>

<style lang="scss">
@import "../../../index.scss";
@import url("https://fonts.googleapis.com/css?family=Slabo+27px|IBM+Plex+Mono");
@import url("https://fonts.googleapis.com/css?family=Slabo+27px");
.logo {
	font-family: "Slabo 27px", serif;
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
	color: color(Blue);
	opacity: 0.5;
	padding: 0 0.5rem;
	font-size: 1rem;
}

// code
pre code {
	background-color: color(Black, 0.8);
	color: color(White);
	padding: 2rem;
	width: 100%;
	line-height: 1.5;
	border-radius: $base-border-radius;
	&,
	span {
		font-family: "IBM Plex Mono";
	}
}

// nav

.nav {
	&__list {
		width: 100%;
	}
	&__item {
		display: block;
		width: 100%;
		&.is-current {
			background-color: color(Blue, 0.05);
			box-shadow: -1px 0 0 0 color(Blue) inset;
		}
	}
	&__link {
		display: block;
		text-decoration: none;
		padding: 0.5rem grid(1);
		&:hover {
			.nav__text {
				color: color(Blue, 0.75);
			}
		}
	}
	&__text {
		color: color(Black, 0.75);
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
		"header header header header header"
		"menu main main main right"
		"footer footer footer footer footer";
	grid-gap: 0px;
}
//
header {
	grid-area: header;
	border-bottom: 1px solid color(Black, 0.1);
	display: flex;
	justify-content: space-between;
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
aside {
	grid-area: menu;
	padding: grid(2 0);
	box-shadow: -1px 0 0 0 color(Black, 0.1) inset;
}
//
main {
	grid-area: main;
	padding: grid(2);
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