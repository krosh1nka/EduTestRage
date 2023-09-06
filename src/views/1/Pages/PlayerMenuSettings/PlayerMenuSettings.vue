<template>
	<div class="PlayerMenuSettings">
		<div class="PlayerMenuSettings__item">
			<div class="PlayerMenuSettings__info-item-title-section">
				<img class="PlayerMenuSettings__info-item-img PlayerMenuSettings__info-item-img-keyboard"
					src="../../Assets/SettingsImg/playerMenu_KeyBoard.png" />
				<div class="PlayerMenuSettings__info-item-text-section">
					<div class="PlayerMenuSettings__info-item-title">Настройка клавиш</div>
					<div class="PlayerMenuSettings__info-item-sub-title">Измените назначение клавишу на ту которая вам будет
						удобнее, не забудьте сохранить</div>
				</div>
			</div>
			<div class="PlayerMenuSettings__item-list">
				<div class="PlayerMenuSettings__keys-list">
					<div v-for="(bindKey, funcName) in listOfBindKeys" :key="funcName" class="PlayerMenuSettings__key-bind">
						<div class="PlayerMenuSettings___key-bind-name">{{ getRealFuncBinderName(funcName) }}</div>
						<div class="PlayerMenuSettings___key-bind-input" :class="{ active: selectedKey == funcName }"
							@click="setButtonBind(funcName)">{{ getRealKeyBindName(bindKey) }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuSettings__item PlayerMenuSettings__item--micro">
			<div class="PlayerMenuSettings__info-item-title-section">
				<img class="PlayerMenuSettings__info-item-img PlayerMenuSettings__info-item-img"
					src="../../Assets/SettingsImg/playerMenu_Micro2.png" />
				<div class="PlayerMenuSettings__info-item-text-section">
					<div class="PlayerMenuSettings__info-item-title">Настройка клавиш</div>
					<div class="PlayerMenuSettings__info-item-sub-title">Измените назначение клавишу на ту которая вам будет
						удобнее, не забудьте сохранить</div>
				</div>
			</div>
			<div class="PlayerMenuSettings__item-list PlayerMenuSettings__item-list-value">
				<div class="setings-section">
					<div class="PlayerMenuSettings__keys-list PlayerMenuSettings__keys-list--value">
						<div class="setings-item" v-for="(item, key) in getPreSettingFunctions" :key="key">
							<div>
								<div class="setings-section-title">{{ item.Name }}</div>
								<div class="setings-section-subtitle">{{ item.Description }}
								</div>
							</div>
							<template v-if="item.Type == 'range'">
								<div class="settings-value-section">
									<div class="settings-value-title-section">
										<div class="settings-value-title">{{ item.Range.Name }}:</div>
										<div>{{ listOfPlayerPreSettings[key] }}%</div>
									</div>
									<div class="settings-value-range-section">
										<input type="range" class="parking-range" v-model="listOfPlayerPreSettings[key]" :max="item.Range.Max"
											:min="item.Range.Min" @input="updatePreSettingMenu(key)">
									</div>
								</div>
							</template>
							<template v-else-if="item.Type == 'checkbox'">
								<input class="settings-item-checkbox" :checked="getPreSettingChecked(key)" type="checkbox" @click="updateStateListOfPreSetting(key)"/>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="PlayerMenuSettings__item">
			<div class="PlayerMenuSettings__info-item-title-section">
				<img class="PlayerMenuSettings__info-item-img PlayerMenuSettings__info-item-img-voice"
					src="../../Assets/SettingsImg/playerMenu_voice.png" />
				<div class="PlayerMenuSettings__info-item-text-section">
					<div class="PlayerMenuSettings__info-item-title">Настройка клавиш</div>
					<div class="PlayerMenuSettings__info-item-sub-title">Измените назначение клавишу на ту которая вам будет
						удобнее, не забудьте сохранить</div>
				</div>
			</div>
			<div class="PlayerMenuSettings__item-serch">
				<input v-model="serchInput" placeholder="Поиск..." />
			</div>
			<div class="PlayerMenuSettings__item-list-mut">
				<div class="PlayerMenuSettings__item-list-mut-item" v-for="(player, index) in playerMutedList" :key="index">
					<div>#{{ player }}</div>
					<div type="checkbox" @click="removeMutedPlayer(index)"></div>
				</div>
			</div>
			<div class="PlayerMenuSettings__item-list-mut PlayerMenuSettings__item-list-mut--min">
				<input class="PlayerMenuSettings___key-bind-input PlayerMenuSettings___key-bind-input--min"
					oninput="this.value=this.value.replace(/[^0-9]/g, '').slice(0, 6)" v-model="playerId" placeholder="Введите ID игрока..." />
				<div class="PlayerMenuSettings__button PlayerMenuSettings__button--min" @click="mutePlayer">Замутить игрока</div>
			</div>
		</div>
	</div>
</template>
<script>
const keyMap = {
  192: '`',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  48: '0',
  189: '-',
  187: '=',
  81: 'q',
  87: 'w',
  69: 'e',
  82: 'r',
  84: 't',
  89: 'y',
  85: 'u',
  73: 'i',
  79: 'o',
  80: 'p',
  219: '[',
  221: ']',
  220: '\\',
  65: 'a',
  83: 's',
  68: 'd',
  70: 'f',
  71: 'g',
  72: 'h',
  74: 'j',
  75: 'k',
  76: 'l',
  186: ';',
  222: "'",
  90: 'z',
  88: 'x',
  67: 'c',
  86: 'v',
  66: 'b',
  78: 'n',
  77: 'm',
  188: ',',
  190: '.',
  191: '/',
  9: 'tab',
  16: 'shift',
  17: 'ctrl',
  37: '←',
  38: '↑',
  39: '→',
  40: '↓',
  36: 'home',
  33: 'page up',
  34: 'page down',
  35: 'end',
  46: 'delete'
}
const RealBinderFuncName = {
  Snake: 'Ползать',
  OpenFastAnimMenu: 'Меню быстрых анимаций',
  SetLockDoors: 'Открыть/закрыть двери',
  SetEngineStatus: 'Завести/заглушить двигатель',
  OpenInventory: 'Инвентарь',
  VehicleBelt: 'Ремень безопасности',
  FollowTarget: 'Вести за собой',
  CuffTarget: 'Надеть наручники',
  OpenTabletMenu: 'Планшет',
  OpenMenuAnimations: 'Меню Анимаций',
  OpenPhone: 'Телефон',
  CrouchPlayer: 'Присесть',
  VoiceChat: 'Голосовой чат'
}
const PreSettingFunctions = {
  ShowHUD: {
    Name: 'Отображать HUD',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHintsMenu: {
    Name: 'Отображать подсказки',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowRightTopMenu: {
    Name: 'Отображать правое меню',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHUDGreenZone: {
    Name: 'Отображать зелёную зону',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHUDRaffleMenu: {
    Name: 'Отображать розыгрыш',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHUDCoinsForTime: {
    Name: 'Отображать меню коинов за время',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHUDCaseForTime: {
    Name: 'Отображать кейс за отыгранное время',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHUDMission: {
    Name: 'Отображать задания',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowHitMarker: {
    Name: 'Отображать хит-маркер',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowDriftPoins: {
    Name: 'Отображать дрифт поинты',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowVIPChat: {
    Name: 'Отображать VIP-Чат',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  ShowPunishInChat: {
    Name: 'Отображать наказания в чате',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'checkbox'
  },
  VehicleRadioVolume: {
    Name: 'Громкость радио в транспорте',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'range',
    Range: {
      Name: 'Громкость',
      Max: 100,
      Min: 0
    }
  },
  BoomBoxVolume: {
    Name: 'Громкость бумбокса',
    Description: 'Минимальный уровень игрока которого вы будете слышать.',
    Type: 'range',
    Range: {
      Name: 'Громкость',
      Max: 100,
      Min: 0
    }
  }
}
const PlayerHUDRightTopMenu = ['ShowHUDGreenZone', 'ShowHUDRaffleMenu', 'ShowHUDCoinsForTime', 'ShowHUDCaseForTime', 'ShowHUDMission']
export default {
  data () {
    return {
      serchInput: undefined,
      selectedKey: null,
      playerMutedList: [],
      playerId: undefined,
      listOfBindKeys: {},
      listOfPlayerPreSettings: {
        VehicleRadioVolume: 100,
        BoomBoxVolume: 100,
        ShowHittingsMenu: true,
        ShowHUD: true,
        ShowHitMarker: true,
        ShowDriftPoins: true,
        ShowVIPChat: true,
        ShowPunishInChat: true,
        ShowHUDGreenZone: true,
        ShowHUDRaffleMenu: true,
        ShowHUDCoinsForTime: true,
        ShowHUDCaseForTime: true,
        ShowHUDMission: true
      }
    }
  },
  computed: {
    getShowRightTopMenu () {
      for (let i = 0; i < PlayerHUDRightTopMenu.length; i++) {
        if (this.listOfPlayerPreSettings[PlayerHUDRightTopMenu[i]] == false) {
          return false
        }
      }
      return true
    },
    getPreSettingFunctions () {
      return PreSettingFunctions
    }
  },
  methods: {
    getPreSettingChecked (key) {
      switch (key) {
        case 'ShowRightTopMenu':
          return this.getShowRightTopMenu
      }
      return this.listOfPlayerPreSettings[key]
    },
    updateStateListOfPreSetting (key, checked = null) {
      const PreSettingFunctionDefault = PreSettingFunctions[key]
      switch (key) {
        case 'ShowRightTopMenu':
          const showRightTopMenu = !this.getShowRightTopMenu
          for (let i = 0; i < PlayerHUDRightTopMenu.length; i++) {
            this.updateStateListOfPreSetting(PlayerHUDRightTopMenu[i], showRightTopMenu)
          }
          return
      }
      if (PreSettingFunctionDefault != undefined && this.listOfPlayerPreSettings[key] != undefined && PreSettingFunctionDefault.Type == 'checkbox') {
        this.listOfPlayerPreSettings[key] = checked == null ? !this.listOfPlayerPreSettings[key] : checked
        mp.trigger('PlayerMenu:SettingsMenu:PreSettings:UpdateValueState:Client', key, Boolean(this.listOfPlayerPreSettings[key]))
      }
    },
    updatePreSettingMenu (key) {
      mp.trigger('PlayerMenu:SettingsMenu:PreSettings:UpdateValueState:Client', key, Number(this.listOfPlayerPreSettings[key]))
    },
    removeMutedPlayer (index) {
      mp.trigger('PlayerMenu:SettingsMenu:RemoveMutePlayer:Client', Number(index))
    },
    mutePlayer () {
      mp.trigger('PlayerMenu:SettingsMenu:MutePlayer:Client', Number(this.playerId))
      this.playerId = undefined
    },
    getRealFuncBinderName (funcName) {
      return RealBinderFuncName[funcName] ? RealBinderFuncName[funcName] : funcName
    },
    getRealKeyBindName (key) {
      return keyMap[key] ? keyMap[key].toUpperCase() : key
    },
    onKeydown (e) {
      if (this.selectedKey == null || !keyMap[e.keyCode]) return
      for (const key in this.listOfBindKeys) {
        if (this.listOfBindKeys[key] == e.keyCode) {
          return
        }
      }
      mp.trigger('PlayerMenu:SettingsMenu:BinderMenu:SetBind:Client', this.selectedKey, e.keyCode)
      this.listOfBindKeys[this.selectedKey] = e.keyCode
      e.target.blur()
      e.preventDefault()
      this.selectedKey = null
    },
    setButtonBind (key) {
      this.selectedKey = key
    },
    loadSettings (mutedList, bindKeys, preSettings) {
      this.playerMutedList = JSON.parse(mutedList)
      this.listOfBindKeys = JSON.parse(bindKeys)
      this.listOfPlayerPreSettings = JSON.parse(preSettings)
    },
    addMutedPlayer (playerUID) {
      this.playerMutedList.push(playerUID)
    },
    removeMutedPlayerResult (index) {
      if (this.playerMutedList[index]) {
        this.playerMutedList.splice(index, 1)
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onKeydown)
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:SettingsMenu:LoadSettings:Cef', this.loadSettings)
      mp.events.add('PlayerMenu:SettingsMenu:AddMutedPlayer:Cef', this.addMutedPlayer)
      mp.events.add('PlayerMenu:SettingsMenu:RemoveMutedPlayerResult:Cef', this.removeMutedPlayerResult)
      mp.trigger('PlayerMenu:SettingsMenu:AwaitMounted')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:SettingsMenu:LoadSettings:Cef', this.loadSettings)
      mp.events.remove('PlayerMenu:SettingsMenu:AddMutedPlayer:Cef', this.addMutedPlayer)
      mp.events.remove('PlayerMenu:SettingsMenu:RemoveMutedPlayerResult:Cef', this.removeMutedPlayerResult)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuSettings {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2.222vmin;
}

.PlayerMenuSettings__item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%,
			rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	padding: 2.5vmin 2.037vmin;

	&--micro {
		padding: 0vmin 2.037vmin 2.5vmin;
	}
}

.PlayerMenuSettings__keys-list {
	max-height: 65.852vmin;
	overflow-y: scroll;
	margin-bottom: 2.315vw;
	padding-right: 0.348vmin;

	&::-webkit-scrollbar {
		width: 0.348vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.348vmin;
		background: #ffffff00;
	}

	&::-webkit-scrollbar-thumb {
		width: 0.348vmin;
		background: #ffffff27;
	}

	&--value {
		max-height: 65.852vmin;
	}
}

.PlayerMenuSettings__info-item-title {
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

.PlayerMenuSettings__info-item-sub-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	color: rgba(255, 255, 255, 0.24);
	max-width: 28.889vmin;
	margin-top: 0.926vmin;
}

.PlayerMenuSettings__info-item-title-section {
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenuSettings__info-item-list {
	width: 33.333vmin;
	margin: auto;
	margin-top: 1.296vmin;
}

.PlayerMenuSettings__button {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}

	&--min {
		width: 33.704vmin;
		margin: auto;
		height: 5.093vmin;
	}
}

.PlayerMenuSettings__info-item-list-item {
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
}

.PlayerMenuSettings__info-item-img {
	height: 16.481vmin;
	margin-right: 1.944vmin;
	filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);

	&-keyboard {
		height: 9.824vmin;
		margin-right: 1.944vmin;
		filter: drop-shadow(0vmin 0vmin 1.852vmin #f01c6341);
	}

	&-voice {
		height: 9.824vmin;
		margin-right: 1.944vmin;
		filter: drop-shadow(0vmin 0vmin 1.852vmin #e8cd483b);
	}
}

.PlayerMenuSettings__item-list {
	margin-top: 3.704vmin;
}

.PlayerMenuSettings__key-bind {
	margin-bottom: 1.667vmin;
}

.PlayerMenuSettings__key-bind {
	height: 5.093vmin;
	display: flex;
	justify-content: space-between;
}

.PlayerMenuSettings___key-bind-name {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-right: 1.389vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
}

.PlayerMenuSettings___key-bind-input {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	color: #FFFFFF;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	outline: none;
	width: 14.815vmin;
	padding: 1.296vmin;
	box-sizing: border-box;
	text-align: center;
	&--min {
		width: 38.333vmin;
		height: 4.074vmin;
		display: block;
		margin: auto;
	}
	&.active {
		background: radial-gradient(50% 50% at 50% 50%, rgba(97, 255, 160, 0.07) 0%, rgba(97, 255, 160, 0.01) 100%);
		border: 1px solid #61FFA0;
	}
	&::placeholder {
		font-weight: 400;
	}
}

.setings-item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.463vmin;
	display: flex;
	justify-content: space-between;
	margin-bottom: 2.87vmin;
}

.setings-section-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.593vmin;

	display: flex;
	align-items: center;

	color: #FFFFFF;
}

.PlayerMenuSettings__item-list-value {
	margin-top: -0.463vmin;
}

.settings-item-checkbox {
	appearance: none;
	width: 3.981vmin;
	height: 2.222vmin;
	background-color: rgba(255, 255, 255, 0.02);
	border-radius: 0.093vmin;
	position: relative;
	outline: none;

	&::after {
		content: '';
		width: 1.481vmin;
		height: 1.481vmin;
		top: 50%;
		transform: translateY(-50%) rotate(0deg);
		transition: background-color 0.3s ease, right 0.5s ease;
		left: 0.37vmin;
		position: absolute;

		background-color: #FFFFFF;
		border-radius: 0.093vmin;
		transition: background-color 0.3s ease;
	}

	&:checked {
		background-color: #00FFD1;

		&::after {
			transform: translateY(-50%);
			left: unset;
			right: 0.37vmin;
			background: #090909;
		}
	}
}

.setings-section-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 400;
	font-size: 1.296vmin;
	line-height: 1.481vmin;
	display: flex;
	align-items: center;

	color: rgba(255, 255, 255, 0.26);
	margin-top: 0.556vmin;
	width: 18.981vmin;
}

.setings-item {
	display: flex;
	align-items: center;
	padding: 2.407vmin 1.574vmin;
}

.settings-value-title-section {
	display: flex;
	justify-content: space-between;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.111vmin;
	line-height: 2.593vmin;

	display: flex;
	align-items: center;

	color: #FF274E;
}

.settings-value-section {
	width: 20.648vmin;
}

.settings-value-range-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.settings-value-button {
	width: 2.222vmin;
	height: 2.222vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.093vmin;

	font-family: 'Roboto';
	font-style: normal;
	font-weight: 700;
	font-size: 1.111vmin;
	line-height: 2.593vmin;

	display: flex;
	align-items: center;

	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
}

.settings-value-range {
	height: 0.648vmin;
	background: rgba(255, 255, 255, 0.02);
	border-radius: 2.5vmin;
	width: 14.352vmin;
}

.settings-value-range-inner {
	width: 7.315vmin;
	height: 0.648vmin;
	background: #1EFFBB;
	border-radius: 2.5vmin;
}

.settings-value-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.111vmin;
	line-height: 2.593vmin;

	display: flex;
	align-items: center;

	color: #FFFFFF;
	margin-bottom: 0.463vmin;
}

.PlayerMenuSettings__item-list-mut {
	height: 46.243vmin;
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
	;
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.278vmin;

	&--min {
		height: 14.167vmin;
		margin-top: 2vmin;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

.PlayerMenuSettings__item-serch {
	position: relative;
	margin: auto;
	margin-bottom: 1.111vmin;
	margin-top: 25px;
	width: fit-content;

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0.926vmin;
		background: url(../../Assets/SettingsImg/playerMenu_bx_search-alt.svg) no-repeat center/contain;
		width: 2.222vmin;
		height: 2.222vmin;
	}

	&>input {
		width: 43.241vmin;
		height: 4.167vmin;
		background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 255, 255, 0.08);
		border-radius: 0.093vmin;
		padding: 0.926vmin;
		font-family: 'PF DinDisplay Pro';
		font-style: normal;
		settings-item-checkboxvminfont-weight: 700;
		font-size: 1.667vmin;
		line-height: 2.037vmin;
		box-sizing: border-box;
		color: #FFFFFF;
	}
}

.PlayerMenuSettings__item-list-mut {
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

.PlayerMenuSettings__item-list-mut-item {
	height: 4.444vmin;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #FFFFFF;
	padding: 2.778vmin 1.667vmin;
	box-sizing: border-box;
	margin-bottom: 1.389vmin;

	&>div:last-child {
		appearance: none;
		width: 3.889vmin;
		height: 3.889vmin;
		background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
			/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		;
		border: 0.093vmin solid rgba(255, 255, 255, 0.08);
		border-radius: 0.37vmin;
		box-sizing: border-box;
		display: flex;
		transition: background-color 0.3s ease;

		&::after {
			content: "";
			height: 1.139vmin;
			width: 1.648vmin;
			left: 0.127vmin;
			top: 0.446vmin;
			border-radius: 0vmin;
			margin: auto;

			background: url(../../Assets/SettingsImg/playerMenu_Audio.svg) no-repeat center/contain;
		}

		&:hover {
			background-color: #D83B3B;
		}
	}
}
</style>
