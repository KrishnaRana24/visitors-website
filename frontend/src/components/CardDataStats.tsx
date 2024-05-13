// "use client";
// import React, { ReactNode } from "react";

// interface CardDataStatsProps {
//   title: string;
//   total: number;
//   rate: string;
//   levelUp?: boolean;
//   levelDown?: boolean;
//   children: ReactNode;
// }

// const CardDataStats: React.FC<CardDataStatsProps> = ({
//   title,
//   total,
//   rate,
//   levelUp,
//   levelDown,
//   children,
// }) => {
//   return (
//     <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
//       <div className="flex items-center justify-center bg-gray-200 rounded-full w-14 h-14">
//         {children}
//       </div>

//       <div className="mt-4 flex items-end justify-between">
//         <div>
//           <h4 className="text-xl font-semibold text-gray-800">{total}</h4>
//           <span className="text-sm font-medium text-gray-600">{title}</span>
//         </div>

//         <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
//           {rate}

//           {/* {levelUp && (
//             <svg
//               className="fill-current text-green-500 w-4 h-4"
//               viewBox="0 0 20 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M19.707 10.293l-7-7a1 1 0 00-1.414 1.414L16.586 10H2a1 1 0 100 2h14.586l-5.293 5.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414z"
//                 fill="currentColor"
//               />
//             </svg>
//           )}
//           {levelDown && (
//             <svg
//               className="fill-current text-red-500 w-4 h-4"
//               viewBox="0 0 20 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M19.707 9.707l-7-7a1 1 0 00-1.414 1.414L16.586 10H2a1 1 0 100 2h14.586l-5.293 5.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414z"
//                 fill="currentColor"
//               />
//             </svg>
//           )} */}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CardDataStats;
