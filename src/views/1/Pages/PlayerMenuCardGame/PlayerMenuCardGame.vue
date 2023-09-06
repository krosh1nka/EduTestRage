<template>
<div class="PlayerMenuMinerGame">
  <div class="PlayerMenuMinerGame__minerGame-section">
    <div class="PlayerMenuMain__info-item-title-section">
          <img class="PlayerMenuMain__info-item-img" src="../../Assets/minerGame/playerMenu_cards.png" />
            <div class="PlayerMenuMain__info-item-text-section">
              <div class="PlayerMenuMain__info-item-title">Название игры</div>
            <div class="PlayerMenuMain__info-item-sub-title">Измените назначение клавишу на ту которая вам будет удобнее, не забудьте сохранить</div>
          </div>
    </div>
    <div class="PlayerMenuMinerGame__game-section">
      <div
        class="PlayerMenuMinerGame__game-cell"
        :class="{'PlayerMenuMinerGame__game-cell--open': openCells.includes(cell.id)}"
        :key="cell" v-for="cell in cellList" @click="openCells.push(cell.id)"
        >
        <Transition name="SHOWVALUE">
          <div v-if="openCells.includes(cell.id)">{{cell.value}}</div>
        </Transition>
      </div>
    </div>
    <div class="PlayerMenuMinerGame__bet-section">
    <div class="PlayerMenuMinerGame__input-wrapper">
      <input placeholder="Введите сумму..." class="PlayerMenuMinerGame__input" />
    </div>
    <div class="PlayerMenuMinerGame__coefSection">
      <div class="PlayerMenuMinerGame__coef" :class="{'PlayerMenuMinerGame__coef--selected': coef=== selectCof}" :key="coef" v-for="coef in coefList" @click="() => selectCof = coef">{{coef}}</div>
    </div>
    <div class="PlayerMenuMinerGame__coefSection">
      <div>Возможный выигрыш:</div>
      <div>
        <div class="PlayerMenuMinerGame__coefSection-info">от {{ 2 }} <span>GS</span></div>
        <div class="PlayerMenuMinerGame__coefSection-info">до {{ 2 }} <span>GS</span></div>
      </div>
    </div>
      <button class="PlayerMenuMinerGame__button">
        ВЫ ПРОИГРАЛИ!
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      cellList: [],
      openCells: [],
      selectCof: 5,
      coefList: [
        0.1, 0.5, 1, 5, 20, 100, 500
      ]
    }
  },
  methods: {
    setCells () {
      const cellList = []
      let id = 11
      while (cellList.length < 12) {
        cellList.push({ value: 0, id: id })
        id++
      }
      for (let i = 0; i < 12; i++) {
        const randomItem = Math.floor(Math.random() * 12)
        cellList[randomItem].value = (Math.random() * 12).toFixed(2)
      }
      for (let i = 0; i < 12; i++) {
        const randomItem = Math.floor(Math.random() * 12)
        cellList[randomItem].value = (Math.random() * 12).toFixed(2)
      }

      this.cellList = cellList
    }
  },
  mounted () {
    this.setCells()
  }
}
</script>

<style lang="scss" scoped>

.PlayerMenuMinerGame {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  display: flex;
}

.PlayerMenuMinerGame__minerGame-section {
  width: 47.685vmin;
  padding: 3.148vmin 2.037vmin;
  box-sizing: border-box;

  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  margin: auto;
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

.PlayerMenuMinerGame__game-cell {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(97, 255, 160, 0.07) 0%, rgba(97, 255, 160, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid #61FFA0;
  border-radius: 0.741vmin;
  display: flex;
  transition: border 0.5s ease;
  transition-delay: 0.5s;
  position: relative;
  &::after {
    content: "";
    margin: auto;
    height: 4.417vmin;
    opacity: 1;
    transition: opacity 0.5s ease;
    transition-delay: 0.3s;
    width: 3.38vmin;
    background: url(../../Assets/minerGame/playerMenu_logo.png) no-repeat center/contain;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.426vmin;
    height: 3.426vmin;
    opacity: 0;
    transition: opacity 0.5s ease;
    transition-delay: 0.3s;
  }

  & > div {
    font-family: 'PF DinDisplay Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1.667vmin;
    line-height: 2.037vmin;
    color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--open {
    background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
    &::after {
      opacity: 0;
    }
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    border-radius: 0.741vmin;
  }
}

.PlayerMenuMinerGame__game-cell--open.PlayerMenuMinerGame__game-cell--win {
  border-color: #1FA1FF;
  background: radial-gradient(50% 50% at 50% 50%, rgba(51, 169, 255, 0.07) 0%, rgba(31, 161, 255, 0.01) 100%);
  position: relative;
  &::before {
    opacity: 1;
    background: url(../../Assets/minerGame/playerMenu_diamond-with-a-dot-svgrepo-com.png) no-repeat center/contain;
  }
}
.PlayerMenuMinerGame__game-cell--open.PlayerMenuMinerGame__game-cell--loss {
  border-color: #FF0926;
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 9, 38, 0.07) 0%, rgba(255, 9, 38, 0.01) 100%);
  position: relative;
  &::before {
    opacity: 1;
    background: url(../../Assets/minerGame/playerMenu_bomb-svgrepo-com.png) no-repeat center/contain;
  }
}

.SHOWVALUE-enter-active,
.SHOWVALUE-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.5s;
}

.SHOWVALUE-enter-from,
.SHOWVALUE-leave-to {
  opacity: 0;
}

.PlayerMenuMinerGame__game-section {
  width: 43.241vmin;
  height: 30.944vmin;
  display: grid;
  margin: auto;
  grid-template-columns: repeat(4, 9.352vmin);
  grid-template-rows: repeat(3, 9.352vmin);
  gap: 1.944vmin;
  margin-top: 2.037vmin ;
}

.PlayerMenuMinerGame__bet-section {
  margin-top: 5vmin;
}

.PlayerMenuMinerGame__input {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  width: 43.241vmin;
  height: 5.093vmin;
  outline: none;
  padding: 1.389vmin;
  box-sizing: border-box;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;
  color: #FFFFFF;
}

.PlayerMenuRoulette__players-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-left: 3.611vmin;
  gap: 2.407vmin;
  width: 100%;
}

.PlayerMenuRoulette__multiplicator {
  height: 4.815vmin;
  background: linear-gradient(90deg, #E65C00 0%, #F9D423 100%);
  border-radius: 0.278vmin;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.852vmin;
  line-height: 2.222vmin;
  color: #FFFFFF;
  margin-bottom: 2.407vmin;
}

.PlayerMenuRoulette__info {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.278vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.389vmin;
  box-sizing: border-box;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 1.481vmin;
  line-height: 1.759vmin;

  color: #FFFFFF;
  margin-bottom: 2.037vmin;
}

.PlayerMenuRoulette__roulette-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45.926vmin;
}

.PlayerMenuRoulette__players-list {
  &:nth-child(2) {
    & > .PlayerMenuRoulette__multiplicator {
      background: linear-gradient(96.47deg, #DA22FF -0.14%, #9733EE 96.41%);
    }
  }
  &:nth-child(3) {
    & > .PlayerMenuRoulette__multiplicator {
      background: linear-gradient(304.67deg, #D31027 0%, #EA384D 97.73%);
    }
  }
  &:nth-child(4) {
    & > .PlayerMenuRoulette__multiplicator {
      background: linear-gradient(313.98deg, #02AAB0 0%, #00CDAC 100%);
    }
  }
  &:nth-child(5) {
    & > .PlayerMenuRoulette__multiplicator {
      background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
    }
  }
}

.PlayerMenuRoulette__player-info {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  padding: 0.833vmin 1.389vmin;
  display: flex;
  margin-bottom: 3.056vmin;
}

.PlayerMenuRoulette__player-info-name {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.296vmin;
  line-height: 1.574vmin;
  margin-left: 0.741vmin;
  color: #FFFFFF;
}

.PlayerMenuRoulette__player-info-count {
  font-style: normal;
  font-weight: 600;
  font-size: 1.019vmin;
  line-height: 1.204vmin;

  color: #FFFFFF;
  font-family: 'PF DinDisplay Pro';
  display: flex;
  align-items: center;
  margin-top: 0.463vmin;
  &::before {
    content: "";
    width: 1.481vmin;
    height: 1.481vmin;
    margin-right: 0.37vmin;
  }
}

.PlayerMenuMinerGame__coefSection {
  display: flex;
  justify-content: space-between;
  margin-top: 1.389vmin;

  & > div {
    display: flex;
    font-family: 'PF DinDisplay Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1.667vmin;
    line-height: 2.037vmin;
    color: #FFFFFF;
    align-items: center;
  }
}

.PlayerMenuMinerGame__coefSection-info {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;

  text-align: center;

  color: #FFFFFF;
  &:first-child {
    margin-right: 1.111vmin;
  }

  width: 11.481vmin;
  height: 5.093vmin;

  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    color: #FFD646;
  }
}

.PlayerMenuMinerGame__input-wrapper {
  position: relative;
  &::after {
    content: "";
    background: url(../../Assets/playerMenu_Coins.svg) no-repeat center/contain;
    width: 1.296vmin;
    height: 1.296vmin;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.389vmin;
  }
}

.PlayerMenuMinerGame__coef {
  width: 5.093vmin;
  height: 5.093vmin;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
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
  text-align: center;

  color: #FFFFFF;

  &--selected {
    background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border: 1px solid rgba(146, 255, 108, 0.88);
    border-radius: 4px;
  }

  &--min {
    width: 6.759vmin;
    flex-direction: column;
    align-items: start;
    padding: 1.574vmin;
    box-sizing: border-box;
    & > div {
      color: rgba(255, 255, 255, 0.17);
      font-weight: 400;
      font-size: 1.296vmin;
    }
  }
}

.PlayerMenuMinerGame__button {
  width: 100%;
  height: 5.093vmin;
  margin-top: 1.296vmin;

  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 9, 38, 0.07) 0%, rgba(255, 9, 38, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid #FF0926;
  border-radius: 0.37vmin;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;

  color: #FFFFFF;
}

</style>
