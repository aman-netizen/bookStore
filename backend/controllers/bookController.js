import axios from "axios";
import Book from "../models/bookModel.js";

// function for converting the data coming from api to our models format

const apitomodel = (apiData) => {
  return {
    name: apiData.volumeInfo.title,
    authors: apiData.volumeInfo.authors,
    description: apiData.volumeInfo.description,
    publishedDate: new Date(apiData.volumeInfo.publishedDate),
    imageUrl: apiData.volumeInfo?.imageLinks?.thumbnail,
  };
};

// controller for fetching data from api one time
export const getbooksdata = async (req, res) => {
  try {
    const existingBooks = await Book.find();
    // checking if data already present no need to fetch from api else do fetch
    if (existingBooks.length === 0) {
      const apiResponse = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=reactnode&maxResults=40&key=${process.env.API_key}`
      );
      const apiData = apiResponse.data;

      const transformedbooks = apiData.items.map(apitomodel);

      await Book.insertMany(transformedbooks);
        res.status(200).json({
          booksData: transformedbooks,
          message: "Data loaded successfully",
          success: true,
        });
    } else {
        res.status(200).json({
            booksData: existingBooks,
          message: "Data already exists",
            success: true,
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// controller for getting all the data related to a particular book using book id
export const getbookdetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"Internal Server Error",
      error
    });
  }
};

// controller for storing review and rating coming from frontend
export const reviewRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { review, rating, username } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.reviews.push({ username, review, rating });
    
    //calculating total rating (averaging of all the ratings available)
    const totalRating = book.reviews.reduce((sum, review) => sum + review.rating,0);
    book.totalRatings = totalRating / book.reviews.length;
    
    // saving the book data
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
