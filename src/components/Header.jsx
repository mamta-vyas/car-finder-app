import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow flex justify-between">
      <Link to="/" className="text-xl font-bold">Car Finder</Link>
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/wishlist" className="hover:text-gray-300">Wishlist</Link>
      </nav>
    </header>
  );
};

export default Header;
