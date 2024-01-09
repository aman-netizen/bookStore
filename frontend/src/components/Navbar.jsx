import React, { useState } from "react";
import Logo from "../images/logo.jpg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import avtar from "../images/avtar.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state);

  // function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("user logged out successfully");
  };

  return (
    <header className="w-full fixed z-10 bg-black opacity-90">
      <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
        <a
          href="/"
          className="flex items-center justify-center text-white text-lg cursor-pointer"
        >
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:block w-8 h-8 lg:w-14 lg:h-14 rounded-full"
          />
          <span className="md:hidden ml-1 text-xl">Book Store</span>
        </a>

        <ul className="hidden md:flex text-white gap-6">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Books</a>
          </li>
          <li>
            <a href="/">Add Books</a>
          </li>
          {user && (
            <li onClick={handleLogout}>
              <a href="/">Logout</a>
            </li>
          )}
        </ul>

        {user ? (
          <img
            className="hidden md:block w-10 h-10 p-1 rounded-full ring-2 ring-green-300 dark:ring-green-500"
            src={avtar}
            alt="Rounded avatar"
          />
        ) : (
          <Link to="/login">
            <Button
              title="Sign in"
              containerStyle="hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]"
            />
          </Link>
        )}

        <button
          className="block md:hidden text-white text-xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button>
      </nav>
      <div
        className={`${
          open ? "flex" : "hidden"
        } bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}
      >
        <a href="/">Home</a>
        <a href="/">Books</a>
        <a href="/">Add Books</a>
        {user && (
          <li className="list-none" onClick={handleLogout}>
            <a href="/">Logout</a>
          </li>
        )}
      </div>
    </header>
  );
};

export default Navbar;
