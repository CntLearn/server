app.post("/addUser", async (req, res) => {
  console.log("body : ", req.body);
  const user = new User(req.body);

  try {
    const usr = await user.save();

    res.send({ user, usr });
  } catch (error) {
    console.log("user err : ", error);
    res.status(500).send(error);
  }
});

app.get("/", (req, res) => {
  console.log("working with get request.");
  res.send("working....");
});

// logics,
// create chat, when a user clicks on invite button chat will be created
// make group... /// in this case userId can be is null.
