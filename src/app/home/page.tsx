import React from "react";
import {
  Search,
  MapPin,
  Home,
  TrendingUp,
  ArrowRight,
  Star,
  Icon,
  MessageCircle,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            find<span className="text-blue-500">space</span>
          </h1>
        </div>
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover your perfect space
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Rent, buy, or invest in properties that match your lifestyle
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search for properties..."
                className="w-full pl-12 pr-20 py-4 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition duration-300"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300">
                <MapPin size={20} />
              </button>
            </div>
          </section>

          <section className="mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <QuickFilterButton icon={<Home />} label="All" isActive={true} />
              <QuickFilterButton icon={<Home />} label="Rent" />
              <QuickFilterButton icon={<Home />} label="Buy" />
              <QuickFilterButton icon={<TrendingUp />} label="Invest" />
            </div>
          </section>

          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Spaces
              </h2>
              <button className="text-blue-500 font-semibold flex items-center hover:text-blue-600 transition duration-300">
                View all
                <ArrowRight className="ml-1" size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PropertyCard
                image="/api/placeholder/400/300"
                title="Luxe Loft"
                location="Downtown"
                price="$2,500/mo"
                rating={4.8}
              />
              <PropertyCard
                image="/api/placeholder/400/300"
                title="Serene Studio"
                location="Midtown"
                price="$1,800/mo"
                rating={4.5}
              />
              <PropertyCard
                image="/api/placeholder/400/300"
                title="Cozy Cottage"
                location="Suburbs"
                price="$2,200/mo"
                rating={4.7}
              />
            </div>
          </section>

          <section className="bg-blue-500 mb-16 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Whatsapp Community
            </h2>
            <p className="text-xl mb-6">
              Get faster updates about new properties and exclusive offers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-500 gap-4 font-semibold py-3 px-6 rounded-full hover:bg-blue-50 transition duration-300 flex items-center justify-center">
                <MessageCircle />
                <p>Join Community</p>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const QuickFilterButton = ({
  icon,
  label,
  isActive = false,
}: {
  icon: any;
  label: any;
  isActive?: any;
}) => (
  <button
    className={`flex items-center justify-center gap-2 p-3 rounded-xl transition duration-300 ${
      isActive
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const PropertyCard = ({
  image,
  title,
  location,
  price,
  rating,
}: {
  image: any;
  title: any;
  location: any;
  price: any;
  rating: any;
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{location}</p>
      <div className="flex justify-between items-center">
        <p className="text-blue-500 font-bold text-lg">{price}</p>
        <div className="flex items-center bg-blue-100 px-2 py-1 rounded-full">
          <span className="text-blue-500 font-medium mr-1">{rating}</span>
          <Star className="w-4 h-4 text-blue-500 fill-current" />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
