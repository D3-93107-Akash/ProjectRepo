import React, { useState } from "react";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const suggestions = [
    {
        title: "Sambhaji Nagar, N 1, Cidco, Maharashtra",
        subtitle:
            "Sambhaji Nagar, N 1, Cidco, Chhatrapati Sambhajinagar, Maharashtra",
    },
    {
        title: "Sambhaji Nagar, Maharashtra",
        subtitle: "India",
    },
    {
        title: "Wakadewadi, Shivajinagar, Maharashtra",
        subtitle: "Wakadewadi, Shivajinagar, Pune, Maharashtra",
    },
    {
        title: "Chhatrapati Shivaji Maharaj International Airport Mumbai",
        subtitle: "Mumbai, Maharashtra",
    },
    {
        title: "HPQ4+539",
        subtitle:
            "HPQ4+539, Hinjawadi Phase II, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra",
    },
];

export default function PickupPage() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const gotoValidation=()=>{
        if(value==""){
            toast.warn(`field is empty!!`)
        }
        else{
            navigate("/drop-off");
        }
    }

    // const goToDropOff = () => {
    //     navigate("/drop-off")
    // }

    const filtered = suggestions.filter((s) =>
        (s.title + " " + s.subtitle).toLowerCase().includes(value.toLowerCase())
    );

    return (
        <div className="min-h-screen flex items-start justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-3xl space-y-6">
                <h1 className="text-center text-4xl md:text-5xl font-bold text-slate-900">
                    Pick-up
                </h1>

                <Command className="rounded-3xl border bg-white shadow-md">
                    {/* Search bar */}
                    <div className="px-4 pb-3 pt-4 md:px-6">
                        <CommandInput
                            value={value}
                            onValueChange={setValue}
                            placeholder="Enter the full address"
                            className="h-12 rounded-full bg-slate-50 px-4 text-sm md:text-base border-0 focus-visible:ring-0 focus-visible:border-0"
                        />
                    </div>

                    {/* Scroll area with top underline */}
                    <ScrollArea className="max-h-[380px] border-t border-slate-200">
                        <CommandList>
                            <CommandEmpty className="py-6 text-center text-sm text-slate-500">
                                No locations found.
                            </CommandEmpty>

                            <CommandGroup>
                                {filtered.map((item, idx) => (
                                    <CommandItem
                                        key={idx}
                                        value={item.title}
                                        className="flex items-center justify-between gap-4 px-4 py-4 md:px-6 hover:bg-slate-50 cursor-pointer"
                                        onSelect={() => setValue(item.title)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 text-xs">
                                                🕒
                                            </div>
                                            <div>
                                                <p className="text-sm md:text-base font-semibold text-slate-900">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs md:text-sm text-slate-500">
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-slate-400 text-xl">&gt;</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </ScrollArea>

                    {/* Save button */}
                    <div className="px-0 pb-0 pt-3 md:px-0">
                        <Button

                            onClick={gotoValidation}
                            className="h-14 w-full rounded-b-3xl rounded-t-none bg-[#00aff5] hover:bg-sky-700 text-base font-semibold">
                            Save
                        </Button>
                    </div>
                </Command>
            </div>
        </div>
    );
}
