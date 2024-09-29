import React from "react";
import {
  Search,
  MapPin,
  Home,
  TrendingUp,
  ArrowRight,
  Star,
  Mail,
} from "lucide-react";
import Navigation from "./navigation";

// Color theme extraction
const theme = {
  primary: {
    main: "blue-500",
    light: "blue-300",
    dark: "blue-600",
    contrastText: "white",
  },
  secondary: {
    main: "gray-600",
    light: "gray-300",
    dark: "gray-900",
  },
  background: {
    default: "gray-50",
    paper: "white",
  },
  text: {
    primary: "gray-900",
    secondary: "gray-600",
  },
  action: {
    hover: "gray-100",
  },
};

const PropertyHomePage = () => {
  return (
    <div
      className={`flex flex-col min-h-screen bg-${theme.background.default}`}
    >
      <header className={`bg-${theme.background.paper} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className={`text-3xl font-extrabold text-${theme.text.primary}`}>
            find<span className={`text-${theme.primary.main}`}>space</span>
          </h1>
        </div>
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <h2
              className={`text-4xl font-bold text-${theme.text.primary} mb-4`}
            >
              Discover your perfect space
            </h2>
            <p className={`text-xl text-${theme.text.secondary} mb-6`}>
              Rent, buy, or invest in properties that match your lifestyle
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search for properties..."
                className={`w-full pl-12 pr-20 py-4 text-lg rounded-full border border-${theme.secondary.light} focus:outline-none focus:ring-2 focus:ring-${theme.primary.main} transition duration-300`}
              />
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-${theme.secondary.main}`}
                size={24}
              />
              <button
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-${theme.primary.main} text-${theme.primary.contrastText} p-2 rounded-full hover:bg-${theme.primary.dark} transition duration-300`}
              >
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
              <h2 className={`text-2xl font-bold text-${theme.text.primary}`}>
                Featured Spaces
              </h2>
              <button
                className={`text-${theme.primary.main} font-semibold flex items-center hover:text-${theme.primary.dark} transition duration-300`}
              >
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

          <section
            className={`bg-${theme.primary.main} rounded-xl p-8 text-${theme.primary.contrastText}`}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-6">
              Get faster updates about new properties and exclusive offers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-grow py-3 px-4 rounded-full text-${theme.text.primary} focus:outline-none focus:ring-2 focus:ring-${theme.primary.light}`}
              />
              <button
                className={`bg-${theme.primary.contrastText} text-${theme.primary.main} font-semibold py-3 px-6 rounded-full hover:bg-${theme.primary.light} transition duration-300 flex items-center justify-center`}
              >
                <Mail className="mr-2" size={20} />
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </main>

      <Navigation />
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
        ? `bg-${theme.primary.main} text-${theme.primary.contrastText} hover:bg-${theme.primary.dark}`
        : `bg-${theme.background.paper} text-${theme.text.secondary} hover:bg-${theme.action.hover} border border-${theme.secondary.light}`
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
  <div
    className={`bg-${theme.background.paper} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300`}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className={`font-bold text-xl mb-2 text-${theme.text.primary}`}>
        {title}
      </h3>
      <p className={`text-${theme.text.secondary} mb-2`}>{location}</p>
      <div className="flex justify-between items-center">
        <p className={`text-${theme.primary.main} font-bold text-lg`}>
          {price}
        </p>
        <div
          className={`flex items-center bg-${theme.primary.light} bg-opacity-20 px-2 py-1 rounded-full`}
        >
          <span className={`text-${theme.primary.main} font-medium mr-1`}>
            {rating}
          </span>
          <Star className={`w-4 h-4 text-${theme.primary.main} fill-current`} />
        </div>
      </div>
    </div>
  </div>
);

export default PropertyHomePage;
