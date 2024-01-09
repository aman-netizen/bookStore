import express from "express";
import {
  getbooksdata,
  getbookdetails,
  reviewRating,
} from "../controllers/bookController.js";
const router = express.Router();

// routes related to books

router.get("/getbooks", getbooksdata); // fetch all the books also if not present in db fetch from api
router.get("/:id", getbookdetails); // get particular book details
router.post("/:bookId/reviews", reviewRating); // post reviews and ratings

export default router;
