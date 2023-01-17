<template>
  <base-notification
    :can-remove="canRemove"
    :has-icon="true"
    :notification="notification"
    :read-after-click="true"
    @click="action"
  >
    <div
      slot="content"
    >
      <strong> {{ notification.data.title }} </strong>
      <span> {{ notification.data.text }} </span>
    </div>
    <div
      slot="icon"
      class="mt-3"
      :class="notification.data.icon"
    ></div>
  </base-notification>
</template>

<script>
import BaseNotification from './base';

export default {
  components: {
    BaseNotification,
  },
  props: {
    notification: {
      type: Object,
      default (data) {
        return data;
      },
    },
    canRemove: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    action () {
      this.$router.push({ name: this.notification.data.destination || 'items' });
    },
  },
};
</script>
