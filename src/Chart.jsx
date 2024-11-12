import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <LineChart
      width={900}
      height={600}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      <XAxis dataKey="hora" />
      <YAxis />
      <Line type="monotone" dataKey="potencia" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
