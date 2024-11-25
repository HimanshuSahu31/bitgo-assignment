

seeded users
DB
id
name
email


notification_types
id 
type: string

POST /notifcation - create notification
type
payload {current price of BTC, market trade volume, intra day high price, market cap}

DB
id, type:FK(notification_types.id)
, payload

DELETE /notification

POST /notification/subscribe - user able to subscribe
request {user_id, type}
user_id type_id

track status of notification
DB
id user_id notification_id status(NOT_STARTED, SENT, IN_PROGRESS, FAILED)


