import { useState } from "react";
import { Card } from "@/components/ui/card";
import SidebarItem from "@/components/profile/SidebarItem";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileVerification from "@/components/profile/ProfileVerification";
import { User, ShieldCheck, Clock, WalletCards } from "lucide-react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("overview");

  const user = null;

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <ProfileOverview user={user} />
            <ProfileVerification user={user} />
          </>
        );

      case "verification":
        return <ProfileVerification user={user} />;

      case "rides":
  return (
    <Card className="px-6 py-4 space-y-2">
      <h2 className="text-lg font-semibold text-slate-800">Rides History</h2>
      <p className="text-sm text-slate-600">Rides history will appear here.</p>
    </Card>
  );
case "payments":
  return (
    <Card className="px-6 py-4 space-y-2">
      <h2 className="text-lg font-semibold text-slate-800">Payments History</h2>
      <p className="text-sm text-slate-600 text-center">
        Payment history will appear here.
      </p>
    </Card>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 flex justify-center items-start">
      <Card className="w-full max-w-5xl mx-auto p-6 shadow-md rounded-2xl bg-white">
        <div className="grid gap-6 md:grid-cols-[240px,1fr]">
          
          {/* LEFT SIDEBAR */}
          <aside className="bg-slate-100 rounded-xl p-4 space-y-2">
           <h2 className="text-lg font-bold text-slate-600 uppercase tracking-wide mb-3 text-center">
  My account
</h2>



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
              label="My rides"
              icon={Clock}
              isActive={activeSection === "rides"}
              onClick={() => setActiveSection("rides")}
            />
            <SidebarItem
              label="Payments"
              icon={WalletCards}
              isActive={activeSection === "payments"}
              onClick={() => setActiveSection("payments")}
            />
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">My Profile</h1>
              <p className="text-sm text-slate-500">
                Update your personal details and manage your verification status.
              </p>
            </div>

            {renderSection()}
          </main>
        </div>
      </Card>
    </div>
  );
}
