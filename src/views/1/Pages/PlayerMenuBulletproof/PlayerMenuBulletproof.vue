<template>
	<div class="PlayerMenuBulletproof">
		<div class="PlayerMenuBulletproof__list">
			<div class="PlayerMenuBulletproof__list-item" v-for="(bulletproof, index) in bulletproofList" :key="index">
				<div class="PlayerMenuStatistics__info-item-title-section PlayerMenuStatistics__info-item-title-section--list">
					<img class="PlayerMenuStatistics__info-item-img PlayerMenuStatistics__info-item-img--list" src="../../Assets/playerMenu_Bulletproof.png" />
					<div class="PlayerMenuStatistics__info-item-text-section">
						<div class="PlayerMenuStatistics__info-item-title">{{ bulletproof.Name }}</div>
						<div class="PlayerMenuStatistics__info-item-sub-title">
							{{ getArmorInfo(bulletproof).Description }}
						</div>
					</div>
				</div>
				<div class="PlayerMenuBulletproof__button-section">
					<div v-if="!bulletproof.Status" class="PlayerMenuBulletproof__button PlayerMenuBulletproof__button--activate" @click="skinActivate(index)">Активировать</div>
					<div v-else class="PlayerMenuBulletproof__button PlayerMenuBulletproof__button--activate" @click="skinActivate(index)">Деактивировать</div>
					<div class="PlayerMenuBulletproof__button PlayerMenuBulletproof__button--disactivate" @click="skinTake(index)">Упаковать</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CustomSkinArmorList from './CustomSkins.json'
export default {
  data () {
    return {
      bulletproofList: []
    }
  },
  methods: {
    getArmorInfo (name) {
      return CustomSkinArmorList[name]
        ? CustomSkinArmorList
        : {
            Description: 'Описание...',
            Image: ''
          }
    },
    skinTake (index) {
      mp.trigger('PlayerMenu:BulletProof:SkinTake:Client', index)
    },
    skinActivate (index) {
      mp.trigger('PlayerMenu:BulletProof:SkinActivate:Client', index)
    },
    updateSkinStatus (index, status) {
      if (this.bulletproofList[index]) {
        this.bulletproofList[index].Status = status
      }
    },
    takeArmorSkin (index) {
      if (this.bulletproofList[index]) {
        this.bulletproofList.splice(index, 1)
      }
    },
    loadBulletProofList (json) {
      this.bulletproofList = JSON.parse(json)
    }
  },
  mounted () {
    this.bulletproofList = []
    if (typeof mp !== 'undefined') {
      mp.events.add('PlayerMenu:BulletProof:UpdateSkinStatus:Cef', this.updateSkinStatus)
      mp.events.add('PlayerMenu:BulletProof:TakeSkin:Cef', this.takeArmorSkin)
      mp.events.add('PlayerMenu:BulletProof:Load:Cef', this.loadBulletProofList)
      mp.trigger('PlayerMenu:BulletProof:LoadAwaited')
    }
  },
  unmounted () {
    if (typeof mp !== 'undefined') {
      mp.events.remove('PlayerMenu:BulletProof:UpdateSkinStatus:Cef', this.updateSkinStatus)
      mp.events.remove('PlayerMenu:BulletProof:TakeSkin:Cef', this.takeArmorSkin)
      mp.events.remove('PlayerMenu:BulletProof:Load:Cef', this.loadBulletProofList)
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuStatistics {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 418px 418px 734px;
	gap: 24px;
}

.PlayerMenuBulletproof__list-item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%,
			rgba(255, 255, 255, 0.01) 100%);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 4px;
	height: 149px;
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 43px 26px;
	box-sizing: border-box;
	margin-bottom: 24px;

	&:last-child {
		margin-bottom: 0px;
	}
}

.PlayerMenuStatistics__info-item-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 29px;
	color: #FFFFFF;

	&-property {
		font-size: 20px;
		margin-top: 15px;
	}
}

.PlayerMenuBulletproof__list {
	max-height: 841px;
	overflow-y: scroll;
	padding-right: 21px;

	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		width: 7px;
		background: #ffffff00;
	}

	&::-webkit-lbar-thumb {
		width: 7px;
		background: #FFFFFF;
	}
}

.PlayerMenuStatistics__info-item-sub-title {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	color: rgba(255, 255, 255, 0.24);
	max-width: 312px;
	margin-top: 5px;
}

.PlayerMenuStatistics__info-item-title-section {
	display: flex;
	align-items: center;
	justify-content: center;

	&--list {
		justify-content: unset;
		max-width: 440px;
	}
}

.PlayerMenuStatistics__info-item-list {
	width: 360px;
	margin: auto;
	margin-top: 1.4rem;
}

.PlayerMenuStatistics__info-item-text-section {
	display: flex;
	flex-direction: column;
}

.PlayerMenuStatistics__info-item-list-item {
	height: 55px;
	background: rgba(255, 255, 255, 0.01);
	border: 1px solid rgba(255, 255, 255, 0.07);
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	box-sizing: border-box;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;

	color: #FFFFFF;
	margin-bottom: 13px;

	&:last-child {
		margin-bottom: 0;
	}
}

.PlayerMenuStatistics__pagination-section {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 26px;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}

.PlayerMenuStatistics__info-item-img {
	filter: drop-shadow(0px 0px 10px #bebebe2f);

	&--list {
		margin: 0 30px 0 0;
		width: 100px;
		height: 100px;
	}
}

.PlayerMenuStatistics__info-list-item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 4px;
	height: 149px;
	padding: 26px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;

	&:last-child {
		margin-bottom: 0;
	}
}

.PlayerMenuBulletproof__button-section {
	display: flex;
	align-items: center;
	justify-content: center;
}

.PlayerMenuBulletproof__button {
	width: 214px;
	height: 55px;

	display: flex;
	align-items: center;
	justify-content: center;
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 18px;
	line-height: 22px;
	color: #FFFFFF;
	transition: transform 0.3s ease;

	&:hover {
		box-shadow: 0px 0px 20px #bebebe2f;
	}

	&:active {
		transform: scale(0.95);
	}

	&--activate {
		background: linear-gradient(180deg, rgba(142, 255, 53, 0) 0%, rgba(142, 255, 53, 0.08) 100%);
		border: 1px solid #8EFF35;
		border-radius: 4px;
		margin-right: 24px;
	}

	&--disactivate {
		background: linear-gradient(180deg, rgba(255, 39, 91, 0) 0%, rgba(255, 39, 91, 0.08) 100%);
		border: 1px solid #FF275B;
		border-radius: 4px;
	}
}
</style>
