// src/components/Filters.jsx
import React, { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

const Filters = ({ filters, setFilters }) => {
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minPrice" || name === "maxPrice") {
      debouncedPriceChange(name, value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const debouncedPriceChange = useMemo(
    () =>
      debounce((name, value) => {
        setFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      }, 500),
    [setFilters]
  );

  useEffect(() => {
    return () => {
      debouncedPriceChange.cancel(); // Cleanup on unmount
    };
  }, [debouncedPriceChange]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 flex flex-wrap gap-4">
      <select
        name="transmission"
        value={filters.transmission}
        onChange={handleChange}
        className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        <option value="">All Transmissions</option>
        {transmissions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
  
      <select
        name="fuelType"
        value={filters.fuelType}
        onChange={handleChange}
        className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        <option value="">All Fuel Types</option>
        {fuelTypes.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
  
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        className="p-2 border rounded w-32 bg-white dark:bg-gray-700 dark:text-white"
        onChange={handleChange}
      />
  
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        className="p-2 border rounded w-32 bg-white dark:bg-gray-700 dark:text-white"
        onChange={handleChange}
      />
    </div>
  );
  
};

export default Filters;
