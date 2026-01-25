import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRide } from "@/api/rideApi";
import { getUserById, registerUser, updateUser } from "@/api/userApi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, Users, DollarSign, ArrowRight, Car, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import LocationAutocomplete from "@/components/LocationAutocomplete";

export default function PublishRide() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [seats, setSeats] = useState(2);
  const [price, setPrice] = useState(100);
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState(1); // Default driver ID

  // Check if driver user exists on mount
  useEffect(() => {
    const checkDriver = async () => {
      try {
        const response = await getUserById(driverId);
        console.log("Driver user found:", response.data);
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 500) {
          console.warn("Driver user not found. You may need to create a user first.");
          toast.info("Note: User with ID=1 not found. Creating a default driver user...", {
            position: "top-right",
            autoClose: 3000,
          });
          
          // Try to create a default driver user
          try {
            const newUser = await registerUser({
              name: "Default Driver",
              email: `driver${Date.now()}@example.com`,
              password: "password123",
              phone: "1234567890"
            });
            setDriverId(newUser.data.id);
            console.log("Created default user with ID:", newUser.data.id);
            
            // Update role to DRIVER if possible (requires backend support)
            // For now, the role check is disabled, so this is optional
          } catch (createErr) {
            console.error("Failed to create default user:", createErr);
          }
        }
      }
    };
    
    checkDriver();
  }, [driverId]);

  const handlePublish = async () => {
    // Validate required fields
    if (!fromCity || !fromCity.trim()) {
      toast.error("Please enter a source location", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!toCity || !toCity.trim()) {
      toast.error("Please enter a destination location", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
      toast.error("Source and destination cannot be the same", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (seats < 1 || seats > 8) {
      toast.error("Seats must be between 1 and 8", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (price < 1) {
      toast.error("Price must be at least ₹1", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Please select a future date", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Format time to HH:mm:ss as required by backend
    const timeParts = time.split(":");
    const formattedTime = `${timeParts[0]}:${timeParts[1] || "00"}:00`;

    const payload = {
      source: fromCity.trim(),
      destination: toCity.trim(),
      rideDate: date.toISOString().split("T")[0], // YYYY-MM-DD format
      rideTime: formattedTime, // HH:mm:ss format
      availableSeats: seats,
      pricePerSeat: price,
      driverId: driverId // Use the driver ID (defaults to 1, or created user's ID)
    };

    setLoading(true);
    try {
      const response = await createRide(payload);
      toast.success("Ride published successfully! 🚗", {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Reset form
      setFromCity("");
      setToCity("");
      setDate(new Date());
      setTime("10:00");
      setSeats(2);
      setPrice(100);
      
      // Navigate to search page after a short delay
      setTimeout(() => {
        navigate("/search");
      }, 1500);
    } catch (err) {
      console.error("Error publishing ride:", err);
      console.error("Full error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Failed to publish ride";
      
      if (err.response) {
        // Server responded with error
        const status = err.response.status;
        const data = err.response.data;
        
        // Log the actual response for debugging
        console.log("Response status:", status);
        console.log("Response data:", data);
        console.log("Response data type:", typeof data);
        
        if (status === 403) {
          // Check if it's the driver role error
          const dataString = typeof data === 'string' ? data : JSON.stringify(data);
          
          if (dataString.includes('Only drivers can create rides')) {
            errorMessage = "❌ Only users with DRIVER role can create rides.\n\n" +
              "To fix this:\n" +
              "1. Create a user with DRIVER role using the registration API\n" +
              "2. Or update an existing user's role to DRIVER in the database\n" +
              "3. Then use that user's ID as driverId";
          } else if (dataString.includes('Driver not found')) {
            errorMessage = "❌ Driver not found.\n\n" +
              "User with ID=1 doesn't exist. Please:\n" +
              "1. Create a user first (via registration)\n" +
              "2. Update that user's role to DRIVER\n" +
              "3. Use that user's ID as driverId";
          } else {
            errorMessage = `Access forbidden (403). Response: ${dataString}\n\n` +
              "This might be a CORS issue or the user doesn't have DRIVER role.";
          }
        } else if (status === 400) {
          // Validation errors
          if (typeof data === 'object' && data !== null) {
            const validationErrors = Object.entries(data)
              .map(([field, message]) => `${field}: ${message}`)
              .join(', ');
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof data === 'string') {
            errorMessage = data;
          } else {
            errorMessage = "Invalid request. Please check all fields.";
          }
        } else if (status === 404) {
          errorMessage = "Endpoint not found. Please check the backend URL.";
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data?.message || data || `Error ${status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "Cannot connect to server. Please check if the backend is running on http://localhost:8080";
      } else {
        // Error setting up request
        errorMessage = err.message || "An unexpected error occurred";
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLocations = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Publish Your Ride
          </h1>
          <p className="text-gray-600 text-lg">
            Share your journey and earn while you travel
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={(e) => { e.preventDefault(); handlePublish(); }}>
              <div className="space-y-6">
                {/* Source and Destination */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Route Details</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* From Location */}
                    <div className="space-y-2">
                      <Label htmlFor="from" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">A</span>
                        </div>
                        From
                      </Label>
                      <div className="relative">
                        <LocationAutocomplete
                          id="from"
                          value={fromCity}
                          onChange={setFromCity}
                          onSelect={setFromCity}
                          placeholder="Enter pickup location"
                          iconColor="blue"
                        />
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="hidden md:flex items-end pb-2">
                      <button
                        type="button"
                        onClick={handleSwapLocations}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center transition-all duration-200 hover:scale-110 mx-auto"
                        aria-label="Swap locations"
                      >
                        <ArrowRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>

                    {/* To Location */}
                    <div className="space-y-2">
                      <Label htmlFor="to" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">B</span>
                        </div>
                        To
                      </Label>
                      <div className="relative">
                        <LocationAutocomplete
                          id="to"
                          value={toCity}
                          onChange={setToCity}
                          onSelect={setToCity}
                          placeholder="Enter destination"
                          iconColor="red"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Swap Button */}
                  <div className="md:hidden flex justify-center">
                    <button
                      type="button"
                      onClick={handleSwapLocations}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Swap locations</span>
                    </button>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-purple-600" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-12 bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <CalendarDays className="mr-2 h-4 w-4 text-purple-600" />
                          {format(date, "EEE, dd MMM yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            if (d) setDate(d);
                          }}
                          disabled={{ before: new Date() }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Seats and Price */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seats" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                      Available Seats
                    </Label>
                    <div className="relative">
                      <Input
                        id="seats"
                        type="number"
                        min="1"
                        max="8"
                        value={seats}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setSeats(Math.max(1, Math.min(8, val)));
                        }}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        {seats === 1 ? "seat" : "seats"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Maximum 8 seats</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Price per Seat
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">₹</span>
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        step="10"
                        value={price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setPrice(Math.max(1, val));
                        }}
                        className="h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-8"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Minimum ₹1</p>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Ride Summary</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium text-gray-900">
                        {fromCity || "—"} → {toCity || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium text-gray-900">
                        {format(date, "dd MMM yyyy")} at {time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span className="font-medium text-gray-900">{seats} {seats === 1 ? "seat" : "seats"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per seat:</span>
                      <span className="font-medium text-gray-900">₹{price}</span>
                    </div>
                    <div className="pt-2 border-t border-blue-200 flex justify-between">
                      <span className="text-gray-700 font-semibold">Total potential:</span>
                      <span className="font-bold text-blue-600 text-lg">₹{price * seats}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !fromCity || !toCity}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing Ride...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      <span>Publish Ride</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team or{" "}
            <button
              onClick={() => navigate("/search")}
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              browse available rides
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
