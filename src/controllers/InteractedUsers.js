const { interactedUsers, users } = require("../services");

const addUser = async (req, res) => {
  const { body } = req;
  try {
    const usr = await interactedUsers.addUser(body.userId, body.interactedId);
    res.status(200).json({ status: true, user: usr });
  } catch (error) {
    console.log("user err : ", error);
    res.status(500).json({ status: false, error: error });
  }
};

const getInteractedUsers = async (req, res) => {
  const { userId } = req.params;

  interactedUsers
    .getInteractedUsers(userId)
    .then((interactionUsers) => {
      console.log("interactionUsers : ", interactionUsers);
      if (interactionUsers.length <= 0)
        return res.status(200).json({
          status: true,
          message: "No any interacted users find.",
          users: interactionUsers,
        });
      if (interactionUsers[0]?.userIDs.length <= 0) {
        res.status(200).json({
          status: true,
          message: "No any interacted users find",
          users: interactionUsers[0],
        });
      } else {
        fetchUser(interactionUsers[0]?.userIDs).then((usersList) => {
          res.status(200).json({ status: true, users: usersList });
        });
      }
    })
    .catch((error) => {
      console.log("user getting err : ", error);
      res.status(500).json({
        status: false,
        reason: error.message,
        error: error,
      });
    });
};

async function fetchUser(userIDs) {
  // for (let userId of userIDs) {
  //   const user = await users.getUserById(userId);
  //   usersList.push(user);
  // }

  /*
    The current implementation of fetchUser() makes one request at a time, waiting for each request to
  complete before making the next one. This can be inefficient if the requests are independent and can be executed in parallel.

  You can use Promise.all() to execute all requests in parallel, which can improve the performance.
   Here's an example of how you can modify fetchUser() to use Promise.all():
*/

  const promises = userIDs.map((userId) => users.getUserById(userId));
  const usersList = await Promise.all(promises);
  return usersList;
}

module.exports = {
  addUser,
  getInteractedUsers,
};
