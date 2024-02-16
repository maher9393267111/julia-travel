import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
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

      price: {
        type: Number,
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
if (mongoose.models.hotels) {
  const hotelModel = mongoose.model("hotels");
  mongoose.deleteModel(hotelModel.modelName);
}

const Hotel = mongoose.model("hotels",hotelSchema);

export default Hotel
