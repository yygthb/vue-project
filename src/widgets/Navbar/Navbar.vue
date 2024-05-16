<script>
import { NotificationBar } from '@/widgets/Notification';

export default {
  components: {
    NotificationBar,
  },

  data() {
    return {
      notificationCounter: 0,
    };
  },
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-container">
        <div class="logo">NAV</div>

        <div class="header__service-info">
          <!-- <NotificationBar /> -->

          <div class="user">USER INFO</div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #ddd;

  &-container {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__service-info {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
