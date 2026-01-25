import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";
import PickupPage from "./pages/Pickup";
import DropoffPage from "./pages/DropOff";
import SelectRoute from "./pages/SelectRoute";
import Search from "./pages/Search";
import RequestBooking from "./pages/requestbooking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // keep this once in your app [web:39][web:117]
import Profile from "./pages/Profile";
import PhoneVerificationPage from "./components/profile/PhoneVerificationPage";
import EmailVerificationPage from "./components/profile/EmailVerificationPage";
import GovtIdVerificationPage from "./components/profile/GovtIdVerificationPage";
import DrivingLicenseVerificationPage from "./components/profile/DrivingLicenseVerificationPage";



import Bookings from "./pages/Bookings";
import Logout from "./pages/Logout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/publish-ride" element={<PublishRide />} />
        <Route path="/my-payments" element={<Payments />} />
        <Route path="/pickup" element={<PickupPage />} />
        <Route path="/drop-off" element={<DropoffPage />} />
        <Route path="/select-route" element={<SelectRoute />} />
        <Route path="/search" element={<Search />} />
        <Route path="/requestbooking/:id" element={<RequestBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify/phone" element={<PhoneVerificationPage />} />
        <Route path="/verify/email" element={<EmailVerificationPage />} />
        <Route path="/verify/govt-id" element={<GovtIdVerificationPage />} />
        <Route path="/verify/driving-license" element={<DrivingLicenseVerificationPage />} />
        <Route path="/my-bookings" element={<Bookings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* Toast container at root */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
