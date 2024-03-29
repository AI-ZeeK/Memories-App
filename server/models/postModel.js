import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
