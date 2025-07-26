const express = require('express')
const router = express.Router();


const commonController = require('../controllers/common.controller')

router.get('/', commonController.getUser);
router.get('/projects', commonController.getProjects);
router.post('/message', commonController.sendMail)
router.get('/download-resume', async (req, res) => {
    const fileUrl = 'https://res.cloudinary.com/dmj6kmhrd/raw/upload/portfolio/resume-1752522767162';

    try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch resume: ${response.statusText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="Bhupendra-Kushwah.pdf"`,
            "Content-Length": buffer.length,
        });

        res.end(buffer);
    } catch (error) {
        console.error('Error fetching resume:', error.message);
        res.status(500).send('Failed to download resume');
    }
});
module.exports = router;