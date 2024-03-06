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
      required: false,
    },


    discount: {
      type: Number,
      required: false,
      default:0

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

    // price: {
    //   type: Number,
    //   required: true,
    // },


    iscar: {
      type: Boolean,
      required: true,
      default: false,
    },

    carprice: {
      type: Number,
      required: true,
      default: false,
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
      default: 0,
    },

    isbus: {
      type: Boolean,
      required: true,
      default: 0,
    },

    busprice: {
      type: Number,
      required: true,
      default: 0,
    },

    carcapacity: {
      type: Number,
      required: true,
      default: 0,
    },

    buscapacity: {
      type: Number,
      required: true,
      default: 0,
    },

   minibuscapacity: {
      type: Number,
      required: true,
      default: 0,
    },


    vitocapacity: {
      type: Number,
      required: true,
      default: 0,
    },


    package: {
      type: Number,
      required: true,
      default: 0,
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
