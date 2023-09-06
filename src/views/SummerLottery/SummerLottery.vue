<template>
	<div class="SummerLottery" v-if="active">
		<div :class="`SummerLottery__lottery-card SummerLottery__lottery-card-${LotteryColor}`">
			<div class="SummerLottery__lottery-card-main">
				<div class="SummerLottery__lottery-card-title">
					Возможные призы:
				</div>
				<div class="SummerLottery__lottery-card-award-section" v-if="awardList">
					<div class="SummerLottery__lottery-card-award-item" :key="index" v-for="(award, index) in awardList">
						<div class="SummerLottery__lottery-card-award-item-stars">
							<div :class="`SummerLottery__lottery-card-award-item-star SummerLottery__lottery-card-award-item-star-${award.Probability}`"
								:key="i" v-for="i in award.Probability"> {{award.Probability}}</div>
						</div>
						<div class="SummerLottery__lottery-card-award-item-title">{{ award.Name }}</div>
						<img class="SummerLottery__lottery-card-award-item-img" :src="getImgPath(award.Image)" />
					</div>
				</div>
				<div class="SummerLottery__open-lottery-section" @mousemove="setCoinPosition">
					<canvas id="myCanvas"></canvas>
					<div class="SummerLottery__open-lottery-award" v-if="awardItem">
						<div class="SummerLottery__open-lottery-value">{{ awardItem.Name }}</div>
						<img class="SummerLottery__open-lottery-img" :src="getImgPath(awardItem.Image)" />
					</div>
				</div>
			</div>
		</div>
		<canvas class="SummerLottery__canvas-send" id="send"></canvas>
		<div class="SummerLottery__open-lottery-item"></div>
		<div class="SummerLottery__left-info-section" @click="close">
			<div class="SummerLottery__info-item">
				<img src="./Assets/KeyIcons/SummerLottery_key-esc.png" />
				<div class="SummerLottery__info-item-text">
					<div>Выйти</div>
					<div>ESC button</div>
				</div>
			</div>
		</div>
		<div class="SummerLottery__info">
			Нажмите чтобы стереть
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      active: false,
      canvasSize: {},
      LotteryColor: 'Red',
      particles: [],
      awardItem: null,
      awardList: null,
      LotteryCanvas: null,
      LotteryCanvasListeners: null
    }
  },
  methods: {
    vminToPx (value) {
      var vmin = window.innerWidth
      const vh = window.innerHeight
      var vmin = Math.min(vmin, vh)
      const px = value * vmin / 100
      return px
    },
    getImgPath (name) {
      return require(`./Assets/ItemsIcons/SummerLottery_${name}.png`)
    },
    setSizeCanvas () {
      const size = {
        width: this.vminToPx(51.481),
        height: this.vminToPx(20.556)
      }
      this.canvasSize = size
    },
    createParticle (x, y) {
      const particle = {
        x: x,
        y: y,
        vx: 2 - 1,
        vy: Math.random() + 0.7,
        radius: 2,
        color: '#7D7D7D'
      }
      this.particles.push(particle)
    },
    close () {
      mp.trigger('SummerLottery:CloseMenu:Client')
    },
    removeAllCanvasListeners () {
      for (const event in this.LotteryCanvasListeners) {
        this.LotteryCanvas.removeEventListener(event, this.LotteryCanvasListeners[event])
      }
      window.removeEventListener('resize', this.setSizeCanvas)
    },
    setCoinPosition (e) {
      const coin = document.querySelector('.SummerLottery__open-lottery-item')
      const rect = coin.getBoundingClientRect()
      const x = e.clientX - rect.width / 3.2
      const y = e.clientY - rect.height / 2
      coin.style.left = x + 'px'
      coin.style.top = y + 'px'
    },
    setLotteryCanvas () {
      const canvas = document.getElementById('myCanvas')
      const ctx = canvas.getContext('2d')
      canvas.width = this.canvasSize.width
      canvas.height = this.canvasSize.height
      const image = new Image()
      image.src = require('./Assets/SummerLottery_hiiden-section.png')
      image.width = this.canvasSize.width
      image.height = this.canvasSize.height
      image.onload = () => {
        ctx.drawImage(image, 0, 0, this.canvasSize.width, this.canvasSize.height)
      }
      let isDrawing = false
      const radius = 20
      const startDrawing = (e) => {
        isDrawing = true
        draw(e)
      }
      const stopDrawing = () => {
        isDrawing = false
      }

      const _ = this
      const draw = (e) => {
        if (!isDrawing) return
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(x, y, radius / 4, radius, 0, 2 * Math.PI, false)
        ctx.clip()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()
        _.createParticle(e.clientX, e.clientY)
      }

      canvas.addEventListener('mousedown', (e) => startDrawing(e))
      canvas.addEventListener('mouseup', (e) => stopDrawing(e))
      canvas.addEventListener('mouseout', (e) => stopDrawing())
      canvas.addEventListener('mousemove', (e) => draw(e))

      this.LotteryCanvas = canvas

      this.LotteryCanvasListeners = {
        mousedown: startDrawing,
        mouseup: stopDrawing,
        mouseout: stopDrawing,
        mousemove: draw
      }
    },
    seLotterytData (data) {
      this.removeAllCanvasListeners()
      // data = JSON.parse(data);
      this.LotteryColor = data.Color
      this.awardList = data.Prizes
      this.awardItem = data.Prizes[data.IndexTakePrize]
      this.active = true
      this.setSizeCanvas()
      setTimeout(() => {
        this.setLotteryCanvas()
        this.setSendCanvas()
      })
    },
    setSendCanvas () {
      const canvas = document.getElementById('send')
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const updateParticles = () => {
		    	ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < this.particles.length; i++) {
          const particle = this.particles[i]
          particle.y += particle.vy
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          particle.radius -= 0.04
          if (particle.radius <= 0) {
            this.particles.splice(i, 1)
            i--
          }
        }
        requestAnimationFrame(updateParticles)
      }
      updateParticles()
    }
  },
  mounted () {
    const data = { Prizes: [{ Name: '??????', Image: 'Donat', Probability: 1 }, { Name: '25000000$', Image: 'Money', Probability: 0 }, { Name: 'Dominator 7', Image: 'Donat', Probability: 0 }, { Name: '150 CC', Image: 'Donat', Probability: 0 }], IndexTakePrize: 1, Color: 'Red' }
    setTimeout(() => {
      this.seLotterytData(data)
    }, 1000)

    window.addEventListener('resize', this.setSizeCanvas)
    if (typeof mp !== 'undefined') {
      mp.events.add('SummerLottery:Load:Cef', this.seLotterytData)
      mp.trigger('SummerLottery:Mounted')
    }
  },
  unmounted () {
    this.awardList = null
    this.awardItem = null
    this.active = false
    window.removeEventListener('resize', this.setSizeCanvas)
    if (typeof mp !== 'undefined') {
      mp.events.remove('SummerLottery:Load:Cef', this.seLotterytData)
    }
  }
}
</script>

<style lang="scss" scoped>
.SummerLottery {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: radial-gradient(17.22% 17.22% at 100% 0%, rgba(205, 205, 205, 0.1) 0%, rgba(205, 205, 205, 0) 100%), radial-gradient(82.13% 82.13% at 0% 100%, rgba(205, 205, 205, 0.1) 0%, rgba(205, 205, 205, 0) 100%), radial-gradient(82.64% 82.64% at 100% 100%, rgba(205, 205, 205, 0.1) 0%, rgba(205, 205, 205, 0) 100%), radial-gradient(32.49% 50% at 50% 50%, rgba(4, 4, 11, 0.94) 0%, rgba(4, 4, 11, 0.97) 100%);
}

.SummerLottery__lottery-card {
	width: 57.13vmin;
	height: 74.63vmin;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 9.352vmin;
	background: url(./Assets/CardsBg/SummerLottery-bg-orange.png) no-repeat center/contain;
	animation: shadowMove 5s linear infinite;
	user-select: none;
	&-Red {
		background: url(./Assets/CardsBg/SummerLottery-bg-red.png) no-repeat center/contain;
	}
	&-Blue {
		background: url(./Assets/CardsBg/SummerLottery-bg-blue.png) no-repeat center/contain;
	}
	&-Orange {
		background: url(./Assets/CardsBg/SummerLottery-bg-orange.png) no-repeat center/contain;
	}
}

.SummerLottery__lottery-card-main {
	position: absolute;
	top: 23.611vmin;
	left: 50%;
	transform: translateX(-50%);
	width: 51.481vmin;
}

.SummerLottery__info {
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	position: absolute;
	top: 86.481vmin;
	left: 50%;
	transform: translateX(-50%);
	color: #FFFFFF;

	&:after {
		content: "";
		margin-top: -0.16vmin;
		width: 3.333vmin;
		height: 3.333vmin;
		background: url(./Assets/SummerLottery_coin.png) no-repeat center/contain;
	}
}

.SummerLottery__lottery-card-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 900;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	width: fit-content;
	margin: auto;
	white-space: nowrap;
	color: #FFFFFF;
	position: relative;

	&::before {
		content: "";
		height: .52vmin;
		width: 17.628vmin;
		position: absolute;
		background: url(./Assets/SummerLottery_tilte-decor.png) no-repeat center/contain;
		bottom: 0;
		transform: translate(100%, -50%) scaleX(-1);
		right: -0.706vmin;
	}

	&::after {
		content: "";
		height: .52vmin;
		width: 17.628vmin;
		position: absolute;
		background: url(./Assets/SummerLottery_tilte-decor.png) no-repeat center/contain;
		bottom: 0;
		transform: translate(-100%, -50%);
		left: -0.706vmin;
	}
}

.SummerLottery__open-lottery-section {
	pointer-events: all;
	cursor: none;
	background: rgba(137, 74, 41, 0.08);
	border-radius: 2.222vmin;
}

.SummerLottery__open-lottery-award {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 51.481vmin;
	height: 20.556vmin;
}

.SummerLottery__open-lottery-value {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.963vmin;
	line-height: 3.519vmin;

	color: rgba(255, 255, 255, 1);
	margin-bottom: 0.463vmin;

}

.SummerLottery__open-lottery-img {
	max-width: 17.531vmin;
	max-height: 13.148vmin;
	width: auto;
	height: auto;
}

.SummerLottery__open-lottery-section {
	width: 51.481vmin;
	height: 20.556vmin;
	position: relative;

	&>canvas {
		position: relative;
		z-index: 5;
	}
}

.SummerLottery__lottery-card-award-item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;
	margin-bottom: 0.463vmin;

	color: #FFFFFF;
}

.SummerLottery__lottery-card-award-item-img {
	max-width: 12.222vmin;
	max-height: 9.167vmin;
	width: auto;
	height: auto;
}

.SummerLottery__lottery-card-award-item {
	width: 11.759vmin;
	height: 15.648vmin;
	background: rgba(134, 120, 112, 0.08);
	border-radius: 2.222vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 1.389vmin;

	&:last-child {
		margin-right: 0;
	}
}

.SummerLottery__lottery-card-award-item-stars {
	display: flex;
	margin: 1.204vmin 0 1.019vmin;
}

.SummerLottery__lottery-card-award-item-star {
	width: 1.389vmin;
	height: 1.389vmin;
	mask: url(./Assets/SummerLottery_Star.png) no-repeat center/contain;

	&-1 {
		background-color: #15FD48;
	}

	&-2 {
		background-color: #FDBC15;
	}

	&-3 {
		background-color: #FD1515;
	}

	margin-right: 0.463vmin;

	&:last-child {
		margin-right: 0;
	}

}

.SummerLottery__left-info-section {
	position: absolute;
	top: 4.907vmin;
	right: 6.667vmin;
}

.SummerLottery__right-info-section {
	position: absolute;
	bottom: 5.093vmin;
	left: 5.093vmin;
}

.SummerLottery__info-item {
	display: flex;
	align-items: center;

	&>img {
		max-width: 8.889vmin;
		max-height: 3.704vmin;
		margin-right: 0.648vmin;
	}

	margin-bottom: 1.759vmin;

	&:last-child {
		margin-bottom: 0;
	}
}

.SummerLottery__info-item-text {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	color: #FFFFFF;

	&>div:last-child {
		font-weight: 400;
		font-size: 1.296vmin;
		line-height: 1.574vmin;
		color: rgba(255, 255, 255, 0.37);
		margin-top: 0.37vmin;
	}

}

.SummerLottery__lottery-card-award-section {
	height: 15.648vmin;
	width: 100%;
	margin-top: 1.481vmin;
	margin-bottom: 2.5vmin;
	display: flex;
}

.SummerLottery__open-lottery-item {
	width: 13.704vmin;
	height: 13.704vmin;
	background: url(./Assets/SummerLottery_coin.png) no-repeat center/contain;
	position: absolute;
	top: 67vmin;
	right: calc(50% - 31vmin);
	pointer-events: none;
	cursor: none;
}

.SummerLottery__canvas-send {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
}
</style>
