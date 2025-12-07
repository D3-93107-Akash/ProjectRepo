// // import React from "react";

// // /**
// //  * AvailableRideCard
// //  * Props:
// //  * - startTime (string)
// //  * - duration (string)
// //  * - endTime (string)
// //  * - from (string)
// //  * - to (string)
// //  * - price (number)
// //  * - driver: { name, avatar, rating }
// //  */
// // export default function AvailableRideCard({
// //   startTime,
// //   duration,
// //   endTime,
// //   from,
// //   to,
// //   price,
// //   driver = {},
// // }) {
// //   const { name = "Driver", avatar, rating = 5.0 } = driver;

// //   return (
// //     <div className="max-w-3xl mx-auto bg-white border-2 border-teal-400 rounded-2xl overflow-hidden shadow-sm my-4">
// //       {/* Top Section */}
// //       <div className="px-6 py-4 border-b">
// //         <div className="flex items-center justify-between">
// //           <div className="flex-1">
// //             <div className="flex items-center justify-between">
// //               <div className="text-sm font-semibold text-teal-900 flex items-center gap-4">
// //                 {/* Start */}
// //                 <div className="text-left">
// //                   <div className="text-lg">{startTime}</div>
// //                   <div className="text-xs text-gray-500">{from}</div>
// //                 </div>

// //                 {/* Timeline */}
// //                <div className="flex-1 px-4">
// //   <div className="relative flex items-center w-full">

// //     {/* Start Time Dot */}
// //     <div className="w-3 h-3 rounded-full border-2 border-teal-900 bg-white"></div>

// //     {/* Line (full stretch between dots) */}
// //     <div className="flex-1 h-[2px] bg-teal-900 mx-2 relative">
// //       {/* Duration label centered */}
// //       <span className="absolute left-1/2 -translate-x-1/2 -top-4 text-xs text-gray-600">
// //         {duration}
// //       </span>
// //     </div>

// //     {/* End Time Dot */}
// //     <div className="w-3 h-3 rounded-full border-2 border-teal-900 bg-white"></div>

// //   </div>
// // </div>

// //                 {/* End */}
// //                 <div className="text-right">
// //                   <div className="text-lg">{endTime}</div>
// //                   <div className="text-xs text-gray-500">{to}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Price */}
// //           <div className="ml-6 text-right">
// //             <div className="text-2xl font-bold text-teal-900">₹{price}</div>
// //             <div className="text-xs text-gray-400">00</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Driver Section */}
// //       <div className="px-6 py-3 flex items-center gap-4">
// //         {/* Car Icon */}
// //         <div className="flex-shrink-0">
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="w-8 h-8 text-gray-400"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="1.5"
// //           >
// //             <path d="M3 13l1.5-4.5A2 2 0 016.3 7h11.4a2 2 0 011.8 1.5L21 13" />
// //             <path d="M5 17a1 1 0 100-2 1 1 0 000 2zm14 0a1 1 0 100-2 1 1 0 000 2z" />
// //             <path d="M7 13v3M17 13v3" />
// //           </svg>
// //         </div>

// //         {/* Driver Avatar + Info */}
// //         <div className="flex items-center gap-3 flex-1">
// //           <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
// //             {avatar ? (
// //               <img src={avatar} alt={name} className="w-full h-full object-cover" />
// //             ) : (
// //               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
// //                 <span className="text-sm">DP</span>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex-1">
// //             <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
// //               <span>{name}</span>
// //               <span className="text-xs text-teal-600">✔︎</span>
// //               <span className="text-xs text-gray-400">★ {rating.toFixed(1)}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="w-8" />
// //       </div>
// //     </div>
// //   );
// // }

// // =============================== code 2 

// // src/components/AvailableRideCard.jsx
// import React from "react";

// /**
//  * AvailableRideCard - improved timeline alignment & visible track
//  */
// export default function AvailableRideCard({
//   startTime,
//   duration,
//   endTime,
//   from,
//   to,
//   price,
//   driver = {},
// }) {
//   const { name = "Driver", avatar, rating = 5.0 } = driver;

//   return (
//     <div className="max-w-3xl mx-auto bg-white border-2 border-teal-400 rounded-2xl overflow-hidden shadow-sm my-4">
//       {/* Top Section */}
//       <div className="px-6 py-4 border-b">
//         <div className="flex items-center justify-between">
//           <div className="flex-1 pr-6">
//             <div className="flex items-center justify-between">
//               {/* Start time */}
//               <div className="text-left w-20">
//                 <div className="text-lg font-semibold text-teal-900">{startTime}</div>
//                 <div className="text-xs text-gray-500">{from}</div>
//               </div>

//               {/* TIMELINE: robust, centered, visible */}
//               <div className="flex-1 px-4">
//                 <div className="relative flex items-center h-8">
//                   {/* Background (faint) full-width track */}
//                   <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />

//                   {/* Foreground (filled) narrower track with horizontal padding to give space for dots */}
//                   <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-teal-800 rounded-full" />

//                   {/* Left dot (start) */}
//                   <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-teal-800">
//                     <div className="w-2.5 h-2.5 rounded-full bg-white" />
//                   </div>

//                   {/* Right dot (end) - positioned with margin-left: auto */}
//                   <div className="ml-auto relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-teal-800">
//                     <div className="w-2.5 h-2.5 rounded-full bg-white" />
//                   </div>

//                   {/* Duration label centered above the filled track */}
//                   <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs text-gray-600 font-medium">
//                     {duration}
//                   </div>
//                 </div>
//               </div>

//               {/* End time */}
//               <div className="text-right w-20">
//                 <div className="text-lg font-semibold text-teal-900">{endTime}</div>
//                 <div className="text-xs text-gray-500">{to}</div>
//               </div>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="ml-6 text-right w-28">
//             <div className="text-2xl font-bold text-teal-900">₹{price}</div>
//             <div className="text-xs text-gray-400">00</div>
//           </div>
//         </div>
//       </div>

//       {/* Driver Section */}
//       <div className="px-6 py-3 flex items-center gap-4">
//         {/* Car Icon */}
//         <div className="flex-shrink-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-8 h-8 text-gray-400"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//           >
//             <path d="M3 13l1.5-4.5A2 2 0 016.3 7h11.4a2 2 0 011.8 1.5L21 13" />
//             <path d="M5 17a1 1 0 100-2 1 1 0 000 2zm14 0a1 1 0 100-2 1 1 0 000 2z" />
//             <path d="M7 13v3M17 13v3" />
//           </svg>
//         </div>

//         {/* Driver Avatar + Info */}
//         <div className="flex items-center gap-3 flex-1">
//           <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
//             {avatar ? (
//               <img src={avatar} alt={name} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
//                 <span className="text-sm">DP</span>
//               </div>
//             )}
//           </div>

//           <div className="flex-1">
//             <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
//               <span>{name}</span>
//               <span className="text-xs text-teal-600">✔︎</span>
//               <span className="text-xs text-gray-400">★ {rating.toFixed(1)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="w-8" />
//       </div>
//     </div>
//   );
// }

// code 2 with blue theme 

import React from "react";

export default function AvailableRideCard({
  startTime,
  duration,
  endTime,
  from,
  to,
  price,
  driver = {},
}) {
  const { name = "Driver", avatar, rating = 5.0 } = driver;

  return (
    <div className="max-w-3xl mx-auto bg-white border-2 border-blue-400 rounded-2xl overflow-hidden shadow-sm my-4">
      {/* Top Section */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-6">
            <div className="flex items-center justify-between">
              {/* Start time */}
              <div className="text-left w-20">
                <div className="text-lg font-semibold text-blue-900">{startTime}</div>
                <div className="text-xs text-gray-500">{from}</div>
              </div>

              {/* TIMELINE — Now BLUE Theme */}
              <div className="flex-1 px-4">
                <div className="relative flex items-center h-8">
                  
                  {/* Background (faint) */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />

                  {/* Foreground (blue line) */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-blue-700 rounded-full" />

                  {/* Left Dot */}
                  <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-blue-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>

                  {/* Right Dot (pushed to right) */}
                  <div className="ml-auto relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-blue-700">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>

                  {/* Duration label */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-xs text-gray-600 font-medium">
                    {duration}
                  </div>
                </div>
              </div>

              {/* End time */}
              <div className="text-right w-20">
                <div className="text-lg font-semibold text-blue-900">{endTime}</div>
                <div className="text-xs text-gray-500">{to}</div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="ml-6 text-right w-28">
            <div className="text-2xl font-bold text-blue-900">₹{price}</div>
            <div className="text-xs text-gray-400">00</div>
          </div>
        </div>
      </div>

      {/* Driver Section */}
      <div className="px-6 py-3 flex items-center gap-4">
        {/* Car Icon */}
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 13l1.5-4.5A2 2 0 016.3 7h11.4a2 2 0 011.8 1.5L21 13" />
            <path d="M5 17a1 1 0 100-2 1 1 0 000 2zm14 0a1 1 0 100-2 1 1 0 000 2z" />
            <path d="M7 13v3M17 13v3" />
          </svg>
        </div>

        {/* Driver Avatar + Info */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <span className="text-sm">DP</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <span>{name}</span>
              <span className="text-xs text-blue-600">✔︎</span>
              <span className="text-xs text-gray-500">★ {rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="w-8" />
      </div>
    </div>
  );
}
