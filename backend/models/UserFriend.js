const { DataTypes } = require("sequelize");

module.exports = (sequelize, User) => {
    const UserFriend = sequelize.define("UserFriend", {
        senderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
        receiverId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
        requestSent: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        timestamps: false,
        primaryKey: ["senderId", "receiverId"] // Composite primary key
    });

    User.belongsToMany(User, { as: "Friends", through: UserFriend, foreignKey: "senderId", otherKey: "receiverId" });

    return UserFriend;
};