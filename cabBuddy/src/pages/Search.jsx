import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllRides } from "@/api/rideApi";
import SearchFilters from "@/components/SearchFilters";
import AvailableRideCard from "@/components/AvailableRideCard";

export default function Search() {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter states
  const [sortBy, setSortBy] = useState(null);
  const [timeFilters, setTimeFilters] = useState({
    before06: false,
    sixTo12: false,
    twelveTo18: false,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSeats, setMinSeats] = useState("");

  // SearchBox refs for form inputs
  const sourceRef = useRef(null);
  const destinationRef = useRef(null);
  const dateRef = useRef(null);

  // Load all rides on component mount
  useEffect(() => {
    setLoading(true);
    getAllRides()
      .then(res => {
        setAllRides(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading rides:", err);
        setAllRides([]);
        setLoading(false);
      });
  }, []);

  // Watch search params changes (triggers filteredRides recompute)
  useEffect(() => {
    console.log("🔍 Search params changed:", Object.fromEntries(searchParams));
  }, [searchParams]);

  // ✅ UPDATED: Calculate time filter counts using departureTime
  const timeCounts = useMemo(() => {
    const before06 = allRides.filter(ride => {
      if (!ride.departureTime) return false;
      const hour = parseInt(ride.departureTime.split(":")[0]);
      return hour < 6;
    }).length;

    const sixTo12 = allRides.filter(ride => {
      if (!ride.departureTime) return false;
      const hour = parseInt(ride.departureTime.split(":")[0]);
      return hour >= 6 && hour < 12;
    }).length;

    const twelveTo18 = allRides.filter(ride => {
      if (!ride.departureTime) return false;
      const hour = parseInt(ride.departureTime.split(":")[0]);
      return hour >= 12 && hour < 18;
    }).length;

    return { before06, sixTo12, twelveTo18 };
  }, [allRides]);

  // Filter rides based on search parameters and filters
  const filteredRides = useMemo(() => {
    console.log("🔍 Filtering with params:", Object.fromEntries(searchParams));
    let rides = [...allRides];

    // Apply URL search params (source, destination, date)
    const source = searchParams.get("source")?.toLowerCase().trim();
    const destination = searchParams.get("destination")?.toLowerCase().trim();
    const date = searchParams.get("date");

    // Only filter if we have search params
    if (source || destination || date) {
      console.log("Filtering rides with:", { source, destination, date, totalRides: rides.length });
      
      rides = rides.filter(ride => {
        let matches = true;

        if (source) {
          const rideSource = (ride.source || "").toLowerCase().trim();
          const sourceMatch = rideSource === source || rideSource.includes(source);
          if (!sourceMatch) {
            matches = false;
          }
        }

        if (destination && matches) {
          const rideDestination = (ride.destination || "").toLowerCase().trim();
          const destMatch = rideDestination === destination || rideDestination.includes(destination);
          if (!destMatch) {
            matches = false;
          }
        }

        if (date && matches) {
          try {
            let rideDateStr = "";
            if (ride.rideDate) {
              if (typeof ride.rideDate === 'string') {
                if (ride.rideDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  rideDateStr = ride.rideDate;
                } else if (ride.rideDate.includes('T')) {
                  rideDateStr = ride.rideDate.split('T')[0];
                } else {
                  const parsedDate = new Date(ride.rideDate);
                  if (!isNaN(parsedDate.getTime())) {
                    rideDateStr = parsedDate.toISOString().split("T")[0];
                  }
                }
              } else if (ride.rideDate instanceof Date) {
                rideDateStr = ride.rideDate.toISOString().split("T")[0];
              } else {
                const parsedDate = new Date(ride.rideDate);
                if (!isNaN(parsedDate.getTime())) {
                  rideDateStr = parsedDate.toISOString().split("T")[0];
                }
              }
            }
            if (rideDateStr && rideDateStr !== date) {
              matches = false;
            } else if (!rideDateStr) {
              matches = false;
            }
          } catch (e) {
            console.error("Error parsing ride date:", e, ride.rideDate);
            matches = false;
          }
        }

        return matches;
      });
      
      console.log("Filtered rides count:", rides.length);
    }

    // ✅ UPDATED: Apply time filters using departureTime
    const activeTimeFilters = Object.entries(timeFilters).filter(([_, active]) => active);
    if (activeTimeFilters.length > 0) {
      rides = rides.filter(ride => {
        if (!ride.departureTime) return false;
        const hour = parseInt(ride.departureTime.split(":")[0]);

        return activeTimeFilters.some(([key]) => {
          if (key === "before06") return hour < 6;
          if (key === "sixTo12") return hour >= 6 && hour < 12;
          if (key === "twelveTo18") return hour >= 12 && hour < 18;
          return false;
        });
      });
    }

    // Apply price filters
    if (minPrice && !isNaN(parseFloat(minPrice))) {
      const min = parseFloat(minPrice);
      rides = rides.filter(ride => (ride.pricePerSeat || 0) >= min);
    }
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      const max = parseFloat(maxPrice);
      rides = rides.filter(ride => (ride.pricePerSeat || 0) <= max);
    }

    // Apply seats filter
    if (minSeats && !isNaN(parseInt(minSeats))) {
      const seats = parseInt(minSeats);
      rides = rides.filter(ride => (ride.availableSeats || 0) >= seats);
    }

    // Apply sorting - ✅ UPDATED: Use departureTime for earliest sorting
    if (sortBy) {
      rides.sort((a, b) => {
        switch (sortBy) {
          case "earliest":
            return (a.departureTime || "99:99").localeCompare(b.departureTime || "99:99");
          case "lowest_price":
            return (a.pricePerSeat || 0) - (b.pricePerSeat || 0);
          case "highest_price":
            return (b.pricePerSeat || 0) - (a.pricePerSeat || 0);
          case "most_seats":
            return (b.availableSeats || 0) - (a.availableSeats || 0);
          default:
            return 0;
        }
      });
    }

    return rides;
  }, [allRides, searchParams, timeFilters, minPrice, maxPrice, minSeats, sortBy]);

  // ✅ UPDATED: Format departureTime for display (HH:mm:ss -> HH:mm)
  const formatTime = (timeString) => {
    if (!timeString) return "00:00";
    return timeString.substring(0, 5);
  };

  // Handle SearchBox form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const source = sourceRef.current?.value?.trim();
    const destination = destinationRef.current?.value?.trim();
    const date = dateRef.current?.value;

    const params = new URLSearchParams();
    if (source) params.set("source", source);
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);

    const queryString = params.toString();
    navigate(`/search?${queryString}`);
  };

  // Handle filter changes
  const handleFilterChange = ({ sort, times }) => {
    if (sort !== undefined) setSortBy(sort);
    if (times) setTimeFilters(times);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    searchParams.get("source") || 
    searchParams.get("destination") || 
    searchParams.get("date") || 
    sortBy || 
    Object.values(timeFilters).some(v => v) || 
    minPrice || 
    maxPrice || 
    minSeats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Ride
          </h1>
          <p className="text-gray-600 text-lg">
            Search and book rides with verified drivers
          </p>
        </div>

        {/* Search Box Section */}
        <div className="mb-10">
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    ref={sourceRef}
                    type="text"
                    placeholder="Pune, Mumbai, etc."
                    defaultValue={searchParams.get("source") || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    ref={destinationRef}
                    type="text"
                    placeholder="Mumbai, Bangalore, etc."
                    defaultValue={searchParams.get("destination") || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    ref={dateRef}
                    type="date"
                    defaultValue={searchParams.get("date") || ""}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                🔍 Search Rides
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      navigate("/search");
                      setSortBy(null);
                      setTimeFilters({ before06: false, sixTo12: false, twelveTo18: false });
                      setMinPrice("");
                      setMaxPrice("");
                      setMinSeats("");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <SearchFilters
                initialSort={sortBy}
                timeCounts={timeCounts}
                onChange={handleFilterChange}
              />

              {/* Price Range Filter */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min Price (₹)</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max Price (₹)</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Seats Filter */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Seats Available</h4>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum Seats</label>
                  <input
                    type="number"
                    value={minSeats}
                    onChange={(e) => setMinSeats(e.target.value)}
                    placeholder="1"
                    min="1"
                    max="8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rides List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {searchParams.get("source") || searchParams.get("destination") || searchParams.get("date")
                    ? "Search Results"
                    : "All Available Rides"}
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <span className="font-semibold text-gray-900">{filteredRides.length}</span>{" "}
                      {filteredRides.length === 1 ? "ride" : "rides"} available
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-blue-600 opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-gray-600 mt-6 text-lg font-medium">Finding the best rides for you...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredRides.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No rides found</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {hasActiveFilters
                      ? "We couldn't find any rides matching your search. Try adjusting your filters or search criteria."
                      : "No rides available at the moment. Check back later or publish a ride!"}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        navigate("/search");
                        setSortBy(null);
                        setTimeFilters({ before06: false, sixTo12: false, twelveTo18: false });
                        setMinPrice("");
                        setMaxPrice("");
                        setMinSeats("");
                      }}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      View All Rides
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ✅ UPDATED: Rides List - Using departureTime & arrivalTime */}
            {!loading && filteredRides.length > 0 && (
              <div className="space-y-5">
                {filteredRides.map((ride, index) => {
                  const startTime = formatTime(ride.departureTime);     // ✅ CHANGED
                  const endTime = formatTime(ride.arrivalTime);          // ✅ CHANGED
                  const availableSeats = ride.availableSeats || 0;
                  
                  return (
                    <Link
                      key={ride.id}
                      to={`/requestbooking/${ride.id}`}
                      className="block transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 50}ms forwards`,
                        opacity: 0,
                      }}
                    >
                      <AvailableRideCard
                        startTime={startTime}
                        duration="3h 00m"  // ✅ TODO: Calculate from departureTime -> arrivalTime
                        endTime={endTime}
                        from={ride.source}
                        to={ride.destination}
                        price={ride.pricePerSeat}
                        rideDate={ride.rideDate}
                        availableSeats={availableSeats}
                        driver={{
                          name: ride.driverName || "Driver",
                          avatar: "/images/default.jpg",
                          rating: 4.5,
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
