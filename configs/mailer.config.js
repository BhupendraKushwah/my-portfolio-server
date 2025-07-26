const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error configuring email transporter:", error);
    } else {
        console.log("Email transporter is ready!");
    }
});

module.exports = {
    transporter
}