<template>
	<div class="Shop" v-if="active">
		<div class="Shop_content">
			<!-- <img class="Shop_header-hr" src="./Assets/Shop_hr.png" /> -->
			<div>
				<div class="Shop_header">
					<img src="./Assets/Shop_logo.png" />
					<div class="PlayerMenu__sidebar-playerInfo">
						<div div class="PlayerMenu__sidebar-playerInfo-img">
							<!-- <img src="./Assets/Shop_Image2222.png" /> -->
						</div>
						<div class="PlayerMenu__sidebar-playerInfo-text">
							<div class="PlayerMenu__sidebar-playerInfo-subtitle">
								Владелец
							</div>
							<div class="PlayerMenu__sidebar-playerInfo-name-section">
								<div class="PlayerMenu__sidebar-playerInfo-name">
									{{ serverInfo.bizInfo.ownerName }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="Shop-nav-section">
					<div class="Shop-nav-list">
						<div @click="selectedNav=navItem.title" class="Shop-nav-item"
							:class="{ 'Shop-nav-item--selected': selectedNav === navItem.title }" :key="navItem.title"
							v-for="navItem in navList">
							<!-- <img :src="getImgPath(navItem.imgName)" /> -->
							<div>{{ navItem.title }}</div>
						</div>
					</div>
					<div class="Shop-nav-section-info">
						<div class="Shop_header-money-item">
							<img src="./Assets/Shop_money.png" />
							<div>
								<div>Наличные</div>
								<div>{{ $formatCurrency(serverInfo.money.cash) }} $</div>
							</div>
						</div>
						<div class="Shop_header-money-item">
							<img src="./Assets/Shop_card.png" />
							<div>
								<div>Карта</div>
								<div>{{ $formatCurrency(serverInfo.money.card) }} $</div>
							</div>
						</div>
					</div>
				</div>
				<div class="Shop-main">
					<div class="Shop-main-product-list">
						<div class="Shop-main-product-list-item" v-for="(item, index) in getShopItems.Items[selectedNav]" :key="index">
							<img src="./Assets/Shop_card-item-blue.png" />
							<div class="Shop-main-product-list-item-img">
								<!-- <img :src="'http://146.59.126.149/shop/' + item.Img + '.png'" /> -->
							</div>
							<div class="Shop-main-product-list-item-description">
								{{ item.Text }}
							</div>
							<div class="Shop-main-product-list-item-buy-section">
								<div>{{ item.Name }}</div>
								<button @click="addShopingCart(index)">
									<div>В корзину </div>
									<span>|</span>
									<div>$ {{ $formatCurrency(getPriceItem(item.Price)) }}</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="Shop_sidebar">
				<div class="Shop_header Shop_header--cart">
					<img src="./Assets/Shop_logo-cart.png" />
					<div class="PlayerMenu__header-hotkey-section" @click="exitMenu">
						<div>
							<div class="PlayerMenu__header-hotkey-title">Выйти из меню</div>
							<div class="PlayerMenu__header-hotkey-sub">Кнопка ESC</div>
						</div>
						<img src="./Assets/Shop_Esc.png" />
					</div>
				</div>
				<div class="Shop_info">
					<div>Вы добавили в корзину </div>
					<div>{{ ShoppingCart.length }} продуктов</div>
				</div>
				<div class="Shop-main-product-list Shop-main-product-list--cart">
					<div class="Shop-main-product-list-item Shop-main-product-list-item--cart" :key="index" v-for="(item, index) in ShoppingCart">
						<div>{{ getShopItems.Items[item.Type][item.Index].Name }}</div>
						<img src="./Assets/Shop-card-item-red.png" />
						<div class="Shop-main-product-list-item-img">
							<!-- <img :src="'http://146.59.126.149/shop/' + getShopItems.Items[item.Type][item.Index].Img + '.png'" /> -->
						</div>
						<div class="Shop-main-product-list-item-buy-section Shop-main-product-list-item-buy-section--cart">
							<button @click="removeItemInShopingCart(index)">
								<div>Удалить</div>
							</button>
						</div>
					</div>
				</div>
				<div class="Shop-buy-section">
					<img src="./Assets/Shop-cart-bg.svg" />
					<div class="Shop-buy-section-content">
						<div class="Shop-buy-section-header">
							<div>Магазин 24/7 #{{ serverInfo.bizInfo.id }}</div>
							<div>{{ serverInfo.time }}</div>
						</div>
						<div class="Shop-buy-section-title">Общая стоимость</div>
						<div class="Shop-buy-section-amount">$ {{ $formatCurrency(getShoppingCartPrice) }}</div>
						<div class="Shop-buy-section-buttons">
							<button @click="buy('cash')">Наличными</button>
							<button @click="buy('card')">Картой</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ShopItems from './Shop.json'
export default {
  data () {
    return {
      active: true,
      serverInfo: {
        bizInfo: {
          id: 59,
          ownerName: 'Randomchik Dev',
          nacenka: 50
        },
        money: {
          cash: 150000,
          card: 155555
        },
        time: '18:17'
      },
      selectedNav: 'Продукты',
      navList: [
        { title: 'Продукты', imgName: 'Shop_Food' },
        { title: 'Электроника', imgName: 'Shop_Electro' },
        { title: 'Разное', imgName: 'Shop_Other' }
      ],
      ShoppingCart: []
    }
  },
  computed: {
    getPriceItem () {
      return (price) => {
        if (this.serverInfo.bizInfo.nacenka <= 0) {
          return price
        }
        return parseInt(price + (price / 100 * this.serverInfo.bizInfo.nacenka))
      }
    },
    getShoppingCartPrice () {
      return this.ShoppingCart.reduce((total, item) => total + this.getPriceItem(this.getShopItems.Items[item.Type][item.Index].Price), 0)
    },
    getShopItems () {
      return ShopItems
    }
  },
  methods: {
    buy (typePay) {
      if (this.ShoppingCart.length <= 0) return
      mp.trigger('Shop:Buy:Client', String(typePay), JSON.stringify(this.ShoppingCart))
    },
    removeItemInShopingCart (index) {
      this.ShoppingCart.splice(index, 1)
    },
    addShopingCart (index) {
      this.ShoppingCart.push({
        Type: this.selectedNav,
        Index: index
      })
    },
    open (json) {
      this.serverInfo = JSON.parse(json)
      this.active = true
    },
    getImgPath (name) {
      return require(`./Assets/navIcons/${name}.svg`)
    },
    exitMenu () {
      mp.trigger('Shop:Close:Client')
    },
    updateData (json) {
      json = JSON.parse(json)
      this.serverInfo.money = json.Money
      this.serverInfo.time = json.Time
      this.ShoppingCart = []
    }
  },
  mounted () {
    if (typeof mp !== 'undefined') {
      mp.events.add('Shop:Open:Cef', this.open)
      mp.events.add('Shop:UpdateData:Cef', this.updateData)
      mp.trigger('Shop:AwaitMounted')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('Shop:Open:Cef', this.open)
      mp.events.remove('Shop:UpdateData:Cef', this.updateData)
    }
    this.active = false
    this.selectedNav = 'Продукты'
    this.ShoppingCart = []
  }
}
</script>

<style lang="scss" scoped>
.Shop {
	display: flex;
	position: absolute;
	inset: 0;

	&>* {
		user-select: none;
		font-family: PF DinDisplay Pro;
		font-size: 1.296vmin;
	}
}

.Shop-nav-section {
	display: flex;
	justify-content: space-between;
}

.Shop-nav-section-info {
	display: flex;
}

.Shop_content {
	height: 86.204vmin;
	border-radius: 2.593vmin;
	background: rgba(20, 21, 27, 0.99);
	margin: auto;
	padding: 1.111vmin 1.667vmin;
	position: relative;
	display: flex;
}

.Shop_header {
	display: flex;
	align-items: center;
	position: relative;

	&>img {
		width: 13.241vmin;
		height: 7.287vmin;
	}

	&--cart {
		justify-content: space-between;
		width: 95%;
		margin-right: 4.63vmin;

		&>img {
			width: 15.759vmin;
			height: 6.529vmin;
			margin: 0 0 0 -1.8vmin;
		}
	}
}

.Shop_header-money-item {
	display: flex;
	color: #FFF;
	font-weight: 700;

	border-radius: 0.648vmin;
	border: 0.093vmin solid rgba(255, 255, 255, 0.01);
	background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
	padding: 0.463vmin 1.111vmin 0 0;
	margin-left: 1.111vmin;

	&>img {
		max-width: 3.056vmin;
		max-height: 3.426vmin;
		width: auto;
		height: auto;
	}

	&>div>div:first-child {
		color: #51516D;
		font-size: 1.111vmin;
		font-weight: 300;
	}
}

.Shop_header-hr {
	height: 0.463vmin !important;
	width: 95% !important;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0.926vmin;
	top: 7.11vmin;
}

.Shop-nav-list {
	display: flex;

	&>div {
		display: flex;
		align-items: center;
		margin-right: 3.426vmin;

		&>img {
			margin-right: 1.019vmin;
		}
	}
}

.Shop-nav-item {
	color: #FFF;
	font-size: 1.481vmin;
	font-weight: 400;
	opacity: 0.4;
	pointer-events: all;

	&:hover {
		opacity: 1;
	}

	&--selected {
		opacity: 1;
	}
}

.Shop-main-product-list-item {
	height: 100%;
	background: radial-gradient(166.42% 213.78% at 50.00% 50.00%, rgba(57, 60, 75, 0.07) 0%, rgba(57, 60, 75, 0.00) 100%);
	border-radius: 1.481vmin;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.926vmin;
	box-sizing: border-box;
	overflow: hidden;

	&--cart {
		width: 14.352vmin;
		height: 14.259vmin;

		&>div>img {
			max-width: 8.796vmin;
			max-height: 7.407vmin;
		}

		&>div:first-child {
			color: #FFF;
			text-align: center;
			font-family: Gilroy;
			font-size: 1.296vmin;
			font-weight: 400;
		}
	}

	&:hover {
		&>img {
			filter: grayscale(0);
			opacity: 1;
		}
	}

	&>img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 0;
		width: 100%;
		transition: filter 0.15s, opacity 0.15s;
		filter: grayscale(0.5);
		opacity: 0.5;
	}

	&>div {
		position: relative;
	}
}

.Shop-main-product-list-item-img {
	max-width: 12.685vmin;
	max-height: 12.685vmin;

	&>img {
		max-width: 12.685vmin;
		max-height: 12.685vmin;
		width: auto;
		height: 100%;
	}
}

.Shop-main-product-list {
	display: grid;
	grid-template-columns: repeat(4, 25.778vmin);
	grid-template-rows: repeat(auto-fit, 25.926vmin);
	gap: 2.315vmin;
	max-height: 73vmin;
	overflow-y: scroll;
	padding-right: 0.378vmin;
	width: fit-content;
	margin: auto;

	&::-webkit-scrollbar {
		width: 0.12vmin;
	}

	&::-webkit-scrollbar-track {
		// width: 0.093vmin;
		background: rgba(255, 255, 255, 0.03);
	}

	&::-webkit-scrollbar-thumb {
		// width: 0.093vmin;
		background: #FFFFFF;
	}

	&--cart {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(auto-fit, 14.667vmin);
		gap: 0.926vmin;
		max-height: 52vmin;
		border-radius: 15.995px;
		background: rgba(255, 255, 255, 0.02);
		padding: 8.003px;
	}
}

.Shop-main-product-list-item-description {
	color: rgba(255, 255, 255, 0.35);
	text-align: center;
	font-family: Gilroy;
	font-size: 1.111vmin;
	font-style: normal;
	font-weight: 400;

	&>span {
		color: #FFF;
	}

	margin-bottom: 1.204vmin;
}

.Shop-main-product-list-item-buy-section {
	color: #FFF;
	text-align: center;
	font-family: Gilroy;
	font-size: 1.296vmin;
	font-weight: 400;
	border-radius: 1.111vmin;
	background: radial-gradient(99.15% 99.15% at 50.00% 50.00%, rgba(97, 101, 120, 0.15) 0%, rgba(97, 101, 120, 0.00) 100%);
	padding: 0.648vmin;
	justify-self: flex-end;
	position: absolute !important;
	bottom: 1vmin;

	&>button {
		border: 0.093vmin solid #508BFF;
		width: 15.741vmin;
		height: 3.426vmin;
		border-radius: 0.648vmin;
		margin-top: 0.37vmin;
		background: radial-gradient(126.67% 126.67% at 50.00% 0%, rgba(80, 139, 255, 0.25) 0%, rgba(33, 64, 124, 0.25) 100%);
		display: flex;
		align-items: center;
		justify-content: center;

		color: #FFF;
		text-align: center;
		font-family: Gilroy;
		font-size: 1.204vmin;
		font-weight: 400;

		&>span {
			margin: 0 0.463vmin;
			color: rgba(255, 255, 255, 0.35);
		}

		&:hover {
			background: radial-gradient(126.67% 126.67% at 50.00% 0%, #508BFF 0%, #21407C 100%);
			box-shadow: 0vmin 0.37vmin 5.833vmin 0vmin rgba(80, 150, 255, 0.50);
		}
	}

	&--cart {
		background: transparent;

		&>button {
			width: 12.13vmin;
			height: 2.037vmin;
			border-radius: 0.556vmin;
			border-color: #FF5050;
			background: radial-gradient(126.67% 126.67% at 50.00% 0%, rgba(255, 80, 80, 0.25) 0%, rgba(124, 33, 33, 0.25) 100%);

			&:hover {
				background: radial-gradient(126.67% 126.67% at 50.00% 0%, #FF5050 0%, #7C2121 100%);
				box-shadow: 0vmin 0.37vmin 5.833vmin 0vmin rgba(255, 80, 80, 0.50);
			}
		}
	}
}

.Shop_info {
	color: rgba(255, 255, 255, 0.20);
	font-family: PF DinDisplay Pro;
	font-size: 1.481vmin;
	font-style: normal;
	font-weight: 300;
	line-height: normal;
	margin-bottom: 0.7vmin;
	margin-left: 2vmin;

	&>div:last-child {
		color: #FFF;
	}
}

.Shop-main {
	margin-top: 1.713vmin;
}

.Shop_sidebar {
	display: flex;
	flex-direction: column;
}

.Shop-buy-section {
	border-radius: 1.204vmin;
	width: 96%;
	margin: 1.281vmin auto 0;
	height: 19.537vmin;
	flex-shrink: 0;
	display: flex;
	align-self: flex-end;
	position: relative;

	&>img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 39.981vmin;
		height: 17.315vmin;
	}
}

.Shop-buy-section-content {
	margin: auto;
	width: 25.981vmin;
	height: 13.704vMIN;
	position: relative;
}

.Shop-buy-section-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #FFF;
	font-family: Gilroy;
	font-size: 1.111vmin;
	font-weight: 500;
	letter-spacing: 0.022vmin;
	margin-bottom: 1.019vmin;
}

.Shop-buy-section-title {
	color: #FFF;
	font-family: Gilroy;
	font-size: 1.296vmin;
	font-weight: 600;
}

.Shop-buy-section-amount {
	color: #2FFF9B;
	font-family: Gilroy;
	font-size: 3.333vmin;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	letter-spacing: 0.067vmin;
}

.PlayerMenu__header-hotkey-section {
	display: flex;
	align-items: center;

	&>img {
		width: 4.63vmin;
		height: 4.63vmin;
		margin-left: 0.37vmin;
	}
}

.PlayerMenu__header-hotkey-title {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;
}

.PlayerMenu__header-hotkey-sub {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	text-align: right;
	color: rgba(255, 255, 255, 0.37);
}

.Shop-buy-section-buttons {
	display: flex;
	justify-content: space-between;
	margin-top: 1.204vmin;

	&>button {
		border-radius: 0.926vmin;
		border: none;
		background: rgba(255, 255, 255, 0.05);
		width: 10.093vmin;
		height: 4.259vmin;
		color: rgba(255, 255, 255, 0.25);
		font-family: Montserrat;
		font-size: 1.111vmin;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		letter-spacing: 0.022vmin;

		&:hover {
			color: #196D45;
			border-radius: 0.926vmin;
			background: #2FFF9B;
			box-shadow: 0vmin 0.37vmin 3.704vmin 0vmin rgba(47, 255, 155, 0.50);
		}
	}
}

.PlayerMenu__sidebar-playerInfo {
	display: flex;
}

.PlayerMenu__sidebar-playerInfo-name-section {
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenu__sidebar-playerInfo-name {
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;
}

.PlayerMenu__sidebar-playerInfo-img {
	margin-right: 0.648vmin;

	&>img {
		width: 3.704vmin;
		height: 3.704vmin;
		border-radius: 50%;
	}
}

.PlayerMenu__sidebar-playerInfo-text {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
}

.PlayerMenu__sidebar-playerInfo-subtitle {
	font-weight: 300;
	font-size: 1.111vmin;
	line-height: 1.296vmin;
	margin-bottom: 0.348vmin;
	color: #454552;
}
</style>
