<template>
  <div class="PlayerMenuReferal">
    <div class="PlayerMenuReferal__item">
      <div class="PlayerMenuReferal__item-info">
      <div class="PlayerMenuMain__info-item-title-section">
        <img class="PlayerMenuMain__info-item-img" src="../../Assets/Referal/playerMenu_user-add-svgrepo-com1.png" />
          <div class="PlayerMenuMain__info-item-text-section">
            <div class="PlayerMenuMain__info-item-title">Код для приглашения</div>
          <div class="PlayerMenuMain__info-item-sub-title">Выберете нужным вам раздел нажатием одной кнопки мышки</div>
        </div>
      </div>
      <div class="PlayerMenuReferal__item-about">
        <div class="PlayerMenuReferal__item-about_title">
          ОТПРАВЛЯЙ КОД СОВОИМ ДРУГУЗЬЯМ. ОНИ ПОЛУЧИТ <div class="money">$ 500 000</div>
        </div>
        <div class="PlayerMenuReferal__item-about_description">
          При регистрации человека по вашему коду, приглашённый человек получит $ 500 000 игровой валюты ( При достижение 4 уровня ), а для вас будут подготовлены уникальны призы, чем больше людей вы пригласили тем больше призов вы сможете получить.
        </div>
        <div class="PlayerMenuReferal__item-button-section">
          <div id="code" class="PlayerMenuReferal__item-code">0512</div>
          <button @click="() => {
            this.copyCode();
            }" type="button"><div>Скопировать</div></button>
        </div>
      </div>
      </div>
      <div class="PlayerMenuReferal__item-info">
      <div class="PlayerMenuMain__info-item-title-section">
        <img class="PlayerMenuMain__info-item-img" src="../../Assets/Referal/playerMenu_user-add-svgrepo-com2.png" />
          <div class="PlayerMenuMain__info-item-text-section">
            <div class="PlayerMenuMain__info-item-title">Создание уникального кода</div>
          <div class="PlayerMenuMain__info-item-sub-title">Выберете нужным вам раздел нажатием одной кнопки мышки0</div>
        </div>
      </div>
      <div class="PlayerMenuReferal__item-about">
        <div class="PlayerMenuReferal__item-about_title">
          ТАК ЖЕ ВЫ МОЖЕТЕ СОЗДАТЬ СВОЙ УНИКАЛЬНЫЙ КОД ДЛЯ ПРИГЛШАЕНИЯ
        </div>
        <div class="PlayerMenuReferal__item-about_description">
          При создание своего кода, старый код обновится и вы сможете продолжать приглашать людей, зарегистрированные не пропадают у вас. Так же ваш код будет обновлен в течение 5 минут, если у вас возникли проблемы обратитесь в тех.поддержку нашего проекта
        </div>
        <div class="PlayerMenuReferal__item-button-section PlayerMenuReferal__item-button-section--last">
          <input class="PlayerMenuReferal__item-code PlayerMenuReferal__item-code--input" placeholder="Код..." />
          <div>
            <div>
              <div class="PlayerMenuReferal__item-code-desc">Цена:</div>
              <div class="PlayerMenuReferal__item-code-prise">{{formatNumber(2300)}}<span>GC</span></div>
            </div>
            <div>
              <div class="PlayerMenuReferal__item-code-desc">Наш сайт:</div>
              <a href="https://crystalrp.fun/donate.html">crystalrp.fun</a>
            </div>
          </div>
        </div>
        <button class="PlayerMenuReferal__item-button-section-submit"><div>Купить</div></button>
      </div>
      </div>
    </div>
    <div class="PlayerMenuReferal__item">
      <div class="PlayerMenuMain__info-item-title-section">
        <img class="PlayerMenuMain__info-item-img" src="../../Assets/Referal/playerMenu_3d-illustration-of-closed-black-gift-box.png" />
          <div class="PlayerMenuMain__info-item-text-section">
            <div class="PlayerMenuMain__info-item-title">Код для приглашения</div>
          <div class="PlayerMenuMain__info-item-sub-title">Выберете нужным вам раздел нажатием одной кнопки мышки</div>
        </div>
      </div>
      <div class="PlayerMenuReferal__item-list">
        <div class="PlayerMenuReferal__prise-item" :key="i" v-for="i in 5">
          <div class="PlayerMenuReferal__prise-item-inner">
            <div class="PlayerMenuReferal__prise-item-inner-title">
              День 1
            </div>
            <div class="PlayerMenuReferal__prise-item-inner-desc">
              Ваша задачи найти в лесу “Оленя” и убить после чего доставить охотнику в магазин.
            </div>
            <div class="PlayerMenuReferal__prise-item-award">
              <div>Награда:</div>
              <div class="PlayerMenuReferal__prise-item-award_cash"><span>$</span>{{formatNumber(2300)}}</div>
              <div class="PlayerMenuReferal__prise-item-award_case">Кейс “<span>Охотник</span>“</div>
            </div>
          </div>
          <div class="PlayerMenuReferal__prise-item-button" :class="{'PlayerMenuReferal__prise-item-button--empty': i > 2}">Забрать</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatNumber (number) {
      return number.toLocaleString('en-US').replace(',', ' ')
    },
    copyCode () {
      const copyText = document.getElementById('code').innerHTML
      navigator.clipboard.writeText(copyText)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuReferal {
  display: grid;
  grid-template-columns: 49.907vmin 97.685vmin;
  gap: 2.037vmin;
  height: 100%;
}

.PlayerMenuMain__info-item-title {
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

.PlayerMenuMain__info-item-sub-title {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 300;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  color: rgba(255, 255, 255, 0.24);
  max-width: 28.889vmin;
  margin-top: 0.926vmin;
}

.PlayerMenuMain__info-item-title-section {
  display: flex;
  align-items: center;
}

.PlayerMenuRoulette__player-info-img {
  width: 3.611vmin;
  height: 3.611vmin;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    width: 3.611vmin;
    height: 3.611vmin;
  }
}

.PlayerMenuMain__info-item-img {
  width: 10.741vmin;
  height: 10.741vmin;
  margin-right: 1.944vmin;
  filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);
}

.PlayerMenuReferal__item-info:last-child {
margin-top: 2.556vmin;
}

.PlayerMenuReferal__item {
  padding: 2.963vmin 4.722vmin;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  box-sizing: border-box;
  padding-right: 2.315vmin;
}

.PlayerMenuReferal__item-about_title {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 2.222vmin;
  line-height: 2.685vmin;
  margin-top: 2.8vmin;
  color: #FFFFFF;
}

.PlayerMenuReferal__item-about_description {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 300;
  font-size: 1.296vmin;
  line-height: 1.574vmin;

  color: rgba(255, 255, 255, 0.24);
  margin-top: 1.481vmin;
}

.money {
  color: #61FFA0;
  display: inline-block;
  &::first-letter {
    color: #FFFFFF14;
  }
}

a {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;

  text-decoration-line: underline;

  color: #FFFFFF;
}

.PlayerMenuReferal__item-code-desc {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 300;
  font-size: 1.296vmin;
  line-height: 1.574vmin;
  text-align: end;

  color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuReferal__item-button-section {
  display: flex;
  align-items: center;
  margin-top: 3.426vmin;
  &--last {
    margin-top: 1.574vmin;
    & > div {
      display: flex;
      font-family: 'PF DinDisplay Pro';
      font-style: normal;
      font-weight: 700;
      font-size: 1.667vmin;
      line-height: 2.037vmin;
      color: #FFFFFF;
      & >div {
        margin-right: 1.852vmin;
      }
    }
  }

  & > button {
    background: radial-gradient(50% 50% at 50% 50%, rgba(142, 255, 53, 0.07) 0%, rgba(142, 255, 53, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border: 0.093vmin solid #8EFF35;
    border-radius: 0.185vmin;
    width: 21.852vmin;
    height: 4.259vmin;
    font-family: 'PF DinDisplay Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1.481vmin;
    line-height: 1.759vmin;

    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 15px #8dff353d;
    }
    &:active {
      transform: scale(0.95);
      box-shadow: 0 0 15px #6fff0096;
    }

    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      height: 2.222vmin;
      width: 2.222vmin;
      margin-right: 1.574vmin;
      background: url(../../Assets/Referal/playerMenu_material-symbols_content-copy.png) no-repeat center/contain;
    }
  }
}

.PlayerMenuReferal__item-code {
  width: 17.13vmin;
  height: 4.259vmin;
  left: 28.333vmin;
  top: 45.093vmin;
  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.185vmin;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  text-align: center;
  margin-right: 1.852vmin;
  color: #FFFFFF;

  &--input {
    width: 21.852vmin;
    height: 4.259vmin;
    text-align: left;
    padding: 1.667vmin;
    box-sizing: border-box;
    outline: none;
  }
}

.PlayerMenuReferal__item-list {
  margin-top: 1.667vmin;
}

.PlayerMenuReferal__item-button-section-submit {
  height: 4.259vmin;
  width: 100%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(142, 255, 53, 0.07) 0%, rgba(142, 255, 53, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid #8EFF35;
  border-radius: 0.185vmin;
  margin-top: 2.037vmin;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #8dff353d;
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 0 0 15px #6fff0096;
  }
  color: #FFFFFF;
}

.PlayerMenuReferal__prise-item {
  width: 88.426vmin;
  height: 10.926vmin;
  left: 0vmin;
  top: 0vmin;
  position: relative;
  padding: 1.204vmin 0;
  box-sizing: border-box;
  margin-bottom: 2.13vmin;
  &::after {
    content: "";
    height: 100%;
    top: 0;
    width: 40.778vmin;
    position: absolute;
    background: url(../../Assets/Referal/playerMenu_prise.png) no-repeat center/cover;
  }
  background: linear-gradient(257.93deg, rgba(255, 255, 255, 0.03) 6.57%, rgba(4, 4, 4, 0.03) 61.63%);
  border-radius: 0.463vmin;
}

.PlayerMenuReferal__prise-item-inner-title {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.593vmin;
  /* identical to box height, or 156% */

  display: flex;
  align-items: center;

  color: #FFFFFF;
  display: flex;
  align-items: center;
  margin-bottom: 0.741vmin;
  &::before {
    content: "";
    background:  url(../../Assets/Referal/playerMenu_calenda.svg) no-repeat center center/contain;
    height: 1.852vmin;
    width: 1.852vmin;
    margin-right: 0.648vmin;
  }
}

.PlayerMenuReferal__prise-item-inner-desc {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1.296vmin;
  line-height: 1.574vmin;
  display: flex;
  align-items: center;
  width: 26.296vmin;
  color: rgba(255, 255, 255, 0.26);
}

.PlayerMenuReferal__prise-item-inner {
  margin-left: 27.778vmin;
}

.PlayerMenuReferal__prise-item-award {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.296vmin;
  line-height: 1.574vmin;

  display: flex;
  align-items: center;

  color: #FFFFFF;
  display: flex;

  & > div {
    margin-right: 1.389vmin;
  }

  &_cash {
    display: flex;
    align-items: center;
    & > span {
      color: rgba(255, 255, 255, 0.13);
      margin-right: 1ch;
    }
    &::before {
      content: "";
      background:  url(../../Assets/Referal/playerMenu_Vector.png) no-repeat center center/contain;
      height: 1.852vmin;
      width: 1.852vmin;
      margin-right: 0.648vmin;
    }
  }
  &_case {
    display: flex;
    align-items: center;
    & > span {
      color: #FE9B22;
    }
    &::before {
      content: "";
      background:  url(../../Assets/Referal/playerMenu_mdi_jewel-case.png) no-repeat center center/contain;
      height: 1.852vmin;
      width: 1.852vmin;
      margin-right: 0.648vmin;
    }
  }
}

.PlayerMenuReferal__prise-item-button {
  background: radial-gradient(50% 50% at 50% 50%, rgba(142, 255, 53, 0.07) 0%, rgba(142, 255, 53, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid #8EFF35;
  border-radius: 0.37vmin;
  width: 27.87vmin;
  height: 5.093vmin;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2.315vmin;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;
  text-align: center;

  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 0 15px #8dff353d;
  }
  &--empty {
    background: radial-gradient(50% 50% at 50% 50%, rgba(151, 151, 151, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    border-radius: 0.37vmin;
    &:hover {
      transform: translateY(-50%) scale(0.95);
      box-shadow: 0 0 15px #0000003d;
     }
  }

}

.PlayerMenuReferal__item-code-prise {
  white-space: nowrap;
  & > span {
    color: #FFD646;
    margin-left: 1ch;
  }
}
</style>
