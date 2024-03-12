import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  
    images: {
        type: Array,
        required: true,
      },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


// check if user model is already created
if (mongoose.models.sliders) {
  const sliderModel = mongoose.model("sliders");
  mongoose.deleteModel(sliderModel.modelName);
}

const Slider= mongoose.model("visas",sliderSchema);

export default Slider