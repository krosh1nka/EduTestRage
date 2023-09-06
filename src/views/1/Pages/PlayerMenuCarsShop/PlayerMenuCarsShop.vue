<template>
	<div class="PlayerMenuCarsShop">
		<div class="PlayerMenuCarsShop__list">
			<div class="PlayerMenuCarsShop__list-item" v-for="(item, index) in DonateCarList" :key="index">
				<div class="PlayerMenuCarsShop__info-item-title-section PlayerMenuCarsShop__info-item-title-section--list">
					<img class="PlayerMenuCarsShop__info-item-img PlayerMenuCarsShop__info-item-img--list"
						:src="'http://146.59.126.149/playermenu/DonateVehicles/' + item.Image" />
					<div class="PlayerMenuCarsShop__info-item-text-section">
						<div class="PlayerMenuCarsShop__info-item-title">{{ item.Name }}</div>
						<div class="PlayerMenuCarsShop__info-item-sub-title">
							{{ item.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuCarsShop__buy-section">
					<div class="PlayerMenuCarsShop__price-section">
						<div class="PlayerMenuCarsShop__buy-price-subtitle">Цена:</div>
						<div class="PlayerMenuCarsShop__buy-price"> {{ $formatMoneyToPlayerMenu(item.Price) }} <span>{{ item.IsRubles ? "₽" : "CC" }}</span></div>
					</div>
					<div class="PlayerMenuCarsShop__button" @click="buyVehicle(index)">Купить</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import CarDonateListJSON from '../../../../../../configServer/PlayerMenu/donateCars.json'
export default {
  data () {
    return {
      DonateCarList: CarDonateListJSON
    }
  },
  methods: {
    buyVehicle (index) {
      mp.trigger('PlayerMenu:DonateMenu:VehicleShop:Buy:Client', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.PlayerMenuCarsShop {
	width: 100%;
	height: 100%;
}

.PlayerMenuCarsShop__list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2.222vmin;
}

.PlayerMenuCarsShop__list-item {
	width: 100%;
	min-width: 35.185vmin;
	height: 13.796vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 2.315vmin;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.PlayerMenuCarsShop__info-item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;

	&-property {
		font-size: 1.852vmin;
		margin-top: 1.389vmin;
	}
}

.PlayerMenuCarsShop__list {
	max-height: 77.87vmin;
	overflow-y: scroll;
	padding-right: 1.944vmin;

	&::-webkit-scrollbar {
		width: 0.648vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.648vmin;
		background: #ffffff00;
	}

	&::-webkit-scrollbar-thumb {
		width: 0.648vmin;
		background: #FFFFFF;
	}
}

.PlayerMenuCarsShop__info-item-sub-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	color: rgba(255, 255, 255, 0.24);
	max-width: 28.889vmin;
	margin-top: 0.463vmin;
}

.PlayerMenuCarsShop__info-item-title-section {
	display: flex;
	align-items: center;
	justify-content: center;

	&--list {
		justify-content: unset;
		max-width: 40.741vmin;
	}
}

.PlayerMenuCarsShop__info-item-list {
	width: 33.333vmin;
	margin: auto;
	margin-top: 1.4rem;
}

.PlayerMenuCarsShop__info-item-text-section {
	display: flex;
	flex-direction: column;
}

.PlayerMenuCarsShop__info-item-list-item {
	height: 5.093vmin;
	background: rgba(255, 255, 255, 0.01);
	border: 0.093vmin solid rgba(255, 255, 255, 0.07);
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.389vmin;
	box-sizing: border-box;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.481vmin;
	line-height: 1.759vmin;

	color: #FFFFFF;
	margin-bottom: 1.204vmin;

	&:last-child {
		margin-bottom: 0;
	}
}

.PlayerMenuCarsShop__pagination-section {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.407vmin;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}

.PlayerMenuCarsShop__info-item-img {
	filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);

	&--list {
		margin: 0 2.778vmin 0 0;
		width: 14.352vmin;
		height: 9.167vmin;
	}
}

.PlayerMenuCarsShop__button {
	width: 12.5vmin;
	height: 5.093vmin;
	background: linear-gradient(180deg, rgba(142, 255, 53, 0) 0%, rgba(142, 255, 53, 0.08) 100%);
	border: 0.093vmin solid #8EFF35;
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: center;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;

	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: scale(1.1) skew(-5deg);
		box-shadow: 0 5px 25px #8dff352c;
	}

	&:active {
		transform: scale(0.95) skew(-5deg);
		box-shadow: 0 0px 50px #8dff3559;
	}
}

.PlayerMenuCarsShop__buy-section {
	display: flex;
	align-items: center;
}

.PlayerMenuCarsShop__buy-price-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	text-align: end;
	color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuCarsShop__buy-price {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;

	&>span {
		color: #FFD646;
	}
}

.PlayerMenuCarsShop__price-section {
	margin-right: 2.963vmin;
}
</style>
