<template>
	<div v-if="DonateServicesShop">
		<div class="PlayerMenuServicesShop">
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-1">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img" src="../../Assets/Services/playerMenu_VARN.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.UnWarn.Name }}</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.UnWarn.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main">
					<div class="PlayerMenuServicesShop__item-main-info">
						<div>Предупреждений</div>
						<div>{{ $formatMoneyToPlayerMenu(getPlayerInfo.warns) }}</div>
					</div>
					<div class="PlayerMenuServicesShop__item-main-buy">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Цена:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								{{ $formatMoneyToPlayerMenu(DonateServicesShop.UnWarn.Price) }} <span>{{ DonateServicesShop.UnWarn.IsRubles ? "₽" : "CC" }}</span>
							</div>
						</div>
						<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center" @click="selectService('UnWarn')">Снять</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-2">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img" src="../../Assets/Services/playerMenu_Skin.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.ChangeAppearance.Name }}</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.ChangeAppearance.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main-buy">
					<div class="PlayerMenuServicesShop__item-main-price">
						<div class="PlayerMenuServicesShop__item-main-price-subtitle">Цена:</div>
						<div class="PlayerMenuServicesShop__item-main-price-count">
							{{ $formatMoneyToPlayerMenu(DonateServicesShop.ChangeAppearance.Price) }} <span>{{ DonateServicesShop.ChangeAppearance.IsRubles ? "₽" : "CC" }}</span>
						</div>
					</div>
					<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center" @click="selectService('ChangeApperance')">Сменить</div>
				</div>
			</div>
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-3">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img" src="../../Assets/Services/playerMenu_Tocken.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.Gold.Name }}</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.Gold.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main">
					<div class="PlayerMenuServicesShop__item-main-info">
						<div>Кол-во коинов</div>
						<input class="PlayerMenuServicesShop__item-main-info-gold" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 7)"
							type="text" v-model="convertGoldValue">
					</div>
					<div class="PlayerMenuServicesShop__item-main-buy">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Цена:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								1 <span>Gold</span> = {{ DonateServicesShop.Gold.Price }}
								<span>{{ DonateServicesShop.Gold.IsRubles ? "₽" : "CC" }}</span>
							</div>
						</div>
						<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center"
							@click="selectedCurrency = { value: convertGoldValue, currensy: 'GoldToCrystalCoins' }">
							Конвертировать
						</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-4">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img" src="../../Assets/Services/playerMenu_Nick.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.ChangeName.Name }}</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.ChangeName.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main">
					<input class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--input"
						v-model="newName" type="text" placeholder="Ник..." />
					<div class="PlayerMenuServicesShop__item-main-buy">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Цена:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								{{ $formatMoneyToPlayerMenu(DonateServicesShop.ChangeName.Price) }} <span>
									{{ DonateServicesShop.ChangeName.IsRubles ? "₽" : "CC" }}</span>
							</div>
						</div>
						<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center"
							@click="selectService('ChangeName')">Сменить</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-5">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img"
						src="../../Assets/Services/playerMenu_Statistic.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.Spending.Name }}</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.Spending.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main">
					<div class="PlayerMenuServicesShop__item-main-list">
						<div class="PlayerMenuServicesShop__item-main-info" v-for="(spending, index) in getSpendingList" :key="index">
							<div>{{ spending.Name }}</div>
							<div>
								{{ $formatMoneyToPlayerMenu(spending.Price) }}
								<span :class="`PlayerMenuServicesShop__item-currency-${spending.IsRubles ? '₽' : 'CC'}`">
									{{ spending.IsRubles ? "₽" : "CC" }}
								</span>
							</div>
						</div>
					</div>
					<div class="PlayerMenuServicesShop__item-main-buy PlayerMenuServicesShop__item-main-buy--link">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Наш сайт:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								<a @click="$OpenDonateCiteCrystal()">crystalrp.fun</a>
							</div>
						</div>
						<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center"
							@click="$OpenDonateCiteCrystal()">Пополнить</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuServicesShop__item PlayerMenuServicesShop__item-6">
				<div class="PlayerMenuServicesShop__info-item-title-section">
					<img class="PlayerMenuServicesShop__info-item-img" src="../../Assets/Services/playerMenu_License.png" />
					<div class="PlayerMenuServicesShop__info-item-text-section">
						<div class="PlayerMenuServicesShop__info-item-title">{{ DonateServicesShop.PacketLicenses.Name }}
						</div>
						<div class="PlayerMenuServicesShop__info-item-sub-title">
							{{ DonateServicesShop.PacketLicenses.Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuServicesShop__item-main">
					<div class="PlayerMenuServicesShop__item-main-info">
						<div>Линцензии</div>
						<div>{{ DonateServicesShop.PacketLicenses.Text }}</div>
					</div>
					<div class="PlayerMenuServicesShop__item-main-buy">
						<div class="PlayerMenuServicesShop__item-main-price">
							<div class="PlayerMenuServicesShop__item-main-price-subtitle">Цена:</div>
							<div class="PlayerMenuServicesShop__item-main-price-count">
								{{ $formatMoneyToPlayerMenu(DonateServicesShop.PacketLicenses.Price) }} <span>{{
									DonateServicesShop.PacketLicenses.IsRubles ? "₽" : "CC" }}</span>
							</div>
						</div>
						<div class="PlayerMenuServicesShop__item-main-info PlayerMenuServicesShop__item-main-info--center"
							@click="selectService('BuyLicenses')">Снять</div>
					</div>
				</div>
				<Transition name="showModal">
					<div class="PlayerMenuCurrencyConversion__modal" v-if="selectedCurrency != null">
						<div class="PlayerMenuCurrencyConversion__modal__content">
							<img class="PlayerMenuCurrencyConversion__item-img"
								src="../../Assets/currencyConversion/playerMenu_Rectangle.png" />
							<div class="PlayerMenuCurrencyConversion__modal-title">Подтверждение конвертации</div>
						<div class="PlayerMenuCurrencyConversion__modal-subtitle">Вы уверены что хотите конвертировать
							<div> {{ $formatMoneyToPlayerMenu(selectedCurrency.value) }}</div>
							<span :class="getOpenModalName"> {{ getOpenModalName }}</span>
						</div>
						<button
							class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-accept"
							@click="selectService('GoldToCrystalCoins')">Подтвердить</button>
						<button class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-cancel" @click="selectedCurrency=null">Отменить</button>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</div></template>

<script>
import DonateServicesShopJSON from '../../../../../../configServer/PlayerMenu/donateServicesShop.json'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      newName: undefined,
      convertGoldValue: undefined,
      selectedCurrency: null,
      DonateServicesShop: DonateServicesShopJSON
    }
  },
  methods: {
    selectService (type) {
      switch (type) {
        case 'ChangeName':
          mp.trigger('PlayerMenu:DonateMenu:ServiceShop:Buy:Client', 'ChangeName', this.newName)
          break
        case 'GoldToCrystalCoins':
          if (this.selectedCurrency == null || this.selectedCurrency.value <= 0) return
          mp.trigger('PlayerMenu:DonateMenu:ConvertMoney:Convert:Client',
            this.selectedCurrency.currensy,
            this.selectedCurrency.value
          )
          this.selectedCurrency = null
          break
        default:
          mp.trigger('PlayerMenu:DonateMenu:ServiceShop:Buy:Client', type)
          break
      }
    }
  },
  mounted () {
    this.convertGoldValue = undefined
    this.newName = undefined
  },
  computed: {
    getOpenModalName () {
      return this.DonateServicesShop.Gold.IsRubles ? '₽' : 'CC'
    },
    ...mapGetters({
      getPlayerInfo: 'getPlayerInfo',
      getSpendingList: 'PlayerMenu_getSpendingList'
    })
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuServicesShop {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 30.463vmin 4.722vmin 37.685vmin;
	gap: 2.222vmin;
}

.PlayerMenuServicesShop__item-main-info-gold {
	background-color: transparent;
	border: none;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	text-align: center;
	color: #FFFFFF;
	outline: none;
	border-bottom: 1px solid #ffffff10 ;
}

.PlayerMenuServicesShop__item {
	border-radius: 0.37vmin;
	padding: 3.148vmin 4.722vmin;

	&-1 {
		grid-area: 1 / 1 /3 / 2;
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 15, 15, 0.07) 0%, rgba(255, 15, 15, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #FF0F0F;
	}

	&-2 {
		grid-area: 1 / 2 / 2 / 3;
		background: radial-gradient(50% 50% at 50% 50%, rgba(173, 255, 0, 0.07) 0%, rgba(173, 255, 0, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #ADFF00;
	}

	&-3 {
		grid-area: 1 / 3 / 3 / 4;
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 230, 0, 0.07) 0%, rgba(255, 198, 53, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #FFE600;
	}

	&-4 {
		grid-area: 3 / 1 / 4 / 2;
		background: radial-gradient(50% 50% at 50% 50%, rgba(107, 255, 237, 0.07) 0%, rgba(107, 255, 237, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #6BFFED;
	}

	&-5 {
		padding-top: 1.944vmin;
		grid-area: 2 / 2 / 4 / 3;
		background: radial-gradient(50% 50% at 50% 50%, rgba(86, 123, 255, 0.07) 0%, rgba(86, 123, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #567BFF;
	}

	&-6 {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 153, 0, 0.07) 0%, rgba(255, 153, 0, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 0.093vmin solid #FF9900;
	}
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

.showModal-enter-active,
.showModal-leave-active {
	transition: opacity 0.5s ease;
}

.showModal-enter-from,
.showModal-leave-to {
	opacity: 0;
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
	text-align: center;

	color: rgba(255, 255, 255, 0.24);

}

.PlayerMenuCurrencyConversion__item-change-courese-item {
	background: rgba(255, 255, 255, 0.01);
	border: 0.093vmin solid rgba(255, 255, 255, 0.07);
	height: 5.093vmin;
	width: 38.241vmin;
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

.PlayerMenuServicesShop__info-item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
}

.PlayerMenuServicesShop__info-item-sub-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	color: rgba(255, 255, 255, 0.24);
	max-width: 28.889vmin;
	margin-top: 0.463vmin;
}

.PlayerMenuServicesShop__info-item-title-section {
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenuServicesShop__info-item-text-section {
	display: flex;
	flex-direction: column;
}

.PlayerMenuServicesShop__info-item-img {
	margin: 0 2.778vmin 0 0;
	width: 14.259vmin;
	height: 14.259vmin;
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

.PlayerMenuServicesShop__item-currency {
	&-CC {
		color: #FFD646;
	}

	&-₽ {
		color: #44FF9A;
	}
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
	margin-top: 2.5vmin;
}

.PlayerMenuServicesShop__item-main {
	margin-top: 1.852vmin;
	max-width: 100%;
	width: 100%;
}

.PlayerMenuServicesShop__item-main-price {
	width: fit-content;
	margin-right: 3.519vmin;
}

.PlayerMenuServicesShop__item-main-info {
	height: 5.093vmin;
	background: rgba(255, 255, 255, 0.01);
	border: 0.093vmin solid rgba(255, 255, 255, 0.07);
	border-radius: 0.37vmin;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 1.389vmin;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.481vmin;
	line-height: 1.759vmin;

	color: #FFFFFF;

	&--center {
		justify-content: center;
		max-width: 100%;
    width: 100%;
		transition: background-color 0.3s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.068);
		}
	}
}

.PlayerMenuServicesShop__item-main-list {
	overflow-y: scroll;
	height: 16.759vmin;
	padding-right: 0.463vmin;

	&::-webkit-scrollbar {
		width: 0.37vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.37vmin;
		background: #ffffff00;
	}

	&::-webkit-scrollbar-thumb {
		width: 0.37vmin;
		background: #FFFFFF;
	}

	&>.PlayerMenuServicesShop__item-main-info {
		margin-bottom: 0.556vmin;
		box-sizing: border-box;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.PlayerMenuServicesShop__item-main-info--input {
	width: 38.241vmin;
	outline: none;
	box-sizing: border-box;
	margin: auto;
}
</style>
