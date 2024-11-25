import shortid from "shortid";
import { NOTIFICATIONS } from "../db/notifcations.js"
import { SUBSCRIBERS } from "../db/subscribers.js";
import { USERS } from "../db/users.js";
import { FAILED, NOT_STARTED, OUTBOUND_NOTIFICATIONS, OUTSTANDING, SENT } from "../db/outbound_notification.js";

export const sendNotifications = (notificationId) => {
    const notification = NOTIFICATIONS.find((notif) => notif.id === notificationId);
    console.log(notification)
    if (!notification) {
        return false;
    }

    // get all users subscribed
    const subscribedUserIds = SUBSCRIBERS.filter((sub) => Number(sub.type_id) === notification.type_id).map((sub) => Number(sub.user_id));
    console.log(subscribedUserIds)

    const subscribedUsers = USERS.filter((user) => subscribedUserIds.includes(user.id));
    console.log(subscribedUsers)

    subscribedUsers.forEach((user) => {
        OUTBOUND_NOTIFICATIONS.push({
            id: shortid(),
            user_id: user.id,
            notification: notification.id,
            status: NOT_STARTED,
        })
    })


    // send notifications

    const notificationProcessed = {};

    subscribedUsers.forEach((user) => {
        // api to send NOTIFICATION
        const status = sendEmailAPI();

        console.log("user ", user.name, " notification payload: ", notification.payload, " status: ", status)

        const record = OUTBOUND_NOTIFICATIONS.find((out) => Number(out.user_id) === user.id && Number(out.notification_id) === notificationId);
        if (record) record[status] = status;

        if (!notificationProcessed[status]) {
            notificationProcessed[status] = []
        }

        notificationProcessed[status].push(user.name)
    })

    return notificationProcessed;
}

const sendEmailAPI = () => {
    const status = [SENT, OUTSTANDING, FAILED];

    const index = Math.floor(Math.random() * 3);

    return status[index]
}
