"use client"
import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock, MapPin, User, Truck, UtensilsCrossed, Video, Star } from 'lucide-react';

const BrutalistZomato = () => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 10000);
    return () => clearInterval(shakeInterval);
  }, []);

  return (
    <div className="font-mono bg-white text-black p-4">
      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .shake { animation: shake 0.5s; }
      `}</style>
      <div className={`flex justify-between items-center mb-4 border-4 border-black p-2 bg-red-600 text-white ${shake ? 'shake' : ''}`}>
        <div className="flex items-center">
          <MapPin className="mr-2" />
          <div className="text-xs">
            <div>Home</div>
            <div>Venkateshwara pg gents, Ashwath Nagar, ...</div>
          </div>
        </div>
        <User />
      </div>
      <div className="border-4 border-black p-2 mb-4 flex items-center">
        <Search className="mr-2 text-red-600" />
        <input type="text" placeholder="Restaurant name or a dish..." className="w-full bg-transparent outline-none" />
      </div>
      <div className="border-4 border-black p-2 mb-4 bg-red-100">
        <div className="text-center font-bold text-2xl mb-2 text-red-600">IT&apos;S OUR 16TH BIRTHDAY!</div>
        <div className="text-center mb-2">Explore offers</div>
        <div className="flex justify-around">
          {['🍰', '☕', '🍜', '🍕', '🍔'].map((emoji, index) => (
            <div key={index} className="text-2xl transform hover:scale-125 transition-transform">{emoji}</div>
          ))}
        </div>
      </div>
      <div className="flex mb-4">
        <div className="border-4 border-black p-2 mr-2 bg-red-600 text-white transform hover:translate-y-1 transition-transform">RECOMMENDED</div>
        <div className="border-4 border-black p-2 flex items-center bg-gray-200 transform hover:-translate-y-1 transition-transform">
          <Heart className="mr-2 text-red-600" /> FAVOURITES
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { name: 'Faasos - Wraps', offer: 'Get items @ ₹116 only', time: '35' },
          { name: 'Vijayalakshmi', offer: '20% OFF up to ₹50', time: '33' },
          { name: 'Szechuan Drag.', offer: '40% OFF up to ₹80', time: '43' },
          { name: 'Empire Restaur...', offer: 'Flat 10% OFF', time: '42' },
          { name: "Domino's Pizza", offer: '40% OFF up to ₹80', time: '36' },
          { name: 'KFC', offer: 'Up to 52% OFF', time: '38' }
        ].map((restaurant, index) => (
          <div key={index} className="border-4 border-black p-2 bg-gray-100 transform hover:rotate-1 transition-transform">
            <div className="font-bold">{restaurant.name}</div>
            <div className="text-red-600">{restaurant.offer}</div>
            <div className="flex items-center text-gray-600">
              <Clock className="mr-2" size={16} />
              <span>{restaurant.time} mins</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl font-bold mb-2 border-b-4 border-black pb-2 text-red-600">EXPLORE</div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {['Offers', 'Legends', 'Large Deals', 'Brand Packs'].map((item, index) => (
          <div key={index} className="border-4 border-black p-2 text-center bg-white hover:bg-yellow-400 transition-colors">
            <div className="font-bold">{item}</div>
          </div>
        ))}
      </div>
      <div className="flex mb-4">
        <div className="border-4 border-black p-2 mr-2 bg-red-600 text-white transform hover:translate-y-1 transition-transform">ALL</div>
        <div className="border-4 border-black p-2 flex items-center bg-green-500 text-white transform hover:-translate-y-1 transition-transform">
          NEW NEAR & FAST
        </div>
      </div>
      <div className="flex mb-4">
        <div className="border-4 border-black p-2 mr-2 bg-gray-200 transform hover:scale-105 transition-transform">Sort</div>
        <div className="border-4 border-black p-2 mr-2 bg-yellow-400 transform hover:scale-105 transition-transform">Gold offers</div>
        <div className="border-4 border-black p-2 mr-2 bg-red-600 text-white transform hover:scale-105 transition-transform">Great Offers</div>
        <div className="border-4 border-black p-2 bg-green-500 text-white transform hover:scale-105 transition-transform">Rating</div>
      </div>
      <div className="mb-4">
        <div className="border-4 border-black p-2 mb-2 bg-gray-100 hover:shadow-lg transition-shadow">
          <div className="font-bold">Crunchy Chicken Burger • ₹219</div>
          <div className="text-sm">Gochick</div>
          <div className="text-sm">Burger • Fast Food • ₹200 for one</div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2" size={16} />
            <span>48 mins • 3 km • Free Delivery</span>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-sm text-yellow-600">Extra 10% OFF</div>
            <div className="text-sm text-red-600">60% OFF up to ₹120</div>
          </div>
        </div>
        <div className="border-4 border-black p-2 bg-gray-100 hover:shadow-lg transition-shadow">
          <div className="font-bold">All American Chicken Burger • ₹267</div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2" size={16} />
            <span>37 mins • 1.5 km • Free Delivery</span>
          </div>
          <div className="flex items-center mt-2">
            <Star className="mr-1 text-green-500" size={16} />
            <span className="text-green-500 font-bold">4.2</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-t-4 border-black pt-2 text-gray-600">
        <div className="text-center">
          <Truck className="mx-auto text-red-600" />
          <div className="font-bold text-red-600">Delivery</div>
          <div className="underline">ACTIVE</div>
        </div>
        <div className="text-center">
          <UtensilsCrossed className="mx-auto" />
          <div>Dining</div>
        </div>
        <div className="text-center">
          <Video className="mx-auto" />
          <div>Live</div>
        </div>
      </div>
    </div>
  );
};

export default BrutalistZomato;