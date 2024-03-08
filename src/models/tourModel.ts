import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // location: {
    //   type: String,
    //   required: true,
    // },


    type: {
      type: String,
      required: true,
    },


  city : {
    type: String,
    required: true,

  }

,
  country : {
    type: String,
    required: true,

  }

  ,

    days: {
      type: Number,
      required: true,
    }

    ,
    discount: {
      type: Number,
      required: true,
      default:0
    },

    map: {
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
if (mongoose.models.tours) {
  const tourModel = mongoose.model("tours");
  mongoose.deleteModel(tourModel.modelName);
}

const Tour= mongoose.model("tours",tourSchema);

export default Tour