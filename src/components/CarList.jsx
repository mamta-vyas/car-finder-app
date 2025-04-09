// src/components/CarList.jsx
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import Filters from "./Filters";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    transmission: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
  });

  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const carsPerPage = 10;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("https://www.freetestapi.com/api/v1/cars");
        const data = await res.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cars" , err);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let updatedCars = [...cars];
    const { transmission, fuelType, minPrice, maxPrice, brand } = filters;

    if (transmission) {
      updatedCars = updatedCars.filter((car) => car.transmission === transmission);
    }
    if (fuelType) {
      updatedCars = updatedCars.filter((car) => car.fuelType === fuelType);
    }
    if (minPrice && !isNaN(Number(minPrice))) {
      updatedCars = updatedCars.filter((car) => car.price >= Number(minPrice));
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      updatedCars = updatedCars.filter((car) => car.price <= Number(maxPrice));
    }
    if (brand) {
      updatedCars = updatedCars.filter((car) =>
        car.make.toLowerCase().includes(brand.toLowerCase())
      );
    }
    if (sortOrder === "asc") {
      updatedCars.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updatedCars.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(updatedCars);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters, sortOrder, cars]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4 min-h-screen`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 ">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex gap-2 items-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded bg-orange-100 transform transition duration-300 hover:scale-105 hover:bg-orange-400 hover:shadow-lg"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-2 border bg-orange-100 rounded transform transition duration-300 hover:bg-orange-400 hover:scale-105 hover:shadow-lg"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2 items-center ">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-blue-400"
            } transform transition duration-300 hover:scale-105 hover:shadow-lg`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page ? "bg-blue-800 text-white" : "bg-white text-black hover:bg-blue-400"
                } transform transition duration-300 hover:scale-105 hover:shadow-lg`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-blue-400"
            } transform transition duration-300 hover:scale-105 hover:shadow-lg`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CarList;
