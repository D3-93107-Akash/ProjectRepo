import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PublishRide from "./pages/AddRide";
import Payments from "./pages/Payments";
import Search from "./pages/Search";
import SelectRoute from "./pages/SelectRoute";
import RequestBooking from "./pages/requestbooking";
import Bookings from "./pages/Bookings";
import Logout from "./pages/Logout";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import DriverRoute from "./routes/DriverRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🔑 Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔒 Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requestbooking/:id"
          element={
            <ProtectedRoute>
              <RequestBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-route"
          element={
            <ProtectedRoute>
              <SelectRoute />
            </ProtectedRoute>
          }
        />

        {/* 🚗 Driver Only Pages */}
        <Route
          path="/publish-ride"
          element={
            <DriverRoute>
              <PublishRide />
            </DriverRoute>
          }
        />

        {/* 🔓 Logout */}
        <Route path="/logout" element={<Logout />} />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
