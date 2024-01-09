import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { setUser } from "../redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  
  // fetching user detail is any token is present in application
  const getUser = async () => {
    try {
      setLoading(true);
      const userDetail = await axios.get(
        "http://localhost:8080/api/user/getUser",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"), // getting user token from localstorage
          },
        }
      );
      await dispatch(setUser(userDetail.data.data)); // updating username
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")!==null && user===null) getUser(); // call only when token is present of user is null
  }, []);

  // showing loading till data not completely fetched to show
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="w-full flex flex-col">
      <Navbar />
      <Header
        title={
          <p>
            Read the world with
            <br /> BookStore!
          </p>
        }
        type="home"
      />
      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
        <Books />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
