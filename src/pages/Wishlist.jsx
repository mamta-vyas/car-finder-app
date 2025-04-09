import React from "react";
import { useSelector } from "react-redux";
import CarCard from "../components/CarCard";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">No cars in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
