<template>
  <b-modal
    id="anniversary-modal"
    size="lg"
    :hide-header="true"
    :hide-footer="true"
    no-close-on-esc
    no-close-on-backdrop
    @shown="onShow()"
  >
    <div class="modal-body">
    </div>

    <div class="modal-footer d-flex align-items-center pb-0">
    </div>
  </b-modal>
</template>


<style scoped lang="scss">
  @import '~@/assets/scss/colors.scss';

body {
  padding: 32px 24px 24px;
  background-image: linear-gradient(158deg, $purple-300, 0%, $purple-200, 100%);
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
