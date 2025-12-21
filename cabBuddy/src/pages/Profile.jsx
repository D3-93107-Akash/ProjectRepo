import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card } from "@/components/ui/card";
import SidebarItem from "@/components/profile/SidebarItem";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileVerification from "@/components/profile/ProfileVerification";
import ProfileRatings from "@/components/profile/ProfileRatings";

import { User, ShieldCheck, Star, Car } from "lucide-react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("overview");

  const [phone, setPhone] = useState("7666****27");
  const [email, setEmail] = useState("nikhil@example.com");

  // ✅ Load verified state from localStorage first
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

  useEffect(() => {
    if (location.state?.verified) {
      setVerifiedState((prev) => {
        const updated = {
          ...prev,
          ...location.state.verified, // ✅ merge (never overwrite)
        };

        // ✅ persist permanently
        localStorage.setItem("verifiedState", JSON.stringify(updated));
        return updated;
      });
    }

    if (location.state?.phone) {
      setPhone(location.state.phone);
    }

    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

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
          <Card className="animate-fadeIn p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              My Rides
            </h2>
            <p className="text-sm text-slate-600">
              Your ride history will appear here.
            </p>
          </Card>
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
 