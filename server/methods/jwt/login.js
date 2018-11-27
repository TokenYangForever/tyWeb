const jwt = require("jsonwebtoken");

module.exports = ({body: {username: requsername, password: reqpassword}}, res) => {
  const users = [
    {id: 1, username: "clarkKent", password: "superman"},
    {id: 2, username: "bruceWayne", password: "batman"}
  ];
  if (!requsername || !reqpassword) {
    res.status(400).send("Error. Please enter the correct username and password")
    return
  }
  const user = users.find(({username, password}) => {
    return requsername === username && reqpassword === password
  })
  if (user) {
    const token = jwt.sign({
      sub: user.id,
      username: user.username
    }, "mykey", {expiresIn: "3 hours"});
    res.status(200).send({access_token: token})
  } else {
    res.status(401).send("Error. Invalid username or password")
  }
}