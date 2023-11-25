const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Endpoint para Página de Configuração e Parâmetros
app.get("/configuracao-atividade", (req, res) => {
  const configPage = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Configuração da Atividade</title>
      </head>
      <body>
        <h1>Página de Configuração da Atividade</h1>
        <!-- Adicione aqui os campos de configuração conforme necessário -->
      </body>
    </html>
  `;
  res.type('html').send(configPage);
});

// Endpoint para JSON de Parâmetros
app.get("/json-params-atividade", (req, res) => {
  const jsonParams = [
    {"name": "hábitos_alimentares", "type": "text/plain"},
    {"name": "consumo_calorias_diarias", "type": "integer"},
    {"name": "peso", "type": "float"},
    {"name": "altura", "type": "float"},
    {"name": "pressao_arterial", "type": "text/plain"},
    {"name": "niveis_glicose", "type": "integer"},
    {"name": "passos_diarios", "type": "integer"},
    {"name": "horas_sono_noite", "type": "float"},
    {"name": "atividades_desportivas", "type": "text/plain"},
    {"name": "tempo_gasto_atividades_fisicas", "type": "text/plain"}
  ];

  res.json(jsonParams);
});

// Endpoint para Lista de Analytics
app.get("/lista-analytics-atividade", (req, res) => {
  const analyticsList = {
    "qualAnalytics": [
      {"name": "Frequencia do registo dos habitos alimentares", "type": "integer"},
      {"name": "Frequencia do registo das atividades fisicas", "type": "integer"}
    ],
    "quantAnalytics": [
      {"name": "Indice de Massa Corporal (IMC)", "type": "float"},
      {"name": "Nivel de atividade fisica", "type": "integer"}
    ]
  };
  res.json(analyticsList);
});

// Endpoint para Deploy da Atividade
app.get("/deploy-atividade", (req, res) => {
  // Lógica para processar o deploy da atividade
  // Retorna o URL para acessar a atividade
  const deployURL = "https://health-tracker-apds.onrender.com/atividade12345";
  res.send(deployURL);
});

// Endpoint para Analytics da Atividade
app.post("/analytics-atividade", (req, res) => {
  // Lógica para processar o pedido de analytics da atividade
  // Retorna os dados analíticos em formato JSON
  const analyticsData = [
    {
      "inveniraStdID": 1001,
      "quantAnalytics": [
        {"name": "Frequencia do registo dos habitos alimentares", "value": 5},
        {"name": "Frequencia do registo das atividades fisicas", "value": 3},
        {"name": "Indice de Massa Corporal (IMC)", "value": 25.5},
        {"name": "Nivel de atividade fisica", "value": 2}
      ],
      "qualAnalytics": [
        {"Student activity profile": "https://health-tracker-apds.onrender.com/?APAnID=11111111"},
        {"Actitivy Heat Map": "https://health-tracker-apds.onrender.com/?APAnID=21111111"}
      ]
    },
    // Adicione outros dados conforme necessário
  ];
  res.json(analyticsData);
});

// Rota padrão para lidar com todas as outras solicitações
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Health Tracker!");
});

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
