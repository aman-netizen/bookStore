import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import Loading from "./Loading";
import Searchbar from "./Searchbar";
import BookCard from "./BookCard";
import Button from "./Button";

const Books = (props) => {
  // book  data changes base on search
  const [books, setBooks] = useState([]);
  // complete book data(original data)
  const [allBooks, setAllBooks] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);

  // handle change in search bar as we as do seaching based on book name and author name
  const handleChange = (e) => {
    setQuery(e.target.value);
    e.preventDefault();
    const filteredBooks = allBooks.filter((book) => {
      const lowerCaseQuery = query?.toLowerCase();
      return (
        book?.name?.toLowerCase().includes(lowerCaseQuery) ||
        book?.authors?.some((author) =>
          author?.toLowerCase().includes(lowerCaseQuery)
        )
      );
    });
    setBooks(filteredBooks);
  };

  // Getting all the books data present on our database
  const fetchBook = async () => {
    try {
      const book_data = await axios.get(
        "https://bookstore-backend-zbwq.onrender.com/api/book/getbooks"
      );
      await setBooks(book_data.data.booksData);
      await setAllBooks(book_data.data.booksData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handling searching if someone clicked on search option
  const handleSearchedBooks = async (e) => {
    e.preventDefault();
    const filteredBooks = allBooks.filter((book) => {
      const lowerCaseQuery = query?.toLowerCase();
      return (
        book?.name?.toLowerCase().includes(lowerCaseQuery) ||
        book?.authors?.some((author) =>
          author?.toLowerCase().includes(lowerCaseQuery)
        )
      );
    });
    setBooks(filteredBooks);
  };
  

  useEffect(() => {
    setLoading(true);
    fetchBook();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-80" onSubmit={handleSearchedBooks}>
          <Searchbar
            placeholder="eg. Book Name, Author"
            handleInputChange={handleChange}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-600"
                onClick={handleSearchedBooks}
              />
            }
          />
        </form>
      </div>

      {/* displaying all the books */}
      {books?.length > 0 ? (
        <>
          <div className="w-full  flex flex-wrap gap-10 px-0 lg:px-10 py-10">
            {books?.map((singlebook, index) => (
              <BookCard book={singlebook} key={index} />
            ))}
          </div>

          <div className="flex w-full items-center justify-center py-10">
            <Button
              title="Show More"
              containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
            />
          </div>
        </>
      ) : (
        <div className="text-white w-full items-center justify-center py-10">
          <p className="text-center">No Books Found</p>
        </div>
      )}
    </div>
  );
};

export default Books;
