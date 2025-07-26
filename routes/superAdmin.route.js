const express = require('express');
const Router = express.Router();
const multer = require('multer');
const superAdminController = require('../controllers/superAdmin.controller')
const authenticateJWT = require('../middlewares/auth.middleware')
const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });

Router.post('/login', superAdminController.login)
Router.post('/', authenticateJWT, upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), superAdminController.updateUser)
Router.post('/about', authenticateJWT, upload.single('aboutMePhoto'), superAdminController.updateAbout);
Router.post('/project', authenticateJWT, upload.single('image'), superAdminController.addProjects);
Router.post('/contact', authenticateJWT, superAdminController.updateContact);

module.exports = Router;