import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "@/pages/signup";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";
import Search from "./pages/Search";
import RequestBooking from "./pages/requestbooking";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Logout from "./pages/Logout";

function App() {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/publish-ride" element={<PublishRide />} />
        <Route path="/my-payments" element={<Payments />} />
        <Route path="/search" element={<Search />} />
        <Route path="/requestbooking" element={<RequestBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<Bookings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
