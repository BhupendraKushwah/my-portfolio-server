const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const User = require('../models/user.model'); // Adjust the path based on your project structure

const seedDatabase = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        const dbName = process.env.DB_NAME;
        // Connect to your MongoDB
        mongoose
            .connect(dbUrl, {
                dbName,
                autoIndex: true,
            })
            .then((status) => console.info(`Connection establised to ${dbName}`))
            .catch((err) =>
                console.error(`Could not connect to database: ${err.message}`)
            );

        console.log('Connected to MongoDB');
        const hashedPassword = await bcrypt.hash('root', 12)
        // Define seed data
        const seedData = [
            {
                password: hashedPassword,
                email: "bhupendrakushwah977@gmail.com",

            },
        ];

        // Insert seed data into the database
        await User.insertMany(seedData);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
