
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import SidebarItem from "@/components/profile/SidebarItem";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileVerification from "@/components/profile/ProfileVerification";
import ProfileRatings from "@/components/profile/ProfileRatings";
import { User, ShieldCheck, Star, Car } from "lucide-react";
import { getMyRides } from "@/api/rideApi";
import AvailableRideCard from "@/components/AvailableRideCard";

// ✅ UPDATED IMPORT (renamed file)
import {
  fetchUserById,
  updateUserProfile,
} from "@/api/userfetchApi";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("overview");
  
  const [phone, setPhone] = useState("7666****27");
  const [email, setEmail] = useState("nikhil@example.com");

  /* =========================
     🔐 READ LOGIN DATA
     ========================= */
  const loginData =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("loginResponse")) ||
    JSON.parse(localStorage.getItem("auth"));

  const role = loginData?.role?.toUpperCase();
  const isDriver = role === "DRIVER";
  const userId = loginData?.id;

  /* =========================
     🚗 MY RIDES STATE
     ========================= */
  const [myRides, setMyRides] = useState([]);
  const [ridesLoading, setRidesLoading] = useState(false);
  const [ridesError, setRidesError] = useState(null);

  /* =========================
     ✅ VERIFIED STATE
     ========================= */

  // Backend user profile
  const [userProfile, setUserProfile] = useState(null);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
  });

  // Verification state (session-based)
  const [verifiedState, setVerifiedState] = useState(() => {
    const saved = sessionStorage.getItem("verifiedState");
    return saved
      ? JSON.parse(saved)
      : { phone: false, email: false, govtId: false, drivingLicense: false };
  });

  const location = useLocation();

  /* --------------------------------------------------
     Fetch user profile (GET /api/users/{id})
  -------------------------------------------------- */
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await fetchUserById();
        setUserProfile(response.data);

        // Pre-fill edit form
        setEditForm({
          name: response.data.name,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Failed to load user profile", error);
      }
    };

    loadUserProfile();
  }, []);

  /* --------------------------------------------------
     Handle verification updates via navigation state
  -------------------------------------------------- */
  useEffect(() => {
    if (location.state?.verified) {
      const updated = { ...verifiedState, ...location.state.verified };
      setVerifiedState(updated);
      localStorage.setItem("verifiedState", JSON.stringify(updated));
    }
    if (location.state?.phone) setPhone(location.state.phone);
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  /* =========================
     📡 FETCH DRIVER RIDES
     ========================= */
  useEffect(() => {
    if (activeSection === "rides" && isDriver) {
      fetchMyRides();
    }
  }, [activeSection, isDriver]);

  const fetchMyRides = async () => {
    if (!userId) return;

    setRidesLoading(true);
    setRidesError(null);

    try {
      console.log("Fetching rides for driverId:", userId);
      const response = await getMyRides(); // ✅ Backend hit with driverId + token
      console.log("🚗 My Rides:", response.data);
      setMyRides(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load rides:", error);
      setRidesError("Failed to load your rides");
      setMyRides([]);
    } finally {
      setRidesLoading(false);
    }
  };

  /* =========================
     🏷 STATUS BADGE
     ========================= */
  const StatusBadge = ({ status }) => {
    const map = {
      active: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      booked: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          map[status?.toLowerCase()] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status || "unknown"}
      </span>
    );
  };

  const user = { phone, email, verified: verifiedState };

  /* =========================
     🧩 SECTION RENDERER
     ========================= */
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="animate-fadeIn space-y-6">
            <ProfileOverview
              user={user}
            />
            <ProfileVerification user={user} />
          </div>
        );

      case "verification":
        return <ProfileVerification user={user} />;

      case "rating":
        return <ProfileRatings />;

      case "rides":
        return (
          <div className="space-y-6">
            {!isDriver && (
              <Card className="p-10 text-center bg-yellow-50 border-yellow-200 rounded-2xl">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Driver access only
                </h3>
                <p className="text-yellow-700">
                  Only drivers can publish and manage rides.
                </p>
              </Card>
            )}

            {isDriver && (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">My Rides</h2>
                    <p className="text-gray-600">
                      {ridesLoading
                        ? "Loading..."
                        : `${myRides.length} ride(s)`}
                    </p>
                  </div>
                  <button
                    onClick={fetchMyRides}
                    disabled={ridesLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
                  >
                    Refresh
                  </button>
                </div>

                {ridesLoading && <p>Loading rides...</p>}

                {ridesError && <p className="text-red-600">{ridesError}</p>}

                {!ridesLoading && myRides.length === 0 && (
                  <Card className="p-10 text-center rounded-2xl">
                    <p className="mb-4">No rides published yet.</p>
                    <Link
                      to="/publish-ride"
                      className="text-blue-600 font-semibold"
                    >
                      Publish your first ride
                    </Link>
                  </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myRides.map((ride) => (
                    <Link key={ride.id} to={`/ride-details/${ride.id}`}>
                      <Card className="p-6 rounded-2xl hover:shadow-lg transition">
                        <div className="flex justify-between mb-3">
                          <StatusBadge status={ride.status} />
                        </div>

                        <AvailableRideCard
                          startTime={ride.departureTime?.substring(0, 5)}
                          endTime={ride.arrivalTime?.substring(0, 5)}
                          from={ride.source}
                          to={ride.destination}
                          price={ride.pricePerSeat}
                          rideDate={ride.rideDate}
                          availableSeats={ride.availableSeats}
                          status={ride.status}
                          driver={{ name: "You", rating: 4.8 }}
                        />
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  /* --------------------------------------------------
     Main Render
  -------------------------------------------------- */
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 py-10 flex justify-center items-start">
      <Card className="w-full max-w-5xl mx-auto p-8 shadow-2xl rounded-3xl bg-white/90 backdrop-blur border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-900">
            My Account
          </h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-full border text-sm"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-sm"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-[260px,1fr]">
          {/* Sidebar */}
          <aside className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl p-5 space-y-3 text-blue-900 shadow-lg">
            <SidebarItem
              label="Overview"
              icon={User}
              isActive={activeSection === "overview"}
              onClick={() => setActiveSection("overview")}
            />
            <SidebarItem
              label="Verification"
              icon={ShieldCheck}
              isActive={activeSection === "verification"}
              onClick={() => setActiveSection("verification")}
            />
            <SidebarItem
              label="Rating"
              icon={Star}
              isActive={activeSection === "rating"}
              onClick={() => setActiveSection("rating")}
            />
            <SidebarItem
              label="My Rides"
              icon={Car}
              isActive={activeSection === "rides"}
              onClick={() => setActiveSection("rides")}
            />
          </aside>

          {/* Main Content */}
          <main className="space-y-6 transition-all duration-300">
            {renderSection()}

            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </main>
        </div>
      </Card>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.45s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

