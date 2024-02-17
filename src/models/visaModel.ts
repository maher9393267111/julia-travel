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
    author: {
        type:String,
        required :true
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
if (mongoose.models.visas) {
  const visaModel = mongoose.model("visas");
  mongoose.deleteModel(visaModel.modelName);
}

const Visa= mongoose.model("visas",visaSchema);

export default Visa