const express = require('express')
const Router = express.Router();
const commonController = require('../controllers/common.controller')

Router.get('/', commonController.getUser);
Router.get('/projects', commonController.getProjects);
Router.post('/message', commonController.sendMail)
module.exports = Router;