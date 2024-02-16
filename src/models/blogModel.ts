import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);


// check if user model is already created
if (mongoose.models.blogs) {
  const blogModel = mongoose.model("blogs");
  mongoose.deleteModel(blogModel.modelName);
}

const Blog = mongoose.model("blogs",blogSchema);

export default Blog;

