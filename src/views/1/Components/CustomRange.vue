<template>
  <div class="custom-range">
    <div class="custom-range__track" @click="onMouseMove">
      <div
        class="custom-range__track-inner"
        :style="setInnerPosition"
        v-if="isHaveInner"
      ></div>
    </div>
    <div
      class="custom-range__thumb"
      ref="thumb"
      @mousedown="onMouseDown"
      :style="setPosition"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: Number,
      default: 0
    },
    isHaveInner: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      thumbWidth: 0,
      oneDivision: 0,
      containerWidth: 0,
      containerX: 0,
      innerValue: 0
    }
  },
  computed: {
    setPosition () {
      if (this.oneDivision !== 0) {
        return `left:${
          this.step === 0
            ? Math.round(
                this.oneDivision * (this.innerValue - this.min) +
                  this.thumbWidth / 2
            )
            : Math.round(
                (this.oneDivision * this.innerValue) / this.step +
                  this.thumbWidth / 2
            )
        }px`
      }
      return '0vmin'
    },
    setInnerPosition () {
      if (this.oneDivision !== 0) {
        return `width:${
          this.step === 0
            ? Math.round(
                this.oneDivision * (this.innerValue - this.min) +
                  this.thumbWidth / 2
            )
            : Math.round(
                (this.oneDivision * this.innerValue) / this.step +
                  this.thumbWidth / 2
            )
        }px`
      }
      return '0vmin'
    }
  },
  methods: {
    onMouseDown () {
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove (e) {
      const currentLeft =
        e.clientX - this.containerX - this.thumbWidth / 2 <= 0
          ? 0
          : e.clientX - this.containerX - this.thumbWidth / 2 >=
            this.containerWidth - this.thumbWidth
            ? this.containerWidth - this.thumbWidth
            : e.clientX - this.containerX - this.thumbWidth / 2
      let newValue =
        this.step === 0
          ? Math.ceil(currentLeft / this.oneDivision)
          : Math.round(currentLeft / this.oneDivision) * this.step
      newValue += this.min
      if (newValue !== this.innerValue) this.innerValue = newValue
      this.$emit('input', this.innerValue)
    },
    onMouseUp () {
      window.removeEventListener('mousemove', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
    },
    initSlider () {
      if (this.value !== undefined) this.innerValue = this.value
      const { width, x } = this.$el.getBoundingClientRect()
      this.containerWidth = width
      this.containerX = x
      this.thumbWidth = this.$refs.thumb.getBoundingClientRect().width

      this.oneDivision =
        this.step === 0
          ? (this.containerWidth - this.thumbWidth) / (this.max - this.min)
          : (this.containerWidth - this.thumbWidth) / this.step
    },
    onResize () {
      this.initSlider()
    }
  },
  watch: {
    value: function (e) {
      if (this.innerValue !== +e) this.innerValue = +e
    }
  },
  mounted () {
    Array.from(this.$el.children).forEach((element) => {
      element.ondragstart = () => false
    })
    window.addEventListener('resize', this.onResize)
    this.initSlider()
  }
}
</script>

<style  lang="scss" scoped>
.custom-range{
  &.parking-range{
    position: relative;
    width: 19.648vmin;
    height: 1.4rem;
    display: flex;
    z-index: 12000;
    pointer-events: all;
    align-items: center;
    justify-content: center;
    .custom-range__track{
      width: 100%;
      height: 0.648vmin;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 2.5vmin;
    }
    .custom-range__thumb{
      position: absolute;
      width: 1.204vmin;
      height: 1.204vmin;
      transform: translateX(-50%);
      background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.89) 0.01%, #FFFFFF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      border: 0.093vmin solid rgba(255, 255, 255, 0.49);
      border-radius: 0.093vmin;
    }
  }
}

.custom-range__track-inner {
  background: #1EFFBB;
  border-radius: 2.5vmin;
  height: 100%;
}
</style>
