import express from "express";
import { UserSchema } from "../models/user.model.js";

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  //saving the data to mongodb
  new UserSchema(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//getall
router.get("/getall", (req, res) => {
  UserSchema.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // res.send('response from product getall');
});

router.post("/authenicate", (req, res) => {
  UserSchema.findOne(req.body)
    .then((result) => {
      if (result !== null) res.json(result);
      else res.status(401).json({ message: "login failed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

export default router;
