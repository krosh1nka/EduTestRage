import RouletteInfo from '../../../configServer/PlayerMenu/MiniGames/config.json'
const PlayerMenu = {
  state: {
    playerInfo: {
      account: {
        login: 'Randomchik',
        crystalCoins: 1551550,
        rubles: 0,
        socialClub: 'RandomchikTOP'
      },
      warns: 0,
      level: 20,
      violations: 0,
      mainInfo: {
        firstName: 'Randomchik',
        lastName: 'Dev',
        sex: 'Мужской',
        passId: 412433,
        dateRegstration: '24.01.2023'
      },
      timeData: {
        inGame: 10,
        lastEntry: '27.03.2023'
      },
      financyData: {
        cash: 240000,
        card: 425000
      },
      busines: {
        Position: { X: 0, Y: 0, Z: 0 },
        Name: 'Магазин одежды - #139'
      },
      house: {
        Position: { X: 0, Y: 0, Z: 0 },
        Name: 'Ваинвуд стрит - #139'
      }
    },
    spendingList: [],
    statisticsInfo: {
      topKillersList: [
        { name: 'John Dou', count: 55452 },
        { name: 'John Dou', count: 5902 },
        { name: 'John Dou', count: 552 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 }
      ],
      topDriftersList: [
        { name: 'John Dou', count: 55452 },
        { name: 'John Dou', count: 5902 },
        { name: 'John Dou', count: 552 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 55452 },
        { name: 'John Dou', count: 5902 },
        { name: 'John Dou', count: 552 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 },
        { name: 'John Dou', count: 52 }
      ]
    },
    miniGameInfo: RouletteInfo
  },
  getters: {
    PlayerMenu_getMiniGameInfo (state) {
      return state.miniGameInfo
    },
    PlayerMenu_getSpendingList (state) {
      return state.spendingList
    },
    PlayerMenu_getInfoMainMenu (state) {
      return {
        login: state.playerInfo.account.login,
        crystalCoins: state.playerInfo.account.crystalCoins,
        rubles: state.playerInfo.account.rubles,
        levelPlayer: state.playerInfo.level,
        socialClub: state.playerInfo.account.socialClub
      }
    },
    getPlayerInfo (state) {
      return state.playerInfo
    },
    getStatisticsInfo (state) {
      return state.statisticsInfo
    }
  },
  mutations: {
    PlayerMenu_setPlayerAllData (state, json) {
      state.playerInfo = JSON.parse(json)
    },
    PlayerMenu_setPlayerFirstData (state, json) {
      json = JSON.parse(json)
      state.playerInfo.account = json.Account
      state.playerInfo.level = json.PlayerLevel
    },
    PlayerMenu_setPlayerSpendingList (state, json) {
      state.spendingList = JSON.parse(json)
    }
  },
  actions: {},
  modules: {}
}
export default PlayerMenu
