import React from 'react';
import { TrendingUp, Mail, ArrowRight, DollarSign, MessageCircle } from 'lucide-react';

const InvestmentComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 text-center text-white">
      <div className="absolute inset-0 background-animate"></div>
      <div className="relative z-10 w-full max-w-md p-4 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-2 animate-fade-in-down">
          Invest<span className="text-yellow-300">Wise</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-8 opacity-90 animate-fade-in-up">
          Smart Investments, Coming Soon
        </h2>
        
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg mb-8 animate-fade-in">
          <TrendingUp size={48} className="mx-auto mb-6 text-yellow-300 animate-pulse" />
          <p className="text-lg mb-4">
            We&apos;re building a revolutionary platform to empower your financial future.
          </p>
          <p className="text-xl font-semibold">
            Get ready to invest smarter!
          </p>
        </div>
        
        <div className="space-y-4 animate-fade-in-up">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email for early access"
              className="w-full px-5 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:bg-opacity-30 transition duration-300 placeholder-white placeholder-opacity-70"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
          </div>
          <button className="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition duration-300 flex items-center justify-center group">
            Join the Waitlist
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          <button className="w-full gap-4 bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-white transition duration-300 flex items-center justify-center group">
          <MessageCircle />
          <p>Join Community</p> 
          
          </button>
        </div>

        <div className="mt-8 flex justify-center space-x-4 animate-fade-in">
          <div className="flex items-center">
            <DollarSign size={24} className="text-yellow-300 mr-2" />
            <span>Lease</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={24} className="text-yellow-300 mr-2" />
            <span>Co-own</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={24} className="text-yellow-300 mr-2" />
            <span>Real Estate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentComingSoonPage;

<style>{`
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .background-animate {
    background: linear-gradient(-45deg, #1a237e, #0d47a1, #01579b, #006064);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`}</style>