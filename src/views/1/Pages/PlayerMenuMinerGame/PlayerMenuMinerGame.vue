<template>
<div class="PlayerMenuMinerGame">
  <div class="PlayerMenuCarsGame__close-modal" v-if="isClosed">
			<div class="PlayerMenuCarsGame__close-modal-img"></div>
			<div>Игра в данный момент закрыта</div>
		</div>
  <div class="PlayerMenuMinerGame__minerGame-section" v-if="!isClosed">
    <div class="PlayerMenuMain__info-item-title-section">
      <img class="PlayerMenuMain__info-item-img" src="../../Assets/minerGame/playerMenu_1448.png" />
        <div class="PlayerMenuMain__info-item-text-section">
          <div class="PlayerMenuMain__info-item-title">Название игры</div>
        <div class="PlayerMenuMain__info-item-sub-title">Измените назначение клавишу на ту которая вам будет удобнее, не забудьте сохранить</div>
      </div>
    </div>
    <div class="PlayerMenuMinerGame__game-section">
      <button
        class="PlayerMenuMinerGame__game-cell"
        :class="{
          'PlayerMenuMinerGame__game-cell--open': value !== 0 || gameStatus === 4,
          'PlayerMenuMinerGame__game-cell--openinEnd': value !== 0 && !openCells.includes(key),
          'PlayerMenuMinerGame__game-cell--loss': value === 2,
          'PlayerMenuMinerGame__game-cell--win': value === 1
        }"
        @click="() => onClick(key)"
        :key="key" v-for="(value, key) in cellList"
        ></button>
    </div>
    <div class="PlayerMenuMinerGame__bet-section">
    <div class="PlayerMenuMinerGame__input-wrapper">
      <input class="PlayerMenuMinerGame__input" id="minerInput" :disabled="gameStatus !== 0" v-model="amount"/>
    </div>
    <div class="PlayerMenuMinerGame__coefSection">
      <div class="PlayerMenuMinerGame__coef" :class="{'PlayerMenuMinerGame__coef--selected': key == selectedCoef}"
      @click="()=> {
        if(!gameStatus) {
          selectedCoef = key
        }}"
         :key="key" v-for="(value, key) in coefData">{{key}}</div>
    </div>
    <div class="PlayerMenuMinerGame__coefSection-wrapper">
      <div class="PlayerMenuMinerGame__coefSection PlayerMenuMinerGame__coefSection--min" :style="{transform: getPositionOnCoefSection(i)}">
      <div class="PlayerMenuMinerGame__coef PlayerMenuMinerGame__coef--min" :class="{
        'PlayerMenuMinerGame__coef--selected': currentStep > i,
        'PlayerMenuMinerGame__coef--current': currentStep === i + 1,
        }" :key="coef" v-for="(coef, i) in coefData[selectedCoef]">
        {{"x" + coef}}
        <div>{{`${i + 1} hit`}}</div>
      </div>
    </div>
    </div>
        <button class="PlayerMenuMinerGame__button PlayerMenuMinerGame__button--beforeGame" :key="gameStatus" v-if="gameStatus === 0" @click="() => startGame()">
          Начать игру
        </button>
        <button class="PlayerMenuMinerGame__button PlayerMenuMinerGame__button--inGame " :key="gameStatus" v-if="gameStatus === 1">
          Удачи!
        </button>
        <button class="PlayerMenuMinerGame__button PlayerMenuMinerGame__button--inGame "  :key="gameStatus" @click="() => onTake()" v-if="gameStatus === 2">
          {{ `Забрать ${getAward()}`}}
        </button>
        <button class="PlayerMenuMinerGame__button PlayerMenuMinerGame__button--fail " :key="gameStatus" v-if="gameStatus === 3">
          {{ `Вы проиграли(` }}
        </button>
        <button class="PlayerMenuMinerGame__button PlayerMenuMinerGame__button--reset " :key="gameStatus" v-if="gameStatus === 4" @click="() => resetGame()">
          {{ `Начать заново` }}
        </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      cellList: {},
      isClosed: true,
      openCells: [],
      selectedCoef: 1,
      gameStatus: 0,
      currentStep: 0,
      amount: 0,
      coefList: [
        0.1, 0.5, 1, 5, 20, 100, 500
      ],

      coefData: {
        1: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 2.2, 3.3, 5.4, 1.5, 15.6, 15.7, 15.6, 15.7, 15.6, 15.6, 15.7, 15.6, 15.7, 15.6, 15.6, 15.6, 15.7, 15.6, 15.7],
        2: [2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
        3: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
        4: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
        5: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
        6: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
        7: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7]
      },

      serverCells: {},
      lastClickedCell: null,
      enum: {
        0: 'unset',
        1: 'win',
        2: 'crash'
      }
    }
  },
  methods: {
    setCells () {
      const cellList = {}
      for (let i = 1; i <= 30; i++) {
        cellList[i] = 0
      }

      this.cellList = cellList
    },

    startGame () {
      // тут я буду отправлять amount и selectedCoef(кол-во бомб) и ожидать апрув c подтерденным amount
      this.blurInput()
      setTimeout(() => {
        this.aproveBet(this.amount)
      }, 100)
    },

    getAward () {
      const award = this.amount * this.coefData[this.selectedCoef][this.currentStep]
      return award % 1 ? award.toFixed(2) : award
    },

    blurInput () {
      const input = document.getElementById('minerInput')
      input.blur()
    },

    resetGame () {
      this.setCells()
      this.openCells = []
      this.lastClickedCell = null
      this.gameStatus = 0
      this.currentStep = 0
    },

    onTake () {
      this.resetGame()
    },

    getPositionOnCoefSection (i) {
      const px = Math.floor((this.currentStep - 1) / 5)
      return px > 0 ? `translateX(${px * (-43.426 - 2.18)}vmin)` : `translateX(${0}vmin)`
    },

    updateCellValue (value) {
      if (typeof value === 'number') {
        this.cellList[this.lastClickedCell] = value
        setTimeout(() => this.currentStep++, 500)
      } else {
        this.cellList = value
        this.gameStatus = 3
        setTimeout(() => this.gameStatus = 4, 1500)
      }

      this.lastClickedCell = null
    },

    aproveBet (amount) {
      this.amount = amount
      this.gameStatus = 1
    },

    getRandomCells () {
      const random = Math.floor(Math.random() * 2) + 1
      this.serverCells[this.lastClickedCell] = random
      if (random === 2) {
        for (let i = 1; i <= 30; i++) {
          // if(!this.serverCells[i]) {
          //   this.serverCells[i] =  Math.floor(Math.random() * 2) + 1;
          // }
        }
        // return Math.floor(Math.random() * 2) ? this.serverCells : 1;
        return 1
      }
      return random
    },

    onClick (cell) {
      if (this.cellList[cell] || this.lastClickedCell || !this.gameStatus) {
        return
      }
      this.gameStatus = 2
      this.openCells.push(cell)
      this.lastClickedCell = cell
      setTimeout(() => this.updateCellValue(this.getRandomCells()), 100)
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
  // &::after {
  //   content: '';
  //   position: absolute;
  //   width: 100px;
  //   height: 100px;
  //   background: url(./miner.png) no-repeat center/contain;
  // }
}

.PlayerMenuMinerGame__minerGame-section {
  width: 47.685vmin;
  padding: 3.148vmin 2.037vmin;
  box-sizing: border-box;

  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  margin: auto;
  position: relative;
}

@property --rotate {
  syntax: "<angle>";
  initial-value: 132deg;
  inherits: false;
}

.PlayerMenuMinerGame__minerGame-section::before {
  content: "";
  width: 104%;
  height: 102%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate)
    , #5ddcff, #3c67e3 43%, #4e00c2);
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
}

.PlayerMenuMinerGame__minerGame-section::after {
  position: absolute;
  content: "";
  top: calc(var(100%) / 6);
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.8);
  background-image: linear-gradient(
    var(--rotate)
    , #5ddcff, #3c67e3 43%, #4e00c2);
    opacity: 1;
  transition: opacity .5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
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

  &:hover {
    box-shadow: 0 0 5px #fffefe8c;
  }
  &:active {
    box-shadow: 0 0 5px #fffefef2;
  }

  // animation: fall 2s ease-in-out infinite;

  &::after {
    content: "";
    margin: auto;
    height: 4.417vmin;
    opacity: 1;
    transition: opacity 0.5s ease;
    transition-delay: 0.15s;
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
    transition-delay: 0.15s;
  }

  &--openinEnd {
    opacity: 0.3;
  }

  &--open {
    background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);

    &::after {
      opacity: 0;
    }
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    border-radius: 0.741vmin;
    &:hover {
      box-shadow: 0 0 5px #fffefe00;
    }
    &:active {
      box-shadow: 0 0 5px #fffefe00;
    }
  }
}

.PlayerMenuMinerGame__game-cell--win {
  border-color: #1FA1FF;
  background: radial-gradient(50% 50% at 50% 50%, rgba(51, 169, 255, 0.07) 0%, rgba(31, 161, 255, 0.01) 100%);
  position: relative;
  &::before {
    opacity: 1;
    background: url(../../Assets/minerGame/playerMenu_diamond-with-a-dot-svgrepo-com.png) no-repeat center/contain;
  }
}
.PlayerMenuMinerGame__game-cell--loss {
  border-color: #FF0926;
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 9, 38, 0.07) 0%, rgba(255, 9, 38, 0.01) 100%);
  position: relative;
  &::before {
    opacity: 1;
    background: url(../../Assets/minerGame/playerMenu_bomb-svgrepo-com.png) no-repeat center/contain;
  }
}

.PlayerMenuMinerGame__game-section {
  width: 43.241vmin;
  height: 31.944vmin;
  display: grid;
  grid-template-columns: repeat(6, 6.111vmin);
  grid-template-rows: repeat(5, 6.111vmin);
  gap: 1.389vmin;
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

.PlayerMenuMinerGame__buttonTransition-enter-active,
.PlayerMenuMinerGame__buttonTransition-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.PlayerMenuMinerGame__buttonTransition-enter-from,
.PlayerMenuMinerGame__buttonTransition-leave-to {
  transform: translateY(50%);
  opacity: 0;
}

.PlayerMenuMinerGame__coefSection-wrapper {
  width: 43.426vmin;
  overflow: hidden;
}

.PlayerMenuMinerGame__coefSection {
  display: flex;
  justify-content: space-between;
  margin-top: 1.389vmin;
  transition: transform 0.5s ease;
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
  position: relative;
  &::after {
      content: "";
      background: rgba(105, 177, 79, 0.424);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: -1;
      transition: opacity 0.5s ease;
    }

  &--selected {
    background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border: 1px solid rgba(146, 255, 108, 0.88);
    border-radius: 4px;
  }

  &--current {

    &::after {
      opacity: 1;
    }
    border: 1px solid rgba(146, 255, 108, 0.88);

  }

  &--min {
    min-width: 6.759vmin;
    width: 6.759vmin;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-right: 2.367vmin;
    transition: border 0.5s ease;

    &:last-child {
      margin-right: 0;
    }
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
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 1;

  border-radius: 0.37vmin;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;

  color: #FFFFFF;
  transition: transform 0.2s ease, border 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  &--beforeGame {
    &:hover {
      transform: scale(1.02);
      background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      border: 1px solid rgba(146, 255, 108, 0.88);
    }
  }

  &--inGame {
    background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border: 1px solid rgba(146, 255, 108, 0.88);
  }

  &--fail {
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 9, 38, 0.07) 0%, rgba(255, 9, 38, 0.01) 100%);
    border: 0.093vmin solid #FF0926;
  }

  &--reset {
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 137, 29, 0.07) 0%, rgba(255, 137, 29, 0.01) 100%);
    border: 0.1rem solid #FF891D;
  }
}

.PlayerMenuCarsGame__close-modal {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #0d0d10;
	box-shadow: 0 0 2.315vmin #2a2a303a;
	z-index: 500;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 5.963vmin;
	line-height: 3.519vmin;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.PlayerMenuCarsGame__close-modal-img {
	background: url(./miner-svgrepo-com.svg) no-repeat center/contain;
	height: 32.407vmin;
	width: 27.778vmin;
	animation: animDriver 5s ease infinite;
	transform-origin: bottom;
}

@keyframes animDriver {
	0% {
		transform: rotateY(-15deg);
	}
	100% {
		transform: rotateY(15deg);
	}
}

</style>
