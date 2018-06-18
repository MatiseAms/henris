<template lang="pug">
.wrapper
    Sidebar(element="aside", :items="sidebarItems",:class="{ 'not-active': !sidebarActive }")
        h1.logo
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 200" enable-background="new 0 0 400 200" xml:space="preserve" width="100">
                <path id="XMLID_11_" d="M309.202,21.653c-33.601,0-63.601,20.398-75.604,49.197c-9.603-8.402-20.398-13.204-33.601-13.204 s-23.999,4.801-32.401,13.204c-13.204-28.8-42.003-49.197-75.604-49.197C45.202,21.653,8,58.847,8,104.451 s37.202,82.798,82.798,82.798s82.806-37.194,82.806-82.798c0-14.404,10.803-25.199,25.199-25.199 c14.404,0,25.199,10.803,25.199,25.199c0,45.604,37.202,82.798,82.798,82.798S392,150.056,392,104.451 S354.806,21.653,309.202,21.653z M90.798,165.652c-33.601,0-61.201-27.599-61.201-61.201s27.599-61.201,61.201-61.201	s61.201,27.599,61.201,61.201S125.6,165.652,90.798,165.652z M309.202,165.652c-33.601,0-61.201-27.599-61.201-61.201 s27.599-61.201,61.201-61.201s61.201,27.599,61.201,61.201S342.803,165.652,309.202,165.652z"></path>
            </svg> 
        // span {{$site.title}}
    .hub
        a.logo
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 200" enable-background="new 0 0 400 200" xml:space="preserve" width="100">
                <path id="XMLID_11_" d="M309.202,21.653c-33.601,0-63.601,20.398-75.604,49.197c-9.603-8.402-20.398-13.204-33.601-13.204 s-23.999,4.801-32.401,13.204c-13.204-28.8-42.003-49.197-75.604-49.197C45.202,21.653,8,58.847,8,104.451 s37.202,82.798,82.798,82.798s82.806-37.194,82.806-82.798c0-14.404,10.803-25.199,25.199-25.199 c14.404,0,25.199,10.803,25.199,25.199c0,45.604,37.202,82.798,82.798,82.798S392,150.056,392,104.451 S354.806,21.653,309.202,21.653z M90.798,165.652c-33.601,0-61.201-27.599-61.201-61.201s27.599-61.201,61.201-61.201	s61.201,27.599,61.201,61.201S125.6,165.652,90.798,165.652z M309.202,165.652c-33.601,0-61.201-27.599-61.201-61.201 s27.599-61.201,61.201-61.201s61.201,27.599,61.201,61.201S342.803,165.652,309.202,165.652z"></path>
            </svg> 
        a.mobile-trigger(@click="activateSidebar", :class="{ 'is-active': sidebarActive }")
            span
    main#main(:class="{ 'is-active': !sidebarActive }")

        .content
            Content
           
        
</template>

<script>
import Sidebar from "./Sidebar";
import { resolveSidebarItems } from "./util";
export default {
	data() {
		return {
			sidebarActive: false
		};
	},
	components: { Sidebar },
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
	},
	methods: {
		activateSidebar() {
			if (this.sidebarActive) {
				this.sidebarActive = false;
			} else {
				this.sidebarActive = true;
			}
		}
	},
	watch: {
		$route(to, from) {
			this.sidebarActive = false;
		}
	}
};
</script>

<style lang="scss">
$output-components-code-prism: true;
@import "../../../index.scss";
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Mono");

.logo {
	padding: grid(1 0);
	text-align: center;
	font-weight: normal;
	display: flex;
	align-items: center;
	justify-content: center;
	@media #{$small-only} {
		padding: grid(5 0);
	}
	span {
		font-weight: normal;
		line-height: grid(0.5);
		color: color(Purple);
		font-size: 1.25rem;
	}
	svg {
		height: grid(0.5);
		width: grid(1.5);
		display: block;
		@media #{$small-only} {
			height: grid(2);
			width: 100%;
		}
	}
}
h2.logo {
	line-height: grid(1);
	padding: grid(0.5 1);
	padding-left: calc(#{grid(2)} + 0.5rem);
	position: relative;
	img,
	svg {
		width: grid(1);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: grid(1);
	}
}
h1,
h2,
h3,
h4 {
	position: relative;
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
	color: color(Blue);
}
@keyframes openList {
	0% {
		opacity: 0.5;
		transform: scale(1, 1);
	}
	100% {
		opacity: 1;
		transform: scale(1, 1);
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
//
.wrapper {
	display: flex;
	max-width: 100vw;
	overflow: scroll;
	background-color: color(Black);
}
.hub {
	position: fixed;
	top: 50%;
	right: 0;
	z-index: 12;
	.logo {
		width: 3rem;
		height: 3rem !important;
		padding: 0;
		display: block;
		position: relative;
		background-color: color(Dark);
		svg {
			width: 60%;
			height: 60%;
			top: 20%;
			left: 20%;
			position: absolute;
			fill: white;
		}
	}

	.mobile-trigger {
		display: block;
		background-color: color(Purple);
		width: 3rem;
		height: 3rem;
		position: relative;
		span {
			@include menu();
		}
		&.is-active {
			span {
				@include menu-close();
			}
		}
	}
}
//
.sidebar {
	box-shadow: -2px 0 0 0 color(Black, 0.1) inset;
	display: flex;
	flex-direction: column;
	align-content: space-between;
	flex-wrap: nowrap;
	background-color: color(White);
	width: grid(4);
	position: fixed;
	height: 100vh;
	z-index: 10;
	transition: clip-path $base-transition, -webkit-clip-path $base-transition;
	clip-path: inset(0 0% 0 0);
	-webkit-clip-path: inset(0 0% 0 0);

	@include min-("width", 4, 240);
	@include max-("width", 4, 320);
	@media #{$small-only} {
		width: 100vw;
		height: 100vh;
		background-color: color(White);
		z-index: 8;
		&.not-active {
			clip-path: inset(0 100% 0 0);
			-webkit-clip-path: inset(0 100% 0 0);
			transition: clip-path $base-transition, -webkit-clip-path $base-transition;
		}
	}
}
//
#main {
	padding: grid(2);
	background-color: color(White);
	overflow: scroll;
	left: grid(4);
	margin-left: grid(4);
	width: grid(20);
	opacity: 0.5;
	transition: opacity $base-transition;
	&.is-active {
		opacity: 1;
	}

	@include min-("width", 4, 240) {
		width: calc(100% - 240px);
		margin-left: 240px;
	}
	@include max-("width", 4, 320) {
		width: calc(100% - 320px);
		margin-left: 320px;
	}
	@media #{$small-only} {
		width: 100%;
		margin-left: 0;
		left: 0;
	}
}
.content {
	width: 100%;
	p {
		line-height: 1.75;
	}
}
</style>