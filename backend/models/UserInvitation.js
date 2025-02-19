const { DataTypes } = require("sequelize");

const UserInviteStatusEnum = {
  PENDING : "pending", 
  ACCEPTED : "accepted", 
  DECLINED : "declined"
}

module.exports = (sequelize, User) => {
    const UserInvitation = sequelize.define("Invitation", {
      senderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
      receiverId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [[UserInviteStatusEnum.PENDING, UserInviteStatusEnum.ACCEPTED, UserInviteStatusEnum.DECLINED]],
        },
        defaultValue: UserInviteStatusEnum.PENDING,
      }
    });
  
    return UserInvitation, UserInviteStatusEnum;
  };