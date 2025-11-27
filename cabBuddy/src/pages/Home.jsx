"use client";

import SearchBox from "@/components/searchBox";
import FeatureCards from "@/components/featureCard";

export default function Home() {
  return (
    <div className="w-full">


      <div
        className="h-[45vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center pt-8"
        style={{
          backgroundImage: "url('/assets/pic1.svg')",
        }}
      >
        <h1 className="text-5xl font-bold text-white mt-10">
          Quality rides that fit your budget
        </h1>
        <p className="text-white text-lg mb-40">
          Book your cab quickly and easily
        </p>

        
        <SearchBox />
      </div>

   
      <div className="mt-[20vh] md:mt-40">
        <FeatureCards />
      </div>
    </div>
  );
}
