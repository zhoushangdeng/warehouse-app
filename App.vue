<script>
	import {
		getToken
	} from './utils/token.js'
	export default {
		onLaunch: function() {
			uni.addInterceptor('request', {
				invoke(args) {
					console.log("----", getToken())
				},
			})
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
