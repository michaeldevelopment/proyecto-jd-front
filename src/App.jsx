import { Flex, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import Chart from "./Chart";
import MainForm from "./MainForm";
import imagenLogoUFPS from "./assets/logoUFPS.png";

const { Title, Text } = Typography;

const BACKEND_API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [firstData, setFirstData] = useState({
    primerDia: "",
    tempActual: "",
  });

  const calculoPotencia = ({
    potencia_max_panel,
    irradiancia,
    coef_temp,
    temp,
    cantidad_paneles,
  }) => {
    const calculo =
      potencia_max_panel *
      ((irradiancia < 0 ? 0 : irradiancia) / 1000) *
      (1 + coef_temp * (temp - 25)) *
      cantidad_paneles;

    return calculo < 0 ? 0 : calculo;
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const dias = Number(values.cantidad_dias) + 1;

      const response = await axios.post(`${BACKEND_API_URL}/predict`, {
        horas: (dias <= 9 ? dias : 10) * 24,
      });

      if (response.data.status === "done") {
        const resultDataMap = response.data.result.map((apiData) => {
          return {
            ...apiData,
            potencia: calculoPotencia({
              potencia_max_panel: values.potencia_max_panel,
              irradiancia: apiData.irradiancia,
              coef_temp: values.coef_temp,
              temp: apiData.temperatura,
              cantidad_paneles: values.cantidad_paneles,
            }),
          };
        });

        setLoading(false);
        setResult(resultDataMap);
        setFirstData({
          primerDia: response.data.primerDia,
          tempActual: response.data.tempActual,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("resultado final grafica estimacion => ", result);

  return (
    <>
      <Title
        level={2}
        style={{
          background: "#d2171a",
          padding: "10px",
          margin: 0,
          color: "#fff",
        }}
        align="center"
      >
        Predicción de Potencia Fotovoltaica - Cúcuta, Norte de Santander.
      </Title>
      <Flex justify="center" gap={20} style={{ padding: "20px" }} wrap>
        <Flex justify="center" align="left" gap={20} vertical>
          <Flex vertical justify="center" align="center">
            <img src={imagenLogoUFPS} alt="logo UFPS" width={70} height={70} />
            <Text>
              <strong>
                Ingrese los siguientes datos basándose en su panel:
              </strong>
            </Text>
          </Flex>
          <MainForm onFinish={onFinish} result={result} isLoading={isLoading} />
        </Flex>
        <Chart data={result} firstData={firstData} />
      </Flex>
      <Flex vertical justify="center" align="center">
        <Title level={4} align="center">
          Presentado por:
        </Title>
        <Flex gap={30}>
          <Text> José David Zipaquirá </Text>
          <Text> Jesús David Greis </Text>
          <Text> Juan Diego Rodríguez </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
