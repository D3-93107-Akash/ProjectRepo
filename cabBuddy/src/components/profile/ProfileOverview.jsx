import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileOverview({ user }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
  });

  const [profileImage, setProfileImage] = useState(user?.avatarUrl || "");
  const [isEditing, setIsEditing] = useState(false);

  const initials = (formData.name || user?.name || "U")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, profileImage);
    setIsEditing(false);
  };

  return (
    
    /* LIGHT BLUE BACKGROUND SECTION */
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 rounded-3xl">

      <Card className="px-6 py-6 space-y-6 rounded-2xl border border-blue-100 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300">

        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-blue-100 pb-4">

          <div className="flex items-center gap-5">

            {/* AVATAR */}
            <div className="relative">
              <Avatar className="h-18 w-18 ring-4 ring-blue-200 shadow-md">
                <AvatarImage src={profileImage} alt={formData.name} />
                <AvatarFallback className="font-bold text-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full cursor-pointer shadow">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            {/* USER INFO */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {formData.name || "Your name"}
              </h2>
              <p className="text-sm text-slate-600">
                {formData.phone || "Add your phone number"}
              </p>
              {(formData.city || user?.city) && (
                <p className="text-xs text-slate-500 mt-1">
                  📍 {formData.city}
                </p>
              )}
            </div>
          </div>

          <Button
            variant={isEditing ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-full"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* EDIT FORM */}
        {isEditing && (
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
          >
            <div className="space-y-1">
              <label className="text-xs text-slate-600">Full name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91..."
              />
            </div>

            {/* <div className="space-y-1">
              <label className="text-xs text-slate-600">City</label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
              />
            </div> */}

            <div className="md:col-span-3 flex justify-end">
              <Button className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-indigo-600">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
