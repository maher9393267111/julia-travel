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

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    person: {
      type: Number,
      required: true,
    },
    // cartype: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // bustype: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // boattype: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },

    price: {
      type: Number,
      required: true,
    },

    isvito: {
      type: Boolean,
      required: true,
      default: false,
    },
    vitoprice: {
      type: Number,
      required: true,
      default: false,
    },

    isminibus: {
      type: Boolean,
      required: true,
      default: false,
    },
    minibusprice: {
      type: Number,
      required: true,
      default: false,
    },

    isbus: {
      type: Boolean,
      required: true,
      default: false,
    },

    busprice: {
      type: Number,
      required: true,
      default: false,
    },

    fueltype: {
      type: String,
      required: true,
    },
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

const Trans = mongoose.model("transes", transSchema);

export default Trans;
