import React from 'react';
import { Clock, Mail, ArrowRight, MessageCircle } from 'lucide-react';

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 text-center text-white">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-extrabold mb-2 animate-fade-in-down">
          Coming Soon
        </h1>
        <h2 className="text-2xl font-semibold mb-8 opacity-90 animate-fade-in-up">
          Property and Real Estate
        </h2>
        
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg mb-8 animate-fade-in">
          <Clock size={48} className="mx-auto mb-6 text-white animate-pulse" />
          <p className="text-lg mb-4">
            We&apos;re crafting an exceptional real estate experience for you.
          </p>
          <p className="text-xl font-semibold">
            Your dream property awaits!
          </p>
        </div>
        
        <div className="space-y-4 animate-fade-in-up">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="w-full px-5 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition duration-300 placeholder-white placeholder-opacity-70"
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
          </div>
          <button className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center group">
            Notify Me
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          <button className="w-full gap-4 bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-white transition duration-300 flex items-center justify-center group">
          <MessageCircle />
          <p>Join Community</p> 
          
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

<style>{`
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
