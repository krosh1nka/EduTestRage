<template>
  <div class="PlayerMenuChatSettings">
    <div class="PlayerMenuMain__info-item-title-section">
        <img class="PlayerMenuMain__info-item-img" src="../../Assets/playerMenu_3d-illustration-of-closed-black-gift-box.png" />
          <div class="PlayerMenuMain__info-item-text-section">
            <div class="PlayerMenuMain__info-item-title">Настройка чата</div>
          <div class="PlayerMenuMain__info-item-sub-title">Измените назначение клавишу на ту которая вам будет удобнее, не забудьте сохранить</div>
        </div>
      </div>
      <div class="PlayerMenuChatSettings__grid">
          <div class="PlayerMenuChatSettings__item" :key="setting.id" v-for="setting in listOfSettings">
            <div class="PlayerMenuChatSettings__info-section">
              <div class="PlayerMenuChatSettings__title">{{setting.title}}</div>
              <div class="PlayerMenuChatSettings__subtitle">{{setting.desc}}</div>
            </div>
            <div class="tap-range" v-if="setting.type === 'tap-range'">
              <button class="tap-range-button" @click="moveSelect('-', setting)"></button>
              <div class="tap-range-value">{{setting.selectedValue}}</div>
              <button class="tap-range-button" @click="moveSelect('+', setting)"></button>
            </div>
            <div class="slider" v-else>
              <div class="slider-title">
              <div>Размер</div>
              <div>{{setting.selectedValue}} <span v-if="setting.units">{{ setting.units }}</span></div>
              </div>
              <div >
                <CustomRange
                  class="parking-range"
                  @mousemove="() => this.selectedSetting = setting"
                  :value="setting.selectedValue"
                  :max="setting.max"
                  :min="setting.min"
                  @input="setInnerValue"
                  :isHaveInner="true"
                  :step="0"
                >
              </CustomRange>
            </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import CustomRange from '../../Components/CustomRange.vue'
export default {
  data () {
    return {
      selectedSetting: null,
      listOfSettings: [
        {
          id: 'fontSize4',
          type: 'slider',
          min: 0,
          max: 100,
          name: 'fontSize',
          title: 'Размер шрифта',
          desc: 'Размер шрифта',
          selectedValue: '40',
          units: 'px'
        },
        {
          id: 'fontSize2',
          type: 'tap-range',
          selectedValue: 'Roboto',
          options: ['Roboto', 'Helvetica', 'Sans-serif'],
          name: 'fontSize',
          title: 'Размер шрифта',
          desc: 'Размер шрифта'
        },
        {
          id: 'fontSize',
          type: 'slider',
          min: 0,
          max: 100,
          name: 'fontSize',
          title: 'Размер шрифта',
          desc: 'Размер шрифта',
          selectedValue: '40'
        },
        {
          id: 'fontSizefr',
          type: 'tap-range',
          selectedValue: 'Roboto',
          options: ['Roboto', 'Helvetica', 'Sans-serif'],
          name: 'fontSize',
          title: 'Размер шрифта',
          desc: 'Размер шрифта'
        }
      ]
    }
  },
  components: {
    CustomRange
  },
  methods: {
    moveSelect (type, setting) {
      const indexOfSelectValue = setting.options.indexOf(setting.selectedValue)
      let nextIndexOfSelectValue
      if (type == '-') {
        nextIndexOfSelectValue = indexOfSelectValue < 1 ? setting.options.length - 1 : indexOfSelectValue - 1
      } else {
        nextIndexOfSelectValue = indexOfSelectValue >= setting.options.length - 1 ? 0 : indexOfSelectValue + 1
      }
      setting.selectedValue = setting.options[nextIndexOfSelectValue]
      console.log(indexOfSelectValue, setting)
    },
    setInnerValue (newValue) {
      this.selectedSetting.selectedValue = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuChatSettings {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  padding: 1.759vmin 2.222vmin;
  box-sizing: border-box;
}

.PlayerMenuChatSettings__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 10.926vmin);
  gap: 1.574vmin;
}

  input[type="range"] {
    -webkit-appearance: none;
    margin-right: 15px;
    width: 200px;
    height: 7px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 27px;
    border-radius: 5px;
    background-size: 70% 100%;
    background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.89) 0.01%, #FFFFFF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 1px solid rgba(255, 255, 255, 0.49);
  border-radius: 1px;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type=range]::-webkit-slider-runnable-track  {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type=range]::-moz-range-progress {
  background-color: #0078e7;
  height: 100px;
}

.PlayerMenuChatSettings__item {
  height: 10.926vmin;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.463vmin;
  padding: 2.407vmin 2.593vmin;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.parking-range__title{
  position: absolute;
  font-style: italic;
  font-size: 6.75px;
  top: 10.8px;
  color: rgba($color: #E5FFFF, $alpha: 0.7);
  white-space: nowrap;
  word-break: keep-all;
}

.PlayerMenuMain__info-item-sub-title {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 300;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  color: rgba(255, 255, 255, 0.24);
  max-width: 28.889vmin;
  margin-top: 0.926vmin;
}

.PlayerMenuMain__info-item-title-section {
  display: flex;
  align-items: center;
}

.PlayerMenuRoulette__player-info-img {
  width: 3.611vmin;
  height: 3.611vmin;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    width: 3.611vmin;
    height: 3.611vmin;
  }
}

.PlayerMenuMain__info-item-img {
  width: 10.741vmin;
  height: 10.741vmin;
  margin-right: 1.944vmin;
  filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);
}

.PlayerMenuChatSettings__title {
 font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.593vmin;

  display: flex;
  align-items: center;

  color: #FFFFFF;
  margin-bottom: 0.556vmin;
}
.PlayerMenuChatSettings__subtitle {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1.296vmin;
  line-height: 1.481vmin;
  display: flex;
  align-items: center;
  width: 16.111vmin;
  color: rgba(255, 255, 255, 0.26);
}

.tap-range {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 17.315vmin;
}

.tap-range-button {
  display: flex;
  &::after {
    content: "";
    background: url(../../Assets/playerMenu_Arrow2.svg) no-repeat center/contain;
    width: 0.926vmin;
    height: 0.926vmin;
    margin: auto;
  }
  &:last-child {
    &::after {
      transform: rotate(180deg);
    }
  }
}

.tap-range-value {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1.296vmin;
  line-height: 1.481vmin;
  display: flex;
  align-items: center;

  color: #FFFFFF;
}

.tap-range-button {
  width: 2.222vmin;
  height: 2.222vmin;
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.093vmin;
}

.slider-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.111vmin;
  line-height: 2.593vmin;
  /* identical to box height, or 233% */

  display: flex;
  align-items: center;
  &> div:last-child {
    font-family: 'PF DinDisplay Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1.111vmin;
    line-height: 2.593vmin;
    display: flex;
    align-items: center;
    color: #FF274E;
  }

color: #FFFFFF;
}

</style>
