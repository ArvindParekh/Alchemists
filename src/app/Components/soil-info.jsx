"use client";

import { useState } from "react";

const SoilInfo = () => {
   const [soilData] = useState([
      {
         location: "Ahmedabad",
         dateCollected: "2023-04-01",
         soilType: "loam",
         phLevel: 7.5,
         moistureContent: 20,
         organicMatter: 5,
         nutrientLevels: {
            nitrogen: 10,
            phosphorus: 20,
            potassium: 30,
         },
         texture: "coarse",
         salinity: "low",
         suitabilityForCrops: "high",
      },
      // ... more soil samples
   ]);

   return (
    <section className="bg-green-500 p-6 rounded-lg shadow-md mt-6">
    <h2 className="text-white text-2xl font-bold mb-4">Soil Information</h2>
    {soilData ? (
      <ul className="divide-y divide-white divide-opacity-25">
        {soilData.map((sample, index) => (
          <li key={index} className="py-4">
            <div className="flex justify-between text-white">
              <span className="font-semibold">Location:</span>
              <span>{sample.location}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Date Collected:</span>
              <span>{sample.dateCollected}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Soil Type:</span>
              <span>{sample.soilType}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">pH Level:</span>
              <span>{sample.phLevel}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Moisture Content:</span>
              <span>{sample.moistureContent}%</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Organic Matter:</span>
              <span>{sample.organicMatter}%</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Nutrient Levels:</span>
              <span>N: {sample.nutrientLevels.nitrogen}, P: {sample.nutrientLevels.phosphorus}, K: {sample.nutrientLevels.potassium}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Texture:</span>
              <span>{sample.texture}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Salinity:</span>
              <span>{sample.salinity}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="font-semibold">Suitability for Crops:</span>
              <span>{sample.suitabilityForCrops}</span>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-white">Loading soil information...</p>
    )}
  </section>
   );
};

export default SoilInfo;
