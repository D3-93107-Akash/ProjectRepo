import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";
import PickupPage from "./pages/Pickup";
import DropoffPage from "./pages/DropOff";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // keep this once in your app [web:39][web:117]
import SelectRoute from "./pages/SelectRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish-ride" element={<PublishRide />} />
        <Route path="/my-payments" element={<Payments />} />
        <Route path="/pickup" element={<PickupPage/>}></Route>
        <Route path="/drop-off" element={<DropoffPage/>}></Route>
        <Route path="/select-route" element={<SelectRoute/>} ></Route>
      </Routes>

      {/* Toast container at root */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
