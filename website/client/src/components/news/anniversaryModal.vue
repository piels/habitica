<template>
  <b-modal
    id="anniversary-modal"
    :hide-header="true"
    :hide-footer="true"
    @shown="onShow()"
  >
    <div class="modal-content">
      <span class="limited-event">
        {{ $t('limitedEvent') }}
      </span>
      <span class="dates">
        {{ $t('limitedDates') }}
      </span>
      <div class="celebrate">
        {{ $t('celebrateAnniversary') }}
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
    padding: 0rem;
  }
  .modal-content {
    border-radius: 25px;
  }
  .modal-footer {
    border-radius: 25px;
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
}

</style>


<script>


export default {
  components: {
  },
  methods: {
  },
};
</script>
