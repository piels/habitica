<template>
  <b-modal
    id="anniversary-modal"
    size="lg"
    :hide-header="true"
    :hide-footer="true"
    @shown="onShow()"
  >
    <div class="modal-body">
      <row>
        <span class="limited-event">
          {{ $t('limitedEvent') }}
        </span>
      </row>
      <row>
        <span class="dates">
          {{ $t('limitedDates') }}
        </span>
      </row>
      <row>
        <div class="celebrate">
          {{ $t('celebrateAnniversary') }}
        </div>
      </row>
    </div>

    <div class="modal-footer">
      <div class="limitations d-flex justify-content-center">
        {{ $t('limitations') }}
      </div>
      <div>
        {{ $t('anniversaryLimitations') }}
      </div>
    </div>
  </b-modal>
</template>


<style scoped lang="scss">
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/mixins.scss';

#anniversary-modal {
  width: 566px;
  padding: 0 0 0 0;

  .modal-content {
    width: 566px;
  }
  .modal-body {
    padding: 32px 24px 24px;
    background: linear-gradient(158deg, $purple-300 0%, $purple-200 100%);
  }
  .modal-footer {
    background-color: $purple-50;
    color: $purple-500;
    line-height: 1.33;
    padding-left: 40px;
    padding-right: 40px;
    border-top: 0px;
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
