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

export default function Profile() {
  const [activeSection, setActiveSection] = useState("overview");
  const [phone, setPhone] = useState("7666****27");
  const [email, setEmail] = useState("nikhil@example.com");
  
  // My Rides state
  const [myRides, setMyRides] = useState([]);
  const [ridesLoading, setRidesLoading] = useState(false);
  const [ridesError, setRidesError] = useState(null);

  // Load verified state from localStorage
  const [verifiedState, setVerifiedState] = useState(() => {
    const saved = localStorage.getItem("verifiedState");
    return saved
      ? JSON.parse(saved)
      : {
          phone: false,
          email: false,
          govtId: false,
          drivingLicense: false,
        };
  });

  const location = useLocation();

  // Handle location state updates
  useEffect(() => {
    if (location.state?.verified) {
      setVerifiedState((prev) => {
        const updated = { ...prev, ...location.state.verified };
        localStorage.setItem("verifiedState", JSON.stringify(updated));
        return updated;
      });
    }
    if (location.state?.phone) setPhone(location.state.phone);
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  // Fetch rides when "rides" section active
  useEffect(() => {
    if (activeSection === "rides") {
      fetchMyRides();
    }
  }, [activeSection]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      switch (status?.toLowerCase()) {
        case "active":
          return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", icon: "✅" };
        case "cancelled":
          return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", icon: "❌" };
        case "completed":
          return { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", icon: "✓" };
        case "booked":
          return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", icon: "📅" };
        default:
          return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: "●" };
      }
    };

    const config = getStatusConfig(status);
    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.border} ${config.bg} ${config.text}`}>
        <span>{config.icon}</span>
        <span>{status || "Unknown"}</span>
      </div>
    );
  };

  // Fetch driver's rides
  const fetchMyRides = async () => {
    setRidesLoading(true);
    setRidesError(null);
    
    try {
      const response = await getMyRides();
      // ✅ Ensure myRides is always an array
      setMyRides(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error loading my rides:", error);
      setRidesError("Failed to load your rides");
      setMyRides([]);
    } finally {
      setRidesLoading(false);
    }
  };

  const user = {
    phone: phone,
    email: email,
    verified: verifiedState,
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="animate-fadeIn space-y-6">
            <ProfileOverview user={user} />
            <ProfileVerification user={user} />
          </div>
        );

      case "verification":
        return (
          <div className="animate-fadeIn">
            <ProfileVerification user={user} />
          </div>
        );

      case "rating":
        return (
          <div className="animate-fadeIn">
            <ProfileRatings />
          </div>
        );

      case "rides":
        return (
          <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">My Rides</h2>
                <p className="text-gray-600">
                  {ridesLoading 
                    ? "Loading..." 
                    : `${myRides.length} ride${myRides.length !== 1 ? 's' : ''} found`}
                </p>
              </div>
              <button
                onClick={fetchMyRides}
                disabled={ridesLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
              >
                🔄 Refresh
              </button>
            </div>

            {/* Loading State */}
            {ridesLoading && (
              <Card className="flex items-center justify-center p-12 rounded-2xl border-blue-100">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mr-4" />
                <span className="text-lg text-gray-600 font-medium">Loading your rides...</span>
              </Card>
            )}

            {/* Error State */}
            {ridesError && !ridesLoading && (
              <Card className="p-6 rounded-2xl border border-red-100 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">{ridesError}</h3>
                    <p className="text-red-700 text-sm">Please check your connection and try again.</p>
                  </div>
                </div>
                <button
                  onClick={fetchMyRides}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm font-medium"
                >
                  Try Again
                </button>
              </Card>
            )}

            {/* Empty State */}
            {!ridesLoading && !ridesError && myRides.length === 0 && (
              <Card className="text-center py-16 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Car className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No rides yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You haven't published any rides. Create your first ride to start earning!
                </p>
                <Link
                  to="/publish-ride"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🚗 Publish First Ride
                </Link>
              </Card>
            )}

            {/* Rides List WITH STATUS BADGES */}
            {!ridesLoading && !ridesError && myRides.length > 0 && (
              <div className="space-y-4">
                {/* ✅ FIXED: Status Summary */}
                <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="text-sm text-gray-600 self-center">Status breakdown:</div>
                  {Object.entries(
                    myRides.reduce((acc, ride) => {
                      const status = ride.status || 'unknown';
                      acc[status] = (acc[status] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([status, count]) => (
                    <span key={status} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border">
                      {status}: {count}
                    </span>
                  ))}
                </div>

                {/* Rides Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myRides.map((ride) => {
                    const startTime = ride.departureTime?.substring(0, 5) || "00:00";
                    const endTime = ride.arrivalTime?.substring(0, 5) || "00:00";
                    
                    return (
                      <Link
                        key={ride.id}
                        to={`/ride-details/${ride.id}`}
                        className="block hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
                      >
                        <Card className="p-6 rounded-2xl border border-gray-200 hover:border-blue-300 group-hover:bg-gradient-to-r group-hover:from-blue-50">
                          {/* Status Badge - TOP RIGHT */}
                          <div className="flex justify-between items-start mb-4">
                            <StatusBadge status={ride.status} />
                          </div>
                          
                          <AvailableRideCard
                            startTime={startTime}
                            endTime={endTime}
                            duration="2h 30m"
                            from={ride.source}
                            to={ride.destination}
                            price={ride.pricePerSeat}
                            rideDate={ride.rideDate}
                            availableSeats={ride.availableSeats || 0}
                            status={ride.status || "published"}
                            driver={{
                              name: "You",
                              avatar: "/images/driver-avatar.jpg",
                              rating: 4.8,
                            }}
                          />
                          
                          {/* Quick Action Buttons */}
                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                            <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium hover:bg-blue-100 transition-all">
                              View Details
                            </button>
                            <button className="px-3 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-medium hover:bg-green-100 transition-all">
                              {ride.status === "active" ? "Manage" : "Edit"}
                            </button>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 py-10 flex justify-center items-start">
      <Card className="w-full max-w-5xl mx-auto p-8 shadow-2xl rounded-3xl bg-white/90 backdrop-blur border border-blue-100">
        <h1 className="text-2xl md:text-2xl font-semibold text-blue-900 text-center mb-8">
          My Account
        </h1>

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
            <h1 className="text-xl md:text-2xl font-semibold text-blue-900 border-b border-blue-100 pb-4">
              My Profile
            </h1>
            {renderSection()}
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
