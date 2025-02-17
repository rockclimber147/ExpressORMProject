const sequelize = require("./config/db");
const User = require("./models/User");
const UserFriend = require("./models/UserFriend");

async function setupDatabase() {
    try {
        await sequelize.sync({ force: false }); // Ensures tables exist without dropping them

        // Check if users already exist
        const userCount = await User.count();
        if (userCount > 0) {
            console.log("Users already exist. Skipping seeding.");
            return;
        }

        // Insert dummy users
        await User.bulkCreate([
            { username: "alice", email: "alice@example.com", password: "hashedpassword1" },
            { username: "bob", email: "bob@example.com", password: "hashedpassword2" },
            { username: "charlie", email: "charlie@example.com", password: "hashedpassword3" }
        ]);

        console.log("Dummy users added successfully!");
    } catch (error) {
        console.error("Error setting up database:", error);
    } finally {
        await sequelize.close(); // Close connection after setup
    }
}

setupDatabase();