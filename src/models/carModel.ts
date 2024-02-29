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

    isAvaliable: {
      type: Boolean,
      default: true,
    },


    price: {
      type: Number,
      required: true,
    },

    
    discount: {
      type: Number,
      required: false,
      default:0
    },

    type: {
      type: String,
      required: true,
    },

    

    vites: {
      type: String,
      required: true,
    },

    kilometrage: {
      type: Number,
      required: true,
    },

    Fueltype: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },

    weekprice: {
      type: Number,
      required: true,
    },

    monthprice: {
      type: Number,
      required: true,
    },

    depoprice: {
      type: Number,
      required: true,
      default:0
    },


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

const Car = mongoose.model("cars", carSchema);

export default Car;
