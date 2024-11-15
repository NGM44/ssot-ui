// // "use client";
// // import Link from "next/link";
// // import React from "react";

// // const LandingPage = () => {
// //   const games = [
// //     {
// //       id: "sos",
// //       name: "SOS Game",
// //       description: "Connect letters to form SOS patterns and score points!",
// //       route: "/sos",
// //       color: "from-blue-500 to-cyan-600",
// //     },
// //     {
// //       id: "xo",
// //       name: "Super XO",
// //       description: "Experience the classic game with a strategic twist!",
// //       route: "/xo",
// //       color: "from-indigo-500 to-purple-600",
// //     },
// //     {
// //       id: "chess",
// //       name: "Chess",
// //       description: "Master the ultimate game of strategy and tactics!",
// //       route: "",
// //       color: "from-emerald-500 to-teal-600",
// //     },
// //     {
// //       id: "code",
// //       name: "JavaScript Arena",
// //       description: "Test your coding skills with JavaScript challenges!",
// //       route: "/code",
// //       color: "from-amber-500 to-orange-600",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-8 md:p-16">
// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(-20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //         @keyframes float {
// //           0% {
// //             transform: translateY(0px);
// //           }
// //           50% {
// //             transform: translateY(-10px);
// //           }
// //           100% {
// //             transform: translateY(0px);
// //           }
// //         }
// //         .fade-in {
// //           animation: fadeIn 1s ease-out;
// //         }
// //         .float {
// //           animation: float 3s ease-in-out infinite;
// //         }
// //       `}</style>

// //       <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center fade-in">
// //         <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
// //           Game Center
// //         </span>
// //       </h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
// //         {games.map((game) => (
// //           <div
// //             key={game.id}
// //             className="bg-white/80 rounded-lg p-6 shadow-lg fade-in"
// //           >
// //             <h2
// //               className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${game.color} mb-4`}
// //             >
// //               {game.name}
// //             </h2>

// //             <p className="text-gray-700 mb-6 h-16">{game.description}</p>

// //             {game.route ? (
// //               <Link href={game.route}>
// //                 <div className="float">
// //                   <button
// //                     className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
// //                   >
// //                     Play Now
// //                   </button>
// //                 </div>
// //               </Link>
// //             ) : (
// //               // <Link href={game.route}>
// //               <div className="float">
// //                 <button
// //                   className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
// //                 >
// //                   Coming Soon
// //                 </button>
// //               </div>
// //               // </Link>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-12 text-gray-500 text-center fade-in">
// //         <p>© 2024 Game Center. All rights reserved.</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;
// "use client";
// import Link from "next/link";
// import React from "react";

// const LandingPage = () => {
//   const games = [
//     {
//       id: "sos",
//       name: "SOS Game",
//       description: "Connect letters to form SOS patterns and score points!",
//       route: "/sos",
//       color: "from-blue-500 to-cyan-600",
//     },
//     {
//       id: "xo",
//       name: "Super XO",
//       description: "Experience the classic game with a strategic twist!",
//       route: "/xo",
//       color: "from-indigo-500 to-purple-600",
//     },
//     {
//       id: "chess",
//       name: "Chess",
//       description: "Master the ultimate game of strategy and tactics!",
//       route: "",
//       color: "from-emerald-500 to-teal-600",
//     },
//     {
//       id: "code",
//       name: "JavaScript Arena",
//       description: "Test your coding skills with JavaScript challenges!",
//       route: "/code",
//       color: "from-amber-500 to-orange-600",
//     },
//   ];

//   const upcomingGames = [
//     {
//       name: "Puzzle Quest",
//       description: "Brain-teasing puzzles await!",
//       releaseDate: "Summer 2024",
//     },
//     {
//       name: "Strategy Masters",
//       description: "Build your empire, conquer worlds",
//       releaseDate: "Fall 2024",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-8 md:p-16">
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes float {
//           0% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           100% {
//             transform: translateY(0px);
//           }
//         }
//         .fade-in {
//           animation: fadeIn 1s ease-out;
//         }
//         .float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>

//       <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center fade-in">
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
//           Game Center
//         </span>
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {games.map((game) => (
//           <div
//             key={game.id}
//             className="bg-white/80 rounded-lg p-6 shadow-lg fade-in"
//           >
//             <h2
//               className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${game.color} mb-4`}
//             >
//               {game.name}
//             </h2>

//             <p className="text-gray-700 mb-6 h-16">{game.description}</p>

//             {game.route ? (
//               <Link href={game.route}>
//                 <div className="float">
//                   <button
//                     className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
//                   >
//                     Play Now
//                   </button>
//                 </div>
//               </Link>
//             ) : (
//               <div className="float">
//                 <button
//                   className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
//                 >
//                   Coming Soon
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* New Upcoming Games Section */}
//       <div className="mt-20 max-w-4xl mx-auto text-center fade-in">
//         <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
//           More Excitement Ahead!
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {upcomingGames.map((game, index) => (
//             <div
//               key={index}
//               className="bg-white/60 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                 {game.name}
//               </h3>
//               <p className="text-gray-600 mb-4">{game.description}</p>
//               <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
//                 Coming {game.releaseDate}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-12 text-gray-500 text-center fade-in">
//         <p>© 2024 Game Center. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
"use client";
import Link from "next/link";
import React from "react";
import {
  Brain,
  Trophy,
  Code,
  Puzzle,
  Castle,
  Sparkles,
  Clock,
  Gamepad,
} from "lucide-react";

const LandingPage = () => {
  const games = [
    {
      id: "sos",
      name: "SOS Game",
      description: "Connect letters to form SOS patterns and score points!",
      route: "/sos",
      color: "from-blue-500 to-cyan-600",
      icon: Gamepad,
    },
    {
      id: "xo",
      name: "Super XO",
      description: "Experience the classic game with a strategic twist!",
      route: "/xo",
      color: "from-indigo-500 to-purple-600",
      icon: Brain,
    },
    {
      id: "chess",
      name: "Chess",
      description: "Master the ultimate game of strategy and tactics!",
      route: "",
      color: "from-emerald-500 to-teal-600",
      icon: Trophy,
    },
    {
      id: "code",
      name: "JavaScript Arena",
      description: "Test your coding skills with JavaScript challenges!",
      route: "/code",
      color: "from-amber-500 to-orange-600",
      icon: Code,
    },
  ];

  const upcomingGames = [
    {
      name: "Puzzle Quest",
      description: "Brain-teasing puzzles await!",
      releaseDate: "Summer 2024",
      icon: Puzzle,
    },
    {
      name: "Strategy Masters",
      description: "Build your empire, conquer worlds",
      releaseDate: "Fall 2024",
      icon: Castle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-8 md:p-16">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center fade-in flex items-center justify-center gap-4">
        <Sparkles className="w-12 h-12 text-indigo-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Game Center
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white/80 rounded-lg p-6 shadow-lg fade-in"
          >
            <div className="flex items-center gap-3 mb-4">
              <game.icon
                className={`w-6 h-6 bg-gradient-to-r ${game.color} rounded-lg p-1 text-white`}
              />
              <h2
                className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${game.color}`}
              >
                {game.name}
              </h2>
            </div>

            <p className="text-gray-700 mb-6 h-16">{game.description}</p>

            {game.route ? (
              <Link href={game.route}>
                <div className="float">
                  <button
                    className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
                  >
                    Play Now
                  </button>
                </div>
              </Link>
            ) : (
              <div className="float">
                <button
                  className={`w-full py-3 bg-gradient-to-r ${game.color} text-white font-bold rounded-full text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg`}
                >
                  Coming Soon
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 max-w-4xl mx-auto text-center fade-in">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Clock className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            More Excitement Ahead!
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingGames.map((game, index) => (
            <div
              key={index}
              className="bg-white/60 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <game.icon className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
                Coming {game.releaseDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-gray-500 text-center fade-in">
        <p>© 2024 Game Center. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
