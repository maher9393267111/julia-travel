import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },

    images: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    from: {
      type: String,
      required: false,
    },

    to: {
      type: String,
      required: false,
    },

    // location: {
    //   type: String,
    //   required: true,
    // },

    price: {
      type: Number,
      required: false,
    },
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

const Flight = mongoose.model("flights", flightSchema);

export default Flight;
