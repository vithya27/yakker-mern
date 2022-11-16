const Messages = require("../models/Messages");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Messages({ chatId, senderId, text });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await Messages.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addMessage,
  getMessages,
};
