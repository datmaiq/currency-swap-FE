import React from "react";
import logo99Tech from "../assets/logo/99Tech.png";

const Navbar = ({ recentSwap, getTokenImage }) => {
  return (
    <nav className=" border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo99Tech} className="h-14" alt="Logo" />
        </a>
        {recentSwap.token && (
          <div className="flex items-center">
            <img
              src={getTokenImage(recentSwap.token)}
              alt={recentSwap.token}
              className="w-6 h-6 mr-2"
            />
            <span className="text-white font-bold">{`${
              recentSwap.amount
            } ${recentSwap.token.toUpperCase()}`}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
