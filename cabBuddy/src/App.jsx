import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "@/pages/signup";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />



        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} /> */}

      </Routes>
    </>
  );
}

export default App;
