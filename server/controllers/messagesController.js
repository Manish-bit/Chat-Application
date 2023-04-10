const messageModel = require("../models/messageModel");

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
module.exports.getAllMsg = async (req, res, next) => {};
