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
    location: {
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
if (mongoose.models.packages) {
  const packageModel = mongoose.model("packages");
  mongoose.deleteModel(packageModel.modelName);
}

const Package= mongoose.model("packages",packageSchema);

export default Package