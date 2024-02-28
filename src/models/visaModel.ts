import mongoose from "mongoose";

const visaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    extratype: {
      type: String,
      required: true,
    },


    maketime: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      default: [],
    },


    discount: {
      type: Number,
      required: false,
      default:0
    },


    
    nationality: {
      type: String,
      required: true,
    },

    


    country: {
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
    },
  },
  {
    timestamps: true,
  }
);

// check if user model is already created
if (mongoose.models.visas) {
  const visaModel = mongoose.model("visas");
  mongoose.deleteModel(visaModel.modelName);
}

const Visa = mongoose.model("visas", visaSchema);

export default Visa;
