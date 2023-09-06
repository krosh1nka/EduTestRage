<template>
	<div class="PlayerMenu" >
		<div class="PlayerMenu__sidebar">
			<div class="PlayerMenu__sidebar-playerInfo">
				<div class="PlayerMenu__sidebar-playerInfo-img">
					<img :src="getAccountImage" />
				</div>
				<div class="PlayerMenu__sidebar-playerInfo-text">
					<div class="PlayerMenu__sidebar-playerInfo-subtitle">
						Логин
					</div>
					<div class="PlayerMenu__sidebar-playerInfo-name-section" v-if="getInfoMainMenu">
						<div class="PlayerMenu__sidebar-playerInfo-name">
							{{ getInfoMainMenu.login }}
						</div>
						<div class="PlayerMenu__sidebar-playerInfo-lvl">
							{{ getInfoMainMenu.levelPlayer }}
						</div>
					</div>
				</div>
			</div>
			<div class="PlayerMenu__sidebar-nav" v-if="getInfoMainMenu">
				<div class="PlayerMenu__sidebar-nav-item-wrapper" :key="navItem.icon" v-for="navItem in navList">
					<div class="PlayerMenu__sidebar-nav-item" :class="{
						'PlayerMenu__sidebar-nav-item--empty': !navItem.subrouts,
						'PlayerMenu__sidebar-nav-item--select': showSubroute === navItem.name,
						'PlayerMenu__sidebar-nav-item--selected': $route.path === `/playerMenu/${navItem.route}`
					}" @click="onClickNavItem(navItem)">
						<img :src="getIconPath(navItem.icon)" /> {{ navItem.name }}
					</div>
					<div class="PlayerMenu__sidebar-nav-subrouts" v-if="navItem.subrouts && showSubroute === navItem.name">
						<div class="PlayerMenu__sidebar-nav-subroute"
							:class="{ 'PlayerMenu__sidebar-nav-subroute--selected': $route.path === `/playerMenu/${subroute.route}` }"
							@click="setRoute(subroute.route)" :key="subroute.name" v-for="subroute in navItem.subrouts">{{ subroute.name }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenu__logo">
			<img src="./Assets/playerMenu_PlayerMenuLogo.png" />
		</div>
		<div class="PlayerMenu__header">
			<div class="PlayerMenu__header-info-section" v-if="getInfoMainMenu">
				<div class="PlayerMenu__header-info">
					<img src="./Assets/playerMenu_coin.png" />
					<div class="PlayerMenu__header-info-text">
						<div>Баланс</div>
						<div>{{ $formatMoneyToPlayerMenu(getInfoMainMenu.crystalCoins) }}<span>CC</span></div>
					</div>
				</div>
				<div class="PlayerMenu__header-info">
					<img src="./Assets/playerMenu_coin.png" />
					<div class="PlayerMenu__header-info-text" v-if="getInfoMainMenu">
						<div>Баланс</div>
						<div>{{ $formatMoneyToPlayerMenu(getInfoMainMenu.rubles) }}<span>₽</span></div>
					</div>
				</div>
			</div>
			<div class="PlayerMenu__header-hotkey-section" @click="exitMenu">
				<img src="./Assets/playerMenu_Esc.png" />
				<div>
					<div class="PlayerMenu__header-hotkey-title">Выйти из меню</div>
					<div class="PlayerMenu__header-hotkey-sub">Кнопка ESC</div>
				</div>
			</div>
		</div>
		<transition-group :name="$route.path !== '/playerMenu/chatSettings' && $route.path !== '/playerMenu/settings' ? 'fade' : 'opacity'">
			<div class="PlayerMenu__content" :key="$route.path">
				<router-view></router-view>
			</div>
		</transition-group>
		<div class="PlayerMenu__notify-section">
				<transition-group name="showNotify">
					<div :class="`PlayerMenu__notify PlayerMenu__notify--${notify.Type}`" v-for="notify in notifyList" :key="notify.id">
						<div :class="`PlayerMenu__norfy-img-section PlayerMenu__norfy-img-section--${notify.Type}`">
						</div>
						<div class="PlayerMenu__norfy-title-section">
							<div class="PlayerMenu__norfy-title-section">
								<div class="PlayerMenu__norfy-title">{{ getNotifyType(notify.Type) }}</div>
								<div class="PlayerMenu__norfy-subtitle">{{ notify.Message }}</div>
							</div>
						</div>
						<div class="PlayerMenu__norfy-range">
							<div class="PlayerMenu__norfy-range-inner" :id="'notify-id-' + notify.id"></div>
						</div>
					</div>
				</transition-group>
			</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      showSubroute: null,
      notifyList: [],
      navList: [
        { icon: 'home', name: 'Главная', route: 'main' },
        { icon: 'achievement', name: 'Статистика', route: 'statistics' },
        { icon: 'achievement', name: 'Достижения', route: 'achieving' },
        {
          icon: 'shop',
          name: 'Магазин',
          route: 'main',
          subrouts: [
            { name: 'Машина', route: 'carsShop' },
            { name: 'Спец. предложения', route: 'specialOffer' },
            { name: 'Валюта', route: 'currencyConversion' },
            { name: 'Услуги', route: 'servicesShop' },
            { name: 'VIP', route: 'buyVIP' }
          ]
        },
        { icon: 'slab-box', name: 'Бронижелеты', route: 'bulletproof' },
        { icon: 'case', name: 'Кейсы', route: 'casesShop' },
        {
          icon: 'settings',
          name: 'Настройки',
          subrouts: [
            { name: 'Настройки', route: 'settings' },
            { name: 'Настройки чата', route: 'chatSettings' },
            { name: 'Настройки аккаунта', route: 'AccountSettings' }
          ]
        },
        {
          icon: 'games',
          name: 'Игры',
          route: 'main',
          subrouts: [
            { name: 'Рулетка', route: 'roulette' },
            { name: 'Машинки', route: 'carsGame' },
            { name: 'Минер', route: 'minerGame' },
            { name: 'Карточки', route: 'cardGame' }
          ]
        },
        { icon: 'referral', name: 'Реферальная система', route: 'referal' },
        { icon: 'forbes', name: 'Список Forbes', route: 'referal' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getInfoMainMenu: 'PlayerMenu_getInfoMainMenu'
    }),
    getAccountImage () {
      return `http://a.rsg.sc/n/${this.getInfoMainMenu.socialClub}/s`
    }
  },
  methods: {
    getNotifyType (type) {
      switch (type) {
        case 'Success':
          return 'Успешно'
        case 'Error':
          return 'Ошибка'
      }
    },
    getIconPath (iconName) {
      return require(`./Assets/NavigationIcons/playerMenu_${iconName}.svg`)
    },
    setRoute (routeName) {
      if (this.$router.currentRoute.path == `/playerMenu/${routeName}`) return
      // this.$router.push(`/playerMenu/${routeName}`);
      mp.trigger('PlayerMenu:SelectTabRouting:Client', routeName)
    },
    onClickNavItem (navItem) {
      if (navItem.subrouts) {
        this.setShowSubroute(navItem.name)
      } else {
        this.setRoute(navItem.route)
      }
    },
    setShowSubroute (name) {
      if (this.showSubroute === name) {
        this.showSubroute = null
      } else {
        this.showSubroute = name
      }
    },
    getNotifyID () {
      let id = 0
      while (this.notifyList.findIndex(_ => _.id == id) !== -1) {
        id++
      }
      return id
    },
    addNotify (notify) {
      notify = JSON.parse(notify)
      const notifyClone = Object.assign({}, notify)
      notifyClone.id = this.getNotifyID()
      this.notifyList.push(notifyClone)
      const id = notifyClone.id
      let width = 100
      let element
      const timeInterval = notify.Delay / 100
      let intervalId
      const pauseInterval = () => clearInterval(intervalId)
      const resumeInterval = () => {
        if (this.notifyList.find(_ => _.id == id)) {
          intervalId = setInterval(decreaseWidth, timeInterval)
        } else {
          deleteNotify()
        }
      }
      const deleteNotify = () => {
        clearInterval(intervalId)
        this.notifyList = this.notifyList.filter(notify => notify.id !== id)
      }
      const decreaseWidth = () => {
        width--
        element.style.width = `${width}%`
        if (width === 0) {
          deleteNotify()
        }
      }
      setTimeout(() => {
        element = document.getElementById(`notify-id-${id}`)
        intervalId = setInterval(() => {
          decreaseWidth(element)
        }, timeInterval)
        const parent = element.parentNode.parentNode
        parent.addEventListener('mouseenter', pauseInterval)
        parent.addEventListener('mouseleave', resumeInterval)
        parent.addEventListener('click', deleteNotify)
      }, 1)
    },
    exitMenu () {
      mp.trigger('PlayerMenu:Close:Client')
    }
  },
  mounted () {
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:Notify:AddNotify:Cef', this.addNotify)
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:Notify:AddNotify:Cef', this.addNotify)
    }
  }
}
</script>
<style lang="scss" src="./PlayerMenu.scss" scoped></style>
