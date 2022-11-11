<script>
	import {
		getToken
	} from './utils/token.js'
	export default {
		onLaunch: function() {
			// uni.addInterceptor('request', {})
			if (getToken()) {
				uni.navigateTo({
					url: `/pages/index`,
				})
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
