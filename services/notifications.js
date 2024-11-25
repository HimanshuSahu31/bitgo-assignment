import { NOTIFICATIONS, getNextId, NOTIFICATION_TYPE } from "../db/notifcations.js"
import { SUBSCRIBERS } from "../db/subscribers.js";



export const createNotification = (notification) => {
    if (!notification.type_id || !notification.payload) {
        return;
    }

    if (NOTIFICATION_TYPE.findIndex((notifType) => notifType.id === notification.type_id) === -1) {
        return;
    }

    const adaptedNotification = {...notification, id: getNextId()};
    NOTIFICATIONS.push(adaptedNotification);
    return adaptedNotification
}

export const getNotification = (id) => {
    return NOTIFICATIONS.find((notif) => notif.id === id)
}

export const deleteNotification = (id) => {
    console.log(id)
    const indexToRemove = NOTIFICATIONS.findIndex((notif) => notif.id === Number(id));
    console.log(indexToRemove)
    if (indexToRemove === -1) {
        return false;
    }

    NOTIFICATIONS.splice(indexToRemove, 1);
    return true;
}

export const getAll = () => {
    return NOTIFICATIONS
}

export const subscribeNotification = (subscription) => {
    if (!subscription.user_id || !subscription.type_id) {
        return false;
    }

    if (SUBSCRIBERS.findIndex((sub) => sub.user_id === subscription.user_id && sub.type_id === subscription.type_id) !== -1) {
        return false;
    }

    SUBSCRIBERS.push(subscription);
    return true;
}

export const getSubscriptions = () => {
    return SUBSCRIBERS;
}
