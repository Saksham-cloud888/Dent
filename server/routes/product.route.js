import express from "express";
import { ProductSchema } from "../models/product.model.js";

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  //saving the data to mongodb
  new ProductSchema(req.body)
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
  ProductSchema.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //  res.send('response from user getall');
});

//getting data by title
router.get("/getbytitle/:title", (req, res) => {
  ProductSchema.find({ title: req.params.title })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//updating data by id
router.put("/update/:id", (req, res) => {
  ProductSchema.findByIdAndUpdate(req.params.id, req.body, {})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

export default router;
