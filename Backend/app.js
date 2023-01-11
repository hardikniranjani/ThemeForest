const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const CategoryController = require("./controller/Category.controller");
const UserController = require("./controller/User.controller");
const BrowserController = require("./controller/Item/BrowserController");
const PlugInController = require("./controller/Item/CompatablePlugin");
const TagController = require("./controller/Item/TagsController");
const FilesController = require("./controller/Item/IncludesFiles");
const SoftwarVersionController = require("./controller/Item/SoftwareVersionController");
const ItemVersionController = require("./controller/Item/ItemVersionController");
const ItemDetailsController = require("./controller/Item/ItemDetails.Controller");
// const MongoDBpath = "mongodb://localhost/demo_store";
const AuthorController = require("./controller/Author/Author.controller");
const AdminController = require("./controller/AdminController");

mongoose
  .connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials : true,
    exposedHeaders: "x-access-token",
  })
);

app.use("/categories", CategoryController);
app.use("/user", UserController);
app.use("/browser", BrowserController);
app.use("/plugin", PlugInController);
app.use("/tag", TagController);
app.use("/file", FilesController);
app.use("/softwareversion", SoftwarVersionController);
app.use("/itemver", ItemVersionController);
app.use("/itemdetails", ItemDetailsController);


// Author
app.use("/author", AuthorController);

// Admin
app.use("/admin", AdminController);


// Images 
app.use("/tmp", express.static("tmp"));
app.use("/uploads", express.static("uploads"));

app.use("/", (req, res) => {
  res.status(200).send("Home Page!");
});
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
