<template>
	<div class="PlayerMenuCasesShop">
		<div class="PlayerMenuCasesShop__item" v-for="(caseItem, index) in getCaseList" :key="index">
			<img class="PlayerMenuCasesShop_item-img" src="../../Assets/playerMenu_Case.png" />
			<div class="PlayerMenuCasesShop_item-tilte">{{ caseItem.Name }}</div>
			<div class="PlayerMenuCasesShop_item-description">{{ caseItem.Description }}</div>
			<div class="PlayerMenuCasesShop_item-buy-section">
				<div class="PlayerMenuCasesShop__buy-section">
					<div class="PlayerMenuCasesShop__price-section">
						<div class="PlayerMenuCasesShop__buy-price-subtitle">Цена:</div>
						<div class="PlayerMenuCasesShop__buy-price">{{ caseItem.Price }}</div>
					</div>
					<div class="PlayerMenuCasesShop__button" @click="$router.push(`openCase/${index}`)">Открыть</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CaseListJSON from '../../../../../../configServer/PlayerMenu/Cases/caseList.json'
export default {
  computed: {
    getCaseList () {
      return CaseListJSON
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerMenuCasesShop {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2.222vmin;
	overflow: scroll;
	padding-right: 0.833vmin;

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

.PlayerMenuCasesShop__item {
	background: radial-gradient(50% 50% at 50% 50%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%)
		/* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
		, linear-gradient(180deg, rgba(80, 202, 255, 0) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 0.093vmin solid rgba(255, 255, 255, 0.08);
	border-radius: 0.37vmin;
	height: 37.685vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 5.37vmin;
	box-sizing: border-box;
}

.PlayerMenuCasesShop_item-img {
	max-height: 19.074vmin;
	max-width: 20.093vmin;
	width: auto;
	height: auto;
}

.PlayerMenuCasesShop_item-tilte {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 2.222vmin;
	line-height: 2.685vmin;

	color: #FFFFFF;
	margin-bottom: 1.019vmin;
}

.PlayerMenuCasesShop_item-description {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.481vmin;
	line-height: 1.759vmin;
	text-align: center;
	color: rgba(255, 255, 255, 0.24);
	margin-bottom: 2.222vmin;
}

.PlayerMenuCasesShop__button {
	width: 12.5vmin;
	height: 5.093vmin;
	background: linear-gradient(180deg, rgba(142, 255, 53, 0) 0%, rgba(142, 255, 53, 0.08) 100%);
	border: 0.093vmin solid #8EFF35;
	border-radius: 0.37vmin;
	display: flex;
	align-items: center;
	justify-content: center;

	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;
	transition: box-shadow 0.3s ease, transform 0.3s ease;

	&:hover {
		transform: scale(1.1) skew(-5deg);
		box-shadow: 0 5px 25px #8dff352c;
	}

	&:active {
		transform: scale(0.95) skew(-5deg);
		box-shadow: 0 0px 50px #8dff3559;
	}
}

.PlayerMenuCasesShop__buy-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.PlayerMenuCasesShop__buy-price-subtitle {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 300;
	font-size: 1.296vmin;
	line-height: 1.574vmin;
	text-align: end;
	color: rgba(255, 255, 255, 0.24);
}

.PlayerMenuCasesShop__buy-price {
	font-family: 'PF DinDisplay Pro';
	font-style: normal;
	font-weight: 700;
	font-size: 1.667vmin;
	line-height: 2.037vmin;

	color: #FFFFFF;

	&>span {
		color: #FFD646;
	}
}
.PlayerMenuCasesShop__price-section {
	margin-right: 2.963vmin;
}
</style>
