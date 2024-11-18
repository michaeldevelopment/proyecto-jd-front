import { Button, Flex, Form, Input, Popover } from "antd";
import React from "react";
import { CSVLink } from "react-csv";
import { DownloadOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { formElements } from "./mainFormElements";

const MainForm = ({ onFinish, result, isLoading }) => {
  return (
    <Form onFinish={onFinish} justify="center" align="center">
      {formElements.map(({ placeholder, type, explanation, ...rest }) => (
        <Form.Item {...rest} key={rest.name}>
          <Flex gap={20}>
            <Input type={type} placeholder={placeholder} />
            <Popover
              overlayStyle={{
                width: "20vw",
              }}
              placement="rightTop"
              content={explanation}
              trigger="hover"
            >
              <Button>
                Ayuda <QuestionCircleFilled />
              </Button>
            </Popover>
          </Flex>
        </Form.Item>
      ))}

      <Flex justify="space-evenly">
        <Button
          type="primary"
          danger
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          Predecir
        </Button>

        {result.length > 0 && (
          <Button
            type="primary"
            danger
            size="large"
            icon={<DownloadOutlined />}
          >
            <CSVLink data={result} filename={"estimacion-de-potencias.csv"}>
              Descargar CSV
            </CSVLink>
          </Button>
        )}
      </Flex>
    </Form>
  );
};

export default MainForm;
