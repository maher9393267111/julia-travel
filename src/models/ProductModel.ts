import mongoose from "mongoose";
import Category from "./CategoryModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceWeek: {
      type: Number,
      required: true,
    },
    priceMonth: {
      type: Number,
      required: true,
    },

    
    location: {
      type: String,
      required: true,
    },

    whatsapp: {
      type: String,
      required: false,
    },

    telgram: {
      type: String,
      required: false,
    },


    // instagrm: {
    //   type: String,
    //   required:false,
    // },

    // facebook: {
    //   type: String,
    //   required:false,
    // },



    phone: {
      type: Number,
      required:false,
    },

    engine: {
      type: String,
      required:true,
    },


    year: {
      type: Number,
      required:true,
      default: 0,
    },





    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category.modelName,
      required: true,
    },
    // countInStock: {
    //   type: Number,
    //   required: false,
    // },
    // rating: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },






//     Features
// Seats
// Engine
// Type (Sedan, SUV, Sport, etc.)

  seats:Number ,
  // engine :String ,
   type :String,


  },





  
  {
    timestamps: true,
  }
);

// check if user model is already created
if (mongoose.models.products) {
  const productModel = mongoose.model("products");
  mongoose.deleteModel(productModel.modelName);
}

const Product = mongoose.model("products", productSchema);

export default Product;
