'use client'

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function WeatherInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ahmedabad?unitGroup=us&key=HX35G5W7ZCPNVLZSEJZ7FFGW5&contentType=json');
        const fetchedData = await response.json();
        // Process the data to get daily precipitation
        const dailyRainfall = fetchedData.days.map((day) => ({
          date: day.datetime.split('T')[0], // Extract the date from the datetime string
          total: day.dew, // Get the precipitation for the day
        }));
        setData(dailyRainfall);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="90%" height={150} className={'mt-5'}>
      <h1 className="font-semibold mb-5 ml-4">Daily Dew</h1>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4,   4,   0,   0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
