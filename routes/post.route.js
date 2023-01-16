const express = require("express");
const PostModel = require("../model/post.model");

let postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const { device } = req.query;
  let notes;
  try {
    notes = await PostModel.find();
    if (device) {
      notes = await PostModel.find({
        device: { $regex: "^" + device, $options: "i" },
      });
    }
    res.send(notes);
  } catch (error) {
    console.log("error: ", error.massege);
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const newPost = await PostModel.create(payload);
    res.send("new post created successfully");
  } catch (error) {
    console.log("error: ", error.massege);
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findOne({ _id: id });
  const post_userID = post.userID;
  const updater_userID = req.body.userID; 
  try {
    if (post_userID === updater_userID) {
      await PostModel.findByIdAndUpdate(id, req.body);
      res.send("post updated successfully");
    } else {
        
      res.send({ message: "you not authorized to make changes" });
    }
  } catch (error) {
    console.log("error:", error.message);
  }
});

// postRouter.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await PostModel.findOne({ _id: id });
//   const userID_POST = post.userID;
//   const userID_REQ_POST = req.body.userID;
//   try {
//     if (userID_POST === userID_REQ_POST) {
//       await PostModel.findByIdAndDelete(id);
//       res.send({ message: "Post deleted Successfully" });
//     } else {
//       res.send({ message: "You Are Not Allowed To Make This Request" });
//     }
//   } catch (error) {
//     console.log(error); 
//   }
// });
postRouter.delete("/delete/:id", async (req, res) => {
    let { userID } = req.body;
    let ID = req.params.id;
    let post = await PostModel.findOne({ _id: ID });
  
    try {
      if (userID === post.userID) {
        await PostModel.findByIdAndDelete({ _id: ID });
        res.send("Deleted The Post");
      } else {
        res.send({ msg: "You Are Not Authorized" });
      }
    } catch (error) { 
      console.log(error); 
    }
  });

module.exports = postRouter;

// {
//     "title": "mypost",
//     "body": "this is my first post",
//     "device": "pc"
//   }
