<template>
  <div class="PlayerMenuAccountSettings">
    <AuthModal v-if="showAuthModal"/>
    <div class="PlayerMenuAccountSettings__settings">
      <div>SocialClub</div>
      <div>Пароль
        <span v-if="!isShowPassword" @click="() => isShowPassword = true">Изменить</span>
        <div @click="() => isShowPassword = false" v-else>6B3zZy7Fh2</div>
      </div>
      <div>Email
        <span v-if="!isShowEmail" @click="() => showModal = true">Изменить</span>
        <div @click="() => isShowEmail = false" v-else>6B3zZy7Fh2@gmail.com</div></div>
    </div>
    <div class="PlayerMenuAccountSettings__auth">
      <div>
        Google Autenticator
        <span v-if="activeted">Выключено</span>
        <div   v-else>Включено</div>
      </div>
      <button @click="() => showAuthModal = true">Активировать</button>
    </div>
    <div class="PlayerMenuCurrencyConversion__modal" v-if="showModal">
			<div class="PlayerMenuCurrencyConversion__modal__content">
				<!-- <img class="PlayerMenuCurrencyConversion__item-img" src="../../Assets/currencyConversion/playerMenu_Rectangle.png" /> -->
				<div class="PlayerMenuCurrencyConversion__modal-title">Подтверждение конвертации</div>
				<!-- <div class="PlayerMenuCurrencyConversion__modal-subtitle">{{ `Вы уверены что хотите конвертировать` }}
					<div> {{ $formatMoneyToPlayerMenu(selectedCurrency.value) }}</div>
					<span :class="getOpenModalName"> {{ getOpenModalName }}</span>
				</div> -->
        <input v-model="newValue"/>
				<button class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-accept" @click="convertMoney">Подтвердить</button>
				<button class="PlayerMenuCurrencyConversion__modal-button PlayerMenuCurrencyConversion__modal-button-cancel" @click="selectedCurrency = null">Отменить</button>
			</div>
		</div>
  </div>
</template>

<script>
import AuthModal from './Compontents/AuthModal.vue'
export default {
  data () {
    return {
      showAuthModal: false,
      isShowPassword: false,
      isShowEmail: false,
      activeted: false,
      password: '6B3zZy7Fh2@gmail.com',
      showModal: false,
      newValue: ''
    }
  },
  components: {
    AuthModal
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuCurrencyConversion__modal-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
}
.PlayerMenuAccountSettings__auth {
  width: 45.648vmin;
  border-radius: 0.463vmin;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);

  color: #FFF;
  font-family: Montserrat;
  font-weight: 700;
  line-height: 2.593vmin;
  padding: 2.407vmin 1.574vmin;
  margin-top: 0.926vmin;

  & > button {
    border-radius: 0.37vmin;
    height: 5.093vmin;
    width: 100%;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    color: #FFF;
    font-size: 1.667vmin;
    font-family: Montserrat;
    font-weight: 700;
    transition: transform 0.1s ease-in-out;

    &:hover {
      border-color: #FFF;
    }
    &:active {
      transform: scale(0.98);
    }
  }

  & > div  {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.926vmin;
    align-items: center;
      &:last-child {
        margin-bottom: 0;
      }

      & > span {
      color: rgba(255, 255, 255, 0.26);
      font-size: 1.296vmin;
      font-weight: 500;
      position: relative;
      margin-right: 1.852vmin;
      color: #FF7171;
      &::after {
        content: "";
        width: 1.589vmin;
        height: 1.589vmin;
        background: url(./lock.svg) no-repeat center/contain;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 0.463vmin;
      }
    }
      & > div {
      color: rgba(255, 255, 255, 0.26);
      font-size: 1.296vmin;
      font-weight: 500;
      position: relative;
      margin-right: 1.852vmin;
      color: #40BF6A;
      &::after {
        content: "";
        width: 1.589vmin;
        height: 1.589vmin;
        background: url(./unlock.svg) no-repeat center/contain;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 0.463vmin;
      }
    }
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
	}
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
  padding: 10px;
	align-items: center;

  & > input {
    border-radius: 0.37vmin;
    height: 5.093vmin;
    width: 100%;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    color: #FFF;
    font-size: 1.667vmin;
    font-family: Montserrat;
    font-weight: 700;
    transition: transform 0.1s ease-in-out;
    margin-TOP: 10PX;

    &:hover {
      border-color: #FFF;
    }
    &:active {
      transform: scale(0.98);
    }
  }

	&>img {
		width: 15.632vmin;
		height: 15.632vmin;
		margin-top: 3.611vmin;
	}
}

.PlayerMenuAccountSettings__settings {
  width: 45.648vmin;
  border-radius: 0.463vmin;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
  color: #FFF;
  font-size: 1.667vmin;
  font-family: Montserrat;
  font-weight: 700;
  line-height: 2.593vmin;
  padding: 2.407vmin 1.574vmin;

  & > div  {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.926vmin;
    align-items: center;
    &:last-child {
      margin-bottom: 0;
    }
    & > span {
      color: rgba(255, 255, 255, 0.26);
      font-size: 1.296vmin;
      font-weight: 500;
      position: relative;
      margin-right: 1.852vmin;
      &::after {
        content: "";
        width: 1.389vmin;
        height: 1.389vmin;
        background: url(./edit.svg) no-repeat center/contain;
        position: absolute;
        top: 50%;
        opacity: 0.46;
        transform: translateY(-50%);
        margin-left: 0.463vmin;
      }
    }
  }
}
</style>
