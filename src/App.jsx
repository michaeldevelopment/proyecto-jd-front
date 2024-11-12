import { Flex, Typography, Button, Form, Input, DatePicker } from "antd";
import axios from "axios";
import { useState } from "react";
import { CloudOutlined, RiseOutlined, SunOutlined } from "@ant-design/icons";
import MapContainer from "./MapContainer";
import Chart from "./Chart";
import { mockData } from "./assets/mockData";
import { mockData2Days } from "./assets/mockData2Days";

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // const {
      //   data: { data },
      // } = await axios.get(
      //   // "https://api.weatherbit.io/v2.0/current?lat=7.8891&lon=-72.4967&key=a4397c2ccdf84bda84e4b79e50d5ef83"
      //   `https://api.weatherbit.io/v2.0/history/hourly?lat=7.8891&lon=-72.4967&start_date=${values.fechas[0].format(
      //     "YYYY-MM-DD"
      //   )}&end_date=${values.fechas[1].format(
      //     "YYYY-MM-DD"
      //   )}&tz=local&key=a4397c2ccdf84bda84e4b79e50d5ef83`
      //   // "https://api.weatherbit.io/v2.0/forecast/hourly?city=Raleigh,NC&key=a4397c2ccdf84bda84e4b79e50d5ef83&hours=48"
      // );

      const apiData = mockData2Days.map((data, index) => {
        return {
          hora: new Date(data.timestamp_local).getHours(),
          temperatura: data.app_temp,
          precipitacion: data.precip,
        };
      });

      const response = await axios.post(
        "http://localhost:5000/predict",
        apiData
      );

      if (response.data.status === "done") {
        const resultData = response.data.result.flat();
        const resultDataMap = apiData.map((apiData, index) => {
          return {
            hora: index,
            potencia:
              values.potencia_max_panel *
              ((resultData[index] < 0 ? 0 : resultData[index]) / 1000) *
              (1 + values.coef_temp * (apiData.temperatura - 25)),
          };
        });

        setLoading(false);
        setResult(resultDataMap);
        console.log("result => ", response.data.result.flat());
        console.log("result data map => ", resultDataMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title
        level={2}
        style={{
          background: "#38B6FF",
          padding: "10px",
          margin: 0,
          color: "#fff",
        }}
        align="center"
      >
        Predicción de Potencia Fotovoltaica - Cúcuta, Norte de Santander.
      </Title>
      <Flex justify="center" gap={20} style={{ padding: "20px" }}>
        <Flex justify="center" align="left" gap={20} vertical>
          <Text>
            <strong>Ingrese los siguientes datos basándose en su panel:</strong>
          </Text>
          <Form onFinish={onFinish} justify="center" align="center">
            <Form.Item
              name="potencia_max_panel"
              label="Potencia Max Del Panel: "
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Potencia Max Del Panel" />
            </Form.Item>

            <Form.Item
              name="coef_panel"
              label="Coeficiente del panel: "
              placeholder="Coeficiente del Panel"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Coeficiente del Panel" />
            </Form.Item>

            <Form.Item
              name="voltaje_circuito_abierto"
              label="Voltaje Circuito Abierto: "
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Voltaje Circuito Abierto" />
            </Form.Item>

            <Form.Item
              name="voltaje_panel"
              label="Voltaje Del Panel: "
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Voltaje Del Panel" />
            </Form.Item>

            <Form.Item
              name="corriente_corto_ciruito"
              label="Corriente Cortocircuito: "
              placeholder="Corriente del Panel"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Corriente Cortocircuito" />
            </Form.Item>

            <Form.Item
              name="corriente_max_panel"
              label="Corriente Max Del Panel: "
              placeholder="Corriente Max Del Panel"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Corriente Max Del Panel" />
            </Form.Item>

            <Form.Item
              name="coef_temp"
              label="Coeficiente Temperatura: "
              placeholder="Coeficiente Temperatura"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="Coeficiente Temperatura" />
            </Form.Item>

            <Form.Item
              name="cantidad_paneles"
              label="N° de paneles: "
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor correcto mayor a 0",
                },
              ]}
            >
              <Input type="number" placeholder="N° de paneles: " />
            </Form.Item>

            <Form.Item
              label="Fechas"
              name="fechas"
              rules={[{ required: true, message: "Porfavor agregar fechas" }]}
            >
              <RangePicker
                placeholder={["Fecha Inicio", "Fecha Fin"]}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
            >
              Predecir
            </Button>
          </Form>
        </Flex>
        <Chart data={result} />
      </Flex>
    </>
  );
}

export default App;
