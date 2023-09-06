<template>
	<div class="PlayerMenuCasesPrise">
		<div class="PlayerMenuOpenCase__case-name">Ваши призы</div>
		<div class="PlayerMenuOpenCase__back-button-section">
			<div class="PlayerMenuOpenCase__back-button" @click="$router.push('/playerMenu/casesShop')">Назад</div>
		</div>
		<div class="PlayerMenuCasesPrise__main">
			<div class="PlayerMenuOpenCase__win-modal-content"
				:class="`PlayerMenuOpenCase__win-modal-content--${bindColor[getRarityLevelFromChance(item)]}`" v-for="(item, index) in caseItems" :key="index">
				<div class="PlayerMenuOpenCase__win-modal-title">{{ item.Name }}</div>
				<div class="PlayerMenuOpenCase__win-modal-name"></div>
				<div class="PlayerMenuOpenCase__win-modal-img-wrapper">
					<img class="PlayerMenuOpenCase__win-modal-img" src="../../Assets/playerMenu_Car.png" />
				</div>
				<div class="PlayerMenuOpenCase__win-modal-buttons-section">
					<button @click="interactWithPrize(index, 'sell')">Продать за {{ item.SellPrice }}<span> {{ item.SellIsRubles ? "₽" : "CC" }}</span></button>
					<button @click="interactWithPrize(index, 'take')">Забрать</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      bindColor: {
        1: 'red',
        2: 'white',
        3: 'yellow',
        4: 'purple',
        5: 'blue'
      },
      caseItems: []
    }
  },
  methods: {
    interactWithPrize (index, type) {
      mp.trigger('PlayerMenu:CasePrizes:InteractWithPrize:Client', index, type)
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
    loadPrizes (json) {
      this.caseItems = JSON.parse(json)
    },
    removePrize (index) {
      if (this.caseItems[index]) {
        this.caseItems.splice(index, 1)
      }
    }
  },
  mounted () {
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:CasePrizes:Load:Cef', this.loadPrizes)
      mp.events.add('PlayerMenu:CasePrizes:RemovePrize:Cef', this.removePrize)
      mp.trigger('PlayerMenu:CasePrizes:AwaitOpenedMenu')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:CasePrizes:Load:Cef', this.loadPrizes)
      mp.events.remove('PlayerMenu:CasePrizes:RemovePrize:Cef', this.removePrize)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuCasesPrise {
	width: 100%;
	height: 100%;
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
		box-shadow: 0 0 1.389vmin rgba(255, 39, 91, 0.5);
	}
}

.PlayerMenuCasesPrise__main {
	display: grid;
	gap: 3.704vmin;
	grid-template-columns: repeat(auto-fill, 26.298vmin);
	max-height: 66.198vmin;
	margin-top: 2.13vmin;
	padding: 0.463vmin 0 2.778vmin 0;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-right: 5px;
	align-items: center;
	justify-content: center;

	&::-webkit-scrollbar {
		width: 0.648vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.648vmin;
		background: rgba(255, 255, 255, 0.01);
	}

	&::-webkit-scrollbar-thumb {
		width: 0.648vmin;
		background: #FFFFFF;
	}
}

.PlayerMenuOpenCase__win-modal-content {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.2) 0%, rgba(255, 255, 255, 0.02) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3.148vmin;
	box-sizing: border-box;
	height: 31.247vmin;
	position: relative;
	transition: transform 0.5s ease;

	&:hover {
		transform: scale(1.02);
	}

	&::after {
		content: "";
		mask: url(../../Assets/case/playerMenu_modalborder.svg) no-repeat center/contain;
		background-color: #ffffff;
		position: absolute;
		width: calc(100% + 0.648vmin);
		height: calc(100% + 0.463vmin);
		top: -0.231vmin;
		left: -0.231vmin;
		pointer-events: none;
	}

	&--blue {
		background: radial-gradient(50% 50% at 50% 50%, rgba(43, 153, 255, 0.2) 0%, rgba(43, 153, 255, 0.02) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(43, 153, 255, 0.08);

		&::after {
			background-color: #2B99FF;
		}

		&>.PlayerMenuOpenCase__win-modal-title {
			color: #2B99FF;
		}
	}

	&--red {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 46, 0.2) 0%, rgba(255, 0, 46, 0.02) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 0, 46, 0.08);

		&::after {
			background-color: #FF002E;
		}

		&>.PlayerMenuOpenCase__win-modal-title {
			color: #FF002E;
		}
	}

	&--yellow {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 208, 43, 0.2) 0%, rgba(255, 208, 43, 0.02) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 208, 43, 0.08);

		&::after {
			background-color: #FFD02B;
		}

		&>.PlayerMenuOpenCase__win-modal-title {
			color: #FFD02B;
		}
	}

	&--purple {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 43, 247, 0.2) 0%, rgba(255, 43, 247, 0.02) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 43, 247, 0.08);

		&::after {
			background-color: #FF2BF7;
		}

		&>.PlayerMenuOpenCase__win-modal-title {
			color: #FF2BF7;
		}
	}

}

.PlayerMenuOpenCase__win-modal-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
}

.PlayerMenuOpenCase__win-modal-name {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 3.704vmin;
	line-height: 4.444vmin;
	color: #FFA450;
	margin-top: 1.574vmin;
}

.PlayerMenuOpenCase__win-modal-img {
	width: 20.337vmin;
	height: auto;
}

.PlayerMenuOpenCase__win-modal-buttons-section {
	position: absolute;
	bottom: 1.481vmin;
	padding: 0 2.778vmin;

	&>button {
		background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 255, 255, 0.08);
		border-radius: 0.37vmin;

		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		font-weight: 700;
		font-size: 1.481vmin;
		line-height: 1.759vmin;
		padding: 0.833vmin;

		color: #FFFFFF;
		margin-bottom: 0.37vmin;
		width: 100%;

		&>span {
			color: #c6b062;
		}

		&:hover {
			background: radial-gradient(50% 50% at 50% 50%, rgba(224, 224, 224, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		}
	}
}
</style>
