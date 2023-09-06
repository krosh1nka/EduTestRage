<template>
	<div class="PlayerMenuMain">
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-1">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_MainInfoIcon.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Основная информаиця</div>
						<div class="PlayerMenuMain__info-item-sub-title">Тут вы можете посмотреть всю информацию о себе</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-list">
					<div class="PlayerMenuMain__info-item-list-item PlayerMenuMain__info-item-additem" :class="{
						'PlayerMenuMain__info-item-list-item-men': value === 'Мужской',
						'PlayerMenuMain__info-item-list-item-women': value === 'Женский'}"
						:key="value" v-for="(value, key) in getPlayerInfo.mainInfo">
						<div>{{ getPropertyName(key) }}</div>
						<div>{{ (typeof value === 'number' && !isNaN(value) ? $formatMoneyToPlayerMenu(value) : value) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-2">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Violations.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Нарушения</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Узнайте сколько у вас было нарушений за все время игры
						</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-list">
					<div class="PlayerMenuMain__info-item-list-item PlayerMenuMain__info-item-additem">
						<div>Нарушений</div>
						<div>{{ getPlayerInfo.violations }}</div>
					</div>
					<div class="PlayerMenuMain__info-item-list-item PlayerMenuMain__info-item-additem">
						<div>Предупреждений</div>
						<div>{{ getPlayerInfo.warns }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-3">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Timer.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Время в игре</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Узнай информацию сколько ты уже провел времени на сервере
						</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-list">
					<div class="PlayerMenuMain__info-item-list-item PlayerMenuMain__info-item-additem" :key="value"
						v-for="(value, key) in getPlayerInfo.timeData">
						<div>{{ getPropertyName(key) }}</div>
						<div>{{ getTimeDataValue(key, value) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-4">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Money.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Время в игре</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Узнай информацию сколько ты уже провел времени на сервере
						</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-list">
					<div class="PlayerMenuMain__info-item-list-item PlayerMenuMain__info-item-list-item--money PlayerMenuMain__info-item-additem"
						:key="value" v-for="(value, key) in getPlayerInfo.financyData">
						<div>{{ getPropertyName(key) }}</div>
						<div>$ {{ $formatMoneyToPlayerMenu(value) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-5">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Message.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Свзять с администрацией</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Опишите свою проблему как можно подробнее, чтобы администрация вас поняла.
						</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-button" @click="openPlayerReportMenu">
					Открыть меню репортов
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-6">
			<div class="PlayerMenuMain__info-item-inner PlayerMenuMain__info-item-inner--property">
				<img class="PlayerMenuMain__info-item-img-property PlayerMenuMain__info-item-img-property--busines"
					src="../../Assets/Main/playerMenu_Busines.png" />
				<div class="PlayerMenuMain__info-item-text-section">
					<div class="PlayerMenuMain__info-item-property-type PlayerMenuMain__info-item-property-type--busines">
						<div>Бизнес</div>
					</div>
					<div class="PlayerMenuMain__info-item-title PlayerMenuMain__info-item-title-property">
						{{ getPlayerInfo.busines ? getPlayerInfo.busines.Name : 'У вас пока нет бизнеса' }}</div>
				</div>
				<div class="PlayerMenuMain__info-item-button PlayerMenuMain__info-item-button-route" v-if="getPlayerInfo.busines" @click="sendWayPoint('Мой бизнес', getPlayerInfo.busines.Position)">
					<div>Маршрут</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-7">
			<div class="PlayerMenuMain__info-item-inner">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Watch.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Счастливые часы</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Прими участие в лотереи на <span class="PlayerMenuMain__info-special-text">50</span> донатных
							рублей, просто купи билет за <span class="PlayerMenuMain__info-special-text">$ 500 000</span>
						</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-button">
					Купить
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-8">
			<div class="PlayerMenuMain__info-item-inner PlayerMenuMain__info-item-inner--prise">
				<div class="PlayerMenuMain__info-item-timer">
					<div class="PlayerMenuMain__info-item-timer-item" :key="timerPoint" v-for="timerPoint in timerPoints">
						<div>{{ getTime(timeToPrise, timerPoint) }}</div>
						<div>{{ getPropertyName(timerPoint) }}</div>
					</div>
				</div>
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Volt.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Забери свой приз</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Хочешь себе топовую машину? Просто пополни свой баланс на <span
								class="PlayerMenuMain__info-special-text-white">12 000</span> за месяц и получили <span
								class="PlayerMenuMain__info-special-text-white">Lamborghini SC20</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-9">
			<div class="PlayerMenuMain__info-item-inner PlayerMenuMain__info-item-inner--property">
				<img class="PlayerMenuMain__info-item-img-property PlayerMenuMain__info-item-img-property--busines"
					src="../../Assets/Main/playerMenu_House.png" />
				<div class="PlayerMenuMain__info-item-text-section">
					<div class="PlayerMenuMain__info-item-property-type PlayerMenuMain__info-item-property-type--busines">
						<div>Дом</div>
					</div>
					<div class="PlayerMenuMain__info-item-title PlayerMenuMain__info-item-title-property">
						{{ getPlayerInfo.house ? getPlayerInfo.house.Name : 'У вас пока нет дома' }}</div>
				</div>
				<div class="PlayerMenuMain__info-item-button PlayerMenuMain__info-item-button-route" v-if="getPlayerInfo.house" @click="sendWayPoint('Мой дом', getPlayerInfo.house.Position)">
					<div>Маршрут</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuMain__info-item PlayerMenuMain__info-item-10">
			<div class="PlayerMenuMain__info-item-inner PlayerMenuMain__info-item-inner--calendar">
				<div class="PlayerMenuMain__info-item-title-section">
					<img class="PlayerMenuMain__info-item-img" src="../../Assets/Main/playerMenu_Calendar.png" />
					<div class="PlayerMenuMain__info-item-text-section">
						<div class="PlayerMenuMain__info-item-title">Дневной бонус</div>
						<div class="PlayerMenuMain__info-item-sub-title">
							Забирай свои призы каждый день
						</div>
						<div style="margin: 10px 0 0" class="PlayerMenuMain__info-item-button" @click="openEveryDayBonus">
							<div>Открыть</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      bindName: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        sex: 'Пол',
        passId: 'Номер паспорта',
        dateRegstration: 'Дата регистрации',
        inGame: 'Часов в игре',
        lastEntry: 'Последний вход',
        cash: 'Наличные',
        card: 'В банке',
        days: 'дня',
        hours: 'часов',
        minutes: 'мин',
        seconds: 'сек'
      },
      timeToPrise: 405335,
      timerPoints: ['days', 'hours', 'minutes', 'seconds']
    }
  },
  methods: {
    getTimeDataValue (key, value) {
      if (key == 'inGame') {
        return Vue.prototype.$formatMinutesToString(value)
      }
      return value
    },
    openEveryDayBonus () {
      mp.trigger('PlayerMenu:MainMenu:OpenPlayerEveryDayBonusMenu:Client')
    },
    getPropertyName (property) {
      return this.bindName[property]
    },
    getTime (timeInSeconds, timeType) {
      if (timeType === 'days') {
        return Math.floor(timeInSeconds / 86400)
      } else if (timeType === 'hours') {
        return Math.floor(timeInSeconds / 3600) % 24
      } else if (timeType === 'minutes') {
        return Math.floor(timeInSeconds / 60) % 60
      } else if (timeType === 'seconds') {
        return timeInSeconds % 60
      }
    },
    setTimer () {
      this.timer = setInterval(() => {
        if (this.timeToPrise) {
          this.timeToPrise--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    openPlayerReportMenu () {
      mp.trigger('PlayerMenu:MainMenu:OpenPlayerReportMenu:Client')
    },
    sendWayPoint (type, position) {
      mp.trigger('PlayerMenu:MainMenu:SendWayPoint:Client', type, JSON.stringify(position))
    }
  },
  computed: {
    ...mapGetters({
      getPlayerInfo: 'getPlayerInfo'
    })
  },
  mounted () {
    this.setTimer()
  }
}
</script>

<style lang="scss" scoped>

.PlayerMenuMain {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 38.704vmin38.704vmin32.778vmin32.778vmin;
  grid-template-rows: 16.111vmin11.944vmin19.444vmin7.87vmin12.778vmin;
  gap: 2.222vmin;
}

.PlayerMenuMain__info-item {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%,
   rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  &-1 {
    grid-area: 1 / 1 / 4 / 2 ;
  }
  &-2 {
    grid-area: 4 / 1 / 6 / 2 ;
  }
  &-3 {
    grid-area: 1 / 2 / 3 / 2 ;
  }
  &-4 {
    grid-area: 3 / 2 / 5 / 3 ;
  }
  &-5 {
    grid-area: 5 / 2 / 6 / 4;

    & > div {
      display: flex;
      align-items: center;
    }
  }
  &-6 {
    grid-area: 1 / 3 / 2 / 4 ;
  }
  &-7 {
    grid-area: 2 / 3 / 3 / 5 ;

    & > div {
      display: flex;
      align-items: center;
    }
  }
  &-8 {
    grid-area: 3 / 3 / 5 / 5 ;
  }
  &-9 {
    grid-area: 1 / 4 / 2 / 5 ;
  }
  &-10 {
    grid-area: 5 / 4 / 6 / 5 ;
  }
}

.PlayerMenuMain__info-item-inner {
  width: 100%;
  height: 100%;
  padding: 1.759vmin;
  box-sizing: border-box;
  position: relative;

  &--calendar {
    padding: 0.926vmin;
  }

  &--prise {
    background: url(../../Assets/Main/playerMenu_CarBg.png) no-repeat center/cover;

    & > .PlayerMenuMain__info-item-title-section  {
      justify-content: start;
    }
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
}

.PlayerMenuMain__info-item-title-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.PlayerMenuMain__info-item-list {
  width: 33.333vmin;
  margin: auto;
  margin-top: 1.4rem;
}

.PlayerMenuMain__info-item-list-item {
  height: 5.093vmin;
  background: rgba(255, 255, 255, 0.01);
  border: 0.093vmin solid rgba(255, 255, 255, 0.07);
  border-radius: 0.37vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.389vmin;
  box-sizing: border-box;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.481vmin;
  line-height: 1.759vmin;

  color: #FFFFFF;
  margin-bottom: 2.222vmin;

  &:last-child {
    margin-bottom: 0;
  }

  &-men {
    & > div:last-child {
      color: #68FFFF;
    }
  }

  &-women {
    & > div:last-child {
      color: #ff6868;
    }
  }

  &--money {
    & > div:last-child {
      &::first-letter {
        color: rgba(255, 255, 255, 0.09);
      }
      color: #58FF87;
    }
  }
}

.PlayerMenuMain__info-item-img {
  width: 10.741vmin;
  height: 10.741vmin;
  margin-right: 1.944vmin;
  filter: drop-shadow(0vmin0vmin0.926vmin#bebebe2f);

  &-property {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 12.87vmin;
    z-index: 2;
  }
}

.PlayerMenuMain__info-item-timer {
  display: flex;
  position: absolute;
  top: 3.426vmin;
  right: 2.037vmin;
}

.PlayerMenuMain__info-item-timer-item {
  background: linear-gradient(180deg, rgba(255, 39, 91, 0) 0%, rgba(255, 39, 91, 0.08) 100%);
  border: 0.093vmin solid #FF275B;
  border-radius: 0.37vmin;
  width: 4.63vmin;
  height: 5.093vmin;
  margin-right: 0.556vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 2.222vmin;
  color: #FFFFFF;

  & > div:last-child {
    font-weight: 300;
    font-size: 1.296vmin;
  }
  &:last-child {
    margin-right: 0;
  }
}

.PlayerMenuMain__info-item-property-type {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;
  color: #FFFFFF;

  & > div {
    display: flex;

    &::before {
      content: "";
      background: no-repeat center/contain;
      width: 1.481vmin;
      height: 1.481vmin;
      margin-right: 1.111vmin;
    }
  }

  &--busines {
    & > div {
      display: flex;
      align-items: center;

      &::before {
        content: "";
        background-image: url(../../Assets/Main/playerMenu_businesIcon.svg);
      }
    }
  }
}

.PlayerMenuMain__info-special-text {
  color: #50FFDF;
  font-weight: 700;
  &-white {
    color: #FFFFFF;
    font-weight: 700;
  }
}

.PlayerMenuMain__info-item-button {
  background: linear-gradient(180deg, rgba(142, 255, 53, 0) 0%, rgba(142, 255, 53, 0.08) 100%);
  border: 0.093vmin solid #8EFF35;
  border-radius: 0.37vmin;
  width: 24.63vmin;
  height: 5.093vmin;
  margin-left: 3.333vmin;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 2.315vmin #8dff3559;
  }

  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;

  &-route {
    max-width: 27.593vmin;
    height: 4.444vmin;
    left: -1.574vmin;
    bottom: 2.222vmin;
    justify-content: start;
    padding-left: 4.352vmin;
    box-sizing: border-box;

    & > div {
      display: flex;
      align-items: center;

      &::before {
          content: "";
          background: url(../../Assets/Main/playerMenu_RouteIcon.svg) no-repeat center/contain;
          width: 1.481vmin;
          height: 1.481vmin;
          margin-right: 1.111vmin;
      }
    }
  }
}
</style>
