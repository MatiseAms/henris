<template>
  <component :is="element" class="sidebar">
    <slot></slot>
    <slot name="top"/>
    <nav class="nav">
      <ul class="nav__list" v-if="items.length">
        <li v-for="(item, i) in items" :key="i" :class="{'nav__item' : true, 'is-current': isActive(item)}">
          <SidebarGroup class="nav__link" v-if="item.type === 'group'"
            :item="item"
            :first="i === 0"
            :open="i === openGroupIndex"
            :collapsable="item.collapsable"
            @toggle="toggleGroup(i)"/>
          <SidebarLink v-else :item="item"/>
        </li>
      </ul>
    </nav>
    <NavLinks/>
    <slot name="bottom"/>
    <SearchBox></SearchBox>
  </component>
</template>

<script>
import SearchBox from "./SearchBox";
import SidebarGroup from "./SidebarGroup.vue";
import SidebarLink from "./SidebarLink.vue";
import NavLinks from "./NavLinks.vue";
import { isActive } from "./util";

export default {
	components: { SidebarGroup, SidebarLink, NavLinks, SearchBox },
	props: ["items", "element"],
	data() {
		return {
			openGroupIndex: 0
		};
	},
	created() {
		this.refreshIndex();
	},
	watch: {
		$route() {
			this.refreshIndex();
		}
	},
	methods: {
		refreshIndex() {
			const index = resolveOpenGroupIndex(this.$route, this.items);
			if (index > -1) {
				this.openGroupIndex = index;
			}
		},
		toggleGroup(index) {
			this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
		},
		isActive(page) {
			return isActive(this.$route, page.path);
		}
	}
};

function resolveOpenGroupIndex(route, items) {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (
			item.type === "group" &&
			item.children.some(c => isActive(route, c.path))
		) {
			return i;
		}
	}
	return -1;
}
</script>


<style lang="scss">
@import "../../../ext.scss";

// nav
.nav {
	padding: grid(1 0);
	width: 100%;
	color: color(Purple);
	&__list {
		width: 100%;
	}
	&__item {
		display: block;
		width: 100%;
		transition: 0.3s;
		&.is-current {
			// background-color: rgba($primary, 0.05);
			box-shadow: -2px 0 0 0 rgba($primary, 0.25) inset;
			max-height: 900px;
			.nav__list {
				max-height: 900px;
				.nav__item {
					color: color(Black);
					&.is-current {
						box-shadow: -2px 0 0 0 rgba($primary, 1) inset;

						.nav__link {
							font-weight: bold;
						}
					}
				}
			}
		}
		.nav__list {
			transform-origin: 0 0;
			transform: scale(1, 0);
			animation: openList 1s forwards;
			.nav__item {
				padding-left: 0.8em;
				font-size: 0.8em;
				.nav__link {
					font-weight: 400;
				}
			}
		}
	}
	&__link {
		display: block;
		text-decoration: none;
		padding: 0.75rem 2rem;
		font-weight: 600;
		&:hover {
			.nav__text {
				color: color($primary, 0.75);
			}
		}
	}
	&__text {
		color: color(Black, 0.75);
	}
}
</style>
