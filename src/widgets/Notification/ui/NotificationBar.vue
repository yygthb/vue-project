<script>
import { NotificaitonService } from "../service/NotificationService.js";
import Modal from "@/shared/ui/Modal/Modal.vue";
import NotificationList from "./NotificationList.vue";

// set this value to 500 to see fast result
const LOAD_NOTIFICATIONS_INTERVAL = 10_000; // default 300_000 (5 minutes)

export default {
  components: {
    Modal,
    NotificationList,
  },

  data() {
    return {
      notificationService: new NotificaitonService(),
      unReadNotifications: 0,
      notifications: [],
      isNotificationsOpen: false,
      count: 0,
    };
  },

  mounted() {
    // this.initMockData();
    this.subscribeToNotifications();
  },

  methods: {
    async initMockData() {
      this.notificationService.pushAllNotificatoinsFromDb();
      const res = await this.notificationService.getNotifications();
      [this.unReadNotifications, this.notifications] = res;
      console.log("this.notifications:", this.notifications);
    },
    async subscribeToNotifications() {
      await this.loadNotificationsFromServer();
      setInterval(async () => {
        await this.loadNotificationsFromServer();
      }, LOAD_NOTIFICATIONS_INTERVAL);
    },
    async loadNotificationsFromServer() {
      const res = await this.notificationService.getNotifications();
      console.log(`res ${this.count}:`, res);
      this.count++;
      [this.unReadNotifications, this.notifications] = res;
    },
    showNotifications() {
      if (this.notifications.length) {
        this.isNotificationsOpen = true;
      }
    },
    async readNotification(id) {
      console.log("read notification", id);
      const res = await this.notificationService.readNotification(id);
      if (res.status === "ok") {
        this.unReadNotifications--;
      }
    },
  },
};
</script>

<template>
  <div>
    <div
      @click="showNotifications"
      class="notification"
      title="System Notifications"
    >
      <img
        alt="Notification logo"
        class="icon"
        src="@/assets/images/icons/bell.svg"
      />

      <div v-if="unReadNotifications" class="notification-count">
        <p>{{ unReadNotifications }}</p>
      </div>
    </div>

    <Modal v-model:show="isNotificationsOpen" class="modal">
      <template v-slot:modalTitle>
        <p>Your Notifications</p>
      </template>
      <template v-slot:modalBody>
        <NotificationList
          :notifications="notifications"
          @readNotification="readNotification"
        />
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  position: relative;
  height: 40px;
  width: 40px;
  border: 1px solid #aaa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon {
    width: 30px;
    height: 30px;
    opacity: 0.5;
  }

  &:hover {
    border-color: #777;

    .icon {
      opacity: 1;
    }
  }

  &-count {
    position: absolute;
    z-index: 0;
    top: 5px;
    right: 3px;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    background-color: rgb(218, 43, 43);
  }
}

.modal {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .app-modal__header {
    background-color: lightblue;
  }
}
</style>
