import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { AiFillPushpin } from "react-icons/ai";
import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useSelector } from "react-redux";

// showing complete info about one paticular book
const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { user } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    username: user,
    review: "",
    rating: "",
  });
  const { id } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  // handling submit form for review and ratings
  const onSubmit = async (e) => {
    try {
      if (!details.review || !details.rating) {
        toast.error("Enter all feilds");
      } else {;
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8080/api/book/${id}/reviews`,
          details
        );
        setBook(response.data);
        toast.success("Review and Rating submitted successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("something went wrong please try again");
    }
  };

  // get one book complete details using id
  const getBook = async (id) => {
    try {
      setLoading(true);
      const singleBook = await axios.get(
        `http://localhost:8080/api/book/${id}`
      );
      const singleBookdata = singleBook.data;
      setBook(singleBookdata);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong in fetching book data please try again");
      setLoading(false);
    }
  };

  // runs only for id change
  useEffect(() => {
    getBook(id);
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full">
      <Navbar />
      <Header title={book?.name} image={book?.imageUrl} />
      <div className="w-full px-4 lg:px-20 pt-5">
        <div className="flex gap-10 items-center justify-center px-4">
          <div className="flex flex-col justify-between">
            <span className="text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2">
              {book?.publishedDate.replace("T00:00:00.000Z", "")}{" "}
            </span>

            <p className="text-neutral-100 text-[12px] md:text-md">
              Published Date
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {book?.totalRatings.toFixed(2)}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">
              Total Ratings
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-white text-center border border-gray-500 py-1.5 rounded-full mb-2">
              {book?.reviews?.length}
            </span>
            <p className="text-neutral-100 text-[12px] md:text-md">
              Total Reviews
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-green-500 text-2xl underline">Authors</p>

          {book?.authors?.map((author, index) => {
            return (
              <p key={index} className="text-neutral-100 flex gap-2">
                <AiFillPushpin className="text-green-800 text-xl" /> {author}
              </p>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-20">
          <p className="text-green-700 text-2xl underline">About</p>
          <div className="flex flex-wrap gap-4">
            <p className="text-white flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg ">
              {book?.description}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10">
          {/* LEFT SIDE */}
          <div className="w-full md:w-2/4 md:border-r border-slate-800 pr-1">
            <div className="flex flex-col gap-5">
              <p className="text-green-500 text-2xl underline">
                Reviews and Ratings
              </p>
              <div className="flex flex-col gap-2 rounded-full ">
                {book?.reviews?.map((review, index) => (
                  <ReviewCard review={review} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0">
            <div className="flex flex-col gap-5">
              <p className="text-green-500 text-2xl underline">
                Give Review and Rating
              </p>
              <div className="flex flex-col gap-2 rounded-full">
                {user ? (
                  <div className="flex flex-col justify-center">
                    <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
                      <div className="flex flex-col text-gray-400 py-2">
                        <label>Review</label>
                        <input
                          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                          type="text"
                          name="review"
                          id="review"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col text-gray-400 py-2">
                        <label>Rating (out of 5)</label>
                        <input
                          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                          type="Number"
                          name="rating"
                          id="rating"
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        className="w-full my-5 py-2 bg-green-500 shadow-lg hover:shadow-green-500/40 text-white font-semibold rounded-lg"
                        type="button"
                        onClick={onSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="text-white">
                      Please login to give review and rating
                    </div>
                    <div className="flex">
                      <Link to="/login">
                        <Button
                          title="Sign in"
                          containerStyle="md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px] m-4"
                        />
                      </Link>
                      <Link to="/register">
                        <Button
                          title="Sign up"
                          containerStyle="md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px] m-4"
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
