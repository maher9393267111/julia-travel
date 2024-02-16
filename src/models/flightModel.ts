import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
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
    price: {
        type: Number,
        required: true,
      }
  },
  {
    timestamps: true,
  }
);


// check if user model is already created
if (mongoose.models.flights) {
  const flightModel = mongoose.model("flights");
  mongoose.deleteModel(flightModel.modelName);
}

const Flight= mongoose.model("flights",flightSchema);

export default Flight