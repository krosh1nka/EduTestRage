<template>
	<div class="PlayerMenuSpecialOffer">
		<div class="PlayerMenuSpecialOffer__item PlayerMenuSpecialOffer__item-1">
			<div class="PlayerMenuBuyVIP__item-bg PlayerMenuBuyVIP__item-bg--car"></div>
			<div class="PlayerMenuSpecialOffer__item-container">
				<div class="PlayerMenuSpecialOffer__item-title-section">
					<div class="PlayerMenuSpecialOffer__item-title">
						{{ SpecialOfferList[0]["Name"] }}
					</div>
					<div class="PlayerMenuSpecialOffer__item-subtitle">
						{{ SpecialOfferList[0]["Description"] }}
					</div>
				</div>
				<img class="PlayerMenuSpecialOffer__item-img" src="../../Assets/SpecialOffer/playerMenu_SpecialOffer_Cars.png" />
				<div class="PlayerMenuSpecialOffer__item-buy-section">
					<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								<div class="PlayerMenuCurrencyConversion__item-price-count">{{ $formatMoneyToPlayerMenu(SpecialOfferList[0]["Price"]) }}
									<span>{{ SpecialOfferList[0]["IsRubles"] ? "₽" : "CC" }}</span>
								</div>
							</div>
						</div>
						<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="buy(0)">Купить</div>
					</div>
					<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								<a @click="$OpenDonateCiteCrystal()">crystalrp.fun</a>
							</div>
						</div>
						<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="$OpenDonateCiteCrystal()">Пополнить</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuSpecialOffer__item PlayerMenuSpecialOffer__item-2">
			<div class="PlayerMenuBuyVIP__item-bg PlayerMenuBuyVIP__item-bg--hose"></div>
			<div class="PlayerMenuSpecialOffer__item-title-section">
				<div class="PlayerMenuSpecialOffer__item-title">
					{{ SpecialOfferList[1]["Name"] }}
				</div>
				<div class="PlayerMenuSpecialOffer__item-subtitle">
					{{ SpecialOfferList[1]["Description"] }}
				</div>
			</div>
			<img class="PlayerMenuSpecialOffer__item-img" src="../../Assets/SpecialOffer/playerMenu_SpecialOffer_Shmot.png" />
			<div class="PlayerMenuSpecialOffer__item-buy-section">
				<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
					<div class="PlayerMenuServicesShop__item-main-price">
						<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
						<div class="PlayerMenuServicesShop__item-main-price-count">
							<div class="PlayerMenuCurrencyConversion__item-price-count">{{ $formatMoneyToPlayerMenu(SpecialOfferList[1]["Price"]) }}
								<span>{{ SpecialOfferList[1]["IsRubles"] ? "₽" : "CC" }}</span>
							</div>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="buy(1)">Купить</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
					<div class="PlayerMenuServicesShop__item-main-price">
						<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
						<div class="PlayerMenuServicesShop__item-main-price-count">
							<a @click="$OpenDonateCiteCrystal()">crystalrp.fun</a>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="$OpenDonateCiteCrystal()">Пополнить</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuSpecialOffer__item PlayerMenuSpecialOffer__item-3">
			<div class="PlayerMenuBuyVIP__item-bg PlayerMenuBuyVIP__item-bg--money"></div>
			<div class="PlayerMenuSpecialOffer__item-title-section">
				<div class="PlayerMenuSpecialOffer__item-title">
					{{ SpecialOfferList[2]["Name"] }}
				</div>
				<div class="PlayerMenuSpecialOffer__item-subtitle">
					{{ SpecialOfferList[2]["Description"] }}
				</div>
			</div>
			<img class="PlayerMenuSpecialOffer__item-img" src="../../Assets/SpecialOffer/playerMenu_SpecialOffer_Card.png" />
			<div class="PlayerMenuSpecialOffer__item-buy-section">
				<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
					<div class="PlayerMenuServicesShop__item-main-price">
						<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
						<div class="PlayerMenuServicesShop__item-main-price-count">
							<div class="PlayerMenuCurrencyConversion__item-price-count">{{ $formatMoneyToPlayerMenu(SpecialOfferList[2]["Price"]) }}
								<span>{{ SpecialOfferList[2]["IsRubles"] ? "₽" : "CC" }}</span>
							</div>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="buy(2)">Купить</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
					<div class="PlayerMenuServicesShop__item-main-price">
						<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
						<div class="PlayerMenuServicesShop__item-main-price-count">
							<a @click="$OpenDonateCiteCrystal()">crystalrp.fun</a>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-button PlayerMenuCurrencyConversion__item-button--min" @click="$OpenDonateCiteCrystal()">Пополнить</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SpecialOfferListJSON from '../../../../../../configServer/PlayerMenu/donateSpecialOffers.json'
export default {
  data () {
    return {
      SpecialOfferList: SpecialOfferListJSON
    }
  },
  methods: {
    buy (index) {
      mp.trigger('PlayerMenu:DonateMenu:SpecialOffer:Buy:Client', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuBuyVIP__item-bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	&::after {
		content: "";
		position: absolute;
		width: 2000%;
		height: 5000%;
		top: 50%;
		left: 50%;
		z-index: -1;
		transform: translate(-50%, -50%);
		background: repeat;
		background-size: 500px;
		z-index: 500;
		animation: bg 520s linear infinite alternate;
		mix-blend-mode: hard-light;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&--car {
		&::after {
			background-image: url(../../Assets/SpecialOffer/playerMenu_SpecialOffer_cars_bg.png);
		}
	}

	&--hose {
		&::after {
			background-image: url(../../Assets/SpecialOffer/playerMenu_SpecialOffer_hose.png);
		}
	}

	&--money {
		&::after {
			background-image: url(../../Assets/SpecialOffer/playerMenu_SpecialOffer_money.png);
		}
	}

	&:hover {
		&::after {
			opacity: 0.2;
		}
	}

	mask: linear-gradient(0deg, rgba(255, 255, 255, 0) 20%, rgba(0, 0, 0, 0.5) 100%);
}

@keyframes bg {
	0% {
		transform: translate(-50%, -50%) rotate(-10deg);
	}

	50% {
		transform: rotate(-100000deg);
	}

	100% {
		transform: translate(100%, 100%) rotate(-10deg);
	}
}

.PlayerMenuSpecialOffer {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2.222vmin;
	box-sizing: border-box;
}

.PlayerMenuSpecialOffer__item-container {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	padding: 4.259vmin 4.722vmin 3.704vmin;
	box-sizing: border-box;
	z-index: 5000;
}

.PlayerMenuSpecialOffer__item {
	border-radius: 0.37vmin;
	padding: 4.259vmin 4.722vmin 3.704vmin;
	box-sizing: border-box;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;

	&:hover {
		&>.PlayerMenuBuyVIP__item-bg {
			&::after {
				opacity: 0.2;
			}
		}
	}

	&-1 {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 5, 65, 0.07) 0%, rgba(255, 5, 65, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #FF0541;
	}

	&-2 {
		background: radial-gradient(50% 50% at 50% 50%, rgba(5, 180, 255, 0.07) 0%, rgba(5, 180, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #05B4FF;
	}

	&-3 {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #FFFFFF;
	}
}

.PlayerMenuSpecialOffer__item-img {
	max-height: 64.815vmin;
	max-width: 100%;
	position: absolute;

	top: 50%;
	left: 0;
	transform: translateY(-50%);
	margin: auto;
	width: 100%;
	height: auto;
}

.PlayerMenuSpecialOffer__item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	text-align: center;

	color: #FFFFFF;
}

.PlayerMenuSpecialOffer__item-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	text-align: center;
	margin-top: 0.926vmin;
	color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuCurrencyConversion__item-button {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;
	width: 38.611vmin;
	height: 5.093vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	transition: transform 0.5s ease-in-out;

	&--min {
		width: 26.111vmin;
	}

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}
}

.PlayerMenuServicesShop__item-main-price-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	text-align: right;

	color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuServicesShop__item-main-buy {
	display: flex;
	align-items: center;
	justify-content: end;
}

.PlayerMenuServicesShop__item-main-price-count {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	text-align: right;
	color: #FFFFFF;
	white-space: nowrap;

	&>a {
		color: #FFFFFF;
	}

	&>span {
		color: #FFD646;
	}
}

.PlayerMenuCurrencyConversion__item-price-count {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	text-align: right;
	color: #FFFFFF;
	white-space: nowrap;

	&--doll {
		&::first-letter {
			color: rgba(255, 255, 255, 0.28);
		}
	}

	&>a {
		color: #FFFFFF;
	}

	&>span {
		color: #FFD646;
	}

	&--rub {
		&>span {
			color: #44FF9A;
		}
	}
}

.PlayerMenuServicesShop__item-main-buy {
	margin-top: 1.296vmin;
}

.PlayerMenuServicesShop__item-main-price {
	width: fit-content;
	margin-right: 3.519vmin;
}
</style>
