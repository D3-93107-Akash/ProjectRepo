"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

export default function SearchBox() {
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-[75%] flex bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Leaving From */}
        <div className="flex items-center gap-2 px-4 py-4 flex-1 border-r hover:bg-gray-100 cursor-pointer transition">
          <MapPin className="h-5 w-5 text-gray-600" />
          <Input
            placeholder="Leaving from"
            className="border-none shadow-none focus-visible:ring-0 p-0"
          />
        </div>

        {/* Going To */}
        <div className="flex items-center gap-2 px-4 py-4 flex-1 border-r hover:bg-gray-100 cursor-pointer transition">
          <MapPin className="h-5 w-5 text-gray-600" />
          <Input
            placeholder="Going to"
            className="border-none shadow-none focus-visible:ring-0 p-0"
          />
        </div>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 px-4 py-4 flex-1 border-r cursor-pointer hover:bg-gray-100 transition">
              <CalendarDays className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">
                {format(date, "dd MMM yyyy")}
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-0 bg-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Passenger Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 px-4 py-4 flex-1 border-r cursor-pointer hover:bg-gray-100 transition">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">
                {passengers} Passenger{passengers > 1 ? "s" : ""}
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-40 p-4 bg-white">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              >
                −
              </Button>

              <span className="text-lg font-semibold">{passengers}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setPassengers((p) => Math.min(8, p + 1))}
              >
                +
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button className="bg-[#00AFFF] text-white font-semibold w-[130px] text-lg rounded-none h-full cursor-pointer hover:bg-[#0095db] transition">
          Search
        </Button>

      </div>
    </div>
  );
}
