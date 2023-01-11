<template>
  <b-modal
    id="anniversary-modal"
    :hide-header="true"
    :hide-footer="true"
  >
    <div class="modal-content">
      <div class="ten-birthday">
        <img src="~@/assets/images/10-birthday.png">
      </div>
      <span class="limited-event">
        {{ $t('limitedEvent') }}
      </span>
      <span class="dates">
        {{ $t('limitedDates') }}
      </span>
      <div class="celebrate">
        {{ $t('celebrateAnniversary') }}
      </div>
      <div class="header">
        {{ $t('jubilantGryphatrice') }}
      </div>
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
        v-if="!ownGryphatrice"
      >
        <div
          v-if="selectedPage !== 'payment-buttons'"
          id="initial-buttons"
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
            <button class="btn btn-secondary d-flex stripe">
              Stripe
            </button>
          </div>
          <div>
            <button class="btn btn-secondary d-flex paypal">
              Paypal
            </button>
          </div>
          <div>
            <button class="btn btn-secondary d-flex amazon">
              Amazon
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
        id="own-gryphatrice-buttons"
      >
        <button
          v-html="$t('ownJubilantGryphatrice')"
        >
        </button>
      </div>
      <!-- end of payments -->
      <div class="header">
        {{ $t('plentyOfPotions') }}
      </div>
      <div class="plenty-of-potions">
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
      <button class="btn btn-secondary visit-the-market">
        {{ $t('visitTheMarketButton') }}
      </button>
      <div class="header">
        {{ $t('fourForFree') }}
      </div>
      <div class="four-for-free">
        {{ $t('fourForFreeText') }}
      </div>
      <div class="four-grid">
        <div class="day-one-a">
          <div class="day">
            {{ $t('dayOne') }}
          </div>
          <div>
            <!-- party robes -->
          </div>
          <div class="description">
            {{ $t('partyRobes') }}
          </div>
        </div>
        <div class="day-one-b">
          <div class="day">
            {{ $t('dayOne') }}
          </div>
          <div
            class="item"
          >
            <img src="~@/assets/images/birthday-gems.png">
          </div>
          <div class="description">
            {{ $t('twentyGems') }}
          </div>
        </div>
        <div class="day-five">
          <div class="day">
            {{ $t('dayFive') }}
          </div>
          <div>
            <!-- Birthday Suit -->
          </div>
          <div class="description">
            {{ $t('birthdaySet') }}
          </div>
        </div>
        <div class="day-ten">
          <div class="day">
            {{ $t('dayTen') }}
          </div>
          <div
            class="item">
            <img src="~@/assets/images/icon-background-habitversary.png">
          </div>
          <div class="description">
            {{ $t('birthdayBackground') }}
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
    border-radius: 100px;
  }
  .modal-footer {
    border-radius: 100px;
  }

}
</style>


<style scoped lang="scss">
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/mixins.scss';

#anniversary-modal {

  .modal-content {
    width: 566px;
    padding: 32px 24px 24px;
    background: linear-gradient(158deg, $purple-300 0%, $purple-200 100%);
    // background-color: $gray-300; //temp
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
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
    margin-top: 16 px;
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
    font-stretch: condensed;
    line-height: 1.4;
    text-align: center;
    justify-content: center;
    margin-top: 16px;
    color: $yellow-50;
  }

  .header {
    font-size: 1.25rem;
    font-weight: bold;
    font-stretch: condensed;
    line-height: 1.4;
    margin-top: 24px;
    text-align: center;
    justify-content: center;
    color: $white;
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
    margin-top: 24px;
    margin-right: 8px;
    margin-left: 4px;
  }

  .buy-now-right {
    width: 243px;
    margin-top: 24px;
    margin-right: 4px;
    margin-left: 8px;
  }

  .stripe, .paypal, .amazon {
    width: 506px;
    margin-left: 4px;
    margin-right: 4px;
    border-radius: 4px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .stripe {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  .paypal {
    margin-bottom: 8px;
  }

  .amazon {
    margin-bottom: 16px;
  }

  .pay-with-gems {
    color: $white;
    text-align: center;
  }

  .plenty-of-potions {
    font-size: 0.875rem;
    line-height: 1.71;
    margin: 16px 8px 24px;
    text-align: center;
    color: $white;
  }

  .potions {
    display: grid;
    grid-template-columns: 5;
    grid-template-rows: 2;
    gap: 24px 24px;
    justify-content: center;

    .pot-1 {
      grid-column: 1 / 1;
      grid-row: 1 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-2 {
      grid-column: 2 / 2;
      grid-row: 1 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-3 {
      grid-column: 3 / 3;
      grid-row: 1 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-4 {
      grid-column: 4 / 4;
      grid-row: 1 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-5 {
      grid-column: 5 / 5;
      grid-row: 1 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-6 {
      grid-column: 1 / 5;
      grid-row: 2 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-7 {
      grid-column: 2 / 5;
      grid-row: 2 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-8 {
      grid-column: 3 / 5;
      grid-row: 2 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-9 {
      grid-column: 4 / 5;
      grid-row: 2 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }
    .pot-10 {
      grid-column: 5 / 5;
      grid-row: 2 / 2;
      height: 68px;
      width: 68px;
      border-radius: 8px;
      background-color: $purple-50;
    }

  }
  .visit-the-market {
    width: 502px;
    height: 32px;
    margin-top: 24px;
  }

  .four-for-free {
    font-size: 0.875rem;
    line-height: 1.71;
    margin: 16px 36px 24px;
    text-align: center;
    color: $white;
  }

  .four-grid {
    display: grid;
    grid-template-columns: 4;
    grid-template-rows: 1;
    gap: 24px;
    justify-content: center;
  }

  .day-one-a {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    height: 140px;
    width: 100px;
    border-radius: 8px;
    background-color: $purple-50;
  }
  .day-one-b {
    grid-column: 2 / 2;
    grid-row: 1 / 1;
    height: 140px;
    width: 100px;
    border-radius: 4px;
    background-color: $purple-50;
    padding: 16px 13px;
    margin: 4px 0 8px;
  }
  .day-five {
    grid-column: 3 / 3;
    grid-row: 1 / 1;
    height: 140px;
    width: 100px;
    border-radius: 4px;
    background-color: $purple-50;
  }
  .day-ten {
    grid-column: 4 / 4;
    grid-row: 1 / 1;
    height: 140px;
    width: 100px;
    border-radius: 4px;
    background-color: $purple-50;
    padding: 6px 8px;
  }

  .day {
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1.33;
    letter-spacing: 2.4px;
    text-align: center;
    text-transform: uppercase;
    color: $yellow-50;
  }

  .item {
    background-color: $purple-100;
  }

  .description{
    font-size: 0.75rem;
    line-height: 1.33;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 8px;
    color: $white;
  }

  // SVG CSS
  // .svg-gem {
  //   height: 48px;
  //   width: 58px;
  //   flex-grow: 0;
  //   object-fit: contain;
  // }

  // .svg-background {
  //   height: 68px;
  //   width: 68px;
  //   flex-grow: 0;
  //   object-fit: contain;
  // }

}

</style>


<script>
// to check if user owns JG or not
import { mapState } from '@/libs/store';
import buy from '@/mixins/buy';
import notifications from '@/mixins/notifications';
import content from '@/../../common/script/content/index';

export default {
  mixins: [buy, notifications],
  data () {
    return {
      selectedPage: 'initial-buttons',
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
    buyGryphatriceGems () {
      const gryphatrice = content.petInfo['Gryphatrice-Jubilant'];
      if (!this.confirmPurchase(gryphatrice.currency, gryphatrice.value)) {
        return;
      }
      this.makeGenericPurchase(gryphatrice);
      this.purchased(gryphatrice.text());
    },
    selectPage (page) {
      if (page === this.selectedPage) return;
      if (page === 'payment-buttons') this.selectedPage = 'payment-buttons';
    },
  },
};
</script>
