const { Chats } = require("../models");
// no need to find and then create and update, because on first the group or chat will be created,
// on second message will be inserted in to chat or group.

const createChat1 = async (chat, userId) => {
  return Chats.findOne({ userId }).then((user) => {
    if (!user) {
      return Chats.create({
        userId: userId,
        ...chat,
      });
    } else {
      return Chats.findOneAndUpdate(
        { userId: userId },
        {
          $push: { userIDs: interactedId },
        },
        { new: true }
      );
    }
  });
};

const createChat = async (userId, chat) => {
  return Chats.create({
    userId,
    ...chat,
  });
};

const fetchChatAndGroups = async (userId) => {
  return Chats.find({
    // $or:
    // {
    //   { $and: {userId: userId, isGroup:false}},
    //   { $and: {isGroup:true, participantId:"includes(userId)"}}
    // }
  });
};

const fetchAllChats = async (userId) => {
  return Chats.find({ userId, isGroup: false }).populate("participants");
  // .populate("admins")
  // .populate("bans");
};

const fetchAllGroups = async (userId) => {
  // participants: { $in: [userId] }
  // i think no need to pass this, bcz against userId already getting groups/ chats
  // that are related to this user.
  return Chats.find({ userId, isGroup: true })
    .populate("participants")
    .populate("admins")
    .populate("bans");
};

const sendMessage = (chatId, message) => {
  const update = {
    lastMessage: message.text,
    $push: { messages: message },
  };
  return Chats.findOneAndUpdate({ _id: chatId }, update, { new: true });
};

// it will be soft deleted as am making an array of users who has deleted the message.
const deleteMessage = (chatId, messageId, userId) => {
  const update = {
    // lastMessage: message.text,
    $push: { deletedBy: userId },
    // $pull: { messages: { _id: messageId } },
  };
  // 64593c1dd02efb4f5758393d
  return Chats.updateOne(
    { _id: chatId, "messages._id": messageId },
    { $push: { "messages.$.deletedBy": userId } }
    // { _id: chatId, "messages.id": messageId },
    // { $push: { deletedBy: userId } }
    // { $push: { messages: { _id: messageId, deletedBy: userId } } },
    // { new: false }
  );
};

/*  LOGIC  */

// fetch all chats and groups of a user,
// first getting all chats by where userId is userId and participants.length==2
// fetch all groups of a user and in which he is added, where isGroup is true and participants.in is has userId

// another logic is
// fetch all chats and groups separately., make a tab on ui chats, groups. like gb whatspp.

module.exports = {
  createChat,
  fetchChatAndGroups,
  fetchAllChats,
  fetchAllGroups,
  sendMessage,
  deleteMessage,
};
