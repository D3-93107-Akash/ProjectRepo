import api from "./axiosInstance";

// CREATE RIDE
export const createRide = (rideData) => {
  return api.post("/rides", rideData);
};

// SEARCH RIDES with query parameters
export const searchRides = (source, destination, date) => {
  const params = new URLSearchParams();
  if (source) params.append("source", source);
  if (destination) params.append("destination", destination);
  if (date) params.append("date", date);

  return api.get(`/rides/search?${params.toString()}`);
};

// GET RIDE BY ID
export const getRideById = (rideId) => {
  return api.get(`/rides/${rideId}`);
};

// CANCEL RIDE
export const cancelRide = (rideId) => {
  return api.put(`/rides/${rideId}/cancel`);
};

// GET ALL RIDES (no filters)
export const getAllRides = () => {
  return api.get("/rides/status");
};

// GET RIDES BY DRIVER ID
export const getRidesByDriver = (driverId) => {
  const token = localStorage.getItem("authToken");
  return api.get(`/rides/driver/${driverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// GET MY RIDES (driver)
export const getMyRides = async () => {
  const loginData = JSON.parse(localStorage.getItem("user")) ||
                    JSON.parse(localStorage.getItem("loginResponse")) ||
                    JSON.parse(localStorage.getItem("auth"));

  if (!loginData?.id) throw new Error("Driver not logged in");

  const token = localStorage.getItem("authToken");
  console.log("🔑 TOKEN:", token, "DriverId:", loginData.id); // Debug

  // ✅ Call the backend driver endpoint
  return api.get(`/rides/driver/${loginData.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
