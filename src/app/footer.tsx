import React from "react";

const AnimatedSignature = () => {
  return (
    <div className="flex justify-center items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <p className="text-lg font-semibold">
        Developed by{" "}
        <a
          href="https://NGM44.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 decoration-yellow-300 hover:text-yellow-300 transition-colors duration-300"
        >
          NGM44
        </a>
      </p>
    </div>
  );
};

export default AnimatedSignature;
