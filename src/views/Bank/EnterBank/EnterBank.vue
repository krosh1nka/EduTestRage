<template>
  <div class="EnterBank">
    <div class="EnterBank_content">
      <div class="EnterBank_header">
        <img class="EnterBank_header-logo" src="./Assets/EnterBank_logo.png" />
        <div>
          <div class="PlayerMenu__header-hotkey-section" @click="exitMenu">
          <div>
            <div class="PlayerMenu__header-hotkey-title">Выйти из меню</div>
            <div class="PlayerMenu__header-hotkey-sub">Кнопка ESC</div>
          </div>
				  <img src="./Assets/EnterBank_Esc.png" />
          </div>
				</div>
        <img class="EnterBank_header-hr" src="./Assets/hr.svg" />
      </div>
      <transitionGroup name="show">
        <div class="EnterBank_main" :key="status" v-if="!status">
          <img class="EnterBank_main-bg" src="./Assets/EnterBank_Money-bg.png" />
          <div class="EnterBank_main-stars">
            <div
              class="EnterBank_main-star"
              :class="{'EnterBank_main-star--selected': i <= inputPassword.length }"
              :key="i"
              v-for="i in 4"
              ref="star"
            >*</div>
          </div>
          <div class="EnterBank_main-numbers-section">
            <div class="EnterBank_main-numbers-item" @click="() => addWord(i)" :key="i" v-for="i in 9">{{i}}</div>
            <div class="EnterBank_main-numbers-item" @click="() => addWord(0)">0</div>
          </div>
        </div>
        <div class="EnterBank_main-succes" :key="status" v-if="status">
          <div>Wikkeo Unknown,</div>
          <div>рады видеть Вас снова!</div>
        </div>
      </transitionGroup>
      <div class="EnterBank_decor" :class="{'EnterBank_decor--show': status}">
        <img src="./Assets/EnterBank_decor.png"/>
        <div class="EnterBank_decor-text">Успешно!</div>
      </div>
    </div>
    <audio ref="ErrorSound" src="./Assets/Sounds/Error-sound.mp3" />
    <audio ref="SuccessSound" src="./Assets/Sounds/Success-sound.mp3" />
    <audio ref="Typing" src="./Assets/Sounds/Typing.mp3" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '1111',
      inputPassword: '',
      status: false
    }
  },
  methods: {
    exitMenu () {

    },
    setAnim () {
      this.setColorForElems(this.stars, '#FF4747')
      this.$refs.ErrorSound.play()
      setTimeout(() => {
        this.setDefault()
      }, 500)
    },
    setDefault () {
      this.setColorForElems(this.stars)
      this.inputPassword = ''
    },
    addWord (word) {
      this.inputPassword += word
      this.$refs.Typing.play()
    },
    setColorForElems (elems, color) {
      elems.forEach(element => {
        if (color) {
          element.style.color = color
        } else {
          element.removeAttribute('style')
        }
      })
    }
  },
  watch: {
    inputPassword (value) {
      if (value.length < 4) {
        return
      }
      setTimeout(() => {
        this.status = value === this.password
        if (!this.status) {
          this.setAnim()
        } else {
          this.$refs.SuccessSound.play()
        }
      })
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      const regX = /^\d+$/
      if (regX.test(e.key)) {
        this.inputPassword += e.key
        this.$refs.Typing.play()
      }
    })
    this.stars = this.$refs.star
  }
}
</script>

<style lang="scss">
body {
  background: url(./Assets/bg.png);
}

.EnterBank_content {
  width: 46.667vmin;
  height: 54.074vmin;
  border-radius: 2.593vmin;
  background: rgba(20, 21, 27, 0.97);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  user-select: none;
  overflow: hidden;
}

.EnterBank_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.574vmin;
  position: relative;
  padding-top: 0.741vmin;
}

.EnterBank_header-logo {
  width: 17.789vmin;
  height: 5.963vmin;
}

.EnterBank_decor {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30vmin;
  pointer-events: none;
  transition: bottom 0.5s ease;
  &--show {
    bottom: 38vmin;
  }

  & > img {
    width: 61.837vmin;
    height: 41.837vmin;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

}

.EnterBank_main-stars {
  display: flex;
  position: absolute;
  top: 16.296vmin;
  left: 50%;
  transform: translate(-50%);
}

.EnterBank_main-star {
  text-align: center;
  font-family: PF DinDisplay Pro;
  font-size: 6.389vmin;
  font-weight: 400;
  line-height: 129%;
  letter-spacing: 1.501vmin;
  color: rgba(97, 101, 120, 0.25);
  text-align: center;
  &--selected {
    color: #FFF;
  }
}

.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}

.EnterBank_main-succes {
  color: #FFF;
  font-family: PF DinDisplay Pro;
  font-size: 2.222vmin;
  font-style: normal;
  font-weight: 400;
  line-height: 129%;
  text-align: center;
  margin-top: 13.889vmin;
  & > div:first-child {
    color: #33D751;
  }
}

.EnterBank_main-bg {
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  bottom: -0.926vmin;
}

.PlayerMenu__header-hotkey-section {
    display: flex;
    align-items: center;
    justify-self: end;

    & > img {
      width: 4.63vmin;
      height: 4.63vmin;
      margin-left: 0.37vmin;
    }
}

.EnterBank_main-numbers-section {
  display: flex;
  width: 21.59vmin;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.111vmin;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 21.944vmin;
}

.EnterBank_main-numbers-item {
  min-width: 5.093vmin;
  height: 5.093vmin;
  color: #FFF;
  text-align: center;
  font-family: PF DinDisplay Pro;
  font-size: 2.315vmin;
  font-style: normal;
  font-weight: 300;
  border: 0.185vmin solid  rgba(97, 101, 120, 0.15);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;

  &:hover {
    background-color: rgba(97, 101, 120, 0.14);
  }

  &:active {
    color: #252525;
    background-color: #FFF;
  }
}

.PlayerMenu__header-hotkey-title {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;
}

.PlayerMenu__header-hotkey-sub {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
  text-align: right;
	color: rgba(255, 255, 255, 0.37);
}

.EnterBank_header-hr {
  position: absolute;
  bottom: -3.5019vmin;
  left: 50%;
  transform: translateX(-50%);
  width: 47.156vmin
}

.EnterBank_decor-text {
  color: #FFF;
  text-align: center;
  font-family: PF DinDisplay Pro;
  font-size: 1.852vmin;
  font-style: normal;
  font-weight: 400;
  line-height: 129%;
  position: absolute;
  top: 32.907vmin;
  left: 50%;
  transform: translateX(-50%);
}

</style>
