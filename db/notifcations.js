export const NOTIFICATION_TYPE = [
    {
        id: 1,
        type: 'price'
    },
    {
        id: 2,
        type: 'volume'
    }
]

export const NOTIFICATIONS = [];

export const getNextId = () => {
    if (NOTIFICATIONS.length) {
        return NOTIFICATIONS[NOTIFICATIONS.length - 1].id + 1;
    }

    return 1;
}
