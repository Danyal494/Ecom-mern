const mongoose = require('mongoose')


const FeatureImageSchema = new mongoose.Schema({
    image: String,
  }, { timestamps: true });
  

module.exports = mongoose.model("Feature",FeatureImageSchema)