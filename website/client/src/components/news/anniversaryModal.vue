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
      <div class="pet-text">
        {{ $t('jubilantGryphatrice') }}
      </div>
      <div class="gryphatrice-grid">
        <div>
          <img src="~@/assets/images/anniversary_pet_still_cropped.png">
        </div>
        <div class="limited-edition">
          {{ $t('limitedEdition') }}
        </div>
        <div class="gryphatrice-text">
          {{ $t('anniversaryGryphatriceText') }}
        </div>
        <div class="gryphatrice-price">
          {{ $t('anniversaryGryphatricePrice') }}
        </div>
      </div>
      <!-- beginning of payments -->
      <!-- buy with money OR gems -->
      <div
        v-if="!ownGryphatrice()"
      >
        <div
          v-if="selectedPage !== 'payment-buttons'"
          id="initial-buttons"
        >
          <button
            :class="{active: selectedPage === 'payment-buttons'}"
            @click="selectPage('payment-buttons')"
          >
            {{ $t('buyNowMoneyButton') }}
          </button>
          <button>
            {{ $t('buyNowGemsButton') }}
          </button>
        </div>
        <!-- buy with money -->
        <div
          v-else-if="selectedPage === 'payment-buttons'"
          id="payment-buttons"
        >
          <button>
            Stripe
          </button>
          <button>
            Paypal
          </button>
          <button>
            Amazon
          </button>
          <div>
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
      <div>
        {{ $t('plentyOfPotions') }}
      </div>
      <div>
        {{ $t('plentyOfPotionsText') }}
      </div>
      <div>
        <pre>potion images go here</pre>
      </div>
      <button>
        {{ $t('visitTheMarketButton') }}
      </button>
      <div>
        {{ $t('fourForFree') }}
      </div>
      <div>
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
    color: $yellow-50;
  }

  .pet-text {
    font-size: 1.25rem;
    font-weight: bold;
    font-stretch: condensed;
    line-height: 1.4;
    padding-top: 24px;
    text-align: center;
    justify-content: center;
    color: $white;
  }

  .gryphatrice-grid {
    display: grid;
    column-gap: 24px;
    grid-template-columns: 176px 274px;
  }

  .jubilant-gryphatrice {
    grid-column: 1 / 2;
    height: 204px;
    width: 176px;
    border-radius: 12px;
    background-color: $purple-50;
    padding-top: 16px;
    color: $white;
  }

  .limited-edition {
    grid-column: 2 /2;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    line-height:1.33;
    letter-spacing:2.4px;
    padding-top: 36px;
    color: $yellow-50;
  }

  .gryphatrice-text, .gryphatrice-price {
    grid-column: 2 / 2;
    font-size: 0.875rem;
    line-height: 1.71;
    color: $white;
  }

  .gryphatrice-price {
    padding-top: 16px;
  }
}

</style>


<script>
// to check if user owns JG or not
import { mapState } from '@/libs/store';

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
      userLoggedIn: 'user.data',
    }),
  },
  methods: {
    selectPage (page) {
      if (page === this.selectedPage) return;
      if (page === 'payment-buttons') this.selectedPage = 'payment-buttons';
    },
    ownGryphatrice () {
      return Boolean(this.userLoggedIn.items.pets['Gryphatrice-Jubilant']);
    },
  },
};
</script>
