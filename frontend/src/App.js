import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <div className="bg-black">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
};

export default App;
