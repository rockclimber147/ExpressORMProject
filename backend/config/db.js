require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connected to Neon database successfully!");
    } catch (error) {
        console.error("Neon DB connection failed:", error);
    }
}

testConnection();

const User = require("../models/User")(sequelize);
const UserFriend = require("../models/UserFriend")(sequelize, User);
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository(User, UserFriend);

module.exports = { sequelize, User, UserFriend, userRepository };
