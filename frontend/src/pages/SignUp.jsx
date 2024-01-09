import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp=()=> {
  const navigate = useNavigate();
  const [details, setDeatils] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  // handle the changes in input field as we type
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDeatils((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  // handle onsubmit when clicked on submit button
  const onSubmit = async (e) => {
    try {
      if (!details.name || !details.email || !details.password) {
        toast.error("Enter All field");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          details
        );
        if (response.data.success) {
          toast.success(response.data.message);
          toast("Redirecting to login page");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("something went wrong please try again");
    }
  };

  return (
    <div className="h-screen bg-gray-800 flex flex-col justify-center">
      <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
        <h2 className="text-4xl dark:text-white font-bold text-center">
          REGISTER
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Name</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Email</label>
          <input
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Password</label>
          <input
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between text-gray-400 py-2">
          <p className="flex items-center">
            <input className="mr-2" type="checkbox" /> Remember Me
          </p>
        </div>
        <button
          className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          type="button"
          onClick={onSubmit}
        >
          SIGN UP
        </button>
        <Link to="/login" className="text-white">
          CLICK HERE TO Login
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
