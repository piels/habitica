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
      <div>
        <pre>potion images go here</pre>
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
      <div>
        <pre>Robes, Gems, Bday Set, and Background go here</pre>
      </div>
    </div>

    <div class="modal-bottom">
      <div class="limitations d-flex justify-content-center">
        {{ $t('limitations') }}
      </div>
      <div>
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

  .visit-the-market {
    width: 502px;
    height: 32px;
  }

  .four-for-free {
    font-size: 0.875rem;
    line-height: 1.71;
    margin: 16px 36px 24px;
    text-align: center;
    color: $white;
  }

  pre {
    color: $orange-50;
  }
}

</style>


<script>
// to check if user owns JG or not
import { mapState } from '@/libs/store';
import content from '@/../../common/script/content/index';

// import images
// import tempGryphatrice from '~@/assets/images/anniversary_pet_still_cropped.png';
// import tenAnniversary from '~@/assets/images/10-birthday.png';

// import paymentButtons from '@/components/payments/buttons/list';

export default {
  components: {
    // paymentButtons,
  },
  data () {
    return {
      // icons: Object.freeze({
      //   tenAnniversary,
      //   tempGryphatrice,
      // }),
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
      this.$root.$emit('buyModal::showItem', content.petInfo['Gryphatrice-Jubilant']);
    },
    selectPage (page) {
      if (page === this.selectedPage) return;
      if (page === 'payment-buttons') this.selectedPage = 'payment-buttons';
    },
  },
};
</script>
