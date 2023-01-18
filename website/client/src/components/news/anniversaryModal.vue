<template>
  <b-modal
    id="anniversary-modal"
    :hide-header="true"
    :hide-footer="true"
  >
    <div class="modal-content">
      <div
        class="svg-confetti svg-icon"
        v-html="icons.confetti"
      >
      </div>
      <div>
        <img
          src="~@/assets/images/10-birthday.png"
          class="ten-birthday"
        >
      </div>
      <div class="limited-wrapper">
        <div
          class="svg-gifts svg-icon"
          v-html="icons.gifts"
        >
        </div>
        <div class="limited-event">
          {{ $t('limitedEvent') }}
        </div>
        <div class="dates">
          {{ $t('limitedDates') }}
        </div>
        <div
          class="svg-gifts-flip svg-icon"
          v-html="icons.gifts"
        >
        </div>
      </div>
      <div class="celebrate d-flex justify-content-center">
        {{ $t('celebrateAnniversary') }}
      </div>
      <h2 class="d-flex justify-content-center">
        {{ $t('jubilantGryphatrice') }}
      </h2>
      <!-- gryphatrice info -->
      <div class="d-flex">
        <div class="jubilant-gryphatrice d-flex mr-auto">
          <img src="~@/assets/images/anniversary_pet_still_cropped.png">
        </div>
        <div class="align-items-center">
          <div class="limited-edition">
            {{ $t('limitedEdition') }}
          </div>
          <div class="gryphatrice-text">
            {{ $t('anniversaryGryphatriceText') }}
          </div>
          <div
            class="gryphatrice-price"
            v-html="$t('anniversaryGryphatricePrice')"
          >
          </div>
        </div>
      </div>
      <!-- beginning of payments -->
      <!-- buy with money OR gems -->
      <div
        v-if="!ownGryphatrice && !gryphBought"
      >
        <div
          v-if="selectedPage !== 'payment-buttons'"
          id="initial-buttons"
          class="d-flex justify-content-center"
        >
          <button
            class="btn btn-secondary buy-now-left"
            :class="{active: selectedPage === 'payment-buttons'}"
            @click="selectPage('payment-buttons')"
          >
            {{ $t('buyNowMoneyButton') }}
          </button>
          <button
            class="btn btn-secondary buy-now-right"
            @click="buyGryphatriceGems()"
          >
            {{ $t('buyNowGemsButton') }}
          </button>
        </div>
        <!-- buy with money -->
        <div
          v-else-if="selectedPage === 'payment-buttons'"
          id="payment-buttons"
          class="d-flex flex-column"
        >
          <div>
            <button
              class="btn btn-secondary d-flex stripe"
              @click="redirectToStripe({ sku: 'price_0MPZekZCD0RifGXl0sfpFgs4' })"
            >
              <span
                class="svg-stripe"
                v-html="icons.stripe"
              >
              </span>
            </button>
          </div>
          <div>
            <button
              class="btn btn-secondary d-flex paypal"
              @click="openPaypal({
                url: paypalCheckoutLink, type: 'sku', sku: 'Pet-Gryphatrice-Jubilant'
              })"
            >
              <span
                class="svg-paypal"
                v-html="icons.paypal"
              >
              </span>
            </button>
          </div>
          <div>
            <button class="btn btn-secondary d-flex amazon">
              <span
                class="svg-amazon"
                v-html="icons.amazon"
              >
              </span>
            </button>
          </div>
          <div class="pay-with-gems">
            {{ $t('wantToPayWithGemsText') }}
          </div>
        </div>
      </div>
      <!-- Own the gryphatrice -->
      <div
        v-else
        class="d-flex"
      >
        <button
          class="own-gryphatrice-button"
          @click="stableRedirect"
          v-html="$t('ownJubilantGryphatrice')"
        >
        </button>
      </div>
      <!-- end of payments -->
      <h2 class="d-flex justify-content-center">
        {{ $t('plentyOfPotions') }}
      </h2>
      <div class="plenty-of-potions d-flex">
        {{ $t('plentyOfPotionsText') }}
      </div>
      <div class="potions">
        <div class="pot-1">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Porcelain.png">
        </div>
        <div class="pot-2">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Vampire.png">
        </div>
        <div class="pot-3">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Aquatic.png">
        </div>
        <div class="pot-4">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_StainedGlass.png">
        </div>
        <div class="pot-5">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Celestial.png">
        </div>
        <div class="pot-6">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Glow.png">
        </div>
        <div class="pot-7">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_AutumnLeaf.png">
        </div>
        <div class="pot-8">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_SandSculpture.png">
        </div>
        <div class="pot-9">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Peppermint.png">
        </div>
        <div class="pot-10">
          <img src="https://habitica-assets.s3.amazonaws.com/mobileApp/images/Pet_HatchingPotion_Shimmer.png">
        </div>
      </div>
      <button
        class="btn btn-secondary d-flex justify-content-center visit-the-market"
        @click="$router.push('/shops/market')"
      >
        {{ $t('visitTheMarketButton') }}
      </button>
      <h2 class="d-flex justify-content-center">
        {{ $t('fourForFree') }}
      </h2>
      <div class="four-for-free">
        {{ $t('fourForFreeText') }}
      </div>
      <div class="four-grid d-flex justify-content-center">
        <div class="day-one-a">
          <div class="day-text">
            {{ $t('dayOne') }}
          </div>
          <div class="gift d-flex justify-content-center align-items-middle">
            <img
              src="~@/assets/images/robes.webp"
              class="m-auto"
              width="40px"
              height="66px"
            >
          </div>
          <div class="description">
            {{ $t('partyRobes') }}
          </div>
        </div>
        <div class="day-one-b">
          <div class="day-text">
            {{ $t('dayOne') }}
          </div>
          <div class="gift d-flex justify-content-center align-items-middle">
            <div
              class="svg-gem svg-icon m-auto"
              v-html="icons.birthdayGems"
            >
            </div>
          </div>
          <div class="description">
            {{ $t('twentyGems') }}
          </div>
        </div>
        <div class="day-five">
          <div class="day-text">
            {{ $t('dayFive') }}
          </div>
          <div class="gift d-flex justify-content-center align-items-middle">
            <img
              src="~@/assets/images/habitica-hero-goober.webp"
              class="m-auto"
            ><!-- Birthday Suit -->
          </div>
          <div class="description">
            {{ $t('birthdaySet') }}
          </div>
        </div>
        <div class="day-ten">
          <div class="day-text">
            {{ $t('dayTen') }}
          </div>
          <div class="gift d-flex justify-content-center align-items-middle">
            <div
              class="svg-background svg-icon m-auto"
              v-html="icons.habitversaryBackground"
            >
            </div>
          </div>
          <div class="description">
            {{ $t('background') }}
          </div>
        </div>
      </div>
    </div>

    <div class="modal-bottom">
      <div class="limitations d-flex justify-content-center">
        {{ $t('limitations') }}
      </div>
      <div class="fine-print">
        {{ $t('anniversaryLimitations') }}
      </div>
    </div>
  </b-modal>
</template>

<style lang="scss">
#anniversary-modal {
  .modal-body {
    padding: 0px;
    border: 0px;
  }
  .modal-content {
    border-radius: 14px;
    border: 0px;
  }
  .modal-footer {
    border-radius: 14px;
    border: 0px;
  }

}
</style>


<style scoped lang="scss">
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/mixins.scss';

#anniversary-modal {
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.4;
    color: $white;
  }

  .modal-body {
    // box-shadow: 0 14px 28px 0 rgba(26, 24, 29, 0.24), 0 10px 10px 0 rgba(26, 24, 29, 0.28);
  }

  .modal-content {
    width: 566px;
    padding: 32px 24px 24px;
    background: linear-gradient(158deg, $purple-300 0%, $purple-200 100%);
    // background-color: $gray-300; //temp
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: 0 14px 28px 0 rgba(26, 24, 29, 0.24), 0 10px 10px 0 rgba(26, 24, 29, 0.28);
  }

  .modal-bottom {
    width: 566px;
    background-color: $purple-50;
    color: $purple-500;
    line-height: 1.33;
    border-top: 0px;
    padding: 16px 40px 28px 40px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    // box-shadow: 0 14px 28px 0 rgba(26, 24, 29, 0.24), 0 10px 10px 0 rgba(26, 24, 29, 0.28);
  }
    .limitations {
      color: $white;
      font-weight: bold;
      line-height: 1.71;
      margin-top: 8px;
      justify-content: center;
    }
    .fine-print {
      font-size: 0.75rem;
      color: $purple-500;
      line-height: 1.33;
      margin-top: 8px;
      text-align: center;
    }

  .ten-birthday {
    position: relative;
    width: 268px;
    height: 244px;
    margin: 0 125px 16px;
  }

  .limited-event {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    justify-content: center;
    letter-spacing: 2.4px;
    margin-top: -8px;
    color: $yellow-50;
  }

  .dates {
    font-size: 0.875rem;
    font-weight: bold;
    line-height: 1.71;
    text-align: center;
    justify-content: center;
    color: $white;
  }

  .celebrate {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.4;
    margin: 16px 16px 24px 16px;
    text-align: center;
    color: $yellow-50;
  }


  .jubilant-gryphatrice {
    height: 176px;
    width: 204px;
    border-radius: 12px;
    background-color: $purple-50;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    margin-right: 24px;
    margin-left: 4px;
    color: $white;
  }

  .limited-wrapper {
    margin-top: -36px;
    margin-bottom: -36px;
  }

  .limited-edition, .gryphatrice-text, .gryphatrice-price {
    max-width: 274px;
  }

  .limited-edition {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    line-height:1.33;
    letter-spacing:2.4px;
    padding-top: 36px;
    margin-left: 24px;
    margin-bottom: 8px;
    color: $yellow-50;
  }

  .gryphatrice-text, .gryphatrice-price {
    font-size: 0.875rem;
    line-height: 1.71;
    margin-left: 24px;
    margin-right: 4px;
    color: $white;
  }

  .gryphatrice-price {
    padding-top: 16px;
    margin-left: 24px;
  }

  .buy-now-left {
    width: 243px;
    margin: 24px 8px 24px 0px;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(26, 24, 29, 0.12), 0 1px 2px 0 rgba(26, 24, 29, 0.24);
  }

  .buy-now-right {
    width: 243px;
    margin: 24px 0px 24px 8px;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(26, 24, 29, 0.12), 0 1px 2px 0 rgba(26, 24, 29, 0.24);
  }

  .stripe {
    margin-top: 24px;
    margin-bottom: 8px;
    padding-bottom: 10px;
  }

  .paypal {
    margin-bottom: 8px;
    padding-bottom: 10px;
  }

  .amazon {
    margin-bottom: 16px;
    padding-bottom: 15px;
  }

  .stripe, .paypal, .amazon {
    width: 506px;
    height: 32px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 4px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .pay-with-gems {
    color: $white;
    text-align: center;
    margin-bottom: 24px;
  }

  .own-gryphatrice-button {
    width: 506px;
    height: 32px;
    margin: 24px 4px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    border: $green-100;
    background-color: $green-100;
    color: $green-1;
  }

  .plenty-of-potions {
    font-size: 0.875rem;
    line-height: 1.71;
    margin: 0 8px 24px;
    text-align: center;
    color: $white;
  }

  .potions {
    display: grid;
    grid-template-columns: 5;
    grid-template-rows: 2;
    gap: 24px 24px;
    justify-content: center;

    .pot-1, .pot-2, .pot-3, .pot-4, .pot-5,
    .pot-6, .pot-7, .pot-8, .pot-9, .pot-10 {
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }

    .pot-1 {
      grid-column: 1 / 1;
      grid-row: 1 / 2;
    }
    .pot-2 {
      grid-column: 2 / 2;
      grid-row: 1 / 2;
    }
    .pot-3 {
      grid-column: 3 / 3;
      grid-row: 1 / 2;
    }
    .pot-4 {
      grid-column: 4 / 4;
      grid-row: 1 / 2;
    }
    .pot-5 {
      grid-column: 5 / 5;
      grid-row: 1 / 2;
    }
    .pot-6 {
      grid-column: 1 / 5;
      grid-row: 2 / 2;
    }
    .pot-7 {
      grid-column: 2 / 5;
      grid-row: 2 / 2;
    }
    .pot-8 {
      grid-column: 3 / 5;
      grid-row: 2 / 2;
    }
    .pot-9 {
      grid-column: 4 / 5;
      grid-row: 2 / 2;
    }
    .pot-10 {
      grid-column: 5 / 5;
      grid-row: 2 / 2;
    }

  }
  .visit-the-market {
    height: 32px;
    margin: 24px 4px;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(26, 24, 29, 0.12), 0 1px 2px 0 rgba(26, 24, 29, 0.24);
  }

  .four-for-free {
    font-size: 0.875rem;
    line-height: 1.71;
    margin: 0 36px 24px;
    text-align: center;
    color: $white;
  }

  .four-grid {
    display: grid;
    grid-template-columns: 4;
    grid-template-rows: 1;
    gap: 24px;
  }
    .day-one-a, .day-one-b, .day-five, .day-ten {
      height: 140px;
      width: 100px;
      border-radius: 8px;
      background-color: $purple-50;
    }

    .day-one-a {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
    }
    .day-one-b {
      grid-column: 2 / 2;
      grid-row: 1 / 1;
    }
    .day-five {
      grid-column: 3 / 3;
      grid-row: 1 / 1;
    }
    .day-ten {
      grid-column: 4 / 4;
      grid-row: 1 / 1;
    }

    .day-text {
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 1.33;
      letter-spacing: 2.4px;
      text-align: center;
      text-transform: uppercase;
      padding: 4px 0px;
      color: $yellow-50;
    }

    .gift {
      height: 80px;
      width: 84px;
      margin: 0 8px 32px;
      background-color: $purple-100;
    }

    .description {
      font-size: 0.75rem;
      line-height: 1.33;
      text-align: center;
      padding: 8px 0px;
      margin-top: -32px;
      color: $white;
    }

  // SVG CSS
  .svg-confetti {
    position: absolute;
    height: 152px;
    width: 518px;
    margin-top: 24px;
  }

  .svg-gifts, .svg-gifts-flip {
    position: relative;
    height: 32px;
    width: 85px;
  }

  .svg-gifts {
    margin-left: 70px;
    top: 30px;
  }

  .svg-gifts-flip {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    left: 366px;
    bottom: 34px;
  }

  .svg-divider, .svg-divider-flip {
    display: inline-block;
    position: relative;
    height: 12px;
    width: 138px;
    max-width: 100%;
  }

  .svg-divider {
    margin-left: 16px;
    margin-right: 8px;
  }

  .svg-divider-flip {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    margin-left: 8px;
  }

  .svg-gem {
    height: 48px;
    width: 58px;
  }

  .svg-background {
    height: 68px;
    width: 68px;
  }

  .svg-stripe {
    height: 20px;
    width: 48px;
  }

  .svg-paypal {
    height: 16px;
    width: 60px;
  }

  .svg-amazon {
    height: 16px;
    width: 83.4px;
  }

}

</style>


<script>
// to check if user owns JG or not
import { mapState } from '@/libs/store';

import buy from '@/mixins/buy';
import notifications from '@/mixins/notifications';
import payments from '@/mixins/payments';
import content from '@/../../common/script/content/index';

// import images
import confetti from '@/assets/svg/confetti.svg';
import gifts from '@/assets/svg/gifts-birthday.svg';
import divider from '@/assets/svg/divider.svg';
import stripe from '@/assets/svg/stripe.svg';
import paypal from '@/assets/svg/paypal-logo.svg';
import amazon from '@/assets/svg/amazonpay.svg';
import birthdayGems from '@/assets/svg/birthday-gems.svg';
import habitversaryBackground from '@/assets/svg/icon-background-habitversary.svg';

export default {
  mixins: [buy, notifications, payments],
  data () {
    return {
      icons: Object.freeze({
        confetti,
        gifts,
        divider,
        stripe,
        paypal,
        amazon,
        birthdayGems,
        habitversaryBackground,
      }),
      selectedPage: 'initial-buttons',
      gryphBought: false,
    };
  },
  computed: {
    ...mapState({
      user: 'user.data',
    }),
    ownGryphatrice () {
      return Boolean(this.user && this.user.items.pets['Gryphatrice-Jubilant']);
    },
  },
  methods: {
    hide () {
      this.$root.$emit('bv::hide::modal', 'anniversary-modal');
    },
    buyGryphatriceGems () {
      const gryphatrice = content.petInfo['Gryphatrice-Jubilant'];
      if (this.user.balance * 4 < gryphatrice.value) {
        this.$root.$emit('bv::show::modal', 'buy-gems');
        return this.hide();
      }
      if (!this.confirmPurchase(gryphatrice.currency, gryphatrice.value)) {
        return null;
      }
      this.makeGenericPurchase(gryphatrice);
      this.gryphBought = true;
      return this.purchased(gryphatrice.text());
    },
    selectPage (page) {
      if (page === this.selectedPage) return;
      if (page === 'payment-buttons') this.selectedPage = 'payment-buttons';
    },
    stableRedirect () {
      if (this.$router.history.current.name !== 'stable') {
        this.$router.push('/inventory/stable');
      }
      this.hide();
    },
  },
};
</script>
