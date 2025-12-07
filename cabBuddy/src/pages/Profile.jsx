import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">User Name</h2>
              <p className="text-gray-600">user@example.com</p>
              <p className="text-sm text-gray-500">Member since 2024</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="text-gray-900">+1 234 567 8900</p>
            </div>
          </div>

          <Button className="w-full sm:w-auto">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}

