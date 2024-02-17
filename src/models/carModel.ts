import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
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
if (mongoose.models.cars) {
  const carModel = mongoose.model("cars");
  mongoose.deleteModel(carModel.modelName);
}

const Car= mongoose.model("cars",carSchema);

export default Car