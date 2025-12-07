import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!fullname || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("token", "dummy-token");
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      
      <Card className="w-full max-w-md shadow-sm border border-gray-200 rounded-2xl">
        <CardContent className="p-8 space-y-6">

          {/* TOP HEADING */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Create an account ✨
            </h1>
            <p className="text-gray-500">
              Sign up to continue with CabBuddy
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1">
              <Label className="text-gray-700">Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700">Password</Label>
              <Input
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* SIGNUP BUTTON (same style as Login button) */}
            <Button
              className="
                w-full h-12 rounded-full 
                bg-[#4285F4] 
                hover:bg-[#357AE8] 
                text-white 
                flex items-center justify-center gap-3
                transition
              "
              type="submit"
            >
              <span className="text-white font-medium">Sign Up</span>
            </Button>
          </form>

          <Separator />

          {/* TEXT */}
          <div className="text-center text-sm text-gray-500 mb-2">
            Or continue with
          </div>

          {/* GOOGLE SIGNUP BUTTON (same as login page style) */}
          <Button
            className="
              w-full h-12 rounded-full 
              bg-[#4285F4] 
              hover:bg-[#357AE8] 
              text-white 
              flex items-center justify-center gap-3
              transition
            "
            type="button"
          >
            <span className="text-white font-medium">Sign up with Google</span>
          </Button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">
              Login
            </Link>
          </p>

        </CardContent>
      </Card>

    </div>
  );
}
