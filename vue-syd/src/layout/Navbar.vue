<template>
	<el-row class="tac">
		<el-menu
			:default-active="defaultActiveIndex"
			router
			@open="handleOpen"
			@close="handleClose"
			@select="handleSelect"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
			unique-opened
			>
			<el-submenu v-for="item in menus" :index="item.id" :key="item.id">
				<template slot="title">
					<span v-text="item.name"></span>
				</template>
				<el-menu-item
					v-for="sub in item.subs"
					:index="sub.componentName"
					v-text="sub.name"
					:key="sub.componentName"
				></el-menu-item>
			</el-submenu>
		</el-menu>
	</el-row>
</template>

<script>
	// import menus from '@/config/menu-config';
	import { mapState } from 'vuex';

	export default {
		data() {
			return {

			}
		},

		computed: {
			...mapState({
				menus: state => {
					return state.menus;
				}
			}),
			defaultActiveIndex() {
				if(this.$route.name !== '/') {
					return this.$route.name;
				}	
				return this.$store.state.menus[0].subs[0].componentName;
			}
		},

		mounted() {
			this.$store.dispatch('getMenuAsync');
		},

		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
	}
</script>

<style lang="less" scoped>
.el-menu-item.is-active {
	background-color: #404a50 !important;
}
</style>