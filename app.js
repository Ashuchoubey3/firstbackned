// const express = require("express");
// const app = express();
// const userModle = require("./usermodel");

// app.get("/", (req, res) => {
//   res.send("hey");
// });

// app.get("/create", async (req, res) => {
//   let createduser = await userModle.create({
//     name: "Ashu",
//     username: "Ashuchoubey",
//     email: "ashutosh.using.email@gmail.com ",
//   });
//   res.send(createduser);
// });

// app.get("/update", async (req, res) => {
//   let updateduser = await userModle.findOneAndUpdate(
//     { username: "Ashuchoubey" },
//     { name: "Ashutosh choubey" },
//     { new: true }
//   );
//   res.send(updateduser);
// });

// app.get("/read", async (req, res) => {
//   let user = await userModle.find();
//   res.send(user);
// });

// app.get("/delete", async (req, res) => {
//   let deleteuser = await userModle.findOneAndDelete({
//     username: "Ashuchoubey",
//   });
//   res.send(deleteuser);
// });

// app.listen(3000);
const express = require("express");
const app = express();
const path = require("path");
const userModle = require("./models/user");
const { name } = require("ejs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModle.find(); //read
  res.render("read", { users });
});

app.get("/edit/:userid", async (req, res) => {
  const user = await userModle.findOne({ _id: req.params.userid });
  res.render("edit", { user }); //edit
});

app.post("/update/:id", async (req, res) => {
  let { name, image, email } = req.body;
  let users = await userModle.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true }
  ); //update
  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModle.findOneAndDelete({ _id: req.params.id }); //delete
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createduser = await userModle.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.listen(3000);
