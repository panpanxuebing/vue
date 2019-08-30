<template>
	<div class="app">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="210px">
					<navbar></navbar>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Navbar from '@/layout/Navbar'

export default {
	name: 'App',

	components: {
		Navbar
	},

	data() {
		return {
			
		}
	}
}
</script>

<style lang="less" scoped>
.app {
	margin: 10px;
}

.el-row {
	margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
</style>