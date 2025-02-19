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
const { UserInvitation } = require("../models/UserInvitation")(sequelize, User);

const dbContext = {
    User: User,
    UserFriend: UserFriend,
    UserInvitation: UserInvitation,
}
const UserRepository = require("../repositories/UserRepository");
const userRepository = new UserRepository(dbContext);

const UserInvitationRepository = require("../repositories/UserInvitationRepository")
const userInvitationRepository = new UserInvitationRepository(dbContext)

module.exports = { 
    sequelize, 
    dbContext,
    User, 
    UserFriend, 
    userRepository, 
    userInvitationRepository };
