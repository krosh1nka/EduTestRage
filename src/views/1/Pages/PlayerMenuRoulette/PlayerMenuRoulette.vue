<template>
	<div class="PlayerMenuRoulette" v-if="gameData != null">
		<div class="PlayerMenuCarsGame__close-modal" v-if="gameData == 'Closed'">
			<div class="PlayerMenuCarsGame__close-modal-img"></div>
			<div>Игра в данный момент закрыта</div>
		</div>
		<div class="PlayerMenuRoulette__header" v-else>
			<div class="PlayerMenuRoulette__name-section">
				<img class="PlayerMenuRoulette_img" src="../../Assets/Roulette/playerMenu_roulette-logo.png" />
				<div class="PlayerMenuRoulette_title-section">
					<div class="PlayerMenuRoulette_title">
						#{{ gameData.ActiveGame.ID }}
					</div>
					<div class="PlayerMenuRoulette_subtitle">
						Измените назначение клавишу на ту которая вам будет удобнее, не забудьте сохранить
					</div>
				</div>
			</div>
			<div class="PlayerMenuRoulette__input-section">
				<input type="text" v-model="amount" placeholder="Введите сумму..."
					class="PlayerMenuRoulette__input" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4)" />
				<div class="PlayerMenuRoulette__bat-placeholder">
					<div :key="coef" v-for="coef in coefList" @click="selectedCoef = coef"
						:class="{ selected: coef === selectedCoef }">{{ coef }}</div>
				</div>
			</div>
			<div>
				<div class="PlayerMenuRoulette__profit-section">
					<div>Возможный выигрыш:</div>
					<div class="PlayerMenuRoulette__profit">on 2 <span>GC</span></div>
					<div class="PlayerMenuRoulette__profit">on 20 <span>GC</span></div>
				</div>
				<button class="PlayerMenuRoulette__bet-button" @click="onBet" v-if="!gameData.ActiveGame.IsBetAccepted">
					Сделать ставку
				</button>
				<button class="PlayerMenuRoulette__bet-button PlayerMenuRoulette__bet-button--disactive" v-else>
					Идет игра...
				</button>
			</div>
		</div>
		<div class="PlayerMenuRoulette__main"  v-if="gameData !== 'Closed'">
			<div class="PlayerMenuRoulette__roulette-wrapper">
				<div class="PlayerMenuRoulette__roulette-section">
					<div class="PlayerMenuRoulette__roulette-container">
						<svg  id="roulette"   class="PlayerMenuRoulette__roulette" width="38.271vmin" height="38.271vmin">
							<g id="circlesGroup">
								<circle stroke-width="0.5vmin" :stroke="bet.color" stroke-linecap="round" class="roulette-cell" cx="18.767vmin" cy="18.967vmin" r="18.52vmin" fill="none" stroke-dasharray="6.525% 1000%" :key="i" v-for="(bet, i) in cellList" />
							</g>
						</svg>
						<div class="PlayerMenuRoulette__roulette-fx"></div>
						<div class="PlayerMenuRoulette__roulette-timer" v-if="timer">
							<div class="PlayerMenuRoulette__roulette-title" v-if="!gameData.ActiveGame.IsBetAccepted">ИГРА НАЧНЕТСЯ ЧЕРЕЗ:</div>
							<div class="PlayerMenuRoulette__roulette-title" v-else>ИГРА ЗАКОНЧИТЬСЯ ЧЕРЕЗ:</div>
							<div>
								<span :key="i" v-for="i in getCountZeroInTimer()">0</span>{{ timer }}
							</div>
						</div>
						<div class="PlayerMenuRoulette__roulette-arrow-wrapper">
							<div class="PlayerMenuRoulette__roulette-arrow"></div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuRoulette__history">
					<div :key="i" v-for="(bet, i) in gameData.LastGameList"
						:style="{ background: bindingColor[bet] }">
					</div>
				</div>
			</div>
			<div class="PlayerMenuRoulette__players-grid" v-if="gameData !== 'Closed'">
				<div class="PlayerMenuRoulette__players-list" :class="{'win-list': showWin === 1  }">
					<button class="PlayerMenuRoulette__multiplicator" @click="setSelectedColor(1)" :class="{'PlayerMenuRoulette__multiplicator--selected': selectedColor === 1}" @mousemove="(e) => setDinamicGradient(e, 'yellow')">{{ `X${getMiniGameInfo.Roulette.MultiplierColor.Orange}` }}</button>
					<div class="PlayerMenuRoulette__info">
						<div class="PlayerMenuRoulette__info-count">{{ getPlayerBetList(1).length }}</div>
						<div class="PlayerMenuRoulette__info-bet">{{ $formatMoneyToPlayerMenu(getPlayerBetListAmount(1)) }}</div>
					</div>
					<div class="PlayerMenuRoulette__player-info" v-for="(item, index) in getPlayerBetList(1)" :key="index">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${item.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ item.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ $formatMoneyToPlayerMenu(item.Amount) }}</div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuRoulette__players-list">
					<button class="PlayerMenuRoulette__multiplicator" :class="{'PlayerMenuRoulette__multiplicator--selected': selectedColor === 2}" @click="setSelectedColor(2)" @mousemove="(e) => setDinamicGradient(e, 'purple')">{{ `X${getMiniGameInfo.Roulette.MultiplierColor.Purple}` }}</button>
					<div class="PlayerMenuRoulette__info">
						<div class="PlayerMenuRoulette__info-count">{{ getPlayerBetList(2).length }}</div>
						<div class="PlayerMenuRoulette__info-bet">{{ $formatMoneyToPlayerMenu(getPlayerBetListAmount(2)) }}</div>
					</div>
					<div class="PlayerMenuRoulette__player-info" v-for="(item, index) in getPlayerBetList(2)" :key="index">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${item.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ item.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ $formatMoneyToPlayerMenu(item.Amount) }}</div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuRoulette__players-list">
					<button class="PlayerMenuRoulette__multiplicator" @click="setSelectedColor(3)" :class="{'PlayerMenuRoulette__multiplicator--selected': selectedColor === 3}" @mousemove="(e) => setDinamicGradient(e, 'red')">{{ `X${getMiniGameInfo.Roulette.MultiplierColor.Red}` }}</button>
					<div class="PlayerMenuRoulette__info">
						<div class="PlayerMenuRoulette__info-count">{{ getPlayerBetList(3).length }}</div>
						<div class="PlayerMenuRoulette__info-bet">{{ $formatMoneyToPlayerMenu(getPlayerBetListAmount(3)) }}</div>
					</div>
					<div class="PlayerMenuRoulette__player-info" v-for="(item, index) in getPlayerBetList(3)" :key="index">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${item.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ item.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ $formatMoneyToPlayerMenu(item.Amount) }}</div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuRoulette__players-list">
					<button class="PlayerMenuRoulette__multiplicator" @click="setSelectedColor(4)" :class="{'PlayerMenuRoulette__multiplicator--selected': selectedColor === 4}" @mousemove="(e) => setDinamicGradient(e, 'green')">{{ `X${getMiniGameInfo.Roulette.MultiplierColor.Aqua}` }}</button>
					<div class="PlayerMenuRoulette__info">
						<div class="PlayerMenuRoulette__info-count">{{ getPlayerBetList(4).length }}</div>
						<div class="PlayerMenuRoulette__info-bet">{{ $formatMoneyToPlayerMenu(getPlayerBetListAmount(4)) }}</div>
					</div>
					<div class="PlayerMenuRoulette__player-info" v-for="(item, index) in getPlayerBetList(4)" :key="index">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${item.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ item.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ $formatMoneyToPlayerMenu(item.Amount) }}</div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuRoulette__players-list">
					<button class="PlayerMenuRoulette__multiplicator" @click="setSelectedColor(5)" :class="{'PlayerMenuRoulette__multiplicator--selected': selectedColor === 5}" @mousemove="(e) => setDinamicGradient(e, 'blue')">{{ `X${getMiniGameInfo.Roulette.MultiplierColor.Blue}` }}</button>
					<div class="PlayerMenuRoulette__info">
						<div class="PlayerMenuRoulette__info-count">{{ getPlayerBetList(5).length }}</div>
						<div class="PlayerMenuRoulette__info-bet">{{ $formatMoneyToPlayerMenu(getPlayerBetListAmount(5)) }}</div>
					</div>
					<div class="PlayerMenuRoulette__player-info" v-for="(item, index) in getPlayerBetList(5)" :key="index">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${item.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ item.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ $formatMoneyToPlayerMenu(item.Amount) }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      amount: undefined,
      timer: 0,
      cellList: [],
      bindingColor: {
        0: 'none',
        1: 'orange',
        2: 'purple',
        3: 'red',
        4: 'aqua',
        5: 'blue'
      },
      selectedCoef: 5,
      coefList: [0.1, 0.5, 1, 5, 20, 100, 500],
      gameData: null,
      showWin: 0,
      selectedColor: undefined,
      isSvgSet: false,
      timers: {
        timerTime: null,
        timerColorWin: null
      }
    }
  },
  computed: {
    ...mapGetters({
      getMiniGameInfo: 'PlayerMenu_getMiniGameInfo'
    }),
    getPlayerBetList () {
      return (colorID) => {
        return this.gameData.ActiveGame.BetList.filter(x => x.Color == colorID)
      }
    },
    getPlayerBetListAmount () {
      return (colorID) => {
        let amount = 0
        this.gameData.ActiveGame.BetList.filter(x => x.Color == colorID).forEach(el => amount += el.Amount)
        return amount
      }
    }
  },
  watch: {
    gameData () {
      if (!this.isSvgSet) {
        setTimeout(() => this.setSvgRoulette())
        window.addEventListener('resize', () => this.setSvgRoulette())
        this.setCellList()
        this.isSvgSet = true
      }
    }
  },
  methods: {
    setSelectedColor (colorID) {
      if (!this.gameData.IsBetAccepted) {
        this.selectedColor = colorID
      }
    },
    onBet () {
      if (this.amount && !this.gameData.IsBetAccepted && this.selectedColor) {
        mp.trigger('PlayerMenu:MiniGames:Roulette:SetBetOnColor:Client', Number(this.selectedColor), Number(this.amount))
        this.amount = undefined
        this.selectedColor = undefined
      }
    },
    getCountZeroInTimer () {
      return 3 - this.timer.toString().length
    },
    setSvgRoulette () {
      const circles = document.querySelectorAll('.roulette-cell')
      const rotationAngle = 11.25
      const vminToPixels = Math.min(window.innerWidth, window.innerHeight) / 100
      circles.forEach((circle, index) => {
        const centerX = parseFloat(circle.getAttribute('cx')) * vminToPixels
        const centerY = parseFloat(circle.getAttribute('cy')) * vminToPixels
        const rotation = index * rotationAngle
        circle.setAttribute('transform', `rotate(${rotation} ${centerX} ${centerY})`)
      })
    },
    setCellList () {
      const cellList = []
      const totalCells = 32
      const chanceColorType = this.getMiniGameInfo.Roulette.ChanceColorType
      const colorCounts = Object.values(chanceColorType)
      const totalCounts = colorCounts.reduce((acc, count) => acc + count, 0)
      const colorPercentages = colorCounts.map(count => Math.round((count / totalCounts) * totalCells))
      Object.keys(chanceColorType).forEach((color, index) => {
        const count = colorPercentages[index]
        for (let i = 0; i < count; i++) {
          cellList.push({ color: color.toLowerCase() })
        }
      })
      this.cellList = this.shuffleArray(cellList)
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    setTimer (timeToNewGame) {
      this.timer = timeToNewGame > 0 ? timeToNewGame : 0
      this.timers.timerTime = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          this.timer = 0
          clearInterval(this.timers.timerTime)
          this.timers.timerTime = null
        }
      }, 1000)
    },
    calculateTimeUntilGame (synchronizedTime, timeStartWheelRotation) {
      const timeCreated = new Date(this.gameData.ActiveGame.TimeCreated)
      if (this.gameData.ActiveGame.IsBetAccepted) {
        const milliSecondsForWaitBets = this.gameData.MilliSecondsForWaitSpinRouletteToPlayers
        const timeUntilGame = +milliSecondsForWaitBets - (synchronizedTime - new Date(timeStartWheelRotation))
        return timeUntilGame
      } else {
        const timeUntilGame = +this.gameData.MilliSecondsForWaitBetsStart - (synchronizedTime - timeCreated)
        return timeUntilGame
      }
    },
    updateGame (gameData) {
      if (gameData == 'Closed') {
        this.gameData = 'Closed'
        return
      }
      // this.gameData = JSON.parse(gameData);
      this.gameData = gameData
      const serverTime = this.synchronizeServerTime(this.gameData)
      const winColor = this.bindingColor[this.gameData.ActiveGame.WinColor]
      const timeUntilGame = this.calculateTimeUntilGame(serverTime, this.gameData.ActiveGame.TimeStartWheelRotation)
      console.log(timeUntilGame)
      const IsBetAccepted = this.gameData.ActiveGame.IsBetAccepted
      if (!IsBetAccepted) {
        this.setTimer(Math.floor(timeUntilGame / 1000))
      } else if (winColor) {
        console.log(this.gameData.MilliSecondsForWaitSpinRouletteToPlayers > timeUntilGame && IsBetAccepted)
        if ((this.gameData.MilliSecondsForWaitSpinRouletteToPlayers > timeUntilGame) && IsBetAccepted) {
          setTimeout(() => this.setDeg(winColor, timeUntilGame), 10)
          return
        }
        console.log('test')
        setTimeout(() => this.setDeg(winColor), 5)
      }
    },
    calculatingDeg (color, arrow) {
      const regex = /\D/g
      const priviosValue = arrow.style.transform.replace(regex, '')
      const calculatingDeg = this.cellList.filter((item, i) => {
        item.id = i
        return item.color === color
      }).map(i => i.id)
      const randomIndex = calculatingDeg[Math.floor(Math.random() * calculatingDeg.length)]
      const countOfturns = Math.floor(Math.random() * 10) + 5 + Math.floor(+priviosValue / 360)
      const endDeg = randomIndex * 11.25 + Math.floor(Math.random() * 8) + (32 * countOfturns * 11.25) + (priviosValue ? 0 : -2)
      return endDeg
    },
    synchronizeServerTime (jsonData) {
      const serverTime = jsonData.ServerTime / 1000
      const currentTime = new Date().getTime() / 1000
      const timeDifference = serverTime - currentTime
      const synchronizedTime = new Date().getTime() + timeDifference * 1000
      return new Date(synchronizedTime)
    },
    setDeg (color, specialTime) {
      const arrow = document.getElementById('roulette')

      const endDeg = this.calculatingDeg(color, arrow)
      if (specialTime) {
        setTimeout(() => arrow.style.transition = `transform  ${specialTime}ms cubic-bezier(.87,.82,.75,.97)`, 10)
        setTimeout(() => arrow.style.transform = 'rotate(' + Math.floor(-endDeg) + 'deg)', 10)
      } else {
        setTimeout(() => arrow.style.transition = `transform  ${this.gameData.MilliSecondsForWaitSpinRouletteToPlayers}ms`, 5)
        setTimeout(() => arrow.style.transform = 'rotate(' + Math.floor(-endDeg) + 'deg)', 5)
      }
      this.timers.timerColorWin = setTimeout(() => {
        this.showWinAnim()
      }, specialTime || this.gameData.MilliSecondsForWaitSpinRouletteToPlayers)
    },
    showWinAnim () {
      const winColor = this.gameData.ActiveGame.WinColor
      this.timers.timerColorWin = null
      this.showWin = winColor
      setTimeout(() => this.showWin = 0, 1000)
    },
    setDinamicGradient (e, color) {
      const rect = e.target.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const bindGradient = {
        red: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #EA384D, #D31027)`,
        yellow: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #F9D423, #E65C00)`,
        purple: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #DA22FF, #9733EE )`,
        green: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #00CDAC, #02AAB0)`,
        blue: `radial-gradient(circle at ${x * 100}% ${y * 100}%, #4776E6, #8E54E9 )`
      }
      e.target.style.background = bindGradient[color]
    },
    addBet (json) {
      this.gameData.ActiveGame.BetList.push(JSON.parse(json))
    }
  },
  mounted () {
    this.amount = undefined
    setTimeout(() => this.updateGame(
      { ActiveGame: { ID: 2076, WinColor: 1, BetList: [], TimeCreated: '2023-06-09T21:00:05.2516877+03:00', TimeStartWheelRotation: '2023-06-09T21:00:18.2536765+03:00', IsBetAccepted: true }, LastGameList: [1, 2, 1, 3, 3, 1], ServerTime: 1686333618253, MilliSecondsForWaitBetsStart: 15000, MilliSecondsForWaitSpinRouletteToPlayers: 15000 }
			 ))
    // this.updateGame("Closed");
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:MiniGames:Roulette:UpdateGame:Cef', this.updateGame)
      mp.events.add('PlayerMenu:MiniGames:Roulette:AddBet:Cef', this.addBet)
      mp.trigger('PlayerMenu:MiniGames:Roulette:Mounted')
    }
    setTimeout(() => this.setSvgRoulette())
    window.addEventListener('resize', () => this.setSvgRoulette())
    this.setCellList()
  },
  unmounted () {
    if (this.timers.timerColorWin != null) {
      clearTimeout(this.timers.timerColorWin)
      this.timers.timerColorWin = null
    }
    if (this.timers.timerTime != null) {
      clearInterval(this.timers.timerTime)
      this.timers.timerTime = null
    }
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:MiniGames:Roulette:UpdateGame:Cef', this.updateGame)
      mp.events.remove('PlayerMenu:MiniGames:Roulette:AddBet:Cef', this.addBet)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuRoulette__header {
	width: 100%;
	height: 20.093vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 4.074vmin 3.241vmin;
	box-sizing: border-box;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	display: flex;
	justify-content: space-between;
	margin-bottom: 5vmin;
}

.PlayerMenuRoulette__name-section {
	display: flex;
	align-items: center;

	width: 38.333vmin;
}

.PlayerMenuRoulette__roulette-fx {
	position: absolute;
	width: 99%;
	height: 98%;
	left: 0;
	z-index: 5000;
	top: 0;
	border-radius: 50%;
	box-shadow: 0 0 55px rgba(255, 166, 0, 0);
	opacity: 1;
	transition: box-shadow 0.2s ease, opacity 0.2s ease;
	background: linear-gradient(135deg, rgba(255,255,255,0.0844712885154062) 0%, rgba(0,0,0,0.23853291316526615) 100%);
&::after {
		content: "";
		position: absolute;
		width: 95%;
		height: 95%;
		box-sizing: border-box;
		top: 50%;
		left: 50%;
		transform: translate(-50.5%, -50%);
		opacity: 0.5;
		background: linear-gradient(165deg, rgba(255,255,255,0.0544712885154062) 0%, rgba(0,0,0,0.23853291316526615) 100%);
		border-radius: 50%;
	}
}

.PlayerMenuRoulette__roulette {
  width: 38.271vmin;
  height: 38.271vmin;
}

.PlayerMenuRoulette_title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	width: 9.259vw;

	color: #FFFFFF;
}

.PlayerMenuRoulette_subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;

	color: rgba(255, 255, 255, 0.24);
	width: 28.889vmin;
	margin-top: 0.926vmin;
}

.PlayerMenuRoulette_img {
	width: 12.037vmin;
	height: 12.037vmin;
	margin-right: 2.778vmin;
}

.PlayerMenuRoulette__input-section {
	position: relative;

	&::after {
		content: "";
		position: absolute;
		width: 1.296vmin;
		height: 1.296vmin;
		background: url(./playerMenu_Coins.svg) no-repeat center/contain;
		right: 1.389vmin;
		top: 1.944vmin;
	}
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
	width: 100%;
	outline: none;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.852vmin;
	line-height: 2.222vmin;
	color: #FFFFFF;
	margin-bottom: 2.407vmin;
	transition: transform 0.3s ease, box-shadow 0.3s ease, height 0.3s ease, margin 0.3s ease;
	&:hover {
		box-shadow: 0 0 15px #EA384D6f;
		transform: scale(1.02);
		height: 5vmin;
		margin-top: -0.2vmin;
	}

	&:active {
		transform: scale(0.98);
	}
}

.PlayerMenuRoulette__info {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
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

.win-list {
	filter:  drop-shadow(0 0 5px #ffffff00) drop-shadow(1px 1px 0px #17bb25f4);
	transform: scale(1.05);
}

.PlayerMenuRoulette__players-list {
	position: relative;
	transition: transform 0.3s ease, filter 0.3s ease;
	pointer-events: all;
	&:nth-child(2) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(96.47deg, #DA22FF -0.14%, #9733EE 96.41%);
			&:hover {
				box-shadow: 0 0 15px #9733ee6f;
			}
		}
	}

	&:nth-child(3) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(304.67deg, #D31027 0%, #EA384D 97.73%);
			&:hover {
				box-shadow: 0 0 15px #EA384D6f;
			}
		}
	}

	&:nth-child(4) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(313.98deg, #02AAB0 0%, #00CDAC 100%);
			&:hover {
				box-shadow: 0 0 15px #00CDAC6f;
			}
		}
	}

	&:nth-child(5) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
			&:hover {
				box-shadow: 0 0 15px #4776EC6f;
			}
		}
	}
}

.PlayerMenuRoulette__player-info {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
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

.PlayerMenuRoulette__input {
	width: 43.241vmin;
	height: 5.093vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 1.296vmin;
	box-sizing: border-box;
	outline: none;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
}

.PlayerMenuRoulette__bat-placeholder {
	display: flex;
	width: 43.241vmin;
	justify-content: space-between;
	margin-top: 1.296vmin;

	&>div {
		background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 255, 255, 0.08);
		border-radius: 0.37vmin;
		width: 5.093vmin;
		height: 5.093vmin;
		display: flex;
		align-items: center;
		justify-content: center;

		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.667vmin;
		line-height: 2.037vmin;
		color: #FFFFFF;
	}

	&>.selected {
		background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 1px solid rgba(146, 255, 108, 0.88);
		border-radius: 4px;
	}
}

.PlayerMenuRoulette__profit-section {
	display: flex;
	align-items: center;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;

	&>div:first-child {
		margin-right: 2.5vmin;
	}
}

.PlayerMenuRoulette__profit {
	padding: 1.574vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	min-width: 11.481vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 1.111vmin;
	box-sizing: border-box;

	&:last-child {
		margin: 0;
	}

	&>span {
		color: #FFD646;
		margin-left: 0.463vmin;
	}
}

.PlayerMenuRoulette__roulette-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.481vmin;
	line-height: 1.759vmin;

	color: #FFFFFF;
}

.PlayerMenuRoulette__bet-button {
	max-width: 43.241vmin;
	width: 100%;
	height: 5.093vmin;
	margin-top: 1.296vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(115, 255, 29, 0.07) 0%, rgba(115, 255, 29, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid #73FF1D;
	border-radius: 0.37vmin;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;

	&::after {
		content: "";
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		bottom: 0;
		transition: opacity 0.2s ease;
		// transform: translateY(100%);
		background: url(./playerMenu_8fvm.gif) no-repeat center/cover;
		mix-blend-mode: screen;
		opacity: 0;
	}

	&--disactive {
		filter: grayscale(1);
		&::after {
		opacity: 0.2;
	}
	}

	&:hover {
		transform: scale(1.05);
		border-radius: 10px;
		box-shadow: 0 10px 50px #74ff1d3a, 0 5px 10px rgb(0, 0, 0);
	}

	&:active {
		transform: scale(0.95);
		border-radius: 10px;
		box-shadow: 0 10px 50px #74ff1d3a, 0 5px 10px rgb(0, 0, 0);

		&::after {
			content: "";
			transform: translateY(0%);
			opacity: 0.5;
		}
	}
}

.PlayerMenuRoulette__roulette-timer {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 5.556vmin;
	line-height: 6.667vmin;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	color: rgba(255, 255, 255);
	text-align: center;

	&>div>span {
		color: rgba(255, 255, 255, 0.03);
	}
}

.PlayerMenuRoulette__roulette-container {
	width: 38.271vmin;
}

.PlayerMenuRoulette__multiplicator {
	height: 4.815vmin;
	background: linear-gradient(90deg, #E65C00 0%, #F9D423 100%);
	border-radius: 0.278vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.852vmin;
	line-height: 2.222vmin;
	color: #FFFFFF;
	margin-bottom: 2.407vmin;
	pointer-events: all;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		width: 105%;
		height: 120%;
		border: 2px solid #ffffffac;
		border-radius: 5px;

		border-image-slice: 1;
  	border-width: 3px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.3s;
	}
	&--selected {
		&::after {
			opacity: 1;
		}
	}
}

.PlayerMenuRoulette__info {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
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
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(96.47deg, #DA22FF -0.14%, #9733EE 96.41%);
		}
	}

	&:nth-child(3) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(304.67deg, #D31027 0%, #EA384D 97.73%);
		}
	}

	&:nth-child(4) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(313.98deg, #02AAB0 0%, #00CDAC 100%);
		}
	}

	&:nth-child(5) {
		&>.PlayerMenuRoulette__multiplicator {
			background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
		}
	}
}

.PlayerMenuRoulette__history {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	width: 46.296vmin;
	height: 9.537vmin;
	padding: 1.481vmin;
	box-sizing: border-box;
	margin-top: 3.519vmin;

	&>div {
		width: 0.4vmin;
		border-radius: 2.13vmin;
		height: 1.852vmin;
		animation: large-to-min 1s ease infinite alternate-reverse;
		position: relative;
		&::after {
			content: "";
			width: 100%;
			height: 100%;
			background: linear-gradient(135deg, rgba(255, 255, 255, 0.059) 10%, rgba(20,20,20,0) 50%, rgba(0, 0, 0, 0.297) 100%);
			position: absolute;
			top: 0;
			z-index: 4500;
		}

		&:nth-child(2n) {
			height: 3.519vmin;
			animation: min-to-large 1s ease-in-out infinite alternate-reverse;
		}
	}
}

@keyframes large-to-min {
	0% {
		height: 3.519vmin;
	}

	100% {
		height: 1.852vmin;
	}
}

@keyframes min-to-large {
	100% {
		height: 3.519vmin;
	}

	0% {
		height: 1.852vmin;
	}
}

.PlayerMenuRoulette__main {
	display: flex;
}

.PlayerMenuRoulette__info-count {
	display: flex;

	&::before {
		content: "";
		width: 1.085vmin;
		height: 1.435vmin;
		background: url(./playerMenu_icon.svg) no-repeat center/contain;
		margin-right: 0.926vmin;
	}
}

.PlayerMenuRoulette__info-bet {
	display: flex;

	&::after {
		content: "";
		width: 1.481vmin;
		height: 1.481vmin;
		background: url(./playerMenu_Coins.svg) no-repeat center/contain;
		margin-left: 0.926vmin;
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
	background: url(./croupier-svgrepo-com.svg) no-repeat center/contain;
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

.PlayerMenuRoulette__roulette-arrow {
	width: 35.463vmin;
	height: 100%;
	transform: translateY(-0.185vmin);
	position: absolute;
	right: -5.556vmin;
	background: url(./playerMenu_roulette_arrow.svg) no-repeat center/contain;
}

#roulette {
	transform: rotate(2deg);
	transition: transform 7s cubic-bezier(0.64, 0.1, 0.165, 1);
	transform-origin: 18.767vmin 18.967vmin ;
}

.PlayerMenuRoulette__roulette-container {
	position: relative;
	&::after {
		content: "";
		width: 6.705vmin;
		height: 6.705vmin;
		background: url(./Combined1.png) no-repeat center/contain;
		position: absolute;
		top: 0;
		right: -4vmin;
	}
	&::before {
		content: "";
		width: 12.261vmin;
		height: 2.469vmin;
		background: url(./Combined.png) no-repeat center/contain;
		position: absolute;
		bottom: 0;
		right: -4vmin;
	}
}

.PlayerMenuRoulette__roulette-arrow-wrapper {
	position: absolute;
	top: 0;
	width: 38.271vmin;
	height: 100%;
	transform: rotate(0);
	transition: transform 7s cubic-bezier(0.64, 0.1, 0.165, 1)
}

.PlayerMenuRoulette__player-info-img {
	width: 3.611vmin;
	height: 3.611vmin;
	border-radius: 50%;
	overflow: hidden;

	&>img {
		width: 3.611vmin;
		height: 3.611vmin;
	}
}
</style>
