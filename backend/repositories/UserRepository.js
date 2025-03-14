const bcrypt = require("bcryptjs");

class UserRepository {
    SALT_ROUNDS = 10;
    MIN_PASSWORD_LENGTH = 6;

    constructor(context) {
        this.context = context
    }

    async getAllUsers() {
        return await this.context.User.findAll();
    }

    async createUser(username, email, password) {
        if (!password || password.length < this.MIN_PASSWORD_LENGTH) {
            throw new Error(`Password must be at least ${this.MIN_PASSWORD_LENGTH} characters long`);
        }
        let hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
        return await this.context.User.create({ username, email, hashedPassword });
    }

    async sendFriendRequest(senderId, receiverId) {
        return await this.context.UserFriend.create({ senderId, receiverId });
    }
}

module.exports = UserRepository;