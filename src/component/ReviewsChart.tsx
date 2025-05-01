"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ReviewsChart: React.FC = () => {
  const data = [
    { day: "Sun", rating: 4 },
    { day: "Mon", rating: 5 },
    { day: "Tue", rating: 3 },
    { day: "Wed", rating: 4 },
    { day: "Thu", rating: 5 },
    { day: "Fri", rating: 4 },
    { day: "Sat", rating: 5 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Customer&apos;s reviews
      </h2>
      <BarChart width={300} height={200} data={data} className="w-full">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
        <Tooltip />
        <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ReviewsChart;
