import { Link } from "react-router-dom";
import SearchBox from "@/components/SearchBox";
import SearchFilters from "@/components/SearchFilters";
import AvailableRideCard from "@/components/AvailableRideCard";

export default function Search() {
  return (
    <div className="px-6 py-6">
      
      {/* Top: Search box */}
      <div className="mb-6">
        <SearchBox />
      </div>

      {/* Main content: Filters + Results */}
      <div className="flex gap-6">
        
        {/* Left: Filters Sidebar */}
        <div className="w-64">
          <SearchFilters />
        </div>

        {/* Right: Ride Results */}
        <div className="flex-1">

          {/* CLICKABLE RIDE CARD */}
          <Link to="/requestbooking" className="block">
            <AvailableRideCard
              startTime="11:00"
              duration="3h00"
              endTime="14:00"
              from="Mumbai"
              to="Pune"
              price={350}
              driver={{
                name: "Yogesh",
                avatar: "/images/yogesh.jpg",
                rating: 5.0,
              }}
            />
          </Link>

        </div>
      </div>
    </div>
  );
}
