<template>

	<view class="container">
		<view class="carousel-section">
			<swiper class="carousel" circular @change="swiperChange" autoplay>
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item"
					@click="navToDetailPage({title: '轮播广告'})">
					<image style="max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;" :src="item.src" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="dot-main">
				<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in carouselList"
					:key="index"></view>
			</view>
		</view>
		<view class="section-list">
			<view class="section-item" v-for="(item,index) in serviceList" @click="navTo(index,item)" :key="index">
				<image :src="item.imgUrl"></image>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getToken
	} from '../utils/token.js'
	export default {
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [{
					src: "../static/haircut.png",
					background: "rgb(203, 87, 60)",
				}],
				currentTabIndex: 1,
				current: 0,
				currentPage: 'index',
				serviceList: [{
						imgUrl: '../static/images/shouji1.png',
						text: '我的订单',
						url: '/pages/index'
					},
					{
						imgUrl: '../static/images/shouye_n.png',
						text: '询价',
						url: '/pages/index'
					},
					{
						imgUrl: '../static/images/shouye.png',
						text: '地址管理',
						url: '/pages/index'
					},
				]
			};
		},

		onLoad() {
			if (!getToken()) {
				uni.navigateTo({
					url: `/pages/login`,
				})
			}
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current;
			},
			navTo(index, item) {
				// if (index <= 4) {
				// 	navigateTo(
				// 		item.url
				// 	)
				// } else {
				// 	this.showModal();
				// }


			},
			// 模态框
			showModal() {
				uni.showModal({
					title: '提示',
					content: '系统开发中，敬请期待！',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				/* let id = item.title;
				uni.navigateTo({
				  url: `/pages/product/product?id=${id}`
				}) */
			},
		},
		// 轮播图切换


	}
</script>

<style lang="scss">
	.status-bar {
		width: 100%;
		height: 100upx;
		background: #000;
	}

	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			border-radius: 20px;
			background: rgba(255, 255, 255, 0.6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */

	page {
		background-color: #f4f4f4;
		height: 100%;
	}

	.container {
		height: 100%;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
	}

	.carousel {
		width: 100%;
		height: 30vh;

		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.dot-main {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dot-item {
		width: 10upx;
		height: 10upx;
		border-radius: 50%;
		margin: 0 6upx;
		box-sizing: border-box;
		background: rgba(153, 153, 153, 0.5);
	}

	.dot-item.active {
		background: rgba(255, 255, 255, 1);
	}

	.section-list {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		background: #fff;
		margin: 0 auto;
		padding: 40upx 0;
	}

	.section-item {
		display: flex;
		flex-direction: column;
		width: 25%;
		align-items: center;
		padding: 20upx 0;
	}

	.section-item image {
		align-self: center;
		width: 105upx;
		height: 101upx;
		margin-bottom: 16upx;
	}

	.section-item text {
		font-size: 24upx;
		color: #333;
	}

	.bottom {
		padding: 20upx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 7vh;
		background: #fff;
		// position: fixed;
		// bottom: 20px;
	}

	.purpose-pic {
		margin-right: 31upx;
		width: 110upx;
		height: 77upx;
	}

	.slogan-text {
		width: 433upx;
		height: 79upx;
	}
</style>
