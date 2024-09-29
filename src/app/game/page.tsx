'use client'
import React, { useState } from "react";
import { Search, ShoppingCart, Home, User } from "lucide-react";

const games = [
  { id: 1, name: "Jenga", price: 19.99, image: "/api/placeholder/300/200" },
  { id: 2, name: "Chess", price: 29.99, image: "/api/placeholder/300/200" },
  {
    id: 3,
    name: "Basketball",
    price: 24.99,
    image: "/api/placeholder/300/200",
  },
];

const GameCard = ({ game }: { game: any }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
    <img
      src={game.image}
      alt={game.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{game.name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium">${game.price.toFixed(2)}</p>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const NavItem = ({
  Icon,
  label,
  isActive,
  onClick,
}: {
  Icon: any;
  label: any;
  isActive: any;
  onClick: any;
}) => (
  <button
    className={`flex flex-col items-center space-y-1 ${
      isActive ? "text-indigo-500" : "text-gray-600"
    }`}
    onClick={onClick}
  >
    <Icon size={24} />
    <span className="text-xs">{label}</span>
  </button>
);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-100 min-h-screen pb-16">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-white">
          Game Store
        </h1>
      </header>

      <main className="p-4">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
          />
          <Search
            size={20}
            className="absolute right-4 top-3.5 text-gray-400"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
          Featured Games
        </h2>
        <div className="space-y-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl">
        <div className="flex justify-around items-center p-2">
          <NavItem
            Icon={Home}
            label="Home"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavItem
            Icon={Search}
            label="Search"
            isActive={activeTab === "search"}
            onClick={() => setActiveTab("search")}
          />
          <NavItem
            Icon={ShoppingCart}
            label="Cart"
            isActive={activeTab === "cart"}
            onClick={() => setActiveTab("cart")}
          />
          <NavItem
            Icon={User}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
