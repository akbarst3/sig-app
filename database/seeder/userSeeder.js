const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
require('dotenv').config();

const users = [
    {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123'
    },
    {
        name: 'Jane Smith',
        username: 'janesmith',
        password: 'password123'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        await User.deleteMany();

        for (let user of users) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await User.create(user);
        }

        console.log('User seeding completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUsers();