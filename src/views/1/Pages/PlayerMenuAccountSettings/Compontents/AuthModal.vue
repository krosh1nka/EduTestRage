<template>
  <div class="PlayerMenuAccountSettings">
    <div class="two_factor_authorization">
		<div class="two_factor_authorization_main">
			<svg class="two_factor_authorization_exit" width="45" height="48" viewBox="0 0 45 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21.3219 0C22.3198 0 23.2769 0.396425 23.9825 1.10207C24.6882 1.80771 25.0846 2.76476 25.0846 3.76269C25.0846 4.76061 24.6882 5.71767 23.9825 6.42331C23.2769 7.12895 22.3198 7.52537 21.3219 7.52537H8.77961C8.44696 7.52537 8.12795 7.65751 7.89273 7.89273C7.65752 8.12794 7.52538 8.44696 7.52538 8.7796V38.8811C7.52538 39.2137 7.65752 39.5328 7.89273 39.768C8.12795 40.0032 8.44696 40.1353 8.77961 40.1353H20.0677C21.0656 40.1353 22.0227 40.5317 22.7283 41.2374C23.4339 41.943 23.8304 42.9001 23.8304 43.898C23.8304 44.8959 23.4339 45.853 22.7283 46.5586C22.0227 47.2643 21.0656 47.6607 20.0677 47.6607H8.77961C6.45111 47.6607 4.21798 46.7357 2.57149 45.0892C0.924992 43.4427 0 41.2096 0 38.8811V8.7796C0 6.45111 0.924992 4.21798 2.57149 2.57149C4.21798 0.924991 6.45111 0 8.77961 0H21.3219ZM36.5232 14.0724L43.6196 21.1714C44.3242 21.8769 44.72 22.8332 44.72 23.8303C44.72 24.8275 44.3242 25.7838 43.6196 26.4893L36.5257 33.5882C35.8198 34.2941 34.8624 34.6907 33.8642 34.6907C32.8659 34.6907 31.9086 34.2941 31.2027 33.5882C30.4969 32.8824 30.1003 31.925 30.1003 30.9268C30.1003 29.9285 30.4969 28.9712 31.2027 28.2653L31.875 27.593H21.3219C20.324 27.593 19.3669 27.1966 18.6613 26.491C17.9556 25.7853 17.5592 24.8283 17.5592 23.8303C17.5592 22.8324 17.9556 21.8754 18.6613 21.1697C19.3669 20.4641 20.324 20.0677 21.3219 20.0677H31.875L31.2027 19.3954C30.8534 19.0459 30.5763 18.631 30.3873 18.1744C30.1983 17.7178 30.1011 17.2285 30.1012 16.7343C30.1013 16.2401 30.1988 15.7508 30.388 15.2943C30.5772 14.8378 30.8545 14.423 31.204 14.0737C31.5535 13.7244 31.9684 13.4473 32.425 13.2583C32.8816 13.0693 33.3709 12.9721 33.8651 12.9722C34.3592 12.9723 34.8485 13.0697 35.3051 13.2589C35.7616 13.4482 36.1763 13.7254 36.5257 14.075L36.5232 14.0724Z" fill="white"/>
			</svg>
			<div class="two_factor_authorization_name">GOOGLE AUTHENTICATOR</div>
			<div class="two_factor_authorization_one_block">
				<img src="./img/passauthosfds.svg" class="two_factor_authorization_one_svg">
				<div class="two_factor_authorization_one_wrap">
					<div class="two_factor_authorization_one_header">Приложение аутентификатор</div>
					<div class="two_factor_authorization_one_info">Скачайте и установите Google Autenticator на смартфон или планшет.</div>
				</div>
			</div>
			<svg class="two_factor_authorization_line" width="942" height="1" viewBox="0 0 942 1" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line y1="0.5" x2="942" y2="0.5" stroke="white"/>
			</svg>
			<div class="two_factor_authorization_one_block">
				<img src="./img/quarkods.svg" class="two_factor_authorization_one_svg">
				<div class="two_factor_authorization_one_wrap">
					<div class="two_factor_authorization_one_header">Сканировать QR-код</div>
					<div class="two_factor_authorization_one_info">Откройте приложение для аутентификации и просканируйте изображение слева с помощью камеры вашего смартфона.</div>
					<div class="two_factor_authorization_one_info_tho_cod">fdds fds3 fsdf 32fd fdsF fdsT FgTh</div>
				</div>
			</div>
			<svg class="two_factor_authorization_line" width="942" height="1" viewBox="0 0 942 1" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line y1="0.5" x2="942" y2="0.5" stroke="white"/>
			</svg>
			<div class="two_factor_authorization_one_block">
				<img class="two_factor_authorization_img" src="./img/rukafactorka.png">
				<div class="two_factor_authorization_one_wrap">
					<div class="two_factor_authorization_one_header">Войти с вашим кодом</div>
					<div class="two_factor_authorization_one_info">Введите сгенерированный 6-значный код подтверждения.</div>
					<div class="two_factor_authorization_one_info_btn">
						<input class="two_factor_authorization_one_input" placeholder="Введите код подтверждения">
						<div class="two_factor_authorization_one_info_btn_active">Активировать</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.two_factor_authorization {
    font-family: 'Montserrat';
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.two_factor_authorization_main {
    background: url(./img/back_tho_factior.svg);
    height: 67vmin;
    width: 40vmin;
    font-size: 1vmin;
    padding: 3vmin;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    row-gap: 1vmin;
    color: white;
    position: relative;
}
.two_factor_authorization_exit {
    position: absolute;
    width: 2.85vmin;
    height: 2.85vmin;
    top: 5%;
    right: 5%;
    transform: translate(-5%, -5%);
    transition: all 0.33s;
    &:hover {
        path {
            fill: rgb(204, 204, 204);
        }
    }
}
.two_factor_authorization_name {
    width: 100%;
    font-size: 1.75vmin;
}
.two_factor_authorization_one_block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1vmin;
    height: 20vmin;
    width: 100%;
}
.two_factor_authorization_one_svg {
    width: 8vmin;
}
.two_factor_authorization_one_wrap {
    display: flex;
    flex-direction: column;
    row-gap: 0.5vmin;
}
.two_factor_authorization_one_header {
    font-size: 1.75vmin;
    letter-spacing: 0.035vmin;
    font-weight: 400;
}
.two_factor_authorization_one_info {
    color: #ffffff82;
    font-size: 1.35vmin;
    letter-spacing: 0.025vmin;
}
.two_factor_authorization_line {
    width: 100%;
    height: 1vmin;
}
.two_factor_authorization_one_info_tho_cod {
    color: #ffffff;
    font-size: 1.65vmin;
    letter-spacing: 0.025vmin;
}
.two_factor_authorization_img {
    width: 8vmin;
}
.two_factor_authorization_one_info_btn {
    display: flex;
    flex-direction: column;
    row-gap: 0.85vmin;
}
.two_factor_authorization_one_input {
    width: 96%;
    height: 3vmin;
    padding: 0.5vmin;
    background: #afafaf33;
    border-radius: 0.26vmin;
    color: white;
    text-align: center;
    font-size: 1.45vmin;
    outline: none;
    letter-spacing: 0.035vmin;
    transition: all 0.33s;
    &:hover {
        background: #afafaf69;
    }
    &::placeholder {

    }
}
.two_factor_authorization_one_info_btn_active {
    width: 96%;
    height: 3vmin;
    padding: 0.5vmin;
    background: #afafaf33;
    border-radius: 0.26vmin;
    color: white;
    font-size: 1.45vmin;
    outline: none;
    letter-spacing: 0.035vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.33s;
    &:hover {
        background: #afafaf69;
    }
}
</style>
