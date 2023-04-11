const messageModel = require("../models/messageModel");
const bcrypt = require("bcrypt");

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "Message added sucessfully" });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    console.log(projectedMessages);
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
