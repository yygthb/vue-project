<script>
import Logo from './Logo.vue';
import NotificationBar from './NotificationBar.vue';
import User from './User.vue';

export default {
  components: {
    Logo,
    NotificationBar,
    User,
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
        <Logo />

        <div class="header__service-info">
          <NotificationBar />
          <User class="user" />
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
