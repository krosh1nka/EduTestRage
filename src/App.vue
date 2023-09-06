<template>
	<div id="app">
		<!-- <CustomAnimationMenu :activeCustomMenuAnimation="activeCustomMenuAnimation"/> -->
		<div v-show="!activeCustomMenuAnimation">
			<router-view>
			</router-view>
			<!-- <CircleMenu/>
			<Hud :isOpenedRightTopMenu="isOpenedRightTopMenu" :isOpenedHintsMenu="isOpenedHintsMenu"/>
			<Report/>
			<BattlePass/>
			<Sounds/>
			<SoundAPI/>
			<AimSetting/>
			<KillLog/>
			<Notify/>
			<ClothesShop/>
			<AnimationMenu/>
			<WheelAnimationMenu/>
			<MusicPlayer/>
			<KillList/> -->
		</div>
	</div>
</template>
<script>
import './fonts/PFDinDisplayPro/stylesheet.css'
import './fonts/ProximaNova/stylesheet.css'
import './fonts/montserrat/stylesheet.css'
// import Report from "./views/Report/Report.vue";
// import BattlePass from "./views/BattlePass/BattlePass.vue";
// import Sounds from "./views/Sound/Sound.vue";
// import Hud from "./views/Hud/Hud.vue";
// import AimSetting from './views/HitAndScope/HitAndScope.vue';
// import KillLog from './views/MenuKill/MenuKill.vue';
// import Notify from './views/Hud/components/Announcements/Announcements.vue';
// import ClothesShop from './views/ClothesShop/ClothesShop.vue';
// import AnimationMenu from './views/Animations/Animations.vue';
// import WheelAnimationMenu from './views/Animations/WheelAnimationMenu.vue';
// import CircleMenu from './views/CircleMenu/CircleMenu.vue';
// import CustomAnimationMenu from './views/CustomAnimation/CustomAnimation.vue';
// import SoundAPI from './views/SoundAPI/SoundAPI.vue';
// import MusicPlayer from './views/VehicleMusic/MusicPlayer.vue';
// import KillList from './views/KillList/KillList.vue';
export default {
  data () {
    return {
      isOpenedRightTopMenu: true,
      isOpenedHintsMenu: true,
      activeCustomMenuAnimation: false
    }
  },
  components: {
    // CustomAnimationMenu,
    // Report,
    // BattlePass,
    // Sounds,
    // Hud,
    // AimSetting,
    // KillLog,
    // Notify,
    // ClothesShop,
    // AnimationMenu,
    // WheelAnimationMenu,
    // CircleMenu,
    // SoundAPI,
    // MusicPlayer,
    // KillList
  },
  created () {
    this.$eventbus.$on('UpdateRightTopMenu', () => this.isOpenedRightTopMenu = !this.isOpenedRightTopMenu)
    this.$eventbus.$on('SetActiveRightTopMenu', (state) => this.isOpenedRightTopMenu = state)
    this.$eventbus.$on('UpdateHintsMenu', () => this.isOpenedHintsMenu = !this.isOpenedHintsMenu)
    this.$eventbus.$on('SetActiveHintsMenu', (state) => this.isOpenedHintsMenu = state)
    this.$eventbus.$on('SetStateCustomAnimation', (state) => this.activeCustomMenuAnimation = state)
    if (typeof mp !== 'undefined') {
      mp.events.add('TabletMenu:SetTabletClientData', (json) => this.$store.commit('setClientData', json))
      mp.events.add('TabletMenu:SetTabletFractionData', (type, json) => this.$store.commit('setFractionData', { Type: type, Data: json }))
      mp.events.add('TabletMenu:SetTabletBusinessData', (type, json) => this.$store.commit('setBusinessData', { Type: type, Data: json }))
      mp.events.add('TabletMenu:SetTabletTaxiData', (type, json) => this.$store.commit('setTaxiData', { Type: type, Data: json }))
      mp.events.add('TabletMenu:SetTabletHouseData', (type, json) => this.$store.commit('setHouseData', { Type: type, Data: json }))
      mp.events.add('TabletMenu:GetTabletSettingClientData', () => this.$store.commit('saveClientUpdateData'))
      mp.events.add('TabletMenu:SetTabletActivePage', (pageName) => this.$store.state.Tablet.CurrentPage = pageName)
      mp.events.add('PlayerMenu:LoadFirstPlayerData:Cef', (json) => this.$store.commit('PlayerMenu_setPlayerFirstData', json))
      mp.events.add('PlayerMenu:LoadPlayerAllData:Cef', (json) => this.$store.commit('PlayerMenu_setPlayerAllData', json))
      mp.events.add('PlayerMenu:LoadPlayerSpendingList:Cef', (json) => this.$store.commit('PlayerMenu_setPlayerSpendingList', json))
      mp.events.add('PlayerMenu:BulletProof:Load:Cef', (json) => this.$store.commit('PlayerMenu_setPlayerBulletProofList', json))
      mp.events.add('PlayerMenu:PlayerAchievmentList:Load:Cef', (json) => this.$store.commit('PlayerMenu_setPlayerAchievmentList', json))
    }
  }
}
</script>
<style>
@font-face {
	font-family: 'PF DinDisplay Pro';
	src: url(./fonts/PFDinDisplayPro/PFDinDisplayPro-LightItalic.eot);
	font-weight: 300;
	font-style: italic;
}
</style>
