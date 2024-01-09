import React from "react";
import { Link } from "react-router-dom";
import randomBook from "../images/randomBook.jpg"

// show on particular book details
const BookCard = ({ book }) => {
  const authors = book.authors;
  const name = book.name;
  const publishedDate = book.publishedDate;
  const correctPublishedDate = publishedDate.replace("T00:00:00.000Z", "");
  const _id = book._id;
  const image = book.imageUrl;

  return (
    <Link to={`/books/${_id}`} className="w-full md:w-[220px]">
      <div className="bg-_gradient shadow w-full rounded-lg">
        {image ? (
          <img
            src={image}
            alt=""
            className="rounded-lg h-[200px] md:h-[150px] w-full"
          />
        ) : (
          <img
            src={randomBook}
            alt=""
            className="rounded-lg h-[200px] md:h-[150px] w-full"
          />
        )}

        <div className="p-3">
          <p className="text-white font-semibold">{name}</p>

          <div className="mt-2">
            {/* displaying all the authors name */}
            {authors?.map((author, index) => (
              <span
                className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500"
                key={index}
              >
                {author}
              </span>
            ))}
            {/* showing published date */}
            <span className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500">
              {correctPublishedDate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
