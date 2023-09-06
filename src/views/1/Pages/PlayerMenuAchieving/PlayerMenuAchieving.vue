<template>
	<div class="PlayerMenuAchieving">
		<div class="PlayerMenuAchieving__item" v-for="(item, index) in PlayerAchievments" :key="index">
			<img src="./images/playerMenu_achivment.png" />
			<div class="PlayerMenuAchieving__item-title-section">
				<div class="PlayerMenuAchieving__item-title">{{ getAchievFromPlayer(item).Name }}</div>
				<div class="PlayerMenuAchieving__item-subtitle">Ваша задача:</div>
				<div class="PlayerMenuAchieving__item-addition-info">
					<img src="./images/playerMenu_skull-bolt-svgrepo-com.png" />
					<div>{{ getAchievFromPlayer(item).TaskDescription }}</div>
				</div>
			</div>
			<div class="PlayerMenuAchieving__item-reward">
				<div>Награда:</div>
				<div class="PlayerMenuAchieving__item-reward-item" v-for="(reward, index) in getAchievFromPlayer(item).PrizeList" :key="index">
					<img :src="require(`${getAchievReward(reward).Image}`)" />
					<div :class="getAchievRewardClass(reward)">{{ getAchievReward(reward).Data }}</div>
				</div>
			</div>
			<div class="PlayerMenuAchieving__item-rage-section">
				<div class="PlayerMenuAchieving__item-rage-title">
					<div>{{ getAchievFromPlayer(item).ProgressNameValueBar }}</div>
					<div>{{ item.IsEnding ? getAchievFromPlayer(item).ProgressValue : item.ProgressPlayer }}<span> / {{ getAchievFromPlayer(item).ProgressValue }}</span></div>
				</div>
				<div class="PlayerMenuAchieving__item-rage">
					<div class="PlayerMenuAchieving__item-rage-inner" :style="{ width: (((item.IsEnding == true ? getAchievFromPlayer(item).ProgressValue : item.ProgressPlayer) / getAchievFromPlayer(item).ProgressValue) * 100) + '%' }">
					</div>
				</div>
			</div>
			<div :class="getClassAchiev(item)">
				{{ item.IsEnding ? "Выполнено" : "На выполнение" }}
			</div>
		</div>
	</div>
</template>

<script>
import { Vue } from 'vue-property-decorator'
import AchievmentJSONList from '../../../../../../configServer/Achievments/achievmentList.json'
export default {
  data () {
    return {
      AchievmentList: AchievmentJSONList,
      PlayerAchievments: []
    }
  },
  methods: {
    getClassAchiev (achiev) {
      if (achiev.IsEnding == true) {
        return 'PlayerMenuAchieving__item-button PlayerMenuAchieving__item-button--green'
      }
      return 'PlayerMenuAchieving__item-button PlayerMenuAchieving__item-button--yellow'
    },
    getAchievFromPlayer (item) {
      return this.AchievmentList.find(_ => _.Number == item.Number)
    },
    getAchievRewardClass (reward) {
      switch (reward.Type) {
        case 0:
          return 'money'
        default:
          return ''
      }
    },
    getAchievReward (reward) {
      switch (reward.Type) {
        case 0:
          return {
            Image: './images/money_achievments_playerMenu.png',
            Data: `$ ${Vue.prototype.$formatMoneyToPlayerMenu(reward.Data)}`
          }
        case 1:
          return {
            Image: './images/vehicle_achievments_playerMenu.png',
            Data: `${reward.Data}`
          }
        case 2:
          return {
            Image: './images/crystalcoins_achievments_playerMenu.png',
            Data: `${reward.Data} CC`
          }
        case 3:
          return {
            Image: './images/rubles_achievments_playerMenu.png',
            Data: `${reward.Data} ₽`
          }
        case 5:
          return {
            Image: './images/exp_achievments_playerMenu.png',
            Data: `${reward.Data} EXP`
          }
        case 7:
          return {
            Image: './playerMenu_prem.png',
            Data: `${reward.Data} VIP`
          }
        default:
          return { Image: '', Data: '' }
      }
    },
    loadPlayerAchievments (json) {
      this.PlayerAchievments = JSON.parse(json)
    }
  },
  mounted () {
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:PlayerAchievingList:Load:Cef', this.loadPlayerAchievments)
      mp.trigger('PlayerMenu:PlayerAchievingList:AwaitMounted')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:PlayerAchievingList:Load:Cef', this.loadPlayerAchievments)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuAchieving {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-right: 2.5vmin;

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

.PlayerMenuAchieving__item-addition-info {
	display: flex;

	&>img {
		margin-right: 0.741vmin;
		height: 1.759vmin;
	}
}

.PlayerMenuAchieving__item-reward {
	display: flex;
	align-items: center;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
	margin-left: 471px;

	&>div {
		margin-right: 0.833vmin;

		&:first-child {
			margin-right: 2.315vmin;
		}
	}
}

.PlayerMenuAchieving__item-reward-item {
	height: 5.093vmin;
	padding: 1.111vmin 1.574vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	box-sizing: border-box;
	display: flex;
	align-items: center;

	&>.money {
		&::first-letter {
			color: #FFFFFF5C;
		}
	}

	&>div {
		margin-left: 1.667vmin;
	}
}

.PlayerMenuAchieving__item {
	height: 13.796vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%),
		linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	padding-right: 4.63vmin;
	box-sizing: border-box;
	margin-bottom: 2.222vmin;

	&>img {
		position: absolute;
		height: 13.796vmin;
	}
}

.PlayerMenuAchieving__item-rage-section {
	width: 28.611vmin;
}

.PlayerMenuAchieving__item-rage-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&>div>span {
		color: #FFFFFF1A;
	}
}

.PlayerMenuAchieving__item-title-section {
	position: absolute;
	left: 14.167vmin;
}

.PlayerMenuAchieving__item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;
	color: #FFFFFF;
	max-width: 21.296vmin;
}

.PlayerMenuAchieving__item-rage {
	background: rgba(255, 255, 255, 0.02);
	border-radius: 2.5vmin;
	height: 0.648vmin;
	overflow: hidden;
	margin-top: 0.648vmin;
}

.PlayerMenuAchieving__item-rage-inner {
	height: 0.648vmin;
	width: 100%;
	background: #1EFFBB;
	border-radius: 27px;
}

.PlayerMenuAchieving__item-button {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	height: 5.093vmin;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.389vmin;
	width: 15.259vmin;
	box-sizing: border-box;
	letter-spacing: nowrap;
	color: #FFFFFF;
	background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	&--yellow {
		background: radial-gradient(50% 50% at 50% 50%, rgba(255, 202, 15, 0.07) 0%, rgba(255, 202, 15, 0.01) 100%);
		border: 0.093vmin solid #FFCA0F;
		border-radius: 0.37vmin;
	}
	&--green {
		background: radial-gradient(50% 50% at 50% 50%, rgba(30, 255, 187, 0.07) 0%, rgba(30, 255, 187, 0.01) 100%);
		border: 0.093vmin solid #1EFFBB;
		border-radius: 0.37vmin;
	}
}

.PlayerMenuAchieving__item-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 2.593vmin;
	display: flex;
	align-items: center;

	color: rgba(255, 255, 255, 0.44);
}

.PlayerMenuAchieving__item-addition-info {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 500;
	font-size: 1.481vmin;
	line-height: 2.593vmin;
	display: flex;
	align-items: center;

	color: #FFFFFF;
}
</style>
