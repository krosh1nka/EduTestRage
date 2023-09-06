<template>
  <div class="Bank">
    <div class="Bank-content">
      <div class="Bank-header">
        <img class="Bank-header-logo" src="./Assets/Logo.png" />
        <img class="Bank-header-hr" src="./Assets/hr.png" />
        <div>
          <img src="" />
          <div class="Bank-header-title-section">
            <div>Пользователь</div>
            <div>Eduard Sovetov</div>
          </div>
        </div>
        <div>
          <img src="" />
          <div class="Bank-header-title-section">
            <div>Пользователь</div>
            <div>Eduard Sovetov</div>
          </div>
        </div>
      </div>
      <div class="Bank-nav-section">
        <div class="Bank-nav-list">
          <div @click="() => selectNav(navItem.imgName)" class="Bank-nav-item" :class="{'Bank-nav-item--selected' : selectedNav === navItem.imgName }"
            :key="navItem.title" v-for="navItem in navList">
            <img :src="getImgPath(navItem.imgName)"  />
            <div>{{navItem.title}}</div>
          </div>
        </div>
        <div class="Bank-header-money">
          <img src="./Assets/Money.png" />
          <div class="Bank-header-title-section">
            <div>Баланс</div>
            <div>4 300 ₽</div>
          </div>
        </div>
      </div>
      <div class="Bank-main" v-if="selectedNav === 'Main'">
        <div class="Bank-main-top-info-section">
          <div class="Bank-main-top-info-card Bank-main-top-info-card-debit">
            <img src="./Assets/debit.png" />
            <div class="Bank-main-top-info-card-title">
              <div>DEBIT CARD</div>
              <div>Eduard Sovetov</div>
            </div>
            <div class="Bank-main-top-info-card-data">12/24</div>
          </div>
          <div class="Bank-main-top-info-card">
            <div class="Bank-main-top-info-card-header">
              <div>Переводы</div>
              <div>2 опции</div>
            </div>
            <button @click="() => selectNav('Number')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M16 1.71875V12.2812C16 12.6062 15.88 12.8906 15.64 13.1344C15.4 13.3781 15.12 13.5 14.8 13.5H1.2C0.88 13.5 0.6 13.3781 0.36 13.1344C0.12 12.8906 0 12.6062 0 12.2812V1.71875C0 1.39375 0.12 1.10938 0.36 0.865625C0.6 0.621875 0.88 0.5 1.2 0.5H14.8C15.12 0.5 15.4 0.621875 15.64 0.865625C15.88 1.10938 16 1.39375 16 1.71875ZM1.2 3.93281H14.8V1.71875H1.2V3.93281ZM1.2 6.55312V12.2812H14.8V6.55312H1.2Z" fill="white"/>
              </svg>
              <div >По номеру счёта</div>
          </button>
            <button  @click="() => selectNav('Phone')">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="22" viewBox="0 0 14 22" fill="none">
                <path d="M4.95 19.875H9.05V18.875H4.95V19.875ZM1.5 22C1.1 22 0.75 21.85 0.45 21.55C0.15 21.25 0 20.9 0 20.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H12.5C12.9 0 13.25 0.15 13.55 0.45C13.85 0.75 14 1.1 14 1.5V20.5C14 20.9 13.85 21.25 13.55 21.55C13.25 21.85 12.9 22 12.5 22H1.5ZM1.5 18.25V20.5H12.5V18.25H1.5ZM1.5 16.75H12.5V3.75H1.5V16.75ZM1.5 2.25H12.5V1.5H1.5V2.25Z" fill="white"/>
              </svg>
      <div >По номеру телефона</div>
    </button>
          </div>
          <div class="Bank-main-top-info-card">
            <div class="Bank-main-top-info-card-header">
              <div>Переводы</div>
              <div>2 опции</div>
            </div>
            <button @click="() => selectNav('Withdraw')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 24 12" fill="none">
                <path d="M17.8643 3.88C17.2776 3.31774 16.4819 3.00187 15.6522 3.00187C14.8224 3.00187 14.0267 3.31774 13.44 3.88C12.8533 4.44226 12.5237 5.20485 12.5237 6C12.5237 6.79515 12.8533 7.55774 13.44 8.12C13.7305 8.3984 14.0754 8.61924 14.455 8.76991C14.8345 8.92058 15.2413 8.99813 15.6522 8.99813C16.063 8.99813 16.4698 8.92058 16.8494 8.76991C17.229 8.61924 17.5738 8.3984 17.8643 8.12C18.1549 7.8416 18.3853 7.51109 18.5425 7.14734C18.6997 6.78359 18.7807 6.39372 18.7807 6C18.7807 5.60628 18.6997 5.21641 18.5425 4.85266C18.3853 4.48891 18.1549 4.1584 17.8643 3.88ZM7.30435 0V12H24V0H7.30435ZM21.913 8C21.36 8 20.8278 8.21 20.4417 8.59C20.0452 8.96 19.8261 9.47 19.8261 10H11.4783C11.4783 9.47 11.2591 8.96 10.8626 8.59C10.4765 8.21 9.94435 8 9.3913 8V4C9.94435 4 10.4765 3.79 10.8626 3.41C11.2591 3.04 11.4783 2.53 11.4783 2H19.8261C19.8261 2.53 20.0452 3.04 20.4417 3.41C20.8278 3.79 21.36 4 21.913 4V8ZM5.21739 2H3.13043C2.55652 2 2.08696 1.55 2.08696 1C2.08696 0.45 2.55652 0 3.13043 0H5.21739V2ZM5.21739 7H2.08696C1.51304 7 1.04348 6.55 1.04348 6C1.04348 5.45 1.51304 5 2.08696 5H5.21739V7ZM5.21739 12H1.04348C0.467478 12 0 11.55 0 11C0 10.45 0.467478 10 1.04348 10H5.21739V12Z" fill="white" />
              </svg>
              <div >Снять деньги</div>
          </button>
            <button @click="() => selectNav('Topup')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 24 12" fill="none">
                <path d="M6.13565 3.88C6.72236 3.31774 7.5181 3.00187 8.34783 3.00187C9.17755 3.00187 9.9733 3.31774 10.56 3.88C11.1467 4.44226 11.4763 5.20485 11.4763 6C11.4763 6.79515 11.1467 7.55774 10.56 8.12C10.2695 8.3984 9.92461 8.61924 9.54505 8.76991C9.16548 8.92058 8.75867 8.99813 8.34783 8.99813C7.93699 8.99813 7.53017 8.92058 7.15061 8.76991C6.77104 8.61924 6.42616 8.3984 6.13565 8.12C5.84514 7.8416 5.6147 7.51109 5.45748 7.14734C5.30026 6.78359 5.21934 6.39372 5.21934 6C5.21934 5.60628 5.30026 5.21641 5.45748 4.85266C5.6147 4.48891 5.84514 4.1584 6.13565 3.88ZM16.6957 0V12H0V0H16.6957ZM2.08696 8C2.64 8 3.17217 8.21 3.55826 8.59C3.95478 8.96 4.17391 9.47 4.17391 10H12.5217C12.5217 9.47 12.7409 8.96 13.1374 8.59C13.5235 8.21 14.0557 8 14.6087 8V4C14.0557 4 13.5235 3.79 13.1374 3.41C12.7409 3.04 12.5217 2.53 12.5217 2H4.17391C4.17391 2.53 3.95478 3.04 3.55826 3.41C3.17217 3.79 2.64 4 2.08696 4V8ZM18.7826 2H20.8696C21.4435 2 21.913 1.55 21.913 1C21.913 0.45 21.4435 0 20.8696 0H18.7826V2ZM18.7826 7H21.913C22.487 7 22.9565 6.55 22.9565 6C22.9565 5.45 22.487 5 21.913 5H18.7826V7ZM18.7826 12H22.9565C23.5325 12 24 11.55 24 11C24 10.45 23.5325 10 22.9565 10H18.7826V12Z" fill="white"/>
              </svg>
            <div >Пополнить счет</div>
    </button>
          </div>
        </div>
        <div class="Bank-main-lists-section">
        <div class="Bank-main-list-section">
          <div class="Bank-main-list-header">
            <div>Транзакции</div>
            <div class="Bank-main-list-nav">
              <div>День</div>
              <div>Месяц</div>
              <div>Все время</div>
            </div>
          </div>
          <div class="Bank-main-list">
          <div class="Bank-main-list-item" :key="i" v-for="i in 50">
            <div>Перевод на счёт Eduard Sovetov <span>$ 15,000,000 </span> 25.06 13:20</div>
          </div>
          </div>
        </div>
        <div class="Bank-main-list-section">
          <div class="Bank-main-list-header">
            <div>Транзакции</div>
            <div class="Bank-main-list-nav">
              <div>День</div>
              <div>Месяц</div>
              <div>Все время</div>
            </div>
          </div>
          <div class="Bank-main-list">
          <div class="Bank-main-list-item" :key="i" v-for="i in 50">
            <div>Перевод на счёт Eduard Sovetov <span>$ 15,000,000 </span> 25.06 13:20</div>
          </div>
          </div>
        </div>
        </div>
      </div>
      <div class="Bank-main" v-if="selectedNav === 'Limits'">
        <div class="Bank-main-limit-title">Лимиты для тарифа Standart</div>
        <div class="Bank-main-limit-subtitle">Лимиты для тарифа Standart</div>
        <div class="Bank-main-limit-cards-section">
          <div class="Bank-main-limit-card">
            <div class="Bank-main-limit-card-title">Бесплатные переводы внутри банка</div>
            <div class="Bank-main-limit-card-value">$ 500 000<span>в месяц</span></div>
            <div class="Bank-main-limit-card-range">
              <div class="Bank-main-limit-card-range">
              <div class="Bank-main-limit-card-range-inner">

              </div>
              </div>
            </div>
            <div class="Bank-main-limit-card-footer">
              <div>
                <div>Перевели</div>
                <div>$ 500 000</div>
              </div>
              <div>
                <div>Осталось</div>
                <div>$ 500 000</div>
              </div>
            </div>
          </div>
          <div class="Bank-main-limit-card">
            <div class="Bank-main-limit-card-title">Бесплатные переводы внутри банка</div>
            <div class="Bank-main-limit-card-value">$ 500 000<span>в месяц</span></div>
            <div class="Bank-main-limit-card-range">
              <div class="Bank-main-limit-card-range">
              <div class="Bank-main-limit-card-range-inner">

              </div>
              </div>
            </div>
            <div class="Bank-main-limit-card-footer">
              <div>
                <div>Перевели</div>
                <div>$ 500 000</div>
              </div>
              <div>
                <div>Осталось</div>
                <div>$ 500 000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Bank-main" v-if="selectedNav === 'Tariff'">
        <div class="Bank-main-limit-title">Доступные тарифы</div>
        <div class="Bank-main-tariff-cards-list">
          <div class="Bank-main-tariff-card-item">
            <div class="Bank-main-tariff-card">
              <img src="./Assets/42-green.png"/>
              <div class="Bank-main-tariff-card-header">
                <img src="./Assets/banklogo.svg" />
                <div>Standart</div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
            </div>
            <div class="Bank-main-tariff-card-info-section">
              <div class="Bank-main-tariff-card-info-title">Standart карта</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-price">$1,500,00</div>
              <button class="Bank-main-tariff-card-info-button">Сменить</button>
            </div>
          </div>
          <div class="Bank-main-tariff-card-item">
            <div class="Bank-main-tariff-card">
              <img src="./Assets/41.png"/>
              <div class="Bank-main-tariff-card-header">
                <img src="./Assets/banklogo.svg" />
                <div>Standart</div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
            </div>
            <div class="Bank-main-tariff-card-info-section">
              <div class="Bank-main-tariff-card-info-title">Standart карта</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-price">$1,500,00</div>
              <button class="Bank-main-tariff-card-info-button">Сменить</button>
            </div>
          </div>
          <div class="Bank-main-tariff-card-item">
            <div class="Bank-main-tariff-card">
              <img src="./Assets/41-orange.png"/>
              <div class="Bank-main-tariff-card-header">
                <img src="./Assets/banklogo.svg" />
                <div>Standart</div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
              <div class="Bank-main-tariff-card-info">
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
                <div>
                  <div>Снятие без комиссии</div>
                  <div>До $ 500,000</div>
                </div>
              </div>
            </div>
            <div class="Bank-main-tariff-card-info-section">
              <div class="Bank-main-tariff-card-info-title">Standart карта</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-subtitle">Комиссия на вывод после лимита: 6% (Max: $25,000)</div>
              <div class="Bank-main-tariff-card-info-price">$1,500,00</div>
              <button class="Bank-main-tariff-card-info-button">Сменить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Bank-modal" v-if="modalSection">
      <div v-if="modalSection === 'Settings'">
        <div class="Bank-modal-header">
        <div>
          Настройки
        </div>
        <div>
          1 опция
        </div>
    </div>
    <div v-if="!currentModalType">
      <button @click="currentModalType = 'password'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="13" viewBox="0 0 24 13" fill="none">
        <path d="M1.09091 13V10.8333H22.9091V13H1.09091ZM2.34545 6.44583L0.927273 5.63333L1.85455 4.00833H0V2.38333H1.85455L0.927273 0.8125L2.34545 0L3.27273 1.57083L4.2 0L5.61818 0.8125L4.69091 2.38333H6.54545V4.00833H4.69091L5.61818 5.63333L4.2 6.44583L3.27273 4.82083L2.34545 6.44583ZM11.0727 6.44583L9.65455 5.63333L10.5818 4.00833H8.72727V2.38333H10.5818L9.65455 0.8125L11.0727 0L12 1.57083L12.9273 0L14.3455 0.8125L13.4182 2.38333H15.2727V4.00833H13.4182L14.3455 5.63333L12.9273 6.44583L12 4.82083L11.0727 6.44583ZM19.8 6.44583L18.3818 5.63333L19.3091 4.00833H17.4545V2.38333H19.3091L18.3818 0.8125L19.8 0L20.7273 1.57083L21.6545 0L23.0727 0.8125L22.1455 2.38333H24V4.00833H22.1455L23.0727 5.63333L21.6545 6.44583L20.7273 4.82083L19.8 6.44583Z" fill="white" fill-opacity="0.35"/>
      </svg>
      <div >Смена пинкода</div>
    </button>
    </div>
    <div v-if="currentModalType === 'password'">
      <div class="Bank-modal-input" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="13" viewBox="0 0 24 13" fill="none">
          <path d="M1.09091 13V10.8333H22.9091V13H1.09091ZM2.34545 6.44583L0.927273 5.63333L1.85455 4.00833H0V2.38333H1.85455L0.927273 0.8125L2.34545 0L3.27273 1.57083L4.2 0L5.61818 0.8125L4.69091 2.38333H6.54545V4.00833H4.69091L5.61818 5.63333L4.2 6.44583L3.27273 4.82083L2.34545 6.44583ZM11.0727 6.44583L9.65455 5.63333L10.5818 4.00833H8.72727V2.38333H10.5818L9.65455 0.8125L11.0727 0L12 1.57083L12.9273 0L14.3455 0.8125L13.4182 2.38333H15.2727V4.00833H13.4182L14.3455 5.63333L12.9273 6.44583L12 4.82083L11.0727 6.44583ZM19.8 6.44583L18.3818 5.63333L19.3091 4.00833H17.4545V2.38333H19.3091L18.3818 0.8125L19.8 0L20.7273 1.57083L21.6545 0L23.0727 0.8125L22.1455 2.38333H24V4.00833H22.1455L23.0727 5.63333L21.6545 6.44583L20.7273 4.82083L19.8 6.44583Z" fill="white" fill-opacity="0.35"/>
        </svg>
        <input placeholder="Введите новый пинкод" />
      </div>
      <button class="Bank-modal-input-submit">Сменить</button>
    </div>

      </div>
      <div v-if="modalSection === 'Withdraw'">
        <div class="Bank-modal-header">
        <div>
          Снять деньги со счёта
        </div>
        <div></div>
    </div>
    <div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="17" viewBox="0 0 8 17" fill="none">
          <path d="M3.31818 17V15.0167C2.45455 14.8593 1.74621 14.5169 1.19318 13.9896C0.640152 13.4623 0.242424 12.7972 0 11.9944L1.27273 11.4514C1.5303 12.2069 1.90152 12.7697 2.38636 13.1396C2.87121 13.5095 3.45455 13.6944 4.13636 13.6944C4.86364 13.6944 5.46212 13.5056 5.93182 13.1278C6.40152 12.75 6.63636 12.2306 6.63636 11.5694C6.63636 10.8769 6.42803 10.3417 6.01136 9.96389C5.5947 9.58611 4.81061 9.20046 3.65909 8.80694C2.56818 8.44491 1.75379 7.96482 1.21591 7.36667C0.67803 6.76852 0.409091 6.02083 0.409091 5.12361C0.409091 4.25787 0.67803 3.5338 1.21591 2.95139C1.75379 2.36898 2.45455 2.03843 3.31818 1.95972V0H4.68182V1.95972C5.36364 2.03843 5.95076 2.2706 6.44318 2.65625C6.93561 3.0419 7.31061 3.5338 7.56818 4.13194L6.29545 4.69861C6.08333 4.19491 5.79924 3.82894 5.44318 3.60069C5.08712 3.37245 4.62121 3.25833 4.04545 3.25833C3.34848 3.25833 2.79545 3.42361 2.38636 3.75417C1.97727 4.08472 1.77273 4.53333 1.77273 5.1C1.77273 5.69815 2 6.18218 2.45455 6.55208C2.90909 6.92199 3.75 7.3037 4.97727 7.69722C6.00758 8.02778 6.76894 8.50393 7.26136 9.12569C7.75379 9.74745 8 10.5306 8 11.475C8 12.4667 7.7197 13.2655 7.15909 13.8715C6.59848 14.4775 5.77273 14.8671 4.68182 15.0403V17H3.31818Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите сумму" />
      </div>
      <button class="Bank-modal-input-submit Bank-modal-input-submit--red">Снять деньги</button>
    </div>

      </div>
      <div v-if="modalSection === 'Topup'">
        <div class="Bank-modal-header">
        <div>
          Пополнить счёт
        </div>
        <div></div>
    </div>
    <div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="17" viewBox="0 0 8 17" fill="none">
          <path d="M3.31818 17V15.0167C2.45455 14.8593 1.74621 14.5169 1.19318 13.9896C0.640152 13.4623 0.242424 12.7972 0 11.9944L1.27273 11.4514C1.5303 12.2069 1.90152 12.7697 2.38636 13.1396C2.87121 13.5095 3.45455 13.6944 4.13636 13.6944C4.86364 13.6944 5.46212 13.5056 5.93182 13.1278C6.40152 12.75 6.63636 12.2306 6.63636 11.5694C6.63636 10.8769 6.42803 10.3417 6.01136 9.96389C5.5947 9.58611 4.81061 9.20046 3.65909 8.80694C2.56818 8.44491 1.75379 7.96482 1.21591 7.36667C0.67803 6.76852 0.409091 6.02083 0.409091 5.12361C0.409091 4.25787 0.67803 3.5338 1.21591 2.95139C1.75379 2.36898 2.45455 2.03843 3.31818 1.95972V0H4.68182V1.95972C5.36364 2.03843 5.95076 2.2706 6.44318 2.65625C6.93561 3.0419 7.31061 3.5338 7.56818 4.13194L6.29545 4.69861C6.08333 4.19491 5.79924 3.82894 5.44318 3.60069C5.08712 3.37245 4.62121 3.25833 4.04545 3.25833C3.34848 3.25833 2.79545 3.42361 2.38636 3.75417C1.97727 4.08472 1.77273 4.53333 1.77273 5.1C1.77273 5.69815 2 6.18218 2.45455 6.55208C2.90909 6.92199 3.75 7.3037 4.97727 7.69722C6.00758 8.02778 6.76894 8.50393 7.26136 9.12569C7.75379 9.74745 8 10.5306 8 11.475C8 12.4667 7.7197 13.2655 7.15909 13.8715C6.59848 14.4775 5.77273 14.8671 4.68182 15.0403V17H3.31818Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите сумму" />
      </div>
      <button class="Bank-modal-input-submit">Пополнить счёт</button>
    </div>

      </div>
      <div v-if="modalSection === 'Phone'">
        <div class="Bank-modal-header">
        <div>
          Перевод по номеру телефона
        </div>
        <div></div>
    </div>
    <div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">
          <path d="M4.95 20.375H9.05V19.375H4.95V20.375ZM1.5 22.5C1.1 22.5 0.75 22.35 0.45 22.05C0.15 21.75 0 21.4 0 21V2C0 1.6 0.15 1.25 0.45 0.95C0.75 0.65 1.1 0.5 1.5 0.5H12.5C12.9 0.5 13.25 0.65 13.55 0.95C13.85 1.25 14 1.6 14 2V21C14 21.4 13.85 21.75 13.55 22.05C13.25 22.35 12.9 22.5 12.5 22.5H1.5ZM1.5 18.75V21H12.5V18.75H1.5ZM1.5 17.25H12.5V4.25H1.5V17.25ZM1.5 2.75H12.5V2H1.5V2.75Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите номер телефона" />
      </div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="17" viewBox="0 0 8 17" fill="none">
          <path d="M3.31818 17V15.0167C2.45455 14.8593 1.74621 14.5169 1.19318 13.9896C0.640152 13.4623 0.242424 12.7972 0 11.9944L1.27273 11.4514C1.5303 12.2069 1.90152 12.7697 2.38636 13.1396C2.87121 13.5095 3.45455 13.6944 4.13636 13.6944C4.86364 13.6944 5.46212 13.5056 5.93182 13.1278C6.40152 12.75 6.63636 12.2306 6.63636 11.5694C6.63636 10.8769 6.42803 10.3417 6.01136 9.96389C5.5947 9.58611 4.81061 9.20046 3.65909 8.80694C2.56818 8.44491 1.75379 7.96482 1.21591 7.36667C0.67803 6.76852 0.409091 6.02083 0.409091 5.12361C0.409091 4.25787 0.67803 3.5338 1.21591 2.95139C1.75379 2.36898 2.45455 2.03843 3.31818 1.95972V0H4.68182V1.95972C5.36364 2.03843 5.95076 2.2706 6.44318 2.65625C6.93561 3.0419 7.31061 3.5338 7.56818 4.13194L6.29545 4.69861C6.08333 4.19491 5.79924 3.82894 5.44318 3.60069C5.08712 3.37245 4.62121 3.25833 4.04545 3.25833C3.34848 3.25833 2.79545 3.42361 2.38636 3.75417C1.97727 4.08472 1.77273 4.53333 1.77273 5.1C1.77273 5.69815 2 6.18218 2.45455 6.55208C2.90909 6.92199 3.75 7.3037 4.97727 7.69722C6.00758 8.02778 6.76894 8.50393 7.26136 9.12569C7.75379 9.74745 8 10.5306 8 11.475C8 12.4667 7.7197 13.2655 7.15909 13.8715C6.59848 14.4775 5.77273 14.8671 4.68182 15.0403V17H3.31818Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите сумму" />
      </div>
      <button class="Bank-modal-input-submit">Перевести</button>
    </div>
      </div>
      <div v-if="modalSection === 'Number'">
        <div class="Bank-modal-header">
        <div>
          Перевод по номеру счёта
        </div>
        <div></div>
    </div>
    <div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path d="M16 1.21875V11.7812C16 12.1062 15.88 12.3906 15.64 12.6344C15.4 12.8781 15.12 13 14.8 13H1.2C0.88 13 0.6 12.8781 0.36 12.6344C0.12 12.3906 0 12.1062 0 11.7812V1.21875C0 0.89375 0.12 0.609375 0.36 0.365625C0.6 0.121875 0.88 0 1.2 0H14.8C15.12 0 15.4 0.121875 15.64 0.365625C15.88 0.609375 16 0.89375 16 1.21875ZM1.2 3.43281H14.8V1.21875H1.2V3.43281ZM1.2 6.05312V11.7812H14.8V6.05312H1.2Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите номер счёта" />
      </div>
      <div class="Bank-modal-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="17" viewBox="0 0 8 17" fill="none">
          <path d="M3.31818 17V15.0167C2.45455 14.8593 1.74621 14.5169 1.19318 13.9896C0.640152 13.4623 0.242424 12.7972 0 11.9944L1.27273 11.4514C1.5303 12.2069 1.90152 12.7697 2.38636 13.1396C2.87121 13.5095 3.45455 13.6944 4.13636 13.6944C4.86364 13.6944 5.46212 13.5056 5.93182 13.1278C6.40152 12.75 6.63636 12.2306 6.63636 11.5694C6.63636 10.8769 6.42803 10.3417 6.01136 9.96389C5.5947 9.58611 4.81061 9.20046 3.65909 8.80694C2.56818 8.44491 1.75379 7.96482 1.21591 7.36667C0.67803 6.76852 0.409091 6.02083 0.409091 5.12361C0.409091 4.25787 0.67803 3.5338 1.21591 2.95139C1.75379 2.36898 2.45455 2.03843 3.31818 1.95972V0H4.68182V1.95972C5.36364 2.03843 5.95076 2.2706 6.44318 2.65625C6.93561 3.0419 7.31061 3.5338 7.56818 4.13194L6.29545 4.69861C6.08333 4.19491 5.79924 3.82894 5.44318 3.60069C5.08712 3.37245 4.62121 3.25833 4.04545 3.25833C3.34848 3.25833 2.79545 3.42361 2.38636 3.75417C1.97727 4.08472 1.77273 4.53333 1.77273 5.1C1.77273 5.69815 2 6.18218 2.45455 6.55208C2.90909 6.92199 3.75 7.3037 4.97727 7.69722C6.00758 8.02778 6.76894 8.50393 7.26136 9.12569C7.75379 9.74745 8 10.5306 8 11.475C8 12.4667 7.7197 13.2655 7.15909 13.8715C6.59848 14.4775 5.77273 14.8671 4.68182 15.0403V17H3.31818Z" fill="white" fill-opacity="0.1"/>
        </svg>
        <input placeholder="Введите сумму" />
      </div>
      <button class="Bank-modal-input-submit">Перевести</button>
    </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedNav: 'Main',
      currentModalType: '',
      modalSection: '',
      step: 1,
      navList: [
        { title: 'Главная', imgName: 'Main' },
        { title: 'Лимиты', imgName: 'Limits' },
        { title: 'Тарифы', imgName: 'Tariff' },
        { title: 'Настройки', imgName: 'Settings' }
      ]
    }
  },
  methods: {
    getImgPath (name) {
      return require(`./Assets/navIcons/${name}.svg`)
    },
    setCurrentModalType (type) {
      setTimeout(() => this.currentModalType = type)
    },
    selectNav (name) {
      const modalNames = ['Settings', 'Phone', 'Number', 'Topup', 'Withdraw']

      if (modalNames.includes(name)) {
        setTimeout(() => this.modalSection = name)
        return
      }
      this.selectedNav = name
    },
    setToDefault () {
      this.modalSection = ''
      this.currentModalType = ''
    }
  },
  mounted () {
    document.addEventListener('click', (event) => {
      const modalElement = document.querySelector('.Bank-modal')
      if (!modalElement?.contains(event.target) && !modalElement?.contains(event.target.parentNode) && !modalElement?.contains(event.target.parentNode.parentNode.parentNode) && !modalElement?.contains(event.target.parentNode.parentNode.parentNode.parentNode)) {
        this.setToDefault()
      }
    })
  }
}
</script>

<style lang="scss">
  .Bank {
    position: absolute;
    inset: 0;
    background: rgba(11, 11, 14, 0.75);
    user-select: none;
    & > * {
      color: #FFF;
      font-family: PF DinDisplay Pro;
    }
  }

  .Bank-modal-header {
    display: flex;
    justify-content: space-between;
    padding: 2.13vmin 2.407vmin;
    font-size: 1.481vmin;
    font-weight: 400;
    & > div:last-child {
      color: rgba(255, 255, 255, 0.55);
    }
  }

  .Bank-modal {
    width: 29.074vmin;
    // height: 13.241vmin;
    border-radius: 0.833vmin;
    background: #19191F;
    position: absolute;
    top: 50%;
    left: 50%;
    padding-bottom: 2.407vmin;
    transform: translate(-50%, -50%);
    & > div > div > button {
      width: 24.167vmin;
      height: 5.093vmin;
      padding: 1.667vmin;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-radius: 0.926vmin;
      background-color: rgba(255, 255, 255, 0.10);
      color: #FFF;
      transition: background-color 0.15 s ease;
      border: none;
      margin: auto;
      &:hover {
        background-color: rgba(255, 255, 255, 0.30);
      }
      & > svg {
        width: 2.222vmin;
        height: 1.204vmin;
        color: #FFF;
        margin-right: 0.926vmin;
      }
    }
  }

  .Bank-main-list-section {
    width: 41.759vmin;
    height: 49.074vmin;
    border-radius: 0.833vmin;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
  }

  .Bank-main-lists-section {
    display: flex;
    width: fit-content;
    margin: auto;
    & > div {
      margin-left: 2.5vmin;
      &:first-child {
        margin: 0;
      }
    }
  }

  .Bank-main-limit-card {
    margin-right: 3.704vmin;
    &:last-child {
      margin: 0;
    }
  }

  .Bank-main-list {
    max-height: 42.593vmin;
    overflow-y: scroll;
    margin: 1.389vmin 1.389vmin 1.389vmin 0;
    &::-webkit-scrollbar {
		width: 0.185vmin;
	}

	&::-webkit-scrollbar-track {
		width: 0.093vmin;
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		width: 0.648vmin;
		background: rgba(255, 255, 255, 0.28);;
	}
    & > div {
    font-family: PF DinDisplay Pro;
    font-size: 1.481vmin;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin-bottom: 3.056vmin;
      & > div > span {
        color:#C7FF50;
      }
    }
  }

  .Bank-content {
    width: 90.556vmin;
    height: 85.648vmin;
    border-radius: 0.926vmin;
    background: rgba(11, 11, 14, 0.99);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.463vmin;
    box-sizing: border-box;
  }

  .Bank-header {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 0.463vmin;
    & > div {
      display: flex;
      margin-right: 4.074vmin;
    }
  }

  .Bank-main-top-info-section {
    display: flex;
    align-items: center;
    width: fit-content;
    margin:  1.296vmin auto 2.407vmin;
  }

  .Bank-main-top-info-card-debit {
    position: relative;
    & > img {
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
    }
  }

  .Bank-main-list-nav {
    display: flex ;
    color: rgba(255, 255, 255, 0.25);
    font-family: PF DinDisplay Pro;
    font-size: 1.481vmin;
    font-weight: 400;
    & > div {
      margin-right: 2.407vmin;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .Bank-main-list-header {
    border-radius: 0.741vmin 0.741vmin 0vmin 0vmin;
    opacity: 0.800000011920929;
    background: rgba(255, 255, 255, 0.03);
    padding: 1.667vmin 2.222vmin;
    display: flex;
    justify-content: space-between;
  }

  .Bank-main-top-info-card-title{
    color: #FAFAFA;
    font-family: Montserrat;
    font-size: 1.296vmin;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position: absolute;
    bottom: 0.741vmin;
    left: 1.852vmin;
    & > div {
      margin-bottom: 1.111vmin;
    }
  }

  .Bank-main-top-info-card-header {
    display: flex;
    justify-content: space-between;
    & > div:last-child {
      color: rgba(255, 255, 255, 0.55);
    }
  }

  .Bank-main {
    padding: 0 2.407vmin;
  }

  .Bank-header-logo {
    width: 13.241vmin;
    height: 6.669vmin;
    margin-right: 2.315vmin;
  }

  .Bank-header-title-section {
    color: #FFF;
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    font-weight: 700;
    & > div:first-child {
      color: #454552;
      font-size: 1.111vmin;
      font-weight: 300;
      margin-bottom: 0.648vmin;
    }
  }

  .Bank-header-hr {
    height: 0.556vmin;
    width: 85.093vmin;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .Bank-nav-item {
    margin-right: 3.889vmin;
    display: flex;
    color: #FFF;
    opacity: 0.5;
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: opacity 0.15s ease;
    & > img {
      margin-right: 0.648vmin;
    };
    &:hover {
      opacity: 1;
    }
    &--selected {
      opacity: 1;
    }
  }

  .Bank-nav-section {
    margin-top: 1.852vmin;
    & > div {
      display: flex;
    }
  }

  .Bank-main-top-info-card {
    width: 27.037vmin;
    height: 16.204vmin;
    border-radius: 0.833vmin;
    padding: 1.111vmin 1.389vmin;
    box-sizing: border-box;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
    margin-left: 2.407vmin;
    &:first-child {
      margin: 0;
    }

    & > button {
      width: 24.167vmin;
      height: 5.093vmin;
      padding: 1.667vmin;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-radius: 0.926vmin;
      background-color: rgba(255, 255, 255, 0.10);
      color: #FFF;
      transition: background-color 0.15 s ease;
      border: none;
      margin: auto;
      margin-top: 0.926vmin ;
      & > svg {
        margin-right: 0.926vmin;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.30);
      }
      }
  }

  .Bank-nav-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4.074vmin;
  }

  .Bank-main-top-info-card-data {
    position: absolute;
    top: 1.667vmin;
    right: 1.667vmin;
    color: #FAFAFA;
    font-size: 1.296vmin;
    font-weight: 600;
    font-family: Montserrat;
  }

  .Bank-main-limit-card {
    width: 41.296vmin;
    height: 18.889vmin;
    border-radius: 0.833vmin;
    padding: 1.667vmin 1.852vmin;
    box-sizing: border-box;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
  }

  .Bank-main-limit-cards-section {
    display: flex;
    align-items: center;
    margin-top: 1.944vmin;
  }

  .Bank-main-limit-title {
    color: #FFF;
    font-family: PF DinDisplay Pro;
    font-size: 1.852vmin;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .Bank-main-limit-subtitle {
    color: rgba(255, 255, 255, 0.35);
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    margin-top: 0.556vmin;
    font-weight: 500;
  }

  .Bank-main-limit-card-title {
    color: rgba(255, 255, 255, 0.55);
    font-family: PF DinDisplay Pro;
    font-size: 1.481vmin;
    font-weight: 400;
  }

  .Bank-main-limit-card-value {
    color: #44FF9A;
    font-family: PF DinDisplay Pro;
    font-size: 5.093vmin;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 1.204vmin;
    & > span {
      color: rgba(255, 255, 255, 0.35);
      font-size: 1.667vmin;
      font-weight: 400;
      margin-left: 0.463vmin;
    }
  }

  .Bank-main-limit-card-range {
    height: 0.185vmin;
    border-radius: 1.574vmin;
    background: rgba(255, 255, 255, 0.10);
    margin-top: 1.019vmin;
    & > div {
      border-radius: 1.574vmin;
      background: #FFF;
      width: 50%;
    }
  }

  .Bank-main-limit-card-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1.944vmin;
    & > div {
      color: rgba(255, 255, 255, 0.55);
      font-size: 1.296vmin;
      font-weight: 300;
      &:last-child {
        text-align: right;
      }
      & > :last-child {
        color: #FFF;
        font-size: 1.481vmin;
        font-weight: 400;
        margin-top: 0.093vmin;
      }
    }
  }

  .Bank-main-tariff-card {
    width: 30.278vmin;
    height: 17.13vmin;
    position: relative;
    border-radius: 0.833vmin;
    overflow: hidden;
    padding: 2.222vmin 2.5vmin;
    box-sizing: border-box;
    & > img {
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      z-index: -1;
    }
  }
  .Bank-main-tariff-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.852vmin;
    font-weight: 700;
    margin-bottom: 1.852vmin;
    & > img {
      width: 6.657vmin;
      height: 1.972vmin;
    }
  }

  .Bank-header-money {
    padding: 0.556vmin 0.741vmin 0 0;
    border-radius: 0.648vmin;
    border: 0.093vmin solid rgba(255, 255, 255, 0.01);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
  }

  .Bank-main-tariff-card-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.481vmin;
    &:last-child {
      margin-bottom: 0 ;
    }
    & > div {
      color: #FFF;
      font-size: 1.481vmin;
      font-weight: 700;
      &:last-child {
        text-align: right;
      }
      & > div:first-child {
        color: rgba(255, 255, 255, 0.45);
        font-size: 1.296vmin;
        font-weight: 400;
      }
    }
  }

  .Bank-modal-input {
    width: 24.167vmin;
    height: 5.093vmin;
    border-radius: 0.926vmin;
    background: #0C0C0F;
    padding: 1.667vmin;
    margin: auto;
    display: flex;
    align-items: center;
    margin-bottom: 0.741vmin;
    &:last-child {
      margin-bottom: 0;
    }
    & > svg {
      margin-right: 0.926vmin;
    }
    & > input {
      background: transparent;
      color: #FFF;
      font-family: PF DinDisplay Pro;
      font-size: 1.481vmin;
      font-weight: 400;
      border: none;
      outline: none;
      line-height: 0;
      &::placeholder {
        color: rgba(255, 255, 255, 0.15);
        font-family: PF DinDisplay Pro;
        font-size: 1.481vmin;
      }
    }
    box-sizing: border-box;
  }

  .Bank-main-tariff-card-info-section {
    width: 54.167vmin;
    height: 17.13vmin;
    flex-shrink: 0;
    border-radius: 0.833vmin;
    padding: 1.574vmin 1.759vmin;
    box-sizing: border-box;
    margin-left: 1.389vmin;
    position: relative;
    border: 0.093vmin solid rgba(255, 255, 255, 0.08);
    background: radial-gradient(50.01% 50.02% at 50.00% 50.00%, rgba(98, 98, 98, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%), linear-gradient(180deg, rgba(80, 202, 255, 0.00) 0%, rgba(255, 255, 255, 0.01) 100%);
  }

  .Bank-main-tariff-card-info-title {
    color: #FFF;
    font-family: PF DinDisplay Pro;
    font-size: 1.667vmin;
    font-weight: 700;
  }

  .Bank-main-tariff-cards-list {
    margin-top: 1.574vmin;
  }

  .Bank-main-tariff-card-info-subtitle {
    color: rgba(255, 255, 255, 0.35);
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    font-weight: 400;
    margin-top: 0.926vmin;
  }

  .Bank-main-tariff-card-item {
    display: flex;
    margin-bottom: 1.389vmin;
  }

  .Bank-main-tariff-card-info-price {
    position: absolute;
    color: rgba(255, 255, 255, 1);
    font-family: PF DinDisplay Pro;
    font-size: 1.481vmin;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    right: 1.389vmin;
    bottom: 6.111vmin;
  }

  .Bank-main-tariff-card-info-button {
    color: #FFF;
    text-align: center;
    font-family: PF DinDisplay Pro;
    font-size: 1.296vmin;
    font-weight: 500;
    border-radius: 0.37vmin;
    border: 0.093vmin solid #8EFF35;
    position: absolute;
    bottom: 1.389vmin;
    right: 1.389vmin;
    width: 12.315vmin;
    height: 3.611vmin;
    background: linear-gradient(180deg, rgba(142, 255, 53, 0.00) 0%, rgba(142, 255, 53, 0.08) 100%);
  }

  .Bank-modal-input-submit {
    border-radius: 0.648vmin;
    border-radius: 0.648vmin;
    background: linear-gradient(180deg, rgba(142, 255, 53, 0.00) 0%, rgba(142, 255, 53, 0.08) 100%);
    justify-content: center;
    margin-top: 0.926vmin !important;
    border: 0.093vmin solid rgba(142, 255, 53, 1) !important;
    &--red {
      background: linear-gradient(180deg, rgba(255, 53, 53, 0.00) 0%, rgba(255, 53, 53, 0.08) 100%);
      border: 0.093vmin solid #FF3535 !important;
    }
  }

  </style>
