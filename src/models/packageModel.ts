import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
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


    location: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    adult: {
      type: Number,
      required: false,
    },
    child: {
      type: Number,
      required: false,
    },



    features: {
      type: [String],
      default: [],
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
    },
    days: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: false,
      default:0

    },




    pdf: {
      id: {
        type: String,
        default: ""
      },
     
    url: {
        type: String,
        default: ""
      }
    },




  },
  {
    timestamps: true,
  }
);

// check if user model is already created
if (mongoose.models.packages) {
  const packageModel = mongoose.model("packages");
  mongoose.deleteModel(packageModel.modelName);
}

const Package = mongoose.model("packages", packageSchema);

export default Package;
