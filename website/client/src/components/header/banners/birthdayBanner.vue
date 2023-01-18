<template>
  <base-banner
    banner-id="birthday-promo"
    class="birthday-banner"
    :show="showBirthdayBanner"
    height="3rem"
  >
    <div
      slot="content"
      :aria-label="$t('celebrateBirthday')"
      class="content d-flex justify-content-around align-items-center ml-auto mr-auto"
      @click="showBirthdayModal"
    >
      <div
        v-once
        class="svg-icon svg-gifts left-gift"
        v-html="icons.gifts"
      >
      </div>
      <div
        v-once
        class="svg-icon svg-ten-birthday"
        v-html="icons.tenBirthday"
      >
      </div>
      <div
        v-once
        class="announce-text"
        v-html="$t('celebrateBirthday')"
      >
      </div>
      <div
        v-once
        class="svg-icon svg-gifts right-gift"
        v-html="icons.gifts"
      >
      </div>
    </div>
  </base-banner>
</template>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';

  .announce-text {
    color: $purple-50;
  }

  .birthday-promo-banner {
    width: 100%;
    min-height: 48px;
    padding: 8px 401px;
    background-image: linear-gradient(to left, rgba(255, 190, 93, 0) 100%,
      var(--yellow-100) 67%, var(--yellow-100) 33%, rgba(255, 190, 93, 0) 0%);
    cursor: pointer;
  }

  .left-gift {
    margin: auto 1rem auto auto;
  }

  .right-gift {
    margin: auto auto auto 16px;
    filter: flipH;
    transform: scaleX(-1);
  }

  .svg-gifts {
    width: 85px;
  }

  .svg-ten-birthday {
    width: 192.5px;
  }
</style>

<script>
import find from 'lodash/find';
// import moment from 'moment';
import { mapState } from '@/libs/store';
import BaseBanner from './base';
// import { EVENTS } from '@/libs/events';

import gifts from '@/assets/svg/gifts.svg';
import tenBirthday from '@/assets/svg/10th-birthday-linear.svg';

export default {
  components: {
    BaseBanner,
  },
  data () {
    return {
      icons: Object.freeze({
        gifts,
        tenBirthday,
      }),
    };
  },
  computed: {
    ...mapState({
      currentEventList: 'worldState.data.currentEventList',
    }),
    showBirthdayBanner () {
      return find(this.currentEventList, event => Boolean(event.event === 'birthday10'));
    },
  },
  methods: {
    showBirthdayModal () {
      this.$root.$emit('bv::show::modal', 'birthday-modal');
    },
  },
};

// moment().isBetween(EVENTS.birthday10.start, EVENTS.birthday10.end))
</script>
