<template>
	<div>
		<div class="PlayerMenuCurrencyConversion">
			<div class="PlayerMenuCurrencyConversion__item">
				<img class="PlayerMenuCurrencyConversion__item-img"
					src="../../Assets/currencyConversion/playerMenu_Rectangle-1.png" />
				<div class="PlayerMenuCurrencyConversion__item-title">{{ DonateServicesShop.ConvertCrystalCoinsToMoney.Name }}</div>
				<div class="PlayerMenuCurrencyConversion__item-subtitle">{{ DonateServicesShop.ConvertCrystalCoinsToMoney.Description }}</div>
				<div class="PlayerMenuCurrencyConversion__item-change-courese">
					<div class="PlayerMenuCurrencyConversion__item-change-courese-item">
						<div>Вы отдатите</div>
						<div class="PlayerMenuCurrencyConversion__item-price-count">
							<input class="PlayerMenuCurrencyConversion__item-price-count" v-model="coinConvert" oninput="this.value=this.value.replace(/[^0-9]/g, '').slice(0, 7)"
								placeholder="Введите сумму..."><span>CC</span>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-change-courese-item">
						<div>Вы получите</div>
						<div class="PlayerMenuCurrencyConversion__item-price-count PlayerMenuCurrencyConversion__item-price-count--doll">{{ getCoinConvertToMoney }}</div>
					</div>
				</div>
				<div class="PlayerMenuCurrencyConversion__item-title PlayerMenuCurrencyConversion__item-title--min">
					Повышение валюты</div>
				<div class="PlayerMenuCurrencyConversion__item-subtitle">Удвой свой баланс в несколько тысяч!</div>
				<div class="PlayerMenuCurrencyConversion__item-myltiplicator"></div>
				<div class="PlayerMenuCurrencyConversion__item-button"
					@click="selectedCurrency = { value: coinConvert, currensy: 'ConvertCrystalCoinsToMoney' }">Конвертировать</div>
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
			<div class="PlayerMenuCurrencyConversion__item">
				<img class="PlayerMenuCurrencyConversion__item-img"
					src="../../Assets/currencyConversion/playerMenu_Rectangle.png" />
				<div class="PlayerMenuCurrencyConversion__item-title">{{ DonateServicesShop.ConvertRublesToCrystalCoins.Name }}</div>
				<div class="PlayerMenuCurrencyConversion__item-subtitle">{{ DonateServicesShop.ConvertRublesToCrystalCoins.Description }}</div>
				<div class="PlayerMenuCurrencyConversion__item-change-courese">
					<div class="PlayerMenuCurrencyConversion__item-change-courese-item">
						<div>Вы отдатите</div>
						<div class="PlayerMenuCurrencyConversion__item-price-count PlayerMenuCurrencyConversion__item-price-count--rub">
							<input v-model="rubConvert" oninput="this.value=this.value.replace(/[^0-9]/g, '').slice(0, 7)" placeholder="Введите сумму..."><span>₽</span>
						</div>
					</div>
					<div class="PlayerMenuCurrencyConversion__item-change-courese-item">
						<div>Вы получите</div>
						<div class="PlayerMenuCurrencyConversion__item-price-count">{{ getRublesConvertToCoin }}<span v-if="getRublesConvertToCoin"> CC</span></div>
					</div>
				</div>
				<div class="PlayerMenuCurrencyConversion__item-title PlayerMenuCurrencyConversion__item-title--min">Повышение валюты</div>
				<div class="PlayerMenuCurrencyConversion__item-subtitle">Удвой свой баланс в несколько тысяч!</div>
				<div class="PlayerMenuCurrencyConversion__item-myltiplicator"></div>
				<div class="PlayerMenuCurrencyConversion__item-button" @click="selectedCurrency = { value: rubConvert, currensy: 'ConvertRublesToCrystalCoins' }">Конвертировать</div>
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
		<div class="PlayerMenuCurrencyConversion__modal" v-if="selectedCurrency && selectedCurrency.value * 0.3">
			<div class="PlayerMenuCurrencyConversion__modal__content">
				<img class="PlayerMenuCurrencyConversion__item-img" src="../../Assets/currencyConversion/playerMenu_Rectangle.png" />
				<div class="PlayerMenuCurrencyConversion__modal-title">Подтверждение конвертации</div>
				<div class="PlayerMenuCurrencyConversion__modal-subtitle">{{ `Вы уверены что хотите конвертировать` }}
					<div> {{ $formatMoneyToPlayerMenu(selectedCurrency.value) }}</div>
					<span :class="getOpenModalName"> {{ getOpenModalName }}</span>
				</div>
				<button class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-accept" @click="convertMoney">Подтвердить</button>
				<button class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-cancel" @click="selectedCurrency = null">Отменить</button>
			</div>
		</div>
	</div>
</template>

<script>
import DonateServicesShopJSON from '../../../../../../configServer/PlayerMenu/donateServicesShop.json'
import { Vue } from 'vue-property-decorator'
export default {
  data () {
    return {
      coinConvert: undefined,
      rubConvert: undefined,
      selectedCurrency: null,
      isShowModal: false,
      DonateServicesShop: DonateServicesShopJSON
    }
  },
  mounted () {
    this.coinConvert = undefined
    this.rubConvert = undefined
    this.selectedCurrency = null
    this.isShowModal = false
  },
  methods: {
    convertMoney () {
      if (this.selectedCurrency != null && this.selectedCurrency.value > 0) {
        mp.trigger(
          'PlayerMenu:DonateMenu:ConvertMoney:Convert:Client',
          this.selectedCurrency.currensy,
          this.selectedCurrency.value
        )
      }
    }
  },
  computed: {
    getOpenModalName () {
      switch (this.selectedCurrency.currensy) {
        case 'ConvertCrystalCoinsToMoney':
          return 'CC'
        case 'ConvertRublesToCrystalCoins':
          return '₽'
        default:
          return ''
      }
    },
    getCoinConvertToMoney () {
      const priceForOne = this.DonateServicesShop.ConvertCrystalCoinsToMoney.CountOfOne
      const result = Math.floor(this.coinConvert * priceForOne)
      return Number.isNaN(result) ? undefined : `$ ${Vue.prototype.$formatMoneyToPlayerMenu(result)}`
    },
    getRublesConvertToCoin () {
      const priceForOne = this.DonateServicesShop.ConvertRublesToCrystalCoins.CountOfOne
      const result = Math.floor(this.rubConvert * priceForOne)
      return Number.isNaN(result) ? undefined : Vue.prototype.$formatMoneyToPlayerMenu(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuCurrencyConversion {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2.222vmin;
}

.PlayerMenuCurrencyConversion__modal-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
}

.PlayerMenuCurrencyConversion__modal-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	text-align: center;
	display: flex;
	color: rgba(255, 255, 255, 0.24);

	&>div {
		color: #ffffff;
		font-weight: 600;
		margin-left: 0.463vmin;
	}

	;

	&>span {
		color: #FFD646;
		font-weight: 600;
		margin-left: 0.463vmin;
	}

	&>.₽ {
		font-weight: 600;
		color: #44FF9A;
		margin-left: 0.463vmin;
	}
}

.PlayerMenuCurrencyConversion__modal-button {
	width: 38.241vmin;
	height: 5.093vmin;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	color: #FFFFFF;

	&-accept {
		background: rgba(15, 255, 212, 0.11);
		border: 0.093vmin solid rgba(15, 255, 212, 0.56);
		border-radius: 0.37vmin;
		margin-bottom: 0.741vmin;
		margin-top: 2.778vmin;
	}

	&-cancel {
		background: rgba(255, 0, 46, 0.12);
		border: 0.093vmin solid rgba(255, 0, 46, 0.46);
		border-radius: 0.37vmin;
		margin-bottom: 4.167vmin;
	}
}

.PlayerMenuCurrencyConversion__item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2.407vmin 4.722vmin;
}

.PlayerMenuCurrencyConversion__item-img {
	width: 13.913vmin;
	height: 13.913vmin;
}

.PlayerMenuCurrencyConversion__modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-55%, -55%);
	background: rgba(11, 11, 14, 0.99);
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenuCurrencyConversion__modal__content {
	width: 47.685vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	flex-direction: column;
	align-items: center;

	&>img {
		width: 15.632vmin;
		height: 15.632vmin;
		margin-top: 3.611vmin;
	}
}

.PlayerMenuCurrencyConversion__item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;

	color: #FFFFFF;
	margin-bottom: 0.648vmin;

	&--min {
		font-size: 1.481vmin;
	}
}

.PlayerMenuCurrencyConversion__item-price-count {
	background-color: transparent;
	outline: none;
	border: none;

	&>input {
		margin-right: 0.926vmin;
		background-color: transparent;
		outline: none;
		border: none;
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.667vmin;
		line-height: 2.037vmin;
		text-align: right;
		color: #FFFFFF;
		white-space: nowrap;
	}
}

.PlayerMenuCurrencyConversion__item-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	width: 38.241vmin;
	text-align: center;

	color: rgba(255, 255, 255, 0.24);

}

.PlayerMenuCurrencyConversion__item-change-courese-item {
	background: rgba(255, 255, 255, 0.01);
	border: 0.093vmin solid rgba(255, 255, 255, 0.07);
	height: 5.093vmin;
	width: 60.833vmin;
	border-radius: 0.37vmin;
	padding: 1.389vmin;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.481vmin;
	line-height: 1.759vmin;

	color: #FFFFFF;
	margin-bottom: 0.741vmin;

	&:last-child {
		margin-bottom: 3.426vmin;
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

.PlayerMenuCurrencyConversion__item-change-courese {
	margin-top: 4.63vmin;
}

.PlayerMenuCurrencyConversion__item-myltiplicator {
	width: 37.87vmin;
	height: 8.889vmin;
	margin-bottom: 3.241vmin;
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
	width:100%;
	height: 5.093vmin;
	display: flex;
	align-items: center;
	justify-content: center;
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

.PlayerMenuServicesShop__item-main-buy {
	margin-top: 1.296vmin;
	width: 100%;
}

.PlayerMenuServicesShop__item-main-price {
	width: fit-content;
	margin-right: 3.519vmin;
}
</style>
