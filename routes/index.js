import notificationRoutes from './notifications.js';

const registerRoutes = (app) => {
    app.use('/notifications', notificationRoutes)
}

export default registerRoutes;