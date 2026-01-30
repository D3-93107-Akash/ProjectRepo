import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import PublishRide from "./pages/AddRide"; // Fixed import
import Payments from "./pages/Payments";
import SelectRoute from "./pages/SelectRoute";
import Search from "./pages/Search";
import RequestBooking from "./pages/requestbooking";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Logout from "./pages/Logout";
import Checkout from "@/pages/Checkout";
import PaymentFailed from "@/pages/PaymentFailed";

// Profile verification components
import PhoneVerificationPage from "./components/profile/PhoneVerificationPage";
import EmailVerificationPage from "./components/profile/EmailVerificationPage";
import GovtIdVerificationPage from "./components/profile/GovtIdVerificationPage";
import DrivingLicenseVerificationPage from "./components/profile/DrivingLicenseVerificationPage";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        {/* <Route path="/pickup" element={<PickupPage />} /> */}
        {/* <Route path="/drop-off" element={<DropoffPage />} /> */}
        <Route path="/select-route" element={<SelectRoute />} />
        <Route path="/search" element={<Search />} />
        <Route path="/requestbooking/:id" element={<RequestBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify/phone" element={<PhoneVerificationPage />} />
        <Route path="/verify/email" element={<EmailVerificationPage />} />
        <Route path="/verify/govt-id" element={<GovtIdVerificationPage />} />
        <Route path="/verify/driving-license" element={<DrivingLicenseVerificationPage />} />
        <Route path="/my-bookings" element={<Bookings />} />
         {/* ADD THIS */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* Toast container for notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
