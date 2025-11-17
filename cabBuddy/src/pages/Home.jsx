"use client";

import SearchBox from "@/components/searchBox";
import FeatureCards from "@/components/featureCard";

export default function Home() {
  return (
    <div className="w-full">

      {/* Hero Section with Background Image */}
      <div
        className="h-[70vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center pt-40"
        style={{
          backgroundImage: "url('/assets/pic1.svg')",
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-2">
         Quality rides that fit your budget
        </h1>
        <p className="text-white text-lg mb-55">
          Book your cab quickly and easily
        </p>

        {/* Your Existing Search Box */}
        <SearchBox />
      </div>

      {/* Feature Cards Section */}
      <FeatureCards />
    </div>
  );
}
