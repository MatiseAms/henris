<template>
  <div class="search">
    <input class="search__input"
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
      placeholder="Search..">
    <ul class="search__suggestions"
      :class="{ 'align-right': alignRight, 'show': showSuggestions }"
      @mouseleave="unfocus">
      <li class="search__suggestion" v-for="(s, i) in suggestions"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)">
        <a class="search__link" :href="s.path" @click.prevent>
            
          <span class="search__title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="search__header"><small>&#x276f;</small> {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { pageNormalize } from "./util";
import navLayoutMixin from "./navLayout.mixin";

export default {
	mixins: [navLayoutMixin],
	data() {
		return {
			query: "",
			focused: false,
			focusIndex: 0
		};
	},
	computed: {
		showSuggestions() {
			return this.focused && this.suggestions && this.suggestions.length;
		},
		suggestions() {
			const query = this.query.trim().toLowerCase();
			if (!query) {
				return;
			}

			const max = 5;
			const pages = this.pages;
			const localePath = this.$localePath;
			const matches = item => {
				const keywords = this.getKeywords(item);
				return (
					(item.title && item.title.toLowerCase().indexOf(query) > -1) ||
					keywords.some(keyword => keyword.indexOf(query) > -1)
				);
			};
			const res = [];
			for (let i = 0; i < pages.length; i++) {
				if (res.length >= max) break;
				const p = pages[i];
				// filter out results that do not match current locale
				if (this.getPageLocalePath(p) !== localePath) {
					continue;
				}
				if (matches(p)) {
					res.push(p);
				} else if (p.headers) {
					for (let j = 0; j < p.headers.length; j++) {
						if (res.length >= max) break;
						const h = p.headers[j];
						if (matches(h)) {
							res.push(
								Object.assign({}, p, {
									path: p.path + "#" + h.slug,
									header: h
								})
							);
						}
					}
				}
			}
			return res;
		},
		// make suggestions align right when there are not enough items
		alignRight() {
			const navCount = (this.$site.themeConfig.nav || []).length;
			const repo = this.$site.repo ? 1 : 0;
			return navCount + repo <= 2;
		}
	},
	methods: {
		getKeywords(page) {
			const metaList = (page.frontmatter ? page.frontmatter.meta : []) || [];
			let keywords = metaList.filter(meta => meta.name === "keywords");
			keywords = keywords.length ? keywords[0].content.split(" ") : [];
			return keywords.map(keyword => keyword.toLowerCase());
		},
		getPageLocalePath(page) {
			for (const localePath in this.$site.locales || {}) {
				if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
					return localePath;
				}
			}
			return "/";
		},
		onUp() {
			if (this.showSuggestions) {
				if (this.focusIndex > 0) {
					this.focusIndex--;
				} else {
					this.focusIndex = this.suggestions.length - 1;
				}
			}
		},
		onDown() {
			if (this.showSuggestions) {
				if (this.focusIndex < this.suggestions.length - 1) {
					this.focusIndex++;
				} else {
					this.focusIndex = 0;
				}
			}
		},
		go(i) {
			this.$router.push(this.suggestions[i].path);
			this.query = "";
			this.focusIndex = 0;
		},
		focus(i) {
			this.focusIndex = i;
		},
		unfocus() {
			this.focusIndex = -1;
		}
	}
};
</script>

<style lang="scss">
@import "../../../ext.scss";

.search {
	padding: 2rem;
}
ul,
li {
	margin: 0;
	padding: 0;
	list-style-type: none;
}
.search {
	position: relative;
	border-top: 1px solid color(Black, 0.05);
	&__input {
		line-height: 1em;
		padding: 0.5em 1em;
		border-radius: 2em !important;
		font-size: 1rem;
		border: 1px solid color(Black, 0.2) !important;
		border-bottom-width: 2px;

		&:focus {
			border-color: color(Blue) !important;
			outline: none !important;
		}
	}
	&__suggestions {
		position: absolute;
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		background-color: color(White);
		z-index: 20;
		border-top: 0;
		width: 100%;
		// box-shadow: 0px -10px 40px 0 color(Black, 0.25);
		border: 1px solid color(Black, 0.05);
		border-left: 0;
		z-index: 10;
		&:empty {
			opacity: 0;
		}
		@media #{$small-only} {
			position: relative;
			left: 0;
			top: 0;
			transform: none;
		}
	}
	&__suggestion {
		display: block;
		border-bottom: 1px solid color(Black, 0.05);
		animation: comeIn 0.3s forwards;
		opacity: 0;
		transform: translateY(-100%);
		@for $i from 1 through 20 {
			&:nth-child(#{$i}) {
				animation: comeIn 0.3s #{$i/20}s forwards;
			}
		}
		&:last-child {
			border-bottom: 0;
		}
	}
	&__link {
		display: block;
		padding: 1rem 1rem;
		color: color(Black, 0.75);
		text-decoration: none;
		border-radius: 0.15rem;
		line-height: 1.5;
		&:hover {
			background-color: color(Blue, 0.05);
			.search__title {
				color: color(Blue);
			}
		}
		font-size: rem(14);
	}
	&__title {
		font-weight: bold;
		color: color(Black, 0.5);
		margin-right: 0.5rem;
	}
}
@keyframes comeIn {
	0% {
		opacity: 0;
		transform: translateY(-100%);
	}
	100% {
		opacity: 1;
		transform: translateY(0%);
	}
}
</style>
