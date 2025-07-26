const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger.utils');
const userModel = require('../models/user.model');
const projectModel = require('../models/project.model');
const { uploadImage, uploadPDF } = require('../utils/upload');

const login = async (req, res) => {
    try {

        let { password, email } = req.body;
        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(403).send({ error: 'Invalid credentials !!' })
        }
        console.log(user);

        let isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(403).send({ error: 'Invalid credentials !!' })
        }
        const token = jwt.sign({ userId: user._id, type: 'superAdmin' }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        return res.status(200).send({ message: 'Login successfully', token, user })
    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'login', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;

        if (req.files?.resume) {
            let fileName = `resume-${Date.now()}`;
            const buffer = req.files?.resume[0].buffer
            uploadPDF(buffer, {
                public_id: fileName,
                folder: 'portfolio',
                overwrite: true,
            })
            const extension = req.files?.resume[0].mimetype.split('/')[1];
            req.body.resume = `${fileName}.${extension}`;
        }
        else req.body.resume = req.body.resume

        if (req.files?.profilePicture) {
            let fileName = `profile-${Date.now()}`;
            const buffer = req.files?.profilePicture[0].buffer
            uploadImage(buffer, {
                public_id: fileName,
                folder: 'portfolio',
                overwrite: true,
            })
            const extension = req.files?.profilePicture[0].mimetype.split('/')[1];
            req.body.profilePicture = `${fileName}.${extension}`;
        }
        else req.body.profilePicture = req.body.profilePicture;

        let data = {
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            brief: req.body.brief,
            socialLinks: {
                x: req.body.x,
                linkedIn: req.body.linkedIn,
                github: req.body.github,
                instagram: req.body.instagram
            },
            resume: req.body.resume,
            'image.main': req.body.profilePicture
        }

        let user = await userModel.findOneAndUpdate({ _id: userId }, data, { new: true });
        if (!user) {
            return res.status(401).send({ error: 'User not found' })
        }
        return res.status(200).send({ user, message: 'Updated successfully' })

    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'updateUser', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}
const updateAbout = async (req, res) => {
    try {
        const { userId } = req.user;
        if (req.file) {
            let fileName = `about-${Date.now()}`;
            const buffer = req.file.buffer
            uploadImage(buffer, {
                public_id: fileName,
                folder: 'portfolio',
                overwrite: true,
            })
            const extension = req.file.mimetype.split('/')[1];
            req.body.aboutMePhoto = `${fileName}.${extension}`;
        }

        let data = {
            description: req.body.description,
            education: JSON.parse(req.body.education),
            experiences: JSON.parse(req.body.experiences),
            techStack: JSON.parse(req.body.techStack),
            'image.about': req.body.aboutMePhoto
        }

        let user = await userModel.findOneAndUpdate({ _id: userId }, data, { new: true });
        if (!user) {
            return res.status(401).send({ error: 'User not found' })
        }
        return res.status(200).send({ user, message: 'Updated successfully' })

    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'updateAbout', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}
const addProjects = async (req, res) => {
    try {
        const { userId } = req.user;
        let {
            title,
            technologies,
            description,
            url,
            image,
            id
        } = req.body;
        if (req.file) {
            let fileName = `project-${title}-${Date.now()}`;
            const buffer = req.file.buffer
            uploadImage(buffer, {
                public_id: fileName,
                folder: 'portfolio',
                overwrite: true,
            })
            const extension = req.file.mimetype.split('/')[1];
            image = `${fileName}.${extension}`;
        }

        const data = {
            title,
            technologies: JSON.parse(technologies),
            description,
            url,
            image,
            addedBy: userId
        }

        let project;
        if (id) {
            project = await projectModel.findOneAndUpdate({ _id: id }, data, { new: true });
        } else {
            project = await projectModel.insertOne(data)
        }
        return res.status(200).send({ project, message: 'Added successfully' })
    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'addProjects', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}
const updateContact = async (req, res) => {
    try {
        const { userId } = req.user;
        const { email, phone, address } = req.body
        let user = await userModel.findOneAndUpdate({ _id: userId }, {
            email, phone, address
        }, { new: true });
        if (!user) {
            return res.status(401).send({ error: 'User not found' })
        }
        return res.status(200).send({ user, message: 'Updated successfully' })

    } catch (error) {
        logger.error(`Error: ${error.message}, { functionName: 'updateContact', stack: ${error.stack}, body:${req.body} }`);
        res.status(500).send({ error })
    }
}

module.exports = {
    login,
    updateUser,
    updateAbout,
    addProjects,
    updateContact
}