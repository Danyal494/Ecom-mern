const express = require("express");

const {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} = require("../../controllers/common-controller/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImage);

module.exports = router;