<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  methods: {
    readNotification() {
      this.$emit("readNotification", this.notification.id);
    },
  },
};
</script>

<template>
  <div class="notification">
    <div class="notification-aside">
      <div v-show="!notification.isRead" class="notification-alert">!</div>
    </div>
    <div class="notification-content">
      <p @click="readNotification" class="notification-title">
        {{ notification.title }}
      </p>
      <p class="notification-text">{{ notification.text }}</p>
      <button @click="readNotification" class="notification-button">
        View
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 10px;

  &-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid #860000;
    border-radius: 50%;
    color: #860000;
  }

  &-title {
    width: max-content;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &-text {
    margin-bottom: 10px;
    font-size: 12px;
  }

  &-button {
    padding: 5px 8px;
    border: none;
    border-radius: 2px;
    color: #fff;
    background-color: #0066ff;

    &:hover {
      background-color: #074eb8;
      cursor: pointer;
    }
  }
}
</style>
