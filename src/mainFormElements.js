export const formElements = [
  {
    name: "potencia_max_panel",
    label: "Potencia Max Del Panel: ",
    placeholder: "Potencia Max Del Panel",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "La puedes encontrar como “Rated Maximum Power” o “Pmax” dada en watts (w). Es la potencia máxima del panel.",
  },
  {
    name: "voltaje_circuito_abierto",
    label: "Voltaje Circuito Abierto: ",
    placeholder: "Voltaje Circuito Abierto",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "Puedes encontrarlo como “Open Circuit Voltage” o “Voc”, dado en voltios (V). Es el voltaje máximo que un panel solar puede producir cuando no hay carga conectada.",
  },
  {
    name: "voltaje_panel",
    label: "Voltaje Del Panel: ",
    placeholder: "Voltaje Del Panel",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "Puedes encontrarlo como “Maximum Power Voltage” o “Vmp” y se mide en voltios (V). Es el voltaje al que el panel entrega su máxima potencia cuando está en funcionamiento y conectado a una carga.",
  },
  {
    name: "corriente_corto_ciruito",
    label: "Corriente Cortocircuito: ",
    placeholder: "Corriente Cortocircuito",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "Puedes encontrarla como “Short Circuit Current” o “Isc” y medida en amperios (A). Representa la corriente máxima que fluye cuando los terminales del panel están conectados sin resistencia alguna.",
  },
  {
    name: "corriente_max_panel",
    label: "Corriente Max Del Panel: ",
    placeholder: "Corriente Max Del Panel",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "Puedes encontrarla como “Maximum Power Current” o “Imp”, esta corriente se mide en amperios (A) y es la corriente que el panel produce cuando está generando su máxima potencia.",
  },
  {
    name: "coef_temp",
    label: "Coeficiente Temperatura En Max Potencia: ",
    placeholder: "Coeficiente Temperatura",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor",
      },
    ],
    explanation:
      "Puedes encontrarlo como “Temperature Coefficient of Pmax” o “y_Pmp”. Este valor suele ser negativo y para ingresarlo debes dividirlo entre cien (100).  Se refiere al cambio porcentual en la potencia máxima por cada grado Celsius de variación en la temperatura de operación respecto a la temperatura estándar de 25 °C.",
  },
  {
    name: "cantidad_paneles",
    label: "N° de paneles: ",
    placeholder: "N° de paneles",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor correcto mayor a 0",
      },
    ],
    explanation:
      "Es la cantidad de paneles con la que deseas hacer la estimacion del cálculo de potencia.",
  },
  {
    name: "cantidad_dias",
    label: "Cantidad Max Días de Pronóstico",
    placeholder: "Min 1 - Max 10",
    type: "number",
    rules: [
      {
        required: true,
        message: "Ingresa un valor",
      },
      () => ({
        validator(_, value) {
          if (value > 10 || value < 0) {
            return Promise.reject(new Error("Ingresa un valor entre 1 y 10"));
          }
          return Promise.resolve();
        },
      }),
    ],
    explanation:
      "Es la cantidad de días posteriores al día actual (máximo 10 días posteriores) de los que deseas hacer la estimación del cálculo de potencia.",
  },
];
