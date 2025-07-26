const express = require('express');
const Router = express.Router();

Router.use('/super-admin/', require('./superAdmin.route'));
Router.use('/common/', require('./common.route'))
module.exports = Router;