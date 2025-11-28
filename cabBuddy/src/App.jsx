import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";

function App() {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish-ride" element={<PublishRide />} />
        <Route path="/my-payments" element={<Payments />} />
        
      </Routes>
    </>
  );
}

export default App;
