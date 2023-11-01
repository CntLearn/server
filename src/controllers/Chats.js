const { chats, users } = require("../services");

const { ObjectId } = require("mongodb");

const createChat = (req, res) => {
  const { userId = "", chat = null } = req.body;

  chats
    .createChat(userId, chat)
    .then((response) => {
      res.status(200).json({ success: true, response });
    })
    .catch((error) => {
      res.status(500).json({ success: false, reason: error.message, error });
    });
};

const fetchChatAndGroups = async (req, res) => {
  const userId = req.decoded;

  chats
    .fetchChatAndGroups(userId)
    .then(async (response) => {
      const promisesChatList = response.map(async (chat) => {
        // handle group object.
        if (chat.isGroup) {
          const promises = chat.participants.map((userId) =>
            users.getUserById(userId)
          );
          const participantsList = await Promise.all(promises);
          // console.log("parts : ", participantsList);
          const adminsPromises =
            chat.admins.length > 0 &&
            chat.admins.map((admin) => users.getUserById(admin));

          const adminList = await Promise.all(
            adminsPromises.length > 0 ? adminsPromises : []
          );

          // console.log("admins : ", adminList);

          const banPromises =
            chat.bans.length > 0 &&
            chat.bans.map((ban) => users.getUserById(ban));

          const banList = await Promise.all(
            banPromises.length > 0 ? banPromises : []
          );

          // console.log("banList : ", banList);
          console.log("before return of group");
          return {
            ...chat,
            participants: participantsList,
            admins: adminList,
            bans: banList,
            check: participantsList,
          };
        } // handle chat object.
        else {
          const chatListUsers = chat.name.split("-");
          const otherUserId =
            userId === chatListUsers[0] ? chatListUsers[1] : chatListUsers[0];

          const objectId = new ObjectId(otherUserId);

          // console.log(objectId);

          const userDetail = await users.getUserById(objectId);
          console.log("userDetail");
          const chatObject = {
            ...userDetail,
            ...chat,
          };
          console.log("console.log('before return of chatGroup");
          return chatObject;
        }
      });

      // const chatList = await Promise.all(promisesChatList);
      console.log("after promises chatList");
      res.status(200).json({ success: true, response, promisesChatList });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, reason: error.message, error });
    });
};

const fetchAllChats = (req, res) => {
  const userId = req.decoded;
  console.log(userId, "userId");
};

const fetchAllGroups = (req, res) => {
  const userId = req.decoded;
  console.log("req type : ", req.params.type);
  console.log(userId, "userId");
};

const fetchInteraction = (req, res) => {
  const { type = null, userId = null } = req.params;

  if (type === null || userId === null) {
    return res
      .status(400)
      .json({ success: false, message: "UserId/Type is null" });
  }
  // handle chats.
  if (type.toLowerCase() === "chat") {
    chats
      .fetchAllChats(userId)
      .then(async (chatsResponse) => {
        if (chatsResponse.length > 0) {
          // no need of doing all this, use populate of mongo
          /*
          const promisesChatList =
            chatsResponse.length < 0 &&
            chatsResponse.map(async (chat) => {
              const chatListUsers = chat.name.split("-");
              const [user1, user2] = chatListUsers;
              const otherUserId = userId === user1 ? user2 : user1;
              const id = new ObjectId(otherUserId);

              try {
                const userDetail = await users.getUserById(id);
                const chatObject = {
                  userDetail,
                  chat,
                };
                return chatObject;
              } catch (error) {
                console.error(`Error fetching user details: ${error}`);
                // throw new Error("Failed to retrieve user details.");
              }
            });

          const usersList = await Promise.all(promisesChatList);
          */
          res.status(200).json({ success: true, response: chatsResponse });
        } else
          res.status(200).json({
            success: true,
            response: chatsResponse,
            message: "No any Users List.",
          });
      })
      .catch((error) => {
        res.status(500).json({ success: false, reason: error.message, error });
      });
  } else {
    // handle groups
    chats
      .fetchAllGroups(userId)
      .then(async (groupsResponse) => {
        if (groupsResponse.length > 0) {
          // const promisesGroupList = groupsResponse.map(async (group) => {});
          // const groupsList = await Promise.all(promisesGroupList);
          res.status(200).json({ success: true, response: groupsResponse });
        } else {
          res.status(200).json({
            status: true,
            message: "No any Groups List.",
            response: groupsResponse,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ status: false, reason: error.message, error });
      });
  }
};

const sendMessage = (req, res) => {
  const { chatId = null } = req.params;
  const { message } = req.body;

  if (!chatId || !message) {
    return res
      .status(400)
      .json({ status: false, message: "ChatId/Message Body is Null" });
  }

  chats
    .sendMessage(chatId, message)
    .then((messageResponse) => {
      res.status(200).json({ status: true, response: messageResponse });
    })
    .catch((err) => {
      res.status(500).json({ status: false, reason: err.message, error: err });
    });
};

const deleteMessage = (req, res) => {
  const { chatId = null } = req.params;
  let { messageId, senderId } = req.body;

  if (!chatId || !messageId || !senderId) {
    return res
      .status(400)
      .json({ status: false, message: "ChatId/MessageId/UserId is Null" });
  }

  messageId = new ObjectId(messageId);
  senderId = new ObjectId(senderId);

  chats
    .deleteMessage(chatId, messageId, senderId)
    .then((messageResponse) => {
      console.log(messageResponse);
      res.status(200).json({ status: true, response: messageResponse });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: false, reason: err.message, error: err });
    });
};

module.exports = {
  createChat,
  fetchChatAndGroups,
  fetchAllChats,
  fetchAllGroups,
  fetchInteraction,
  sendMessage,
  deleteMessage,
};
