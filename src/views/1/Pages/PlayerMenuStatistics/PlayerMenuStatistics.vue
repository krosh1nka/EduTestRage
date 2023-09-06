<template>
  <div class="PlayerMenuStatistics">
    <div class="PlayerMenuStatistics__info-item"
      @wheel="(e) => onScrollPagination('currentKillersPage', getCountOfPages(getStatisticsInfo.topKillersList), e.deltaY)">
      <div class="PlayerMenuStatistics__info-item-inner">
        <div class="PlayerMenuStatistics__info-item-title-section">
          <img class="PlayerMenuStatistics__info-item-img" src="../../Assets/Statistics/playerMenu_Statistics.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Топ 10 Убийц</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-list">
          <div class="PlayerMenuStatistics__info-item-list-item PlayerMenuStatistics__info-item-additem" :key="id"
            v-for="(value, id) in paginatedItems(getStatisticsInfo.topKillersList, 'currentKillersPage')">
            <div>
              <spam>{{ "#" + (id + 1) }}</spam> {{ value.name }}
            </div>
            <div>{{ formatNumber(value.count) }}</div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__pagination-section">
          <div class="PlayerMenuStatistics__pagination-item"
            :class="{ 'PlayerMenuStatistics__pagination-item--active': i === currentPage.currentKillersPage }"
            @click="currentPage.currentKillersPage = i" :key="i"
            v-for="i in getCountOfPages(getStatisticsInfo.topKillersList)"></div>
        </div>
      </div>
    </div>
    <div class="PlayerMenuStatistics__info-item"
      @wheel="(e) => onScrollPagination('currentDriftPage', getCountOfPages(getStatisticsInfo.topDriftersList), e.deltaY)">
      <div class="PlayerMenuStatistics__info-item-inner">
        <div class="PlayerMenuStatistics__info-item-title-section">
          <img class="PlayerMenuStatistics__info-item-img" src="../../Assets/Statistics/playerMenu_Statistics.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Топ 100 Дрифтер</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-list">
          <div class="PlayerMenuStatistics__info-item-list-item PlayerMenuStatistics__info-item-additem" :key="id"
            v-for="(value, id) in paginatedItems(getStatisticsInfo.topDriftersList, 'currentDriftPage')">
            <div>
              <spam>{{ "#" + (id + 1) }}</spam>
              {{ value.name }}
            </div>
            <div>{{ formatNumber(value.count) }}</div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__pagination-section">
          <div class="PlayerMenuStatistics__pagination-item"
            :class="{ 'PlayerMenuStatistics__pagination-item--active': i === currentPage.currentDriftPage }"
            @click="currentPage.currentDriftPage = i" :key="i"
            v-for="i in getCountOfPages(getStatisticsInfo.topDriftersList)"></div>
        </div>
      </div>
    </div>
    <div class="PlayerMenuStatistics__info-list">
      <div class="PlayerMenuStatistics__info-list-item">
        <div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
          <img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list"
            src="../../Assets/Statistics/playerMenu_Head.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Смерти</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-info-button">
          {{ `Вы в топе на 24 месте` }}
        </div>
      </div>
      <div class="PlayerMenuStatistics__info-list-item">
        <div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
          <img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list"
            src="../../Assets/Statistics/playerMenu_Bones.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Убийства</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-info-button">
          {{ `Вы в топе на 24 месте` }}
        </div>
      </div>
      <div class="PlayerMenuStatistics__info-list-item">
        <div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
          <img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list"
            src="../../Assets/Statistics/playerMenu_Fire.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Дрифтер</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-info-button">
          {{ `Вы в топе на 24 месте` }}
        </div>
      </div>
      <div class="PlayerMenuStatistics__info-list-item">
        <div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
          <img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list"
            src="../../Assets/Statistics/playerMenu_Doll.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Деньги</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-info-button">
          {{ `Вы в топе на 24 месте` }}
        </div>
      </div>
      <div class="PlayerMenuStatistics__info-list-item">
        <div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
          <img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list"
            src="../../Assets/Statistics/playerMenu_Items.png" />
          <div class="PlayerMenuStatistics__info-item-text-section">
            <div class="PlayerMenuStatistics__info-item-title">Работник</div>
            <div class="PlayerMenuStatistics__info-item-sub-title">
              Тут вы можете посмотреть всю информацию о себе
            </div>
          </div>
        </div>
        <div class="PlayerMenuStatistics__info-item-info-button">
          {{ `Вы в топе на 24 месте` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      currentPage: {
        currentKillersPage: 1,
        currentDriftPage: 1
      }
    }
  },
  methods: {
    paginatedItems (items, type) {
      const start = (this.currentPage[type] - 1) * 10
      const end = start + 10
      return items.slice(start, end)
    },

    getCountOfPages (items) {
      return Math.ceil(items.length / 10)
    },

    formatNumber (number) {
      return number.toLocaleString('en-US').replace(',', ' ')
    },
    onScrollPagination (field, countOfPages, deltaY) {
      if (deltaY > 0 && this.currentPage[field] < countOfPages) {
        this.currentPage[field]++
      }
      if (deltaY < 0 && this.currentPage[field] > 1) {
        this.currentPage[field]--
      }
    },
    bindScroll () {
      window.addEventListener('scroll', this.onScrollPagination)
    }
  },

  computed: {
    ...mapGetters({
      getStatisticsInfo: 'getStatisticsInfo'
    })
  },

  mounted () {
    this.bindScroll()
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuStatistics {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1.8fr;
  gap: 2.222vmin;
}

.PlayerMenuStatistics__info-item {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%,
      rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  max-height: 78.148vmin;
  position: relative;
}

.PlayerMenuStatistics__info-item-title {
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

.PlayerMenuStatistics__info-item-sub-title {
  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 300;
  font-size: 1.481vmin;
  line-height: 1.759vmin;
  color: rgba(255, 255, 255, 0.24);
  max-width: 25.889vmin;
}

.PlayerMenuStatistics__info-item-title-section {
  display: flex;
  align-items: center;
  justify-content: center;

  &--list {
    justify-content: unset;
    max-width: 40.741vmin;
  }
}

.PlayerMenuStatistics__info-item-list {
  width: 33.333vmin;
  margin: auto;
  margin-top: 0.926vmin;
}

.PlayerMenuStatistics__info-item-text-section {
  display: flex;
  flex-direction: column;
}

.PlayerMenuStatistics__info-item-list-item {
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
  margin-bottom: 1.204vmin;

  &:last-child {
    margin-bottom: 0;
  }
}

.PlayerMenuStatistics__pagination-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.407vmin;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.PlayerMenuStatistics__pagination-item {
  width: 1.111vmin;
  height: 1.111vmin;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  margin-right: 0.556vmin;

  &:last-child {
    margin-right: 0;
  }

  &--active {
    background: #8EFF35;
    box-shadow: 0vmin 0vmin 1.111vmin rgba(142, 255, 53, 0.25);
  }
}

.PlayerMenuStatistics__info-item-img {
  width: 10.741vmin;
  height: 10.741vmin;
  filter: drop-shadow(0vmin 0vmin 0.926vmin #bebebe2f);
  margin: 1.204vmin 1.944vmin 0 1.852vmin;

  &--list {
    margin: 0 2.778vmin 0 0;
    width: 9.259vmin;
    height: 9.259vmin;
  }
}

.PlayerMenuStatistics__info-list-item {
  background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    , linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 0.093vmin solid rgba(255, 255, 255, 0.08);
  border-radius: 0.37vmin;
  height: 13.796vmin;
  padding: 2.407vmin;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.222vmin;

  &:last-child {
    margin-bottom: 0;
  }
}

.PlayerMenuStatistics__info-item-info-button {
  background: linear-gradient(180deg, rgba(255, 39, 91, 0) 0%, rgba(255, 39, 91, 0.08) 100%);
  border: 0.093vmin solid #FF275B;
  border-radius: 0.37vmin;
  width: 19.815vmin;
  height: 5.093vmin;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'PF DinDisplay Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 1.667vmin;
  line-height: 2.037vmin;

  color: #FFFFFF;
}</style>
