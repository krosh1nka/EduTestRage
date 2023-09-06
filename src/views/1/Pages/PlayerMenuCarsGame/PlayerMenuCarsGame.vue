<template>
	<div class="PlayerMenuCarsGame" v-if="gameData != null">
		<div class="PlayerMenuCarsGame__close-modal" v-if="gameData == 'Closed'">
			<div class="PlayerMenuCarsGame__close-modal-img"></div>
			<div>Игра в данный момент закрыта</div>
		</div>
		<template v-else>
			<div class="PlayerMenuCarsGame__header">
				<div class="PlayerMenuCarsGame__name-section">
					<div class="PlayerMenuMain__info-item-title-section">
						<img class="PlayerMenuMain__info-item-img" src="../../Assets/carsGame/playerMenu_gameLogo.png" />
						<div class="PlayerMenuMain__info-item-text-section">
							<div class="PlayerMenuMain__info-item-title">#{{ gameData.ActiveGame.ID }}</div>
							<div class="PlayerMenuMain__info-item-sub-title">Тут вы можете посмотреть всю информацию о себе
							</div>
						</div>
					</div>
				</div>
				<div class="PlayerMenuCarsGame__coefficient-section">
					<div class="PlayerMenuCarsGame__coefficient-tilte">Коэфиценты</div>
					<div class="PlayerMenuCarsGame__coefficient-list">
						<div class="PlayerMenuCarsGame__coefficient"
							:class="`PlayerMenuCarsGame__coefficient--${lastGame.CarType}`" :key="lastGame.CrashX + (i + '')"
							v-for="(lastGame, i) in gameData.LastCarsGames">
							{{ "x " + lastGame.CrashX }}</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuCarsGame__main">
				<div class="PlayerMenuCarsGame__road-list" ref="road">
					<img src="../../Assets/carsGame/playerMenu_Road.png" preload :key="i" v-for="i in roadLength" class="PlayerMenuCarsGame__road"/>
				</div>
				<div class="OrangeCar-coeficient">x{{ coeficientData.OrangeCar }}</div>
				<div class="BlueCar-coeficient">x{{ coeficientData.BlueCar }}</div>
				<div class="left left--OrangeCar" v-if="carsStatus.OrangeCar === 'left'">Уехал</div>
				<div class="detained detained-orange" v-else-if="carsStatus.OrangeCar === 'detained'">Задержан</div>
				<div class="left left--BlueCar" v-if="carsStatus.BlueCar === 'left'">Уехал</div>
				<div class="detained detained-blue" v-else-if="carsStatus.BlueCar === 'detained'">Задержан</div>
				<div ref="OrangeCar" class="PlayerMenuCarsGame__car">
					<div></div>
				</div>
				<div ref="BlueCar" class="PlayerMenuCarsGame__car PlayerMenuCarsGame__car--blue">
					<div>
					</div>
				</div>
				<div class="timer-modal" v-if="showTimer">
					<div>ИГРА СКОРО НАЧНЕТСЯ</div>
					<div>{{ timerValue }}</div>
				</div>
			</div>
			<div class="PlayerMenuCarsGame__sidebar">
				<div class="PlayerMenuCarsGame__sidebar-header">
					<div>
						<div class="PlayerMenuCarsGame__sidebar-subtitle">Всего ставок:</div>
						<div class="PlayerMenuCarsGame__sidebar-count">{{ gameData.ActiveGame.BetList.length }}</div>
					</div>
					<div class="PlayerMenuCarsGame__privious">
						<div></div>Пред. раунд
					</div>
				</div>
				<div class="PlayerMenuCarsGame__player-list">
					<div class="PlayerMenuRoulette__player-info" :key="bet.ID" v-for="bet in gameData.ActiveGame.BetList">
						<div class="PlayerMenuRoulette__player-info-img">
							<img :src="`http://a.rsg.sc/n/${bet.SocialClub}/s`" />
						</div>
						<div>
							<div class="PlayerMenuRoulette__player-info-name">{{ bet.Login }}</div>
							<div class="PlayerMenuRoulette__player-info-count">{{ bet.Amount }}</div>
						</div>
						<div class="PlayerMenuRoulette__player-multiplicators" v-if="bet.Type !== 2" :class="`PlayerMenuRoulette__player-multiplicators--${getBetStyle(bet)}`">{{ `X${bet.Data}` }}</div>
						<div class="PlayerMenuRoulette__player-multiplicators" v-else :class="`PlayerMenuRoulette__player-multiplicators--${getBetStyle(bet)}`">
							<carSvg></carSvg>
						</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuCarsGame__bet-section">
				<div class="PlayerMenuCarsGame__bet-group">
					<div class="PlayerMenuCarsGame__bet-item">
						<div>Коэффициент:</div>
						<div class="PlayerMenuCarsGame__bet-multiplicator">x
							<input v-model="userCoef.OrangeCar" @input="validateCoef('OrangeCar')"
								:disabled="gameData.ActiveGame.IsBetAccepted" />
						</div>
					</div>
					<div class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--input">
						<input v-model="userAmount.OrangeCar" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5)"
							placeholder="Введите сумму..." :disabled="gameData.ActiveGame.IsBetAccepted" />
					</div>
					<div class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--empty">
						<div @click="this.userCoef.OrangeCar = '0.1'"
							:class="{ 'select': this.userCoef.OrangeCar == '0.1' }">0.1</div>
						<div @click="this.userCoef.OrangeCar = '0.5'"
							:class="{ 'select': this.userCoef.OrangeCar === '0.5' }">0.5</div>
						<div @click="this.userCoef.OrangeCar = '1'" :class="{ 'select': this.userCoef.OrangeCar === '1' }">1
						</div>
						<div @click="this.userCoef.OrangeCar = '5'" :class="{ 'select': this.userCoef.OrangeCar === '5' }">5
						</div>
					</div>
					<button
						class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-orange"
						@click="onBet('OrangeCar')" v-if="getTypeIsShowButton('OrangeCar') === 0">Поставить на
						оранжевого</button>
					<button
						class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-orange"
						v-else-if="getTypeIsShowButton('OrangeCar') === 1">В игре</button>
					<button
						class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-orange"
						@click="onTake('OrangeCar')" id="OrangeCarButtonInGame"
						v-else-if="getTypeIsShowButton('OrangeCar') === 2">{{ btnAnimStatus.OrangeCar ? getBtnText("OrangeCar") : "Забрать" }}
						<span v-if="!(btnAnimStatus.OrangeCar && getBtnText('OrangeCar'))">
							{{ Math.round(userBets[bindEnum['OrangeCar']].Amount * (!userBets[bindEnum['OrangeCar']].IsTaked ?
								coeficientData.OrangeCar : userBets[bindEnum['OrangeCar']].Data)) }}
						</span>
					</button>
				</div>
				<div class="PlayerMenuCarsGame__bet-group">
					<div class="PlayerMenuCarsGame__bet-item">
						<div>Коэффициент:</div>
						<div class="PlayerMenuCarsGame__bet-multiplicator">x <input v-model="userCoef.BlueCar"
								@input="validateCoef('BlueCar')" :disabled="gameData.ActiveGame.IsBetAccepted" /></div>
					</div>
					<div class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--input">
						<input v-model="userAmount.BlueCar" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5)"
							placeholder="Введите сумму..." :disabled="gameData.ActiveGame.IsBetAccepted" />
					</div>
					<div class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--empty">
						<div @click="this.userCoef.BlueCar = '0.1'" :class="{ 'select': this.userCoef.BlueCar == '0.1' }">
							0.1</div>
						<div @click="this.userCoef.BlueCar = '0.5'" :class="{ 'select': this.userCoef.BlueCar === '0.5' }">
							0.5</div>
						<div @click="this.userCoef.BlueCar = '1'" :class="{ 'select': this.userCoef.BlueCar === '1' }">1
						</div>
						<div @click="this.userCoef.BlueCar = '5'" :class="{ 'select': this.userCoef.BlueCar === '5' }">5
						</div>
					</div>
					<button class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button"
						v-if="getTypeIsShowButton('BlueCar') === 0" @click="onBet('BlueCar')">Поставить на синего</button>
					<button class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button"
						v-else-if="getTypeIsShowButton('BlueCar') === 1">В игре</button>
					<button class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button"
						@click="onTake('BlueCar')" id="BlueCarButtonInGame" v-else-if="getTypeIsShowButton('BlueCar') === 2">
						{{ btnAnimStatus.BlueCar ? getBtnText("BlueCar") : "Забрать" }}
						<span v-if="!(btnAnimStatus.BlueCar && getBtnText('BlueCar'))">
							{{ Math.round(userBets[bindEnum['BlueCar']].Amount * (!userBets[bindEnum['BlueCar']].IsTaked ?
								coeficientData.BlueCar : userBets[bindEnum['BlueCar']].Data)) }}
						</span>
					</button>
				</div>
				<div class="PlayerMenuCarsGame__hr"></div>
				<div class="PlayerMenuCarsGame__bet-win-section">
					<div class="PlayerMenuCarsGame__bet-win-title">Кто победит?<span> x {{ getMiniGameInfo.Cars.MultiplierOnWinCar }}</span></div>
					<div class="PlayerMenuCarsGame__bet-win-buttons">
						<button class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button"
							:class="{ 'PlayerMenuCarsGame__bet-item--button-selected': selectedCar === 0 }"
							@click="selectedCar = 0">Синий</button>
						<button
							class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-orange"
							:class="{ 'PlayerMenuCarsGame__bet-item--button-orange-selected': selectedCar === 1 }"
							@click="selectedCar = 1">Оранжевый</button>
					</div>
					<div class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--input">
						<input v-model="userAmount.OnOneCar" :disabled="gameData.ActiveGame.IsBetAccepted"
							oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5)" placeholder="Введите сумму..." />
					</div>
					<button
						class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-green"
							v-if="!gameData.ActiveGame.IsBetAccepted" @click="onBet('OnOneCar')">Сделать ставку</button>
					<button
						class="PlayerMenuCarsGame__bet-item PlayerMenuCarsGame__bet-item--button PlayerMenuCarsGame__bet-item--button-green PlayerMenuCarsGame__bet-item--button-green--disabled" v-else>Гонка идет..</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import carSvg from './carSvg.vue'
export default {
  data () {
    return {
      selectedCar: 1,
      roadLength: 20,
      gameData: null,
      userCoef: {
        BlueCar: '1.0',
        OrangeCar: '1.0'
      },
      userAmount: {
        BlueCar: undefined,
        OrangeCar: undefined,
        OnOneCar: undefined
      },
      carsStatus: {
        BlueCar: '',
        OrangeCar: ''
      },
      previousCarsStatus: {
        BlueCar: '',
        OrangeCar: ''
      },
      animatonsIntervalCarObj: {
        OrangeCar: null,
        BlueCar: null
      },
      roadInterval: null,
      crashCars: [],
      coeficientData: {
        BlueCar: 1,
        OrangeCar: 1
      },
      userBets: {},
      previousUserBets: {},
      btnAnimStatus: {
        BlueCar: false,
        OrangeCar: false
      },
      previousCreateTime: null,
      showTimer: false,
      timerValue: 0,
      bindEnum: {
        BlueCar: 0,
        OrangeCar: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      getInfoMainMenu: 'PlayerMenu_getInfoMainMenu',
      getMiniGameInfo: 'PlayerMenu_getMiniGameInfo'
    })
  },
  components: {
    carSvg
  },
  watch: {
    carsStatus: {
      handler (newValues) {
        const keys = Object.keys(newValues)
        keys.forEach(key => {
          if (newValues[key] !== this.previousCarsStatus[key] && this.gameData.ActiveGame.IsBetAccepted) {
            this.setButtonStatusAnim(key)
          }
        })
        this.previousCarsStatus = { ...newValues }
      },
      deep: true
    },
    userBets: {
      handler (newValues) {
        const keys = Object.keys(newValues)
        keys.forEach(key => {
          if (newValues[key].IsTaked !== this.previousUserBets[key]?.IsTaked && this.gameData.ActiveGame.IsBetAccepted && newValues[key].IsTaked) {
            this.setButtonStatusAnim(+key)
          }
        })
        this.previousUserBets = { ...newValues }
      },
      deep: true
    }
  },
  methods: {
    getRandomY () {
      return Math.floor(Math.random() * 31) - 15 + 'px'
    },
    getRandomX () {
      return Math.floor(Math.random() * 900) + -100 + 'px'
    },
    getTypeIsShowButton (typeCar) {
      if (!this.gameData.ActiveGame.IsBetAccepted) {
        return 0
      }
      return this.userBets[this.bindEnum[typeCar]] ? 2 : 1
    },
    getBtnText (typeCar) {
      if (this.userBets[this.bindEnum[typeCar]].IsTaked) {
        return ''
      }
      if (!this.btnAnimStatus[typeCar]) {
        return `Забрать <span>${Math.round(this.userBets[this.bindEnum[typeCar]].Amount * this.coeficientData.OrangeCar)}</span>`
      }
      const bindText = {
        left: 'УЕХАЛ',
        detained: 'ЗАДЕРЖАН'
      }
      return bindText[this.carsStatus[typeCar]]
    },
    getBetStyle (bet) {
      if (!bet) return
      const betColor = Object.keys(this.bindEnum)[bet.Type] || Object.keys(this.bindEnum)[bet.Data]
      if (bet.Type === 2) {
        if (this.carsStatus[betColor]) {
          return this.carsStatus[betColor] === 'left' ? 'green' : 'red'
        };
        return bet.Data ? 'yellow' : 'blue'
      }
      if (bet.IsTaked) {
        return bet.Data >= 1.0 ? 'green' : 'red'
      } else if (this.crashCars.includes(betColor)) {
        return 'red'
      }
      return bet.Type ? 'yellow' : 'blue'
    },
    validateCoef (typeCar) {
      const fistValue = this.userCoef[typeCar]
      this.userCoef[typeCar] = this.userCoef[typeCar].replace(/[^0-9.]/g, '')
      const parts = this.userCoef[typeCar].split('.')
      let integerPart = parts[0]
      let decimalPart = parts[1]
      if (integerPart.length > 3) {
        integerPart = integerPart.slice(0, 3)
      }
	    	if (decimalPart && decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2)
      }
      this.userCoef[typeCar] = fistValue.includes('.') ? `${integerPart}.${decimalPart}` : integerPart
    },
    validateAmount (typeCar) {
      const fistValue = this.userAmount[typeCar]
      this.userAmount[typeCar] = this.userAmount[typeCar].replace(/[^0-9.]/g, '')
      const parts = this.userAmount[typeCar].split('.')
      const integerPart = parts[0]
      let decimalPart = parts[1]
      if (decimalPart && decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2)
      }
      this.userAmount[typeCar] = fistValue.includes('.') ? `${integerPart}.${decimalPart}` : integerPart
    },
    getNonDrivingCar () {
      const gameData = this.gameData
      const stoppedCars = []
      for (const car in gameData.ActiveGame.Cars) {
        if (!gameData.ActiveGame.Cars[car].IsDriving) {
          stoppedCars.push(car)
        }
      }
      return stoppedCars.length > 0 ? stoppedCars : null
    },
    synchronizeServerTime (jsonData) {
      const serverTime = jsonData.ServerTime / 1000
      const currentTime = new Date().getTime() / 1000
      const timeDifference = serverTime - currentTime
      const synchronizedTime = new Date().getTime() + timeDifference * 1000
      return new Date(synchronizedTime)
    },
    setUserBets () {
      const SocialClub = this.getInfoMainMenu.socialClub
      const userBets = this.gameData.ActiveGame.BetList.filter(bet => bet.SocialClub == SocialClub)
      userBets.forEach(bet => {
        this.userBets[bet.Type] = bet
      })
      this.userBets = Object.assign({}, this.userBets)
    },
    setButtonStatusAnim (typeCar) {
      const bet = typeof typeCar === 'number' ? this.userBets[typeCar] : this.userBets[this.bindEnum[typeCar]]
      const carColor = Object.keys(this.bindEnum)[bet?.Type]
      console.log(this.btnAnimStatus)
      if (!bet || this.btnAnimStatus[carColor]) {
        return
      }
      const btn = document.getElementById(`${carColor}ButtonInGame`)
      if (!bet.IsTaked) {
        btn.classList.add('failAnim')
        this.btnAnimStatus[carColor] = true
        setTimeout(() => btn.classList?.remove('failAnim'), 2000)
      } else {
        btn.classList.add('succsesAnim')
        this.btnAnimStatus[carColor] = true
        setTimeout(() => btn.classList?.remove('succsesAnim'), 2000)
      }
    },
    setToDefault () {
      this.clearTimers()
      this.roadLength = 20
      this.carsStatus = {
        BlueCar: '',
        OrangeCar: ''
      }
      this.previousCarsStatus = {
        BlueCar: '',
        OrangeCar: ''
      }
      this.animatonsIntervalCarObj = {
        OrangeCar: null,
        BlueCar: null
      }
      this.crashCars = []
      this.coeficientData = {
        BlueCar: 1,
        OrangeCar: 1
      }
      this.btnAnimStatus = {
        BlueCar: false,
        OrangeCar: false
      }
      this.previousUserBets = {}
      this.userBets = {}
      setTimeout(() => {
        this.$refs.OrangeCar.style.transform = 'translateY(0) translateX(100px)'
        this.$refs.BlueCar.style.transform = 'translateY(0) translateX(100px)'
        this.$refs.road.style.transition = 'transform 0s cubic-bezier(.57,.31,.5,.55)'
        this.$refs.road.style.transform = 'translateX(0)'
      })
    },
    clearTimers () {
      clearInterval(this.animatonsIntervalCarObj.OrangeCar)
      clearInterval(this.animatonsIntervalCarObj.BlueCar)
      clearInterval(this.roadInterval)
      clearInterval(this.coftimer)
    },
    calculateTimeUntilGame (synchronizedTime) {
      const activeGame = this.gameData.ActiveGame
      const timeCreated = new Date(activeGame.TimeCreated)
      const difference = synchronizedTime - timeCreated
      return +this.gameData.MilliSecondsForWaitBetsStart - difference
    },
    setCoefTimer () {
      this.coftimer = setInterval(() => {
        const nextBlueCof = this.coeficientData.BlueCar + 0.01
        const nextOrangeCof = this.coeficientData.OrangeCar + 0.01
        if (!this.carsStatus.BlueCar) {
          this.coeficientData.BlueCar = +nextBlueCof.toFixed(2)
        }
        if (!this.carsStatus.OrangeCar) {
          this.coeficientData.OrangeCar = +nextOrangeCof.toFixed(2)
        }
      }, 50)
    },
    setRoadAnim (road) {
      let countIteration = 1
      setTimeout(() => road.style.transition = 'transform 2.5s cubic-bezier(.57,.31,.5,.55)', 20)
      setTimeout(() => {
        road.style.transform = `translateX(-${countIteration * 5000}px)`
      }, 20)
      const interval = setInterval(() => {
        countIteration++
        setTimeout(() => road.style.transition = 'transform 2.5s linear')
        setTimeout(() => road.style.transform = `translateX(-${countIteration * 5000}px)`)
        if (!(countIteration % 5)) {
          this.roadLength += 20
        }
        this.roadInterval = interval
      }, 2500)
    },
    updateGame (gameData) {
      if (gameData == 'Closed') {
        this.gameData = 'Closed'
        return
      }
      // this.gameData = JSON.parse(gameData);
      this.gameData = gameData
      this.coeficientData.BlueCar = this.gameData.ActiveGame.Cars.BlueCar.X
      this.coeficientData.OrangeCar = this.gameData.ActiveGame.Cars.OrangeCar.X
      const IsBetAccepted = this.gameData.ActiveGame.IsBetAccepted
      const serverTime = this.synchronizeServerTime(this.gameData)
      const timeUntilGame = this.calculateTimeUntilGame(serverTime)
      if (timeUntilGame > 0) {
        this.setTimer(Math.round(timeUntilGame / 1000))
      }
      if (this.previousCreateTime !== this.gameData.ActiveGame.TimeCreated) {
        if (IsBetAccepted) {
          setTimeout(() => this.startGame())
        } else {
          this.setToDefault()
        }
        this.previousCreateTime = this.gameData.ActiveGame.TimeCreated
      }
      if (IsBetAccepted) {
        if (this.getNonDrivingCar()) {
          this.getNonDrivingCar().forEach(element => {
            if (!this.crashCars.includes(element)) {
              setTimeout(() => this.crashCar(element))
            }
          })
        } else {
          this.startGame()
        }
      }
    },
    startGame () {
      this.setAnimationCar(this.$refs.OrangeCar, 'OrangeCar')
      this.setAnimationCar(this.$refs.BlueCar, 'BlueCar')
      this.setRoadAnim(this.$refs.road)
      this.setCoefTimer()
      this.setUserBets()
    },
    setTimer (time) {
      this.timerValue = time - 1
      this.showTimer = true
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.timerValue--
        if (this.timerValue <= 0) {
          clearInterval(this.timer)
          this.showTimer = false
        }
      }, 1000)
    },
    crashCar (typeCar) {
      clearInterval(this.animatonsIntervalCarObj[typeCar])
      if (typeCar === 'OrangeCar') {
        setTimeout(() => this.$refs.OrangeCar.style.transform = this.crashCars.length ? 'translateX(1000%)' : 'translateX(-500%)')
      }
      if (typeCar === 'BlueCar') {
        setTimeout(() => this.$refs.BlueCar.style.transform = this.crashCars.length ? 'translateX(1000%)' : 'translateX(-500%)')
      }
      this.carsStatus[typeCar] = this.crashCars.length ? 'left' : 'detained'
      setTimeout(() => this.crashCars.push(typeCar))
    	},
    setAnimationCar (car, typeCar) {
      const carStyle = {
        transform: `translateY(${this.getRandomY()}) translateX(${this.getRandomX()})`
      }
      setTimeout(() => car.style.transform = carStyle.transform)
      const interval = setInterval(() => {
        const carStyle = {
          transform: `translateY(${this.getRandomY()}) translateX(${this.getRandomX()})`
        }
        car.style.transform = carStyle.transform
      }, 2500)
      this.animatonsIntervalCarObj[typeCar] = interval
    },
    onBet (type) {
      mp.trigger('PlayerMenu:MiniGames:Cars:Bet:Client', JSON.stringify({
        Type: String(type),
        Data: type == 'OnOneCar' ? this.selectedCar : parseFloat(this.userCoef[type]),
        Amount: this.userAmount[type]
      }))
    },
    addBet (json) {
      this.gameData.ActiveGame.BetList.push(JSON.parse(json))
      this.setUserBets()
    },
    onTake (type) {
      mp.trigger('PlayerMenu:MiniGames:Cars:TakeBet:Client', type)
    },
    updateBet (json) {
      const bet = JSON.parse(json)
      const findedIndex = this.gameData.ActiveGame.BetList.findIndex(_ => _.ID == bet.ID)
      if (findedIndex !== -1) {
        this.gameData.ActiveGame.BetList[findedIndex] = bet
      }
      this.setUserBets()
    }
  },
  mounted () {
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:MiniGames:Cars:UpdateGame:Cef', this.updateGame)
      mp.events.add('PlayerMenu:MiniGames:Cars:AddBet:Cef', this.addBet)
      mp.events.add('PlayerMenu:MiniGames:Cars:UpdateBet:Cef', this.updateBet)
      mp.trigger('PlayerMenu:MiniGames:Cars:Mounted')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:MiniGames:Cars:UpdateGame:Cef', this.updateGame)
      mp.events.remove('PlayerMenu:MiniGames:Cars:AddBet:Cef', this.addBet)
      mp.events.remove('PlayerMenu:MiniGames:Cars:UpdateBet:Cef', this.updateBet)
    }
    this.clearTimers()
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuCarsGame__header {
	display: flex;
}

.PlayerMenuCarsGame__coefficient-list {
	display: grid;
	grid-template-columns: repeat(9, 6.481vmin);
	gap: 0.833vmin 1.111vmin;
	margin-top: 1.204vmin;
}

.left {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.963vmin;
	line-height: 3.519vmin;

	color: #FFFFFF;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);

	&--OrangeCar {
		top: 4.63vmin;
	}

	&--BlueCar {
		bottom: 6.481vmin;
	}
}

.PlayerMenuCarsGame__bet-section {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	width: 120vmin;
	height: 27.13vmin;
	margin-top: 4.259vmin;
	padding: 1.389vmin 3.704vmin;
	box-sizing: border-box;
}

.PlayerMenuCarsGame__bet-group {
	width: 28.241vmin;
	margin-right: 2.87vmin;
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
	background: url(./driver-svgrepo-com.svg) no-repeat center/contain;
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
.PlayerMenuCarsGame__bet-item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	height: 5.093vmin;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.389vmin;
	box-sizing: border-box;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 400;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: rgba(255, 255, 255, 0.22);
	margin-bottom: 1.296vmin;

	&--input {
		padding: 0;
		position: relative;

		&::after {
			content: "";
			background: url(../../Assets/playerMenu_Coins.svg);
			width: 1.296vmin;
			height: 1.296vmin;
			position: absolute;
			right: 1.389vmin;
			top: 50%;
			transform: translateY(-50%);
		}

		&>input {
			width: 28.241vmin;
			outline: none;
			font-family: 'PF DinDisplay Pro';
			font-style: normal;
			font-weight: 700;
			font-size: 1.667vmin;
			line-height: 2.037vmin;
			color: #FFFFFF;
			position: relative;
			height: 5.093vmin;
			background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
				/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			;
			border: 0.093vmin solid rgba(255, 255, 255, 0.08);
			border-radius: 0.37vmin;
			padding: 1.389vmin;
			box-sizing: border-box;
		}
	}

	&--button {
		background: radial-gradient(50% 50% at 50% 50%, rgba(29, 106, 255, 0.07) 0%, rgba(29, 106, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid #1D6AFF;
		border-radius: 0.37vmin;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.667vmin;
		line-height: 2.037vmin;
		color: #FFFFFF;
		transition: transform 0.1s ease, background-color 0.05s ease;

		&>span {
			font-size: 2.3vmin;
			background: linear-gradient(98.56deg, #1C5FE2 3.38%, #1C9BE2 96.39%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			text-fill-color: transparent;
			padding-left: 0.5vmin;
		}

		&-selected {
			background-color: #1c5ee25d;
		}

		&:hover {
			transform: scale(1.05);
			background-color: #1c5ee25d;
		}

		&:active {
			transform: scale(0.99);
			background-color: #1C5FE2;
		}

		&-green {
			background: radial-gradient(50% 50% at 50% 50%, rgba(142, 255, 53, 0.07) 0%, rgba(142, 255, 53, 0.01) 100%);
			border: 1px solid #8EFF35;
			border-radius: 4px;

			&:hover {
				transform: scale(1.05);
				background-color: #8dff3556;
			}

			&--disabled {
				background: url(./giphy.gif) no-repeat center/cover;
				opacity: 0.5;
				filter: grayscale(1);
				transition: background-position 0.5s ease;

				&:hover {
					transform: scale(1);
					background-position: 0 -20px;
				}
			}
		}

		&-orange {
			background: radial-gradient(50% 50% at 50% 50%, rgba(255, 137, 29, 0.07) 0%, rgba(255, 137, 29, 0.01) 100%);
			border: 0.093vmin solid #FF891D;

			&>span {
				font-size: 2vmin;
				background: linear-gradient(87.07deg, #FF891D 2.35%, #FFB800 117.05%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;
				text-fill-color: transparent;
				padding-left: 0.5vmin;
			}

			&-selected {
				background-color: #ff8a1d56;
			}

			&:hover {
				transform: scale(1.05);
				background-color: #ff8a1d56;
			}

			&:active {
				transform: scale(0.99);
				background-color: #FF891D;
			}
		}
	}

	&--empty {
		background: transparent;
		border-color: transparent;
		padding: 0;

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
		}

		&>.select {
			background: radial-gradient(50% 50% at 50% 50%, rgba(142, 255, 53, 0.07) 0%, rgba(142, 255, 53, 0.01) 100%);
			border: 1px solid #8EFF35;
			color: #FFFFFF;
		}
	}
}

.PlayerMenuCarsGame__hr {
	background: url(../../Assets/carsGame/playerMenu_hr.svg) no-repeat center/contain;
	min-width: 0.741vmin;
	height: 100%;
	margin: 0 5.556vmin 0 3.704vmin;
}

.PlayerMenuCarsGame__bet-win-buttons {
	display: flex;
	margin-top: 1.481vmin;

	&>button:first-child {
		margin-right: 0.926vmin;
	}

	;
}

.PlayerMenuCarsGame__player-list {
	height: 68.704vmin;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 0.648vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.648vmin;
		background: #ffffff00;
	}

	&::-webkit-scrollbar-thumb {
		width: 0.648vmin;
		background: #FFFFFF;
	}
}

.PlayerMenuCarsGame__bet-win-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	text-align: center;
	color: #FFFFFF;
	padding-top: 1.389vmin;

	&>span {
		color: #61FFA0;
	}
}

.PlayerMenuCarsGame__bet-section {
	display: flex;
}

.PlayerMenuCarsGame__bet-win-section {
	width: 40.37vmin;
	height: 5.093vmin;

	&>.PlayerMenuCarsGame__bet-item--input>input {
		width: 40.37vmin;
	}
}

.PlayerMenuCarsGame__bet-multiplicator {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	display: flex;
	align-items: center;
	justify-content: center;

	color: #61FFA0;

	&>input {
		width: 5.037vmin;
		outline: none;
		background: none;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		text-align: center;
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.667vmin;
		line-height: 2.037vmin;
		color: #61FFA0;
	}
}

.PlayerMenuCarsGame__coefficient {

	&--1 {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 137, 29, 0.07) 0%, rgba(255, 137, 29, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid #FF891D;
	}

	&--0 {
		background: radial-gradient(50% 50% at 50% 50%, #1c5ee228 0%, #1c5ee205 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid #1C5FE2;
	}

	border-radius: 0.37vmin;
	width: 6.481vmin;
	height: 4.63vmin;
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
	box-sizing: border-box;
}

.timer-modal {
	width: 100%;
	height: 100%;
	background-color: #0000009a;
	backdrop-filter: grayscale(50%);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 50;

	&>div:first-child {
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 2.222vmin;
		line-height: 2.685vmin;
		color: #FFFFFF;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 6.481vmin;
	}

	&>div {
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 6.296vmin;
		line-height: 7.593vmin;
		color: #FFFFFF;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 5.556vmin;
	}
}

.PlayerMenuCarsGame__coefficient-section {
	width: 70.463vmin;
	height: 16.944vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 1.667vmin 1.944vmin;
	box-sizing: border-box;
}

.PlayerMenuCarsGame__name-section {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	width: 47.778vmin;
	height: 16.944vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 2.222vmin;
}

.PlayerMenuCarsGame__road-list {
	animation: road 15s ease-in-out infinite;
	mix-blend-mode: hard-light;
	height: 26.389vmin;
	display: flex;
	transition: transform 2.5s cubic-bezier(.57, .31, .5, .55);
}

.PlayerMenuCarsGame__main {
	width: 122.5vmin;
	height: 26.389vmin;
	margin-top: 2.87vmin;
	overflow: hidden;
	position: relative;
}

.PlayerMenuCarsGame__car {
	width: 17.5vmin;
	height: 17.407vmin;
	position: absolute;
	top: -1.481vmin;
	transform: translateX(18.519vmin);
	transition: transform 2.5s;

	&>div {
		width: 17.5vmin;
		height: 17.407vmin;
		background: url(../../Assets/carsGame/playerMenu_orange-car.png) no-repeat center/contain;
	}

	&--blue {
		top: 9.722vmin;

		&>div {
			width: 17.5vmin;
			height: 17.407vmin;
			background: url(../../Assets/carsGame/playerMenu_blue-car.png) no-repeat center/contain;
		}
	}

	z-index: 2;

	&::after {
		content: "";
		width: 14.815vmin;
		height: 18.796vmin;
		background: url(../../Assets/carsGame/playerMenu_nitro.png) no-repeat center/contain;
		position: absolute;
		left: -7.87vmin;
		z-index: -1;
		top: 50%;
		transform: translateY(-50%) scaleX(1);
		transform-origin: right;
		animation: nitro 2.5s ease-out infinite alternate;
	}

	&::before {
		content: "";
		width: 14.815vmin;
		height: 10.185vmin;
		background: url(../../Assets/carsGame/playerMenu_lightnes.png) no-repeat center/contain;
		position: absolute;
		right: -10.648vmin;
		top: 50%;
		transform: translateY(-50%);
	}
}

.OrangeCar-coeficient {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;

	position: absolute;
	top: 6.019vmin;
	right: 2.778vmin;
	background: linear-gradient(87.07deg, #FF891D 2.35%, #FFB800 117.05%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
}

.PlayerMenuRoulette__player-info {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 0.833vmin 1.389vmin;
	display: flex;
	margin-bottom: 1.667vmin;
	position: relative;
	box-sizing: border-box;

	&:first-child {
		margin-top: 0.741vmin;
	}
}

.PlayerMenuRoulette__player-multiplicators {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	text-align: center;

	color: #61FFA0;
	position: absolute;
	top: 50%;
	right: 1.852vmin;
	transform: translateY(-50%);

	&>svg {
		width: 3.904vmin;
		fill: #FFFFFF;
		transform: scaleX(-1);
	}

	&--green {
		text-shadow: 0 0 1.389vmin #61ffa0a5;

		&>svg {
			fill: #61ffa0;
			filter: drop-shadow(0 0 1.389vmin #61ffa0a5);
		}
	}

	&--red {
		color: #FF2B44;

		&>svg {
			fill: #FF2B44;
			filter: drop-shadow(0 0 1.389vmin #ff2b4498);
		}
	}

	&--yellow {
		color: #FF9C07;

		&>svg {
			fill: #FF9C07;
		}
	}

	&--blue {
		&>svg {
			fill: #1C5FE2;
		}

		color: #1C5FE2;
	}
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
		background: url(../../Assets/playerMenu_Coins.svg) no-repeat center/contain;
		margin-right: 0.37vmin;
	}
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

@keyframes nitro {
	0% {
		transform: translateY(-50%) scaleX(0.8);
		opacity: 0.5;
	}

	40% {
		transform: translateY(-50%) scaleX(0.95);
		opacity: 0.7;
	}

	100% {
		transform: translateY(-50%) scaleX(1);
		opacity: 1;
	}
}

.BlueCar-coeficient {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	background: linear-gradient(98.56deg, #1C5FE2 3.38%, #1C9BE2 96.39%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	position: absolute;
	bottom: 6.944vmin;
	right: 2.778vmin;
}

.PlayerMenuCarsGame__sidebar {
	// width: 27.315vmin;
	height: 77.778vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	position: absolute;
	top: 0;
	right: 0;
	left: 123.759vmin;
	padding: 1.759vmin 1.389vmin;
	box-sizing: border-box;
}

.PlayerMenuCarsGame__sidebar-header {
	display: flex;
	justify-content: space-between;
}

.failAnim {
	position: relative;
	border: 1px solid #ca2929;

	&::after {
		content: '';
		mask: url(./5b853da68db501658078d2b4.png) repeat center/cover;
		position: absolute;
		background-color: #ca2929;
		top: 0;
		width: 100%;
		height: 100%;
		mask-size: 500px;
		animation: failanim 2s ease;
		opacity: 0;
	}

	&::before {
		content: '';
		position: absolute;
		background-color: #ca2929;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		box-shadow: 0 0 15px #ca292953;
	}
}

.succsesAnim {
	position: relative;
	border: 1px solid #77ca29;

	&::after {
		content: '';
		mask: url(./5b853da68db501658078d2b4.png) repeat center/cover;
		position: absolute;
		background-color: #7fca29;
		top: 0;
		width: 100%;
		height: 100%;
		mask-size: 500px;
		animation: failanim 2s ease;
		opacity: 0;
	}

	&::before {
		content: '';
		position: absolute;
		background-color: #3cca29;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		box-shadow: 0 0 15px #2eca2953;
	}
}

@keyframes failanim {
	0% {
		opacity: 1;
		mask-position: 100% 100%;
	}

	100% {
		mask-position: 0 0;
		opacity: 0;
	}
}

.PlayerMenuCarsGame__privious {
	width: 13.889vmin;
	height: 4.167vmin;

	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.278vmin;
	display: flex;
	align-items: center;
	justify-content: space-around;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;

	&>div {
		background: url(../../Assets/carsGame/playerMenu_timer.svg) no-repeat center/contain;
		width: 2.222vmin;
		height: 2.222vmin;
	}

	&:hover {
		background: #c2d4f856;
	}

	&:active {
		background: #c2d4f8c7;
	}
}

.PlayerMenuCarsGame__sidebar-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 400;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: rgba(255, 255, 255, 0.25);
}

.PlayerMenuCarsGame__sidebar-count {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;

	color: #61FFA0;
}

.PlayerMenuCarsGame__road {
	display: inline;
	min-width: 195.093vmin;
	height: 26.389vmin;
	// background: url(../../Assets/carsGame/playerMenu_Road.png) no-repeat center/contain;
	mix-blend-mode: hard-light;
	margin-left: -0.463vmin;
}

.PlayerMenuCarsGame__coefficient-tilte {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
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
}

.PlayerMenuMain__info-item-title-section {
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenuMain__info-item-img {
	width: 10.741vmin;
	height: 10.741vmin;
	margin-right: 1.944vmin;
	filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);
}

.detained {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	position: absolute;

	&::before {
		content: "";
		mask: url(../../Assets/carsGame/playerMenu_take\ 1.svg) no-repeat center/contain;
		height: 4.63vmin;
		width: 4.63vmin;
		margin-right: 2.222vmin;
	}

	&-orange {
		top: 4.63vmin;
		left: 18.519vmin;

		&::before {
			background-color: #FF891D;
		}
	}

	&-blue {
		top: 15.741vmin;
		left: 18.519vmin;

		&::before {
			background-color: #1C5FE2;
		}
	}
}
</style>
