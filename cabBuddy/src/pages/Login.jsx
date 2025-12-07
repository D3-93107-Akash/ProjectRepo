import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
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
              Welcome back 👋
            </h1>
            <p className="text-gray-500">
              Login to your CabBuddy account
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <a className="ml-auto text-sm text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="
                w-full h-12 rounded-full 
                bg-[#4285F4] 
                hover:bg-[#357AE8] 
                text-white 
                flex items-center justify-center gap-3
                transition
              "
            >
              <span className="text-white font-medium">Login</span>
            </Button>

          </form>

          <Separator />

          {/* SOCIAL LOGIN */}
          <div className="text-center text-sm text-gray-500 mb-2">
            Or continue with
          </div>

          {/* GOOGLE sign up */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              className="
                w-full h-12 rounded-full 
                bg-[#4285F4] 
                hover:bg-[#357AE8] 
                text-white 
                flex items-center justify-center gap-3
                transition
              "
            >
              <span className="text-white font-medium">Sign up with Google</span>
            </Button>
          </div>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>

        </CardContent>
      </Card>

    </div>
  );
}
