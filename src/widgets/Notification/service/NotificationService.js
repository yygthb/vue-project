import db from './notificationDB.js';
import { getRandom } from '../../../shared/helpers/random.js';

export class NotificaitonService {
  constructor() {
    this.notifications = [];
    this.notificationsCount = 0;
  }

  async getNotifications() {
    this.updateNotifications();
    const res = await this.parseNotificationsData();
    return res;
  }

  updateNotifications() {
    const randomNum = getRandom(0, 10);
    if (randomNum > 1 && this.notificationsCount < 7) {
      this.notifications.unshift(db[this.notificationsCount]);
      this.notificationsCount++;
    }
  }

  async parseNotificationsData() {
    const unreadNotificationsCount = await this.notifications.reduce((acc, item) => {
      return !item.isRead ? ++acc : acc;
    }, 0);
    return [unreadNotificationsCount, this.notifications];
  }

  async readNotification(id) {
    this.notifications.map(notification => {
      if (notification.id === id) {
        notification.isRead = true;
      }
    })

    return { status: "ok" };
  }

  pushAllNotificatoinsFromDb() {
    this.notifications = db;
  }
}
