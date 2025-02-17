const { DataTypes } = require("sequelize");
const UserFriend = require("./UserFriend");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        password: { type: DataTypes.TEXT, allowNull: false },
        createdAt: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    });

    User.prototype.getFriends = async function () {
        const sentFriendships = await UserFriend.findAll({
            where: { senderId: this.id },
            include: [{ model: User, as: "Receiver", attributes: ["id", "username", "email"] }]
        });

        const receivedFriendships = await UserFriend.findAll({
            where: { receiverId: this.id },
            include: [{ model: User, as: "Sender", attributes: ["id", "username", "email"] }]
        });

        return [
            ...sentFriendships.map(f => f.Receiver),
            ...receivedFriendships.map(f => f.Sender)
        ];
    };

    return User;
};