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
  const jsonParams = {
    "name": "Atividade Exemplo",
    "config_url": "https://health-tracker-apds.onrender.com/configuracao-atividade",
    "json_params_url": "https://health-tracker-apds.onrender.com/json-params-atividade",
    // Adicione outros parâmetros conforme necessário
  };
  res.json(jsonParams);
});

// Endpoint para Lista de Analytics
app.get("/lista-analytics-atividade", (req, res) => {
  const analyticsList = {
    "qualAnalytics": [
      {"name": "Analytics Qualitativo 1", "type": "text/plain"},
      {"name": "Analytics Qualitativo 2", "type": "URL"}
    ],
    "quantAnalytics": [
      {"name": "Analytics Quantitativo 1", "type": "boolean"},
      {"name": "Analytics Quantitativo 2", "type": "integer"}
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
        {"name": "Acedeu à atividade", "value": true},
        {"name": "Download documento 1", "value": true},
        {"name": "Evolução pela atividade (%)", "value": "33.3"}
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

// Seu código existente aqui

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;
