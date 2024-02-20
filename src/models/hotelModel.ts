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
    location: {
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


    roomtype: {
      type: String,
      required: false,

    },

    wifi: {
      type: Boolean,
      required: true,
      default: true,
    },

    airCondition: {
      type: Boolean,
      required: true,
      default: true,
    },



    safe: {
      type: Boolean,
      required: true,
      default: true,
    },


    laundary: {
      type: Boolean,
      required: true,
      default: true,
    },

    heater: {
      type: Boolean,
      required: true,
      default: true,
    },

    tv: {
      type: Boolean,
      required: true,
      default: true,
    },

    phone: {
      type: Boolean,
      required: true,
      default: true,
    },

    towels: {
      type: Boolean,
      required: true,
      default: true,
    },

    drayer: {
      type: Boolean,
      required: true,
      default: true,
    },

    park: {
      type: Boolean,
      required: true,
      default: true,
    },

    sauna: {
      type: Boolean,
      required: true,
      default: true,
    },

    breakfast: {
      type: Boolean,
      required: true,
      default: true,
    },

    airportTransfer: {
      type: Boolean,
      required: true,
      default: true,
    },

    pets: {
      type: Boolean,
      required: true,
      default: false,
    },

    beds: {
      type: Number,
      required: false,
      default:1

    },

    adults: {
      type: Number,
      required: false,
      default:1

    },

    childrens: {
      type: Number,
      required: false,
      default:1

    },

    resturant: {
      type:Boolean,
      required: true,
      default:true
    },

   locker: {
      type:Boolean,
      required: true,
      default:true
    },



    stars: {
      type: Number,
      required: true,
      default: 5,
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

const Hotel = mongoose.model("hotels", hotelSchema);

export default Hotel;
