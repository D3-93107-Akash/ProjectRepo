
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PublishRide() {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(2);
  const [fromCity, setFromCity] = useState("Delhi");
  const [toCity, setToCity] = useState("Jaipur");
  const navigate = useNavigate();

  const goToPickup=()=>{
     navigate("/pickup")
  }

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === "") {
      setValue("");
      return;
    }
    val = Number(val);
    if (val < 1) val = 1;
    if (val > 8) val = 8;
    setValue(val);
  };

  const handleBlur = () => {
    if (value === "" || value < 1) setValue(1);
    if (value > 8) setValue(8);
  };

  const handlePublish = () => {
   if(fromCity!="" && toCity!=""){
    toast.success(
      `Ride published from ${fromCity} to ${toCity} for ${value || 0} passengers on ${date.toDateString()}`
    );
   }
   else{
    toast.warn(
      `Please fill all the fields!!`
    );
   }
  };

  return (
    <div className="w-full bg-[#E9F5FB] py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#003366] text-center">
        Become a CabBuddy driver and save on travel costs
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center">
        by sharing your ride with passengers.
      </p>

      <div className="mt-10 flex items-center gap-20 max-w-6xl">
        <Card className="group w-[350px] border-none rounded-3xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="h-4 w-4 rounded-full border-2 border-gray-400 transition-colors duration-200 group-hover:border-[#009EEB]" />
                  <Input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="border-none px-0 py-0 h-7 text-base font-medium text-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="From city"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="ml-2 text-lg text-[#009EEB] font-semibold hover:rotate-180 transition-transform duration-300"
                >
                  ⇄
                </button>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex items-center gap-3 flex-1">
                <span className="h-4 w-4 rounded-full border-2 border-gray-400 transition-colors duration-200 group-hover:border-[#009EEB]" />
                <Input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="border-none px-0 py-0 h-7 text-base font-medium text-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="To city"
                />
              </div>
            </div>

            <div className="pt-2">
              <Label className="font-medium mb-1 block text-sm text-gray-700">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left text-sm hover:bg-slate-50 transition-colors duration-200"
                  >
                    {date.toDateString()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 text-sm group-hover:bg-[#009EEB]/10 transition-colors duration-200">
                  👤
                </span>
                <p className="text-sm font-medium text-gray-800 group-hover:text-[#003366] transition-colors duration-200">
                  {value || 0} passengers
                </p>
              </div>
              <Input
                type="number"
                value={value}
                min={1}
                max={8}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-16 h-9 text-sm focus-visible:ring-[#009EEB] transition-shadow duration-200"
              />
            </div>

            <p className="text-lg font-semibold leading-snug pt-1">
              Save up to{" "}
              <span className="text-[#009EEB] text-2xl font-bold group-hover:text-[#0077b6] transition-colors duration-200">
                ₹1,624
              </span>{" "}
              on your first ride.
            </p>

            <Button
              className="w-full bg-[#00aff5] hover:bg-[#0085c7] text-white font-bold rounded-xl mt-2 transition-transform duration-200 hover:scale-[1.02]"
              onClick={goToPickup}
            >
              Publish a ride
            </Button>
          </CardContent>
        </Card>

        <img
          src="/assets/pic2.svg"
          alt="carpool"
          className="w-[200px] md:w-[400px] lg:w-[500px]"
        />
      </div>
    </div>
  );
}
