<script>
import NotificationItem from "@/entities/NotificationItem/NotificationItem.vue";

export default {
  components: {
    NotificationItem,
  },

  props: {
    notifications: {
      type: Array,
      default: [],
    },
  },

  methods: {
    readNotification(id) {
      this.$emit("readNotification", id);
    },
  },
};
</script>

<template>
  <div class="notifications-list">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @readNotification="readNotification"
      class="notification-item"
    />
  </div>
</template>

<style lang="scss" scoped>
.notification-item {
  padding-bottom: 20px;

  &:last-child {
    padding-bottom: 0;
  }

  & ~ .notification-item {
    border-top: 1px solid lightgray;
    padding-top: 20px;
  }
}
</style>
