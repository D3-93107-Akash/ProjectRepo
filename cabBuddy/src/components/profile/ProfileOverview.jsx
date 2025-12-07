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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile (frontend only):", formData);
    setIsEditing(false);
  };

  return (
    <Card className="px-6 py-6 space-y-6 border border-slate-200 rounded-xl shadow-sm bg-white">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b pb-4">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 ring-2 ring-slate-200">
            <AvatarImage src={user?.avatarUrl} alt={formData.name} />
            <AvatarFallback className="font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 leading-tight">
              {formData.name || user?.name || "Your name"}
            </h2>
            <p className="text-sm text-slate-600">
              {formData.phone || user?.phone || "Add your phone number"}
            </p>
            {(formData.city || user?.city) && (
              <p className="text-xs text-slate-500 mt-1">
                {formData.city || user?.city}
              </p>
            )}
          </div>
        </div>

        <Button
          variant={isEditing ? "destructive" : "outline"}
          size="sm"
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="min-w-[110px]"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-3 bg-slate-50 p-5 rounded-lg border"
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Full name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Phone number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 ..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">City</label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit" size="sm" className="px-6">
              Save
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
