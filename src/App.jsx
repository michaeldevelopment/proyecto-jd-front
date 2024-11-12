import { Flex, Typography, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import Chart from "./Chart";

const { Title, Text } = Typography;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

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

      const {
        data: { data },
      } = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=7.8891&lon=-72.4967&key=a4397c2ccdf84bda84e4b79e50d5ef83&hours=${
          values.cantidad_dias * 24
        }`
      );

      const apiData = data.map((data) => {
        return {
          hora: new Date(data.timestamp_local).getHours(),
          temperatura: data.app_temp,
          precipitacion: data.precip,
        };
      });

      console.log("resultado api clima => ", apiData);

      const response = await axios.post(
        "http://localhost:5000/predict",
        apiData
      );

      if (response.data.status === "done") {
        const resultIrradiancias = response.data.result.flat();
        console.log("resultados irradiancias => ", resultIrradiancias);
        const resultDataMap = apiData.map((apiData, index) => {
          return {
            hora: apiData.hora,
            potencia: calculoPotencia({
              potencia_max_panel: values.potencia_max_panel,
              irradiancia: resultIrradiancias[index],
              coef_temp: values.coef_temp,
              temp: apiData.temperatura,
              cantidad_paneles: values.cantidad_paneles,
            }),
          };
        });

        setLoading(false);
        setResult(resultDataMap);
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
              label="Coeficiente Temperatura En Max Potencia: "
              placeholder="Coeficiente Temperatura"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor",
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
              label="Cantidad Max Días de Pronóstico"
              name="cantidad_dias"
              rules={[
                {
                  required: true,
                  message: "Ingresa un valor",
                },
                () => ({
                  validator(_, value) {
                    if (value > 10 || value < 0) {
                      return Promise.reject(
                        new Error("Ingresa un valor entre 1 y 10")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="number"
                placeholder="Min 1 - Max 10"
                min={1}
                max={10}
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
