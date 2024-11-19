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
      width={700}
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

  const temperaturasMaximas = dataSplitted.map((dayData) =>
    Math.max(...dayData.map((element) => element.temperatura))
  );

  const promediosPotencias = dataSplitted.map((dayData) =>
    (
      dayData
        .map((element) => element.potencia)
        .reduce((acc, el) => acc + el, 0) /
      24 /
      1000
    ).toFixed(4)
  );

  return (
    <>
      <Flex
        gap={10}
        vertical
        justify="center"
        align="center"
        style={{ marginBottom: 10 }}
      >
        <div>
          <SunFilled /> Temperatura actual: {firstData?.tempActual} °C -
          {firstData?.primerDia}
        </div>
        <Flex gap={10} align="center" justify="center" wrap>
          {temperaturasMaximas.map((tempMax, index) => (
            <div key={index}>
              <FireFilled /> Temperatura máx. día {index + 1}: {tempMax} °C
            </div>
          ))}
        </Flex>
        <Flex gap={10} align="center" justify="center" wrap>
          {promediosPotencias.map((promedioDia, index) => (
            <div key={index}>
              <PlayCircleFilled /> Potencia promedio día {index + 1}
              (kWh):
              {promedioDia}
            </div>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Chart;
