<template>
	<div v-if="getOpenCase">
		<div class="PlayerMenuOpenCase">
			<div class="PlayerMenuOpenCase__case-name">{{ getOpenCase.Name }}</div>
			<div class="PlayerMenuOpenCase__back-button-section">
				<div class="PlayerMenuOpenCase__back-button" @click="$router.push('/playerMenu/casesShop')">Назад</div>
				<div class="PlayerMenuOpenCase__back-button PlayerMenuOpenCase__back-button--cases" @click="openPrizeList">Призы</div>
			</div>
			<div class="PlayerMenuOpenCase__openCase-section-wrapper">
				<div class="PlayerMenuOpenCase__openCase-section">
					<div class="PlayerMenuOpenCase__openCase-list" id="caseList">
						<div :class="`PlayerMenuOpenCase__case-item PlayerMenuOpenCase__case-item--min PlayerMenuOpenCase__case-item--${bindColor[getRarityLevelFromChance(caseItem)]}`"
							v-for="(caseItem, index) in caseItemsListForOpen" :key="index">
							<img src="../../Assets/playerMenu_Car.png" />
							<div>{{ caseItem.Name }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenuOpenCase__controll-panel">
				<button class="PlayerMenuOpenCase__button" @click="buyCase">Открыть</button>
				<div class="PlayerMenuOpenCase__fast-open-section">
					<div>Быстрое открытие</div>
					<input type="checkbox" v-model="fastOpen" class="PlayerMenuOpenCase__fast-open" />
				</div>
				<div class="PlayerMenuOpenCase__multiplicators">
					<div class="PlayerMenuOpenCase__multiplicator" @click="() => selectMultiplecator = multiplicator"
						:class="{ 'PlayerMenuOpenCase__multiplicator--selected': selectMultiplecator === multiplicator }"
						:key="multiplicator" v-for="multiplicator in listOfMultiplecators">{{ multiplicator }}</div>
				</div>
			</div>
			<div class="PlayerMenuOpenCase__case-item-list">
				<div :class="`PlayerMenuOpenCase__case-item PlayerMenuOpenCase__case-item--${bindColor[getRarityLevelFromChance(caseItem)]}`"
					v-for="(caseItem, index) in getOpenCase.PrizeList" :key="index">
					<img src="../../Assets/playerMenu_Car.png" />
					<div>{{ caseItem.Name }}</div>
				</div>
			</div>
		</div>
		<Transition name="showModal">
			<div class="PlayerMenuOpenCase__win-modal" v-if="showModal && getCasePrizeActive">
				<div class="PlayerMenuOpenCase__win-modal-content">
					<div class="PlayerMenuOpenCase__win-modal-title">Ваш приз</div>
					<div class="PlayerMenuOpenCase__win-modal-name">{{ getCasePrizeActive.Name }}</div>
					<div class="PlayerMenuOpenCase__win-modal-img-wrapper">
						<img class="PlayerMenuOpenCase__win-modal-img" src="../../Assets/playerMenu_Car.png" />
					</div>
					<div class="PlayerMenuOpenCase__win-modal-buttons-section">
						<div>
							<button @click="takePrize('sell')">Продать за {{ $formatMoneyToPlayerMenu(getCasePrizeActive.SellPrice) }}<span> {{ getCasePrizeActive.SellIsRubles ? "₽" : "CC" }}</span></button>
							<button @click="takePrize('take')">Забрать</button>
						</div>
						<button @click="takePrize('postPone')">Отложить</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
<script>
import CaseListJSON from '../../../../../../configServer/PlayerMenu/Cases/caseList.json'
export default {
  data () {
    return {
      selectMultiplecator: 0,
      listOfMultiplecators: [1, 2, 3, 4, 5],
      openedCaseIndex: 0,
      priviusPosition: 0,
      lastId: 1,
      caseItemsListForOpen: [],
      isInGame: false,
      bindColor: {
        1: 'red',
        2: 'white',
        3: 'yellow',
        4: 'purple',
        5: 'blue'
      },
      showModal: false,
      fastOpen: false,
      openedCasePrizeList: [],
      openedCaseFastResultServer: false
    }
  },
  computed: {
    getOpenCase () {
      return CaseListJSON[this.openedCaseIndex]
    },
    getCasePrizeActive () {
      return CaseListJSON[this.openedCaseIndex].PrizeList[this.openedCasePrizeList[0].IndexCasePrize]
    }
  },
  methods: {
    openPrizeList () {
      mp.trigger('PlayerMenu:SelectTabRouting:Client', 'casesPrise')
    },
    takePrize (type) {
      this.showModal = false
      mp.trigger('PlayerMenu:CaseMenu:TakePrize:Client', type, this.openedCasePrizeList[0].IndexPlayerPrize)
      this.openedCasePrizeList.shift()
      if (this.openedCasePrizeList.length > 0) {
        this.startRoullette(this.openedCaseFastResultServer)
      }
    },
    getRarityLevelFromChance (item) {
      const chanceItem = item.Chance
      if (chanceItem <= 10) {
        return 1
      } else if (chanceItem > 10 && chanceItem <= 25) {
        return 2
      } else if (chanceItem > 25 && chanceItem <= 40) {
        return 3
      } else if (chanceItem > 40 && chanceItem <= 70) {
        return 4
      }
      return 5
    },
    shuffleAndExtendCaseList () {
      const caseItems = CaseListJSON[this.openedCaseIndex].PrizeList
      const caseList = [...caseItems, ...caseItems, ...caseItems, ...caseItems, ...caseItems, ...caseItems, ...caseItems, ...caseItems]
      for (let i = caseList.length - 1; i > 0; i--) {
        caseList[i].id = this.lastId
        this.lastId++
        const j = Math.floor(Math.random() * (i + 1));
        [caseList[i], caseList[j]] = [caseList[j], caseList[i]]
      }
      this.lastId += 100
      const caseItemsListForOpen = [...this.caseItemsListForOpen, ...caseList]
      this.caseItemsListForOpen = caseItemsListForOpen.slice()
    },
    buyCase () {
      if (!this.isInGame) {
        this.openedCaseFastResultServer = false
        this.openedCasePrizeList = []
        mp.trigger('PlayerMenu:CaseMenu:Open:Client', JSON.stringify({
          IndexCase: this.openedCaseIndex,
          FastOpen: this.fastOpen,
          CountOpened: this.selectMultiplecator
        }))
      }
    },
    startRoullette (fastOpen) {
      if (this.isInGame) return
      if (fastOpen == true) {
        this.showModal = true
        return
      }
      this.shuffleAndExtendCaseList()
      this.generateRandomPosition(this.openedCasePrizeList[0].IndexCasePrize)
    },
    generateRandomPosition (indexCasePrize) {
      const width = 140.99
      this.isInGame = true
      const randomCount = Math.floor(Math.random() * (this.caseItemsListForOpen.length - this.priviusPosition - 30)) + this.priviusPosition + 20
      const randomInaccuracy = Math.floor(Math.random() * width) + width * 0.34
      const listElem = document.getElementById('caseList')
      this.caseItemsListForOpen[randomCount + 6] = CaseListJSON[this.openedCaseIndex].PrizeList[indexCasePrize]
      this.priviusPosition = randomCount
      listElem.style.transform = `translateX(${(-randomCount * width) - randomInaccuracy}px)`
      setTimeout(() => {
        this.showModal = true
        this.isInGame = false
      }, 10000)
    },
    OpenedCaseResult (json) {
      json = JSON.parse(json)
      this.openedCasePrizeList = json.ResultServer
      this.openedCaseFastResultServer = json.IsFastOpened
      if (this.openedCasePrizeList.length > 0) {
        this.startRoullette(this.openedCaseFastResultServer)
      }
    }
  },
  mounted () {
    this.openedCaseFastResultServer = false
    this.openedCasePrizeList = []
    this.selectMultiplecator = 1
    this.openedCaseIndex = this.$route.params.index
    this.shuffleAndExtendCaseList()
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:CaseMenu:OpenedCaseResult:Cef', this.OpenedCaseResult)
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:CaseMenu:OpenedCaseResult:Cef', this.OpenedCaseResult)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuOpenCase__back-button-section {
	display: flex;
	justify-content: space-between;
}

.PlayerMenuOpenCase__noMoney-info-section {
	width: 30.185vmin;
	height: 7.407vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(255, 39, 91, 0.37) 0%, rgba(255, 39, 91, 0.1) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid #FF275B;
	border-radius: 0.37vmin;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 40%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&>div {
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.481vmin;
		line-height: 1.759vmin;
		text-align: center;

		color: #FFFFFF;

		&>span {
			color: #FFD646;
		}

		&:last-child {
			font-weight: 300;
			font-size: 1.296vmin;
			margin-top: 0.463vmin;
		}
	}
}

.PlayerMenuOpenCase__case-item-list {
	max-height: 44.203vmin;
	overflow: scroll;

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

.PlayerMenuOpenCase__back-button {
	width: 12.5vmin;
	height: 5.093vmin;
	background: linear-gradient(180deg, rgba(255, 39, 91, 0) 0%, rgba(255, 39, 91, 0.08) 100%);
	border: 0.093vmin solid #FF275B;
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;

	&:hover {
		background-color: rgba(255, 39, 91, 0.08);
		box-shadow: 0 0 15px rgba(255, 39, 91, 0.5);
	}
}

.PlayerMenuOpenCase__noMoney {
	margin: auto;
	position: absolute;
	left: 50%;
	top: 13.889vmin;
	transform: translateX(-50%);

	&>img {
		width: 18.426vmin;
		height: 19.444vmin;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -65%);
	}
}

.PlayerMenuOpenCase__openCase-section {
	background: radial-gradient(50% 51.26% at 50% 48.74%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) -2.51%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	height: 18.426vmin;
	display: flex;
	align-items: center;
	overflow: hidden;
	position: relative;

	&--noOverflow {
		overflow: visible;

		&::after {
			content: none !important;
		}
	}
}

.PlayerMenuOpenCase__case-name {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;

	color: #FFFFFF;

	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 0.463vmin
}

.PlayerMenuOpenCase__win-modal-img-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	margin-top: 44px;
	align-items: center;
	justify-content: center;
	max-width: 392px;
	max-height: 250.37px;

}

.PlayerMenuOpenCase__openCase-section-wrapper {
	position: relative;
	width: 1604px;
	margin: 2.685vmin auto 0;

	&::after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 24.583vmin;
		height: 22.315vmin;
		background: url(../../Assets/case/playerMenu_arrow.svg) no-repeat center/contain;
	}

	&--noMoney {
		&::after {
			content: none;
		}

		&>.PlayerMenuOpenCase__openCase-section {
			overflow: visible;
		}
	}
}

@keyframes roll {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(-277.778vmin);
	}
}

.showModal-enter-active,
.showModal-leave-active {
	transition: opacity 0.5s ease;

	&>.PlayerMenuOpenCase__win-modal-content {
		transition: transform 0.5s ease;
		transform: translate(-50%, -50%);
	}
}

.showModal-enter-from,
.showModal-leave-to {
	opacity: 0;

	&>.PlayerMenuOpenCase__win-modal-content {
		transform: translate(-50%, -50%);
	}
}

.PlayerMenuOpenCase__case-item {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;
	position: relative;
	width: 16.759vmin;
	height: 17.546vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&::after {
		content: "";
		mask: url(../../Assets/case/playerMenu_case-border.svg) no-repeat center/contain;
		width: 100%;
		position: absolute;
		background-color: #FFD02B;
		top: -3.55px;
		left: 0;
		bottom: -3.55px;
	}

	&>img {
		max-width: 10.06vmin;
		max-height: 10.148vmin;
		position: absolute;
		top: 30px;
		filter: drop-shadow(0px 0px 15px #ffd12b33);
	}

	&>div {
		position: absolute;
		bottom: 23px;
		justify-self: flex-end;
	}

	&--min {
		font-size: 14px;
		width: 125.99px;
		height: 139px;
		margin-right: 15px;

		&:last-child {
			margin-right: 0;
		}

		&>img {
			max-width: 87.05px;
			max-height: 55.6px;
		}
	}

	&--red {
		&::after {
			content: "";
			;
			background-color: #FF002E;
		}

		&>img {
			filter: drop-shadow(0px 0px 15px #ff002f33);
		}
	}

	&--blue {
		&::after {
			content: "";
			;
			background-color: #2B99FF;
		}

		&>img {
			filter: drop-shadow(0px 0px 15px#2B99FF33);
		}
	}

	&--white {
		&::after {
			content: "";
			;
			background-color: #FFFFFF;
		}

		&>img {
			filter: drop-shadow(0px 0px 15px#FFFFFF33);
		}
	}

	&--purple {
		&::after {
			content: "";
			background-color: #FF2BF7;
		}

		&>img {
			filter: drop-shadow(0px 0px 15px#FF2BF733);
		}
	}
}

.PlayerMenuOpenCase__openCase-list {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 1.019vmin;
	transition: transform 10s cubic-bezier(.69, .02, 0, .98);
}

.PlayerMenuOpenCase__controll-panel {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 4.63vmin;
}

.PlayerMenuOpenCase__button {
	width: 20.278vmin;
	height: 5.093vmin;
	background: linear-gradient(180deg, rgba(142, 255, 53, 0) 0%, rgba(142, 255, 53, 0.08) 100%);
	border: 0.093vmin solid #8EFF35;
	border-radius: 0.37vmin;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
	margin-right: 0.833vmin;
	transition: background-color 0.3s ease;

	&:hover {
		background: rgba(142, 255, 53, 0.5);
		color: rgb(255, 255, 255);
		box-shadow: 0 0 15px rgba(142, 255, 53, 0.5);
	}

	&:active {
		background: rgb(141, 255, 53);
		transform: scale(0.975);
	}

	&>span {
		color: #FFD646;
	}
}

.PlayerMenuOpenCase__fast-open {
	appearance: none !important;
	background: rgba(255, 255, 255, 0.02);
	border-radius: 0.093vmin;
	width: 3.611vmin;
	height: 1.667vmin;
	position: relative;

	&::after {
		content: "";
		width: 1.296vmin;
		height: 1.296vmin;
		background: #FFFFFF;
		border-radius: 0.093vmin;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0.185vmin;
		right: auto;
		transition: right 0.3s ease;
	}

	&:checked {
		background: #8EFF35;

		&::after {
			content: "";
			left: auto;
			right: 0.185vmin;
		}
	}
}

.PlayerMenuOpenCase__fast-open-section {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	width: 23.241vmin;
	height: 5.093vmin;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
	padding: 1.296vmin;
	box-sizing: border-box;
}

.PlayerMenuOpenCase__multiplicators {
	display: flex;
	align-items: center;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;
}

.PlayerMenuOpenCase__multiplicator {
	width: 5.093vmin;
	height: 5.093vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0.833vmin;

	&--selected {
		background: radial-gradient(50% 50% at 50% 50%, rgba(146, 255, 108, 0.07) 0%, rgba(47, 255, 43, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(146, 255, 108, 0.88);
		border-radius: 0.37vmin;
	}
}

.PlayerMenuOpenCase__case-item-list {
	display: grid;
	margin: auto;
	grid-template-columns: repeat(auto-fill, 16.759vmin);
	justify-content: center;
	align-items: center;
	gap: 2.222vmin;
	margin-top: 4.814vmin;
}

.PlayerMenuOpenCase__win-modal {
	background: rgba(11, 11, 14, 0.92);
	width: 100vmin;
	height: 100vh;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-54.5%, -54%);
}

.PlayerMenuOpenCase__win-modal-content {
	position: absolute;
	width: 504.31px;
	height: 602.31px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.2) 0%, rgba(255, 255, 255, 0.02) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 38px;
	box-sizing: border-box;

	&::after {
		content: "";
		background: url(../../Assets/case/playerMenu_modalborder.svg) no-repeat center/contain;
		position: absolute;
		width: calc(100% + 7px);
		height: calc(100% + 7px);
		top: -2.5px;
		left: -2.5px;
		pointer-events: none;
	}
}

.PlayerMenuOpenCase__win-modal-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 29px;
	color: #FFFFFF;
}

.PlayerMenuOpenCase__win-modal-name {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 40px;
	line-height: 48px;
	color: #FFA450;
	margin-top: 17px;
}

.PlayerMenuOpenCase__win-modal-img {
	width: auto;
	height: 100%;
	margin: auto;
}

.PlayerMenuOpenCase__win-modal-buttons-section {
	position: absolute;
	bottom: 38px;

	&>button {
		background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;

		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		padding: 18px 22px;

		color: #FFFFFF;
		margin-right: 8px;
		width: 100%;

		&:hover {
			background: radial-gradient(50% 50% at 50% 50%, rgba(224, 224, 224, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		}
	}

	&>div {
		margin-bottom: 8px;

		&>button {
			background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
				/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
			;
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 4px;

			font-family: 'PF DinDisplay Pro';
			font-style: normal;
			font-weight: 700;
			font-size: 16px;
			line-height: 19px;
			padding: 18px 22px;

			color: #FFFFFF;
			margin-right: 8px;

			&:hover {
				background: radial-gradient(50% 50% at 50% 50%, rgba(224, 224, 224, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			}

			&:last-child {
				margin-right: 0;
			}

			&>span {
				color: #c6b062;
			}

			;
		}
	}
}
</style>
