<template>
  <div class="GasStantion">
    <div class="GasStantion_content">
      <img class="GasStantion_header-hr" src="./Assets/hr.png" />
      <div>
        <div class="GasStantion_header">
          <img src="./Assets/GasStantion_logo.png" />
          <div class="PlayerMenu__sidebar-playerInfo">
        <div class="GasStantion_header-money-item">
          <img src="./Assets/GasStantion_money.png"/>
          <div>
            <div>Баланс</div>
            <div>4 300 ₽</div>
          </div>
        </div>
        <div class="GasStantion_header-money-item">
          <img src="./Assets/GasStantion_card.png"/>
          <div>
            <div>Баланс</div>
            <div>4 300 ₽</div>
          </div>
        </div>
        <div>
          <div class="PlayerMenu__header-hotkey-section" @click="exitMenu">
				<div>
					<div class="PlayerMenu__header-hotkey-title">Выйти из меню</div>
					<div class="PlayerMenu__header-hotkey-sub">Кнопка ESC</div>
				</div>
				<img src="./Assets/GasStantion_Esc.png" />

			</div>
				</div>
			</div>
        </div>
        <div class="GasStantion-main">
          <div class="GasStantion-main-info">
            <div class="GasStantion-main-info-item">
              <div class="GasStantion-main-info-item-subtitle">Ваш автомобиль</div>
              <div class="GasStantion-main-info-item-name">MITSUBISHI LANCER X</div>
              <div class="GasStantion-main-info-item-info">Для вашего автомобиля доступен вид топлива <span>“БЕНЗИН”</span></div>
              <div class="GasStantion-main-info-item-gas-info">
                <div><div>Топливо в баке:</div> <span>48k</span></div>
                <div class="GasStantion-main-info-item-gas-info-range">
                  <div class="GasStantion-main-info-item-gas-info-range-item"
                  :class="{'GasStantion-main-info-item-gas-info-range-item--full': i <= 2 }"
                  :key="i" v-for="i in 9"></div>
                </div>
              </div>
            </div>
            <div class="GasStantion-main-select-section">
              <div class="GasStantion-main-select-title">
                Количество топлива
              </div>
              <div class="GasStantion-main-select-info">
                <div>За литр <span>50$</span></div>
                <div>Будет залито <span>45 L. </span></div>
              </div>
              <div class="GasStantion-main-select-input-section">
                <div :style="{left: getProcent(gasData) + '%'}">{{ gasData.value + "л."}}</div>
                  <input type="range" :style="{background: `linear-gradient(90deg, #FFF ${getProcent(gasData) + '%'}, rgba(115, 115, 147, 0.10) 0%)`}" :min="gasData.minValue" :max="gasData.maxValue" v-model="gasData.value" />
                </div>
            </div>
          </div>
          <div class="GasStantion-main-product-list">
            <div class="GasStantion-main-product-list-item" :key="i" v-for="i in 4">
              <img src="./Assets/GasStantion_card-item-blue.png" />
              <div class="GasStantion-main-product-list-item-img">
                <img src="./Assets/testImg.png" />
              </div>
              <div class="GasStantion-main-product-list-item-description">
                Пополнит ваш голод на <span>40%</span>
                Пополнит ваш голод на <span>40%</span>
                Пополнит ваш голод на <span>40%</span>
              </div>
              <div class="GasStantion-main-product-list-item-buy-section">
                <div>{{ "Burger" }}</div>
                <button>
                  <div>В корзину </div>
                  <span>|</span>
                  <div>$50,000</div>
                </button>
              </div>
            </div>
          </div>
          <div class="GasStantion-main-product-cart">
            <div class="GasStantion-main-product-cart-header">
              <img src="./Assets/GasStantion_logo-cart.png" />
              <div class="GasStantion_info">
                <div>Вы добавили в корзину </div>
                <div>25 продуктов</div>
              </div>
            </div>
            <div class="Gas-main-product-list-cart" >
                <div @wheel="handleScroll">
                <div class="GasStantion-main-product-list-item GasStantion-main-product-list-item--cart" :key="i" v-for="i in 18">
                  <img src="./Assets/GasStantion-card-item-red.png" />
                  <div class="GasStantion-main-product-list-item-img">
                    <img src="./Assets/testImg.png" />
                  </div>
                  <div class="GasStantion-main-product-list-item-buy-section GasStantion-main-product-list-item-buy-section--cart">
                <div>{{ "Burger" }}</div>
                <button>
                  <div>Удалить</div>
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="GasStantion-buy-section">
          <img src="./Assets/GasStantion-cart-bg.svg" />
          <div class="GasStantion-buy-section-content">
            <div class="GasStantion-buy-section-header">
              <div>Los Santos 24/7 #58</div>
              <div>18:45</div>
            </div>
            <div class="GasStantion-buy-section-title">Общая стоимость</div>
            <div class="GasStantion-buy-section-amount">$658.64</div>
            <div class="GasStantion-buy-section-buttons">
              <button>Наличными</button>
              <button>Картой</button>
          </div>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gasData: {
        maxValue: 130,
        minValue: 40,
        value: 40
      }
    }
  },
  methods: {
    getImgPath (name) {
      return require(`./Assets/navIcons/${name}.svg`)
    },
    getProcent (data) {
      return (data.value - data.minValue) / (data.maxValue - data.minValue) * 100
    },
    exitMenu () {

    },
    handleScroll (event) {
      const container = event.currentTarget
      if (event.deltaY > 0) {
        container.scrollLeft += 75
      } else {
        container.scrollLeft -= 75
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: url(./Assets/bg.png);
}
  .GasStantion {
    display: flex;
    position: absolute;
    inset: 0;
     & > * {
      user-select: none;
      font-family: PF DinDisplay Pro;
      font-size: 1.296vmin;
     }
  }

  .GasStantion-nav-section {
    display: flex;
    justify-content: space-between;
  }

  .GasStantion-nav-section-info {
    display: flex;
    margin-left: 1.111vmin;
  }

  .GasStantion_content {
    border-radius: 2.593vmin;
    background: rgba(20, 21, 27, 0.99);
    margin: auto;
    padding: 1.111vmin 1.667vmin;
    position: relative;
    display: flex;
  }

  .GasStantion_header {
    display: flex;
    align-items: center;
    position: relative;
    height: 9.259vmin;
    & > img {
      width: 31.015vmin;
      height: 7.704vmin;
    }

    &--cart {
      justify-content: space-between;
      width: 95%;
      margin-right: 4.63vmin ;
      & > img {
        width: 15.759vmin;
        height: 6.529vmin;
        margin: 0 0 0 -1.8vmin ;
      }
    }
  }

  .GasStantion_header-money-item {
    display: flex;
    color: #FFF;
    font-weight: 700;

    border-radius: 0.648vmin;
    border: 0.093vmin solid rgba(255, 255, 255, 0.01);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    padding: 0.463vmin 1.111vmin 0 0;
    margin-left: 1.111vmin;

    & > img {
      max-width: 3.056vmin;
      max-height: 3.426vmin;
      width: auto;
      height: auto;
    }

    & > div > div:first-child {
      color: #51516D;
      font-size: 1.111vmin;
      font-weight: 300;
    }
  }

  .GasStantion_header-hr {
    height: 0.463vmin !important;
    width: 95% !important;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.926vmin;
    top: 8.889vmin;
  }

  .GasStantion-nav-list {
    display: flex;
    & > div {
      display: flex;
      align-items: center;
      margin-right: 3.426vmin;
      & > img {
        margin-right: 1.019vmin;
      }
    }
  }

  .GasStantion-nav-item {
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

  .GasStantion-main-product-list-item {
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
      min-width: 18.074vmin;
      height: 18.259vmin;
      margin-right: 10px;

      & > div > img {
        max-width: 12.796vmin;
        max-height: 10.407vmin;
      }

      & > div:first-child {
        color: #FFF;
        text-align: center;
        font-family: Gilroy;
        font-size: 1.296vmin;
        font-weight: 400;
      }
    }

    &:hover {
      & > img {
        filter: grayscale(0);
        opacity: 1;
      }
    }

    & > img {
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

    & > div {
      position: relative;
    }
  }

  .GasStantion-main-product-list-item-img {
    max-width: 12.685vmin;
    max-height: 12.685vmin;
     & > img {
      max-width: 12.685vmin;
      max-height: 12.685vmin;
      width: auto;
      height: 100%;
     }
  }

  .GasStantion-main-product-list {
    display: grid;
    grid-template-columns: repeat(4, 25.778vmin) ;
    grid-template-rows: repeat(auto-fit, 25.926vmin) ;
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
      background: rgba(255, 255, 255, 0.03);
    }

    &::-webkit-scrollbar-thumb {
      background: #FFFFFF;
    }

    &--cart {
      grid-template-columns: repeat(2 , 1fr);
      grid-template-rows: repeat(auto-fit, 14.667vmin) ;
      gap: 0.926vmin;
      max-height: 52vmin;
      border-radius: 1.481vmin;
      background: rgba(255, 255, 255, 0.02);
      padding: 0.741vmin;
     }
  }

  .GasStantion-main-product-list-item-description {
    color: rgba(255, 255, 255, 0.35);
    text-align: center;
    font-family: Gilroy;
    font-size: 1.111vmin;
    font-style: normal;
    font-weight: 400;
    & > span {
      color: #FFF;
    }
    margin-bottom: 1.204vmin;
  }

  .GasStantion-main-product-list-item-buy-section {
    color: #FFF;
    text-align: center;
    font-family: Gilroy;
    font-size: 1.296vmin;
    font-weight: 400;
    border-radius: 1.111vmin;
    background: radial-gradient(99.15% 99.15% at 50.00% 50.00%, rgba(97, 101, 120, 0.15) 0%, rgba(97, 101, 120, 0.00) 100%);
    padding: 0.648vmin;
    justify-self: flex-end;
    width: 90%;
    position: absolute !important;
    bottom: 0.463vmin;

    & > button {
      border: 0.093vmin solid #508BFF;
      width: 90%;
      margin: auto;
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

      & > span {
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
        & > button {
          width: 100%;
          height: 2.537vmin;
          border-radius: 0.556vmin;
          margin: 1.004vmin auto 0;
          border-color:#FF5050;
          background: radial-gradient(126.67% 126.67% at 50.00% 0%, rgba(255, 80, 80, 0.25) 0%, rgba(124, 33, 33, 0.25) 100%);
          &:hover {
            background: radial-gradient(126.67% 126.67% at 50.00% 0%, #FF5050 0%, #7C2121 100%);
            box-shadow: 0vmin 0.37vmin 5.833vmin 0vmin rgba(255, 80, 80, 0.50);
          }
        }
    }
  }

  .GasStantion_info {
    color: rgba(255, 255, 255, 0.20);
    font-family: PF DinDisplay Pro;
    font-size: 1.481vmin;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    text-align: right;
    margin-bottom: 0.7vmin ;
    margin-left: 2vmin;
     & > div:last-child {
      color: #FFF;
     }
  }

  .GasStantion-main {
    margin-top: 1.713vmin;
  }

  .GasStantion-buy-section {
    width: 26.389vmin;
    height: 19.537vmin;
    flex-shrink: 0;
    display: flex;
    border-radius: 13px;
    background: rgba(11, 11, 14, 0.65);
    position: absolute;
    right: -1.204vmin;
    bottom: 0;
    transform: translateX(100%);
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 39.981vmin;
      height: 17.315vmin;
    }
  }

  .GasStantion-buy-section-content {
    margin: auto;
    width: 20.981vmin;
    height: 13.704vMIN;
    position: relative;
  }

  .GasStantion-buy-section-header {
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

  .GasStantion-buy-section-title {
    color: #FFF;
    font-family: Gilroy;
    font-size: 1.296vmin;
    font-weight: 600;
  }

  .GasStantion-buy-section-amount {
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
    justify-self: end;
    margin-left: 43.83vmin;

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

  .GasStantion-buy-section-buttons {
    display: flex;
    justify-content: space-between;
    margin-top:  1.204vmin;
    & > button {
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

.GasStantion-main-info {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
}

.GasStantion-main-info-item {
  width: 59.667vmin;

}

.GasStantion-main-info-item-subtitle {
  color: rgba(255, 255, 255, 0.25);
  font-family: PF DinDisplay Pro;
  font-size: 1.296vmin;
  font-weight: 300;
}

.GasStantion-main-info-item-name {
  background: linear-gradient(114deg, #FD6332 0%, #FF8C68 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0vmin 0.37vmin 3.519vmin 0vmin rgba(253, 99, 50, 0.50);
  font-family: PF DinDisplay Pro;
  font-size: 2.222vmin;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.GasStantion-main-info-item-info {
  color: rgba(255, 255, 255, 0.50);
  font-family: PF DinDisplay Pro;
  font-size: 1.296vmin;
  font-style: normal;
  font-weight: 300;
  line-height: 0%;
  margin-top: 0.463vmin;

& > span {
    color: #FFF;
    font-size: 1.296vmin;
    font-weight: 500;
    line-height: 0%;
  }
}

.GasStantion-main-info-item-gas-info {
    color: #FFF;
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 1.204vmin;
    width: 18.704vmin;

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span {
        justify-self: flex-end;
      }
      & > div {
        display: flex;
        align-items: center;
        &::before {
          content: "";
          width: 1.481vmin;
          height: 1.481vmin;
          margin-right: 0.463vmin;
          background: url(./Assets//GasStantion_gas-icon.svg) no-repeat center/contain;
       }
      }
    }
}

.GasStantion-main-info-item-gas-info-range{
  display: flex;
}

.GasStantion-main-select-section {
  border-radius: 0.926vmin;
  background: rgba(97, 101, 120, 0.09);
  padding: 0.741vmin 1.111vmin;
  width: 100%;
  margin-left: 9.259vmin;
}

.GasStantion-main-select-title{
  color: #FFF;
  font-size: 1.667vmin;
  font-weight: 400;
}

.GasStantion-main-select-info {
  color: rgba(255, 255, 255, 0.26);
  font-size: 1.296vmin;
  display: flex;
  margin-top: 7px;
  & > div {
    margin-right: 1.389vmin;
    &:last-child {
      margin-right: 0;
    }
    & > span {
      color: rgba(255, 255, 255, 1);
    }
  }
}

.GasStantion-main-info-item-gas-info-range-item {
  width: 1.944vmin;
  height: 0.463vmin;
  flex-shrink: 0;
  border-radius: 0.648vmin;
  background: rgba(97, 101, 120, 0.15);
  margin-right: 0.185vmin;
  margin-top: 0.463vmin;

  &--full {
    background: rgb(255, 255, 255);
  }
}

.GasStantion-main-select-input-section {
  color: #FFF;
  text-align: center;
  font-size: 1.296vmin;
  font-weight: 500;
  margin-top: 3.704vmin;
  position: relative;

  & > div {
    position: absolute;
    top: -1.852vmin;
    transform: translate(-5%);
  }

  & > input {
    appearance: none;
    width: 100%;
    height: 0.648vmin;
    border-radius: 0.556vmin;
    background: linear-gradient(90deg, #FFF 60%, rgba(115, 115, 147, 0.10) 0%);

    &::-webkit-slider-thumb {
      appearance: none;
      border-radius: 0.926vmin;
      border: 0.278vmin solid rgba(80, 139, 255, 0.41);
      background: #508BFF;
      width: 1.204vmin;
      height: 1.204vmin;
    }
  }
}

.GasStantion-main-product-cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Gas-main-product-list-cart {
  width: 110.481vmin;
  margin: auto;

  & > div {
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: scroll;
    display: flex;

    &::-webkit-scrollbar {
		 height: 0.12vmin;
	  }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.03);
    }

    &::-webkit-scrollbar-thumb {
      background: #FFFFFF;
    }
  }

  overflow: hidden;
}

</style>
