const logger = require('../utils/logger.utils');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const { transporter } = require('../configs/mailer.config');

const getUser = async (req, res) => {
    try {
        let user = await userModel.findOne({}).lean();
        if (!user) {
            return res.status(401).send({ error: 'User not found' })
        }
        return res.status(200).send({ user })
    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'getUser', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}

const getProjects = async (req, res) => {
    try {
        let project = await projectModel.find({}).lean();
        if (!project) {
            return res.status(401).send({ error: 'Project not found' })
        }
        return res.status(200).send({ project })
    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'getProjects', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}

const sendMail = async (req, res) => {
    try {
        const { message, name, email, subject } = req.body;
        const msg = `
        Hello I am ${name}
        
        Message: ${message}
        `
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,       // Your email (sender's email for Gmail, actual sending address)
            to: process.env.EMAIL_USER,         // Your email (where you want to receive the message)
            subject: subject,                  // Subject line
            text: msg,                     // Message body
            replyTo: email,
        })
        return res.status(200).send({ message: "Mission accomplished! 🕶️ Your email is on its way. 🛰️" });
    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'getProjects', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ message: 'Yikes! Our code had a coffee break. Please refresh and try again.' })
    }
}

module.exports = {
    getProjects,
    getUser,
    sendMail
}