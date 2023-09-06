<template>
	<div class="PlayerMenuBuyVIP">
		<div class="PlayerMenuBuyVIP__item">
			<img :src="require(`../../Assets/VIP/${VipList[0].Image}`)" />
			<div class="PlayerMenuBuyVIP__item-title">{{ VipList[0].Name }}</div>
			<div class="PlayerMenuBuyVIP__item-subtitle">{{ VipList[0].Description }}</div>
			<div class="PlayerMenuBuyVIP__item-buy-section">
				<div class="PlayerMenuCasesShop__price-section">
					<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
					<div class="PlayerMenuCasesShop__buy-price"> {{ $formatMoneyToPlayerMenu(VipList[0].Price) }} <span>{{ VipList[0].IsRubles ? "₽" : "CC" }}</span></div>
				</div>
				<div class="PlayerMenuCasesShop__button" @click="buyVip(0)">Купить</div>
			</div>
		</div>
		<div class="PlayerMenuBuyVIP__item">
			<img :src="require(`../../Assets/VIP/${VipList[1].Image}`)" />
			<div class="PlayerMenuBuyVIP__item-title">{{ VipList[1].Name }}</div>
			<div class="PlayerMenuBuyVIP__item-subtitle">{{ VipList[1].Description }}</div>
			<div class="PlayerMenuBuyVIP__item-buy-section">
				<div class="PlayerMenuCasesShop__price-section">
					<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
					<div class="PlayerMenuCasesShop__buy-price"> {{ $formatMoneyToPlayerMenu(VipList[1].Price) }} <span>{{ VipList[1].IsRubles ? "₽" : "CC" }}</span></div>
				</div>
				<div class="PlayerMenuCasesShop__button" @click="buyVip(1)">Купить</div>
			</div>
		</div>
		<div class="PlayerMenuBuyVIP__item PlayerMenuBuyVIP__item--DIAMOND">
			<img :src="require(`../../Assets/VIP/${VipList[2].Image}`)" />
			<div class="PlayerMenuBuyVIP__item-info-section">
				<div class="PlayerMenuBuyVIP__item-title">{{ VipList[2].Name }}</div>
			<div class="PlayerMenuBuyVIP__item-subtitle">{{ VipList[2].Description }}</div>
			</div>
			<div class="PlayerMenuBuyVIP__item-buy-section">
				<div class="PlayerMenuCasesShop__price-section">
					<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
					<div class="PlayerMenuCasesShop__buy-price"> {{ $formatMoneyToPlayerMenu(VipList[2].Price) }} <span>{{ VipList[2].IsRubles ? "₽" : "CC" }}</span></div>
				</div>
				<div class="PlayerMenuCasesShop__button" @click="buyVip(2)">Купить</div>
			</div>
		</div>
		<div class="PlayerMenuBuyVIP__item">
			<img :src="require(`../../Assets/VIP/${VipList[3].Image}`)" />
			<div class="PlayerMenuBuyVIP__item-title">{{ VipList[3].Name }}</div>
			<div class="PlayerMenuBuyVIP__item-subtitle">{{ VipList[3].Description }}</div>
			<div class="PlayerMenuBuyVIP__item-buy-section">
				<div class="PlayerMenuCasesShop__price-section">
					<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
					<div class="PlayerMenuCasesShop__buy-price"> {{ $formatMoneyToPlayerMenu(VipList[3].Price) }} <span>{{ VipList[3].IsRubles ? "₽" : "CC" }}</span></div>
				</div>
				<div class="PlayerMenuCasesShop__button" @click="buyVip(3)">Купить</div>
			</div>
		</div>
		<div class="PlayerMenuBuyVIP__item">
			<img :src="require(`../../Assets/VIP/${VipList[4].Image}`)" />
			<div class="PlayerMenuBuyVIP__item-title">{{ VipList[4].Name }}</div>
			<div class="PlayerMenuBuyVIP__item-subtitle">{{ VipList[4].Description }}</div>
			<div class="PlayerMenuBuyVIP__item-buy-section">
				<div class="PlayerMenuCasesShop__price-section">
					<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
					<div class="PlayerMenuCasesShop__buy-price"> {{ $formatMoneyToPlayerMenu(VipList[4].Price) }} <span>{{ VipList[4].IsRubles ? "₽" : "CC" }}</span></div>
				</div>
				<div class="PlayerMenuCasesShop__button" @click="buyVip(4)">Купить</div>
			</div>
		</div>
	</div>
</template>

<script>
import VipListJSON from '../../../../../../configServer/PlayerMenu/donateVipList.json'
export default {
  data () {
    return {
      VipList: VipListJSON
    }
  },
  methods: {
    buyVip (index) {
      mp.trigger('PlayerMenu:DonateMenu:VipStatus:Buy:Client', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuBuyVIP {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 47.685vmin);
	grid-template-rows: repeat(2, 37.778vmin);
	gap: 2.222vmin;
}

.PlayerMenuBuyVIP__item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	padding: 2.407vmin 5.648vmin;

	&>img {
		width: 14.259vmin;
		height: 11.759vmin;
		animation: floating 7s ease-in-out infinite alternate;
	}

	&--DIAMOND {
		grid-area: 1 / 3 / 3 / 4;

		&>img {
			width: 31.452vmin;
			height: 25vmin;
			mix-blend-mode: screen;
			opacity: 1;
		}
	}
}

@keyframes floating {
	0% {
		transform: translate(0, 0px);
		filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.4));
	}

	50% {
		transform: translate(0, 15px);
		filter: drop-shadow(5px 20px 15px rgba(0, 0, 0, 0.6));
	}

	100% {
		transform: translate(0, -0px);
		filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.4));
	}
}

.PlayerMenuBuyVIP__item-info-section {
	&>.PlayerMenuBuyVIP__item-title {
		margin-top: -10.185vmin;
	}
}

.PlayerMenuBuyVIP__item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	text-align: center;
	color: #FFFFFF;
	margin-top: 3.241vmin;
}

.PlayerMenuBuyVIP__item-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	text-align: center;

	color: rgba(255, 255, 255, 0.24);
	margin-top: 0.926vmin;
}

.PlayerMenuBuyVIP__item-buy-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 3.611vmin;
	width: 100%;
}

.PlayerMenuCasesShop__button {
	width: 100%;
	height: 5.093vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
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
	transition: transform 0.3s ease, border-color 0.3s ease;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		width: 110%;
		height: 140%;
		box-sizing: border-box;
		border: 2px solid #FFD646;
		border-radius: 10px;
		transform: scale(0);
		transition: transform 0.2s ease, opacity 1s ease, all 0.3s;
		opacity: 0;
	}

	&:hover {
		transform: skew(-5deg) scale(1.05);
		color: #FFD646;
		border-color: #FFD646;

		&::after {
			opacity: 1;
			transform: scale(1);
			box-shadow: 0px 0px 15px #ffd74634;
		}

		&:active {
			transform: skew(0deg) scale(0.95);
			color: #ffc800;
			border-color: #ffc800;

			&::after {
				opacity: 1;
				border: 2px solid #ffc800;
				transform: scale(1);
				box-shadow: 0px 0px 25px #ffc80060;
			}
		}
	}
}

.PlayerMenuCasesShop__buy-price-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	text-align: end;
	color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuCasesShop__buy-price {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;
	white-space: nowrap;

	&>span {
		color: #FFD646;
	}
}

.PlayerMenuCasesShop__price-section {
	margin-right: 2.963vmin;
}
</style>
