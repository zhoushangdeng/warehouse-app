<template>
	<view class="content">
		<view>
			{{msg}}
		</view>
		<view>

		</view>
		<view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				msg: "123"
			}
		},
		created() {

			const authorization =
				`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Njc4MjY2Mzk5NDMsIlVzZXJJRCI6MX0.E3fCTw4ROdZwSLsrcWB6VpGhIZ62YYdFVWiNLM1VI1Q`
			const config = () => ({
				headers: {
					'Authorization': authorization,
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*",
				}
			});
			// axios.get("http://42.193.149.90:6006/library/menu/tree?roleId=2001", config()).then(res => {
			// 	// alert("123123", res.data)
			// 	this.msg = res.data
			// }).catch(err => {
			// 	console.log(err)
			// 	this.msg = err
			// })

			uni.request({
				url: 'http://42.193.149.90:6006/library/menu/tree?roleId=2001', //仅为示例，并非真实接口地址。
				data: {},
				header: {
					'Authorization': authorization,
					'Content-Type': 'application/json'
				},
				success: (res) => {
					console.log(res.data);
					this.text = 'request success';
					this.msg = res.data
				}
			});
		},
		methods: {

		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
