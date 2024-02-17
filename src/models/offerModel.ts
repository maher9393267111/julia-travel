import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
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


    location: {
      type: String,
      required: true,
    },


    type: {
      type: String,
      required: true,
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
if (mongoose.models.offers) {
  const offerModel = mongoose.model("offers");
  mongoose.deleteModel(offerModel.modelName);
}

const Offer= mongoose.model("offers",offerSchema);

export default Offer