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

// GET RIDES BY DRIVER
export const getRidesByDriver = (driverId) => {
  return api.get(`/rides/driver/${driverId}`);
};
