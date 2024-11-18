import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FireFilled, PlayCircleFilled, SunFilled } from "@ant-design/icons";
import { Flex } from "antd";
import { splitIntoChunks } from "./utils/splitIntoChunks";

const Chart = ({ data, firstData }) => {
  return (
    <AreaChart
      width={900}
      height={600}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <defs>
        <linearGradient id="potencia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      {data.length > 0 && (
        <Legend
          verticalAlign="top"
          formatter={() => renderCustomizedLegend(data, firstData)}
        />
      )}
      <XAxis dataKey="hora">
        <Label offset={0} value="Tiempo(h)" position="left" />
      </XAxis>
      <YAxis>
        <Label
          offset={0}
          value="Potencia(W)"
          angle={-90}
          position="insideLeft"
        />
      </YAxis>
      <Area
        type="monotone"
        dataKey="potencia"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#potencia)"
      />
    </AreaChart>
  );
};

const renderCustomizedLegend = (data, firstData) => {
  const dataSplitted = splitIntoChunks(data);

  const tempMax = Math.max(
    ...dataSplitted[0].map((element) => element.temperatura)
  );

  const potenciaMax = (
    dataSplitted[0]
      .map((element) => element.potencia)
      .reduce((acc, el) => (acc = el + acc), 0) /
    24 /
    1000
  ).toFixed(4);

  return (
    <Flex gap={20} style={{ marginBottom: 10 }}>
      <div>
        <SunFilled /> Temperatura actual: {firstData?.tempActual} °C -
        {firstData?.primerDia}
      </div>
      <div>
        <FireFilled /> Temperatura máxima del día: {tempMax}
      </div>
      <div>
        <PlayCircleFilled /> Potencia promedio día (kWh): {potenciaMax}
      </div>
    </Flex>
  );
};

export default Chart;
