import mongoose from "mongoose";

const transSchema = new mongoose.Schema(
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
if (mongoose.models.transes) {
  const transModel = mongoose.model("transes");
  mongoose.deleteModel(transModel.modelName);
}

const Trans= mongoose.model("transes",transSchema);

export default Trans