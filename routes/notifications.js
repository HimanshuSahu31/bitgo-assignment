import {Router} from 'express';
import { createNotification, deleteNotification, getAll, getNotification, getSubscriptions, subscribeNotification } from '../services/notifications.js';
import { sendNotifications } from '../services/notificationJob.js';

const router = Router()


router.post('/', (req, res) => {
    res.json(createNotification(req.body))
})


router.post('/subscription', (req, res) => {
    res.json(subscribeNotification(req.body))
})

router.post('/send', (req, res) => {
    console.log(req.body)
    res.json(sendNotifications(Number(req.body.id)))
})


router.get('/subscription', (req, res) => {
    res.json(getSubscriptions())
})

router.get('/:id', (req, res) => {
    res.json(getNotification(req.params.id))
})

router.delete('/:id', (req, res) => {
    const result = deleteNotification(req.params.id)
    res.json(result)
})

router.get('/', (req, res) => res.json(getAll()))


export default router