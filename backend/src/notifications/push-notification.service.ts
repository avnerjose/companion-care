import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import { SendPushNotificationDTO } from './dtos/send-push-notification-dto';

export class PushNotificationService {
  private expo = new Expo();

  async sendPushNotification({
    title,
    body,
    type,
    token,
  }: SendPushNotificationDTO) {
    if (!Expo.isExpoPushToken(token)) {
      throw new Error('Invalid expo token');
    }

    const notification: ExpoPushMessage = {
      to: token,
      title,
      sound: 'default',
      body,
      data: { type },
    };

    try {
      this.expo.sendPushNotificationsAsync([notification]);
    } catch (e) {
      console.log(e);
    }
  }
}
