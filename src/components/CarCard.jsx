import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === car.id);

  const handleWishlist = (e) => {
    e.stopPropagation(); // prevent link click
    dispatch(toggleWishlist(car));
  };

  return (
    <div className="bg-cyan-300 rounded-lg shadow p-4 relative transform transition duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-lg">
      {/* Make image & title clickable */}
      <Link to={`/car/${car.id}`}>
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-xl font-semibold mt-2">
          {car.make} {car.model}
        </h2>
        <p className="text-gray-600">
          {car.year} • {car.transmission} • {car.fuelType}
        </p>
        <p className="text-blue-500 font-bold mt-2">${car.price}</p>
      </Link>

      {/* Wishlist heart button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default CarCard;
