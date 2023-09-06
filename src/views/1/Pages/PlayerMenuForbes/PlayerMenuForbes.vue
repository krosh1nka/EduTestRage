<template>
  <div class="PlayerMenuForbes">
    <div class="PlayerMenuForbes_header">
      <div class="PlayerMenuForbes_top1-info">
        <div class="PlayerMenuForbes_img-section">
          <div class="PlayerMenuForbes-img-wrapper">
          <img class="PlayerMenuForbes-img" src="../../Assets/avatar-colored-d.png"/>
          </div>
          <div class="PlayerMenuForbes_img-item">TOP 1</div>
        </div>
        <div class="PlayerMenuForbes-info-section" v-if="forbesList">
          <div class="PlayerMenuForbes-info-name">{{sortedForbesList[0].Name}} <div class="PlayerMenuForbes-info-lvl">{{sortedForbesList[0].Lvl}}<span>Уровень</span></div>
          </div>
          <div class="PlayerMenuForbes-info-bus">{{sortedForbesList[0].Biz}}</div>
          <div class="PlayerMenuForbes-info-amount">{{sortedForbesList[0].FortuneInMoney}}
            <div class="PlayerMenuForbes-info-status"></div>
          </div>
        </div>
      </div>
      <div class="PlayerMenuForbes_title"></div>
    </div>
    <div class="PlayerMenuForbes_main" v-if="forbesList">
      <div class="PlayerMenuForbes_main-list">
        <div class="PlayerMenuForbes_list-item PlayerMenuForbes_title">
          <div :key="title" v-for="title in gridTitleList">
          {{ title }}
          </div>
        </div>
        <div :key="i" class="PlayerMenuForbes_list-item" v-for="(player, i) in sortedForbesList">
          <div>{{i + 1}}</div>
          <div>{{player.Name}}</div>
          <div>{{player.PersonID}}</div>
          <div>{{player.Biz}}</div>
          <div>{{player.Biz}}</div>
          <div>{{ player.FamilyName }}</div>
          <div>{{player.FortuneInMoney}}</div>
          <!-- <div>1</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridTitleList: [
        '#',
        'Имя Фамилия',
        'ID',
        'Ур.',
        'Бизнес',
        'Семья',
        'Состояние'
        // "Изменение"
      ],
      forbesList: null
    }
  },
  computed: {
    sortedForbesList () {
      return this.forbesList.slice().sort((a, b) => b.FortuneInMoney - a.FortuneInMoney)
    }
  },
  methods: {
    setData (data) {
      this.forbesList = data
    }
  },
  mounted () {
    const data = [{ PersonID: 84551, Name: '_', FortuneInMoney: 1000408991401, Biz: '???', FamilyName: '???' }, { PersonID: 84553, Name: 'Alberto_', FortuneInMoney: 106245150190, Biz: '???', FamilyName: '???' }, { PersonID: 6037, Name: 'Ozzy_Mor', FortuneInMoney: 103384649545, Biz: '???', FamilyName: '???' }, { PersonID: 79002, Name: 'Owenf_Mansfield', FortuneInMoney: 100098664285, Biz: '???', FamilyName: '???' }, { PersonID: 29478, Name: 'Lucky_White', FortuneInMoney: 81637918055, Biz: '???', FamilyName: '???' }, { PersonID: 45983, Name: '_', FortuneInMoney: 76805183726, Biz: '???', FamilyName: '???' }, { PersonID: 74194, Name: 'Shinji_Nakamura', FortuneInMoney: 73974360042, Biz: '???', FamilyName: '???' }, { PersonID: 6709, Name: 'Yaroslav_Wagner', FortuneInMoney: 44132958890, Biz: '???', FamilyName: '???' }, { PersonID: 69102, Name: 'Dimka_Saint', FortuneInMoney: 37326763449, Biz: '???', FamilyName: '???' }, { PersonID: 73036, Name: 'Mike_Domingo', FortuneInMoney: 34779069962, Biz: '???', FamilyName: '???' }, { PersonID: 81026, Name: 'Rosen_Cursed', FortuneInMoney: 24901896833, Biz: '???', FamilyName: '???' }, { PersonID: 72638, Name: 'Borz_Falcone', FortuneInMoney: 24891444768, Biz: '???', FamilyName: '???' }, { PersonID: 79177, Name: 'Serghey_Wagner', FortuneInMoney: 24680590044, Biz: '???', FamilyName: '???' }, { PersonID: 51866, Name: 'Shizo_Kazaryan', FortuneInMoney: 22004345099, Biz: '???', FamilyName: '???' }, { PersonID: 22848, Name: 'Randomchik_', FortuneInMoney: 21568356503, Biz: '???', FamilyName: '???' }]
    this.setData(data)
  }
}
</script>

<style lang="scss">
.PlayerMenuForbes {
  overflow-y: scroll;
  position: absolute;
  top: -5%;
  max-height: 110%;
  width: 100%;
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
  // mask: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 75%, rgb(255, 255, 255) 100%);
}

.PlayerMenuForbes-img {
  max-height: 18.519vmin;
  max-width: 25vmin;
  width: auto;
  height: auto;
}

.PlayerMenuForbes_top1-info {
  display: FLEX;
  align-items: center;
}

.PlayerMenuForbes_main {
  margin-top: .578vmin;
}

.PlayerMenuForbes_header {
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
   border-radius: 0.37vmin;
   padding: 2.241vmin;
   width: fit-content;
   margin: auto;
  //  position: absolute;
  //  margin-top: -4.63vmin;
  //  left: 50%;
  //  transform: translateX(-50%);
}

.PlayerMenuForbes_list-item {
  display: grid;
  height: 5.093vmin;
  justify-content: center;
  align-items: center;
  border-radius: 0.37vmin;
  border: 0.093vmin solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.01);
  width: fit-content;
  margin-bottom: 0.463vmin;
  & > div {
    color: #FFF;
    font-size: 1.296vmin;
    font-family: PF DinDisplay Pro;
    font-weight: 700;
    text-align: center;
    height: 5.093vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(2) {
      justify-content: start;
    }
    &:nth-child(7) {
      justify-content: end;
    }
  }
  grid-template-columns: 4.63vmin 32.407vmin 9.259vmin 9.259vmin 32.407vmin 32.407vmin 23.148vmin 2.3vmin
}

.PlayerMenuForbes_img-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1.852vmin;
}

.PlayerMenuForbes-info-lvl {
  color: #FFF;
  font-size: 1.852vmin;
  font-family: PF DinDisplay Pro;
  font-weight: 700;
  text-transform: uppercase;

  & > span {
    font-size: 1.481vmin;
    font-weight: 500; color: #ffffff48;
  }
}

.PlayerMenuForbes-info-amount {
  color: #FFF;
  font-size: 3.148vmin;
  font-family: PF DinDisplay Pro;
  font-weight: 700;
  margin-top: 1.389vmin;
}

.PlayerMenuForbes-info-name {
  color: #FFF;
  font-size: 2.222vmin;
  font-family: PF DinDisplay Pro;
  font-weight: 700;
  text-transform: uppercase;
}

.PlayerMenuForbes-img-wrapper {
  height:15.519vmin;
  width: 15.519vmin;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.PlayerMenuForbes_main-list {
  width: fit-content;
  margin: auto;
}

.PlayerMenuForbes-info-bus {
  color: #FFF;
  font-size: 1.852vmin;
  font-family: PF DinDisplay Pro;
  font-weight: 700;
  display: flex;
  align-items: center;
  &:before {
    content: "";
    width: 1.481vmin;
    height: 1.481vmin;
    margin-right: 0.463vmin;

    background: url(../../Assets/Main/playerMenu_businesIcon.svg) no-repeat center/contain;
  }
}

.PlayerMenuForbes_img-item {
  border-radius: 0.37vmin;
  width: 8.259vmin;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
  color: #FFF;
  font-size: 1.852vmin;
  font-family: PF DinDisplay Pro;
  font-weight: 700;
  padding: 0.926vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.463vmin;
}
</style>
