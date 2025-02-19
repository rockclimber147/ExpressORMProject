const express = require("express");
const { userInvitationRepository } = require("../config/db");

const router = express.Router();

router.get("/invitations/:userId", async (req, res) => {
    const { userId } = req.params;
  
    const invitations = await Invitation.findAll({
      where: { receiverId: userId, status: "pending" },
    });
  
    res.json(invitations);
  });

  module.exports = router;