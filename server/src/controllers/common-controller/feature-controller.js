const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const newFeatureImage = new Feature({
      image,
    });

    await newFeatureImage.save();

    res.status(201).json({
      success: true,
      data: newFeatureImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: deletedImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImages,deleteFeatureImage };