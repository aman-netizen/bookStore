import mongoose from "mongoose";


// model for storing reviews and ratings with username
const reviewRatingSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  review: {
    type: String,
  },
  rating: { type: Number, default: 0 },
});


// model for storing book informations
const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    authors: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      require: true,
    },
    publishedDate: {
      type: Date,
      require: true,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    reviews: [reviewRatingSchema],
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("book", bookSchema);

export default Book;
