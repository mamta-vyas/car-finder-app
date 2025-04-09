// src/pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      const res = await fetch(`https://www.freetestapi.com/api/v1/cars/${id}`);
      const data = await res.json();
      setCar(data);
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  const handleWishlist = () => {
    dispatch(toggleWishlist(car));
  };

  if (loading) return <p className="p-4">Loading car details...</p>;
  if (!car) return <p className="p-4">Car not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto my-4 bg-cyan-300">
  <button
    onClick={() => navigate(-1)}
    className="mb-4 text-blue-600 underline"
  >
    ← Back
  </button>

  <div className="w-full flex justify-center">
    <div className="w-[30rem] bg-red-100 rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:bg-red-300 hover:shadow-lg">
      <img
        src={car.image}
        alt={car.make}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold">
        {car.make} {car.model}
      </h1>
      <p className="text-gray-600 text-lg">
        {car.year} • {car.transmission} • {car.fuelType}
      </p>
      <p className="text-gray-600">Seating: {car.seatingCapacity}</p>
      <p className="text-blue-600 text-xl font-bold my-4">${car.price}</p>

      <button onClick={handleWishlist} className="text-red-500 text-xl">
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  </div>
</div>

  );
};

export default CarDetails;
