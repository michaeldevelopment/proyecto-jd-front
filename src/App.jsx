import { Flex, Typography, Input, Button, Modal, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import MapContainer from "./MapContainer";

const { Title } = Typography;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const [formData, setFormData] = useState({
    cantidad_paneles: 0,
    precipitacion: 0,
    temperatura: 0,
    irradiancia: 0,
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onClickCalculate = async () => {
    try {
      setResult(0);
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
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
        <Input
          type="number"
          placeholder="Precipitacion"
          onChange={(e) => handleChange("precipitacion", e.target.value)}
          style={{ width: 400 }}
        />
        <Input
          type="number"
          placeholder="Temperatura"
          onChange={(e) => handleChange("temperatura", e.target.value)}
          style={{ width: 400 }}
        />
        <Input
          type="number"
          placeholder="Irradiancia"
          onChange={(e) => handleChange("irradiancia", e.target.value)}
          style={{ width: 400 }}
        />
        <Input
          type="number"
          placeholder="¿Cuantos paneles quieres usar?"
          onChange={(e) => handleChange("cantidad_paneles", e.target.value)}
          style={{ width: 400 }}
        />
        <Button
          type="primary"
          loading={isLoading}
          size="large"
          onClick={onClickCalculate}
        >
          Calcular
        </Button>

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
