
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRideById } from "@/api/rideApi";
import { format } from "date-fns";

export default function RequestBooking() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const readMore = () => setExpanded((s) => !s);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getRideById(id)
        .then(res => {
          setRide(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching ride:", err);
          setError("Failed to load ride details");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading ride details...</p>
      </main>
    );
  }

  if (error || !ride) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error || "Ride not found"}</p>
      </main>
    );
  }

  // Format date for display
  const rideDate = ride.rideDate ? new Date(ride.rideDate) : new Date();
  const formattedDate = format(rideDate, "EEEE, d MMMM");

  // Format time (remove seconds if present)
  const rideTime = ride.rideTime ? ride.rideTime.substring(0, 5) : "00:00";

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* DATE HEADER */}
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-sky-900">
            {formattedDate}
          </h1>
        </header>

        {/* TOP: ROUTE CARD (fixed grid for alignment) */}
        <section className="mb-6">
          <div className="relative bg-white rounded-xl shadow-sm border border-transparent overflow-hidden">
            {/* check icon top-right */}
            <div className="absolute right-4 top-4">
              <div className="h-8 w-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#86efac"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="p-6">
              {/* grid: left time, middle timeline, right details */}
              <div className="grid grid-cols-[72px_24px_1fr] gap-4 items-start">
                {/* LEFT: First stop time + duration */}
                <div className="text-left">
                  <div className="text-sky-900 font-semibold text-base">
                    {rideTime}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">--</div>
                </div>

                {/* MIDDLE: timeline (TOP DOT → LINE) */}
                <div className="flex flex-col items-center">
                  {/* top dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-700 mt-1" />

                  {/* slightly darker vertical line (no bottom dot here) */}
                  <div
                    className="flex-1 w-px bg-slate-300 my-1"
                    style={{ minHeight: 50 }}
                  />
                </div>

                {/* RIGHT: First stop details */}
                <div className="pl-1">
                  <div className="text-sky-900 font-semibold text-lg">{ride.source}</div>
                  <div className="text-sm text-slate-600 mt-2">
                    Pickup location
                  </div>
                </div>
              </div>

              {/* spacer between stops */}
              <div className="mt-4" />

              {/* second stop row uses the same columns but left column shows second time aligned under the first */}
              <div className="grid grid-cols-[72px_24px_1fr] gap-4 items-start mt-2">
                {/* LEFT: second stop time + (empty duration place) */}
                <div className="text-left">
                  <div className="text-sky-900 font-semibold text-base">
                    06:40
                  </div>
                  {/* If there's a second duration or ETA, place here; else keep spacing */}
                  <div className="text-xs text-slate-400 mt-1">&nbsp;</div>
                </div>

                {/* MIDDLE: bottom dot aligned with the top dot above */}
                <div className="flex flex-col items-center">
                  {/* bottom dot only (ensures total dots = 2) */}
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                </div>

                {/* RIGHT: second stop details */}
                <div className="pl-1">
                  <div className="text-sky-900 font-semibold">{ride.destination}</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Drop-off location
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DRIVER / DETAILS CARD */}
        <section className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-transparent overflow-hidden">
            <div className="p-6">
              {/* Header row: avatar + name + rating (arrow removed) */}
              <div className="flex items-center gap-4 mb-2">
                <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-sky-200">
                  {/* avatar */}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3.2"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M4 20c1.8-3.2 5-5 8-5s6.2 1.8 8 5"
                      stroke="#cbd5e1"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-sky-900 font-semibold text-lg">{ride.driverName || "Driver"}</div>
                  <div className="text-sm text-slate-500 mt-1">
                    ★ 4.8/5 - 186 ratings
                  </div>
                </div>
              </div>

              {/* small badges / highlights */}
              <div className="mt-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-sky-50">
                    {/* Verified shield (blue theme) */}
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                      <path
                        d="M12 2.2l7 3.2v4.1c0 4.3-2.9 8.1-7 9.7-4.1-1.6-7-5.4-7-9.7V5.4l7-3.2z"
                        fill="#E0F2FE" /* light sky */
                        stroke="#0284C7" /* sky-600 */
                        strokeWidth="0.6"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M9 12.2l1.8 1.6L15 10.6"
                        stroke="#ffffff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-slate-700">Verified Profile</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-sky-50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {/* Calendar outline (blue theme) */}
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="2.2"
                        stroke="#0284C7"
                        strokeWidth="1.5"
                      />

                      {/* Top rings */}
                      <path
                        d="M7 3v4M17 3v4"
                        stroke="#0284C7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />

                      {/* Dots inside calendar */}
                      <circle cx="9" cy="11" r="1" fill="#0284C7" />
                      <circle cx="13" cy="11" r="1" fill="#0284C7" />
                      <circle cx="17" cy="11" r="1" fill="#0284C7" />

                      {/* Centered checkmark */}
                      <path
                        d="M10.5 15.5l2 2 3.5-3.5"
                        stroke="#0284C7"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-slate-700">
                    Rarely cancels rides
                  </div>
                </div>
              </div>

              <hr className="my-5 border-slate-100" />

              {/* rules / description with read more */}
              <div className="text-slate-700 text-sm leading-6">
                <p>
                  Strictly <span className="font-semibold">NO</span> for any
                  size Trolley bag / Suitcase / Heavy luggage. Ensure your
                  profile is complete and verified prior to booking.
                </p>

                {!expanded ? (
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-slate-500">…</div>
                    <button
                      onClick={readMore}
                      className="text-sky-500 text-sm font-medium hover:underline focus:outline-none"
                    >
                      read more
                    </button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="text-slate-600">
                      Strictly <span className="font-semibold">NO</span> for any
                      size Trolley bag / Suitcase / Heavy luggage. Ensure your
                      profile is complete and verified prior to booking.
                      <br />
                      Driver may refuse pickup for unsafe items or large bulky
                      luggage. Please contact driver for clarifications.
                    </p>
                    <div className="mt-2 text-right">
                      <button
                        onClick={readMore}
                        className="text-sky-500 text-sm font-medium hover:underline focus:outline-none"
                      >
                        show less
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <hr className="my-5 border-slate-100" />

              {/* small informational rows */}
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="12"
                        rx="2"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M7 10h10"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    Your booking won't be confirmed until the driver approves
                    your request
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 7h16"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 12h10"
                        stroke="#94a3b8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>I'd prefer not to travel with pets</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING BUTTON AREA */}
        <section className="mt-4">
          <div className="bg-white rounded-xl shadow-sm border border-transparent p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-500 text-sm">Seats available</div>
                <div className="text-sky-900 font-semibold">{ride.availableSeats} seat{ride.availableSeats !== 1 ? 's' : ''}</div>
              </div>

              <div className="text-right">
                <div className="text-slate-500 text-sm">Price per seat</div>
                <div className="text-sky-900 font-semibold">₹ {ride.pricePerSeat}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100"></div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="button"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                onClick={() => {
                  // booking action here — replace with your action
                  alert("Booking request sent (replace with real action).");
                }}
              >
                Book ride
              </button>

              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 px-5 py-3 font-medium hover:bg-slate-50 focus:outline-none"
                onClick={() => {
                  // optional: open chat, message driver, or cancel
                  alert("Open contact / message (replace with real action).");
                }}
              >
                Contact driver
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
