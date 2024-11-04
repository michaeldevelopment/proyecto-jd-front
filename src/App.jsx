import { Flex, Typography, Button, Spin, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import MapContainer from "./MapContainer";

const { Title, Text } = Typography;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const [formData, setFormData] = useState({
    cantidad_paneles: 0,
    precipitacion: 0,
    temperatura: 0,
    irradiancia: 0,
  });

  const onFinish = async ({ cantidad_paneles }) => {
    try {
      setResult(0);
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(
        "https://api.weatherbit.io/v2.0/current?lat=7.8891&lon=-72.4967&key=832c8611b849473fa5c7bbe7966f1a6c"
      );
      const { precip, temp, solar_rad } = data[0];

      setFormData({
        cantidad_paneles,
        precipitacion: precip,
        temperatura: temp,
        irradiancia: solar_rad,
      });

      const response = await axios.post("http://localhost:5000/predict", {
        cantidad_paneles,
        precipitacion: precip,
        temperatura: temp,
        irradiancia: solar_rad,
      });

      if (response.data.status === "done") {
        setLoading(false);
        setResult(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex justify="center" align="center" gap={50}>
      {/* <MapContainer /> */}
      <Flex justify="center" align="center" gap={20} vertical>
        <Title level={2}> Estimación de cálculo de potencia </Title>
        <Title level={4}> Ciudad: Cúcuta, Norte de Santander </Title>
        <Form onFinish={onFinish} justify="center" align="center">
          <Form.Item
            name="cantidad_paneles"
            rules={[
              {
                required: true,
                message: "Ingresa un valor correcto mayor a 0",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="¿Cuantos paneles quieres usar?"
              style={{ width: 400 }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            style={{ marginTop: 30 }}
          >
            Calcular
          </Button>
        </Form>

        {isLoading ? (
          <Flex vertical align="center" justify="center">
            <Title level={4}>
              Datos del clima de hoy para Cúcuta, Norte de Santander:
            </Title>
            <Title level={5}>
              Referencia API: https://www.weatherbit.io/api/weather-current
            </Title>
            <Text> Temperatura: {formData.temperatura} </Text>
            <Text> Precipitacion: {formData.precipitacion} </Text>
            <Text> Irradiancia: {formData.irradiancia} </Text>
          </Flex>
        ) : (
          ""
        )}

        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Title level={3}> Potencia: {result} </Title>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
