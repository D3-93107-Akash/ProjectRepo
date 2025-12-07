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

            <AvailableRideCard
              startTime="15:30"
              duration="2h30"
              endTime="18:00"
              from="Pune"
              to="Nagpur"
              price={550}
              driver={{
                name: "Rahul",
                avatar: "/images/rahul.jpg",
                rating: 4.7,
              }}
            />

            <AvailableRideCard
              startTime="19:00"
              duration="4h00"
              endTime="23:00"
              from="Mumbai"
              to="Nashik"
              price={450}
              driver={{
                name: "Amit",
                avatar: "/images/amit.jpg",
                rating: 4.9,
              }}
            />
            <AvailableRideCard
              startTime="15:30"
              duration="2h30"
              endTime="18:00"
              from="Pune"
              to="Nagpur"
              price={550}
              driver={{
                name: "Rahul",
                avatar: "/images/rahul.jpg",
                rating: 4.7,
              }}
            />

            <AvailableRideCard
              startTime="19:00"
              duration="4h00"
              endTime="23:00"
              from="Mumbai"
              to="Nashik"
              price={450}
              driver={{
                name: "Amit",
                avatar: "/images/amit.jpg",
                rating: 4.9,
              }}
            />


          </Link>


          
        </div>
      </div>
    </div>
  );
}
