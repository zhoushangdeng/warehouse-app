<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/haircut.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="username">
					<input class="input" type="text" value="" v-model="formData.username" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<input class="input" type="password" value="" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>

			<view class="loginBtn" @click="submit">
				<text class="btnValue">登录</text>
			</view>
		</view>


		<!-- <view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" v-model="iphone"  placeholder="请输入手机号"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" v-model="password" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="login">登录</text>
			</view> -->

		<!-- <button  @click="submit">登录</button> -->
		<view class="forgotBtn">
			<navigator url="../register/register"><text>- 注册 -</text></navigator>
		</view>

	</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: '',
				},
				rules: {
					iphone: {
						rules: [{
							required: true,
							errorMessage: '请输入注册手机号码'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = /^1[0-9]{10}$/
								if (!iphoneReg.test(value)) {
									callback('手机号码格式不正确，请重新填写')
								}
								return true
							}
						}]
					}
				}
			}
		},
		onLoad() {

		},
		methods: {

			submit() {
				uni.request({
					url: 'http://42.193.149.90:6006/library/login', //仅为示例，并非真实接口地址。
					data: {
						'email': "admin",
						'password': "1234567890",
						'studentCode': "admin",
						'username': "admin"
					},
					header: {
						'Content-Type': 'application/json'
					},
					success: (res) => {

						uni.navigateTo({
							url: `/pages/home/index`,
						})
					}
				});
			},

			req(action, params) {
				uni.showLoading({
					title: '登录中'
				})
				return new Promise((resolve) => {
					uniCloud.callFunction({
						name: 'user-center',
						data: {
							action,
							params
						},
						success: res => {
							uni.hideLoading()
							resolve(res.result);
						},
						fail: res => {
							resolve(res)
						}
					})
				})
			},


			login(e) {

				this.req("login", {
					username: this.formData.iphone,
					password: this.formData.password
				}).then(res => {
					console.log(res)
					uni.setStorageSync('uni_id_token', res.token)
					uni.setStorageSync('uni_id_token_expired', res.tokenExpired)
					uni.setStorageSync('userInfo', res.userInfo.username)
					uni.navigateTo({
						url: `/pages/indorse/index?id=${e.policyId}`,
					})

				})
				console.log("跳转提醒")
			},




		}
	}
</script>



<style>
	.content {
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		margin-top: 16px;
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 300upx;
		height: 300upx;
		overflow: hidden;
	}

	.avator .img {
		width: 100%
	}

	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}

	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
	}

	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #1e3151;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loginBtn:active {
		background: #1e3151;
	}

	.loginBtn .btnValue {
		color: white;
	}

	.forgotBtn {
		text-align: center;
		color: #8d8d8d;
		font-size: 15px;
		margin-top: 20px;
	}
</style>
