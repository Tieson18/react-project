const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { response } = require("../utils/helper");
const authRoute = require("./auth.routes");
router.use("/auth", authRoute);

const categoryRoute = require("./category.routes");
router.use("/category", categoryRoute);

const productRoute = require("./product.routes");
router.use("/product", productRoute);

// import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

router.post("/upload", async (req, res) => {
  try {
    if (!req.body.image) throw new CustomError("Image must be specified");
    if (!req.body.name) throw new CustomError("name must be specified");
    const data = await cloudinary.uploader.upload(req.body.image, {
      public_id: req.body.name,
    });

    res.status(200).send(response("Uploaded image", data));
  } catch (e) {
    console.log("ERROR: ", e.message);
    res.status(500).send(response("Failed to upload image", null, false));
  }
});

module.exports = router;
