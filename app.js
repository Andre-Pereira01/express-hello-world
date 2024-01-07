const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Interface comum para análises de atividade
class ActivityAnalysis {
  getResults() {
    return "Results from the base analysis";
  }
}

// Implementação concreta de análise quantitativa
class QuantitativeAnalysis extends ActivityAnalysis {
  getResults() {
    return "Quantitative Analysis Results";
  }
}

// Implementação concreta de análise qualitativa
class QualitativeAnalysis extends ActivityAnalysis {
  getResults() {
    return "Qualitative Analysis Results";
  }
}

// Decorator base para análises
class AnalysisDecorator extends ActivityAnalysis {
  constructor(analysis) {
    super();
    this.analysis = analysis;
  }

  getResults() {
    return this.analysis.getResults();
  }
}

// Decorator específico que adiciona funcionalidade extra à análise
class AdditionalFunctionalityDecorator extends AnalysisDecorator {
  getResults() {
    // Chama a implementação da análise subjacente e adiciona funcionalidade extra
    const baseResults = super.getResults();
    return `${baseResults} with additional functionality`;
  }
}

// Cria uma instância de análise quantitativa
const quantitativeAnalysis = new QuantitativeAnalysis();

// Cria uma instância de análise qualitativa
const qualitativeAnalysis = new QualitativeAnalysis();

// Decora uma análise quantitativa com funcionalidade adicional
const decoratedQuantitativeAnalysis = new AdditionalFunctionalityDecorator(quantitativeAnalysis);

// Endpoint para demonstração
app.get("/demo", (req, res) => {
  // Exibe os resultados da análise decorada
  res.send(decoratedQuantitativeAnalysis.getResults());
});

// Endpoint para Página Inicial
app.get("/", (req, res) => {
  const homePage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Tracker</title>
      </head>
      <body>
        <h1>Bem-vindo ao Health Tracker!</h1>
        <p>Este projeto tem como objetivo incentivar a consciencialização dos alunos sobre a saúde e bem-estar.</p>
        <p>Projeto desenvolvido pelo aluno André Pereira [2302569]</p>
        <p>Utilize os seguintes links para navegar:</p>
        <ul>
          <li><a href="/configuracao-atividade">Configuração da Atividade</a></li>
          <li><a href="/json-params-atividade">JSON de Parâmetros</a></li>
          <li><a href="/lista-analytics-atividade">Lista de Analytics</a></li>
          <li><a href="/deploy-atividade">Deploy da Atividade</a></li>
          <li><a href="/analytics-atividade">Analytics da Atividade</a></li>
        </ul>
      </body>
    </html>
  `;
  res.type('html').send(homePage);
});

// Endpoint para Página de Configuração e Parâmetros
app.get("/configuracao-atividade", (req, res) => {
  const configPage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Configuração da Atividade</title>
      </head>
      <body>
        <h1>Página de Configuração da Atividade</h1>
        <form action="/json-params-atividade" method="get">
          <label for="habitos_alimentares">Hábitos Alimentares:</label>
          <input type="text" id="habitos_alimentares" name="habitos_alimentares"><br>

          <label for="consumo_calorias_diarias">Consumo Diário de Calorias:</label>
          <input type="number" id="consumo_calorias_diarias" name="consumo_calorias_diarias"><br>

          <label for="peso">Peso:</label>
          <input type="number" id="peso" name="peso"><br>

          <label for="altura">Altura:</label>
          <input type="number" id="altura" name="altura"><br>

          <label for="pressao_arterial">Pressão Arterial:</label>
          <input type="text" id="pressao_arterial" name="pressao_arterial"><br>

          <label for="niveis_glicose">Níveis de Glicose:</label>
          <input type="number" id="niveis_glicose" name="niveis_glicose"><br>

          <label for="passos_diarios">Número de Passos Diários:</label>
          <input type="number" id="passos_diarios" name="passos_diarios"><br>

          <label for="horas_sono_noite">Horas de Sono por Noite:</label>
          <input type="number" id="horas_sono_noite" name="horas_sono_noite"><br>

          <label for="atividades_desportivas">Atividades Desportivas:</label>
          <input type="text" id="atividades_desportivas" name="atividades_desportivas"><br>

          <label for="tempo_gasto_atividades_fisicas">Tempo Gasto em Atividades Físicas:</label>
          <input type="text" id="tempo_gasto_atividades_fisicas" name="tempo_gasto_atividades_fisicas"><br>

          <input type="submit" value="Submit">
        </form>
        <a href="/">Voltar para a Página Inicial</a>
      </body>
    </html>
  `;
  res.type('html').send(configPage);
});

// Endpoint para JSON de Parâmetros
app.get("/json-params-atividade", (req, res) => {
  const jsonParams = [
    {"name": "habitos_alimentares", "type": "text/plain"},
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
  const deployURL = "https://health-tracker-apds.onrender.com/atividade12345";
  res.send(deployURL);
});

// Endpoint para Analytics da Atividade
app.post("/analytics-atividade", (req, res) => {
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
  ];
  res.json(analyticsData);
});


app.get("/", (req, res) => {
  res.send("Bem-vindo ao Health Tracker!");
});

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;




// CÓDIGO ANTIGO DA IMPLEMENTAÇÃO DO SINGLETON
// // Implementação do Singleton para gerir os dados da atividade
// class ActivityManager {
//   constructor() {
//     if (!ActivityManager.instance) {
//       // Se não existir uma instância, é criada uma nova
//       this.data = {}; // Estrutura para armazenar osdados da atividade
//       ActivityManager.instance = this;
//     }
//     return ActivityManager.instance;
//   }

//   // Métodos para acessar e manipular os dados da atividade
//   getData() {
//     return this.data;
//   }

//   setData(newData) {
//     this.data = newData;
//   }
// }

// // Cria uma instância única do ActivityManager
// const activityManager = new ActivityManager();









//CÓDIGO ANTIGO PRIMEIRA PARTE
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3001;

// // Endpoint para Página Inicial
// app.get("/", (req, res) => {
//   const homePage = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Health Tracker</title>
//       </head>
//       <body>
//         <h1>Bem-vindo ao Health Tracker!</h1>
//         <p>Este projeto tem como objetivo incentivar a consciencialização dos alunos sobre a saúde e bem-estar.</p>
//         <p>Projeto desenvolvido pelo aluno André Pereira [2302569]</p>
//         <p>Utilize os seguintes links para navegar:</p>
//         <ul>
//           <li><a href="/configuracao-atividade">Configuração da Atividade</a></li>
//           <li><a href="/json-params-atividade">JSON de Parâmetros</a></li>
//           <li><a href="/lista-analytics-atividade">Lista de Analytics</a></li>
//           <li><a href="/deploy-atividade">Deploy da Atividade</a></li>
//           <li><a href="/analytics-atividade">Analytics da Atividade</a></li>
//         </ul>
//       </body>
//     </html>
//   `;
//   res.type('html').send(homePage);
// });

// // Endpoint para Página de Configuração e Parâmetros
// app.get("/configuracao-atividade", (req, res) => {
//   const configPage = `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Configuração da Atividade</title>
//       </head>
//       <body>
//         <h1>Página de Configuração da Atividade</h1>
//         <form action="/json-params-atividade" method="get">
//           <label for="habitos_alimentares">Hábitos Alimentares:</label>
//           <input type="text" id="habitos_alimentares" name="habitos_alimentares"><br>

//           <label for="consumo_calorias_diarias">Consumo Diário de Calorias:</label>
//           <input type="number" id="consumo_calorias_diarias" name="consumo_calorias_diarias"><br>

//           <label for="peso">Peso:</label>
//           <input type="number" id="peso" name="peso"><br>

//           <label for="altura">Altura:</label>
//           <input type="number" id="altura" name="altura"><br>

//           <label for="pressao_arterial">Pressão Arterial:</label>
//           <input type="text" id="pressao_arterial" name="pressao_arterial"><br>

//           <label for="niveis_glicose">Níveis de Glicose:</label>
//           <input type="number" id="niveis_glicose" name="niveis_glicose"><br>

//           <label for="passos_diarios">Número de Passos Diários:</label>
//           <input type="number" id="passos_diarios" name="passos_diarios"><br>

//           <label for="horas_sono_noite">Horas de Sono por Noite:</label>
//           <input type="number" id="horas_sono_noite" name="horas_sono_noite"><br>

//           <label for="atividades_desportivas">Atividades Desportivas:</label>
//           <input type="text" id="atividades_desportivas" name="atividades_desportivas"><br>

//           <label for="tempo_gasto_atividades_fisicas">Tempo Gasto em Atividades Físicas:</label>
//           <input type="text" id="tempo_gasto_atividades_fisicas" name="tempo_gasto_atividades_fisicas"><br>

//           <input type="submit" value="Submit">
//         </form>
//         <a href="/">Voltar para a Página Inicial</a>
//       </body>
//     </html>
//   `;
//   res.type('html').send(configPage);
// });

// // Endpoint para JSON de Parâmetros
// app.get("/json-params-atividade", (req, res) => {
//   const jsonParams = [
//     {"name": "habitos_alimentares", "type": "text/plain"},
//     {"name": "consumo_calorias_diarias", "type": "integer"},
//     {"name": "peso", "type": "float"},
//     {"name": "altura", "type": "float"},
//     {"name": "pressao_arterial", "type": "text/plain"},
//     {"name": "niveis_glicose", "type": "integer"},
//     {"name": "passos_diarios", "type": "integer"},
//     {"name": "horas_sono_noite", "type": "float"},
//     {"name": "atividades_desportivas", "type": "text/plain"},
//     {"name": "tempo_gasto_atividades_fisicas", "type": "text/plain"}
//   ];

//   res.json(jsonParams);
// });

// // Endpoint para Lista de Analytics
// app.get("/lista-analytics-atividade", (req, res) => {
//   const analyticsList = {
//     "qualAnalytics": [
//       {"name": "Frequencia do registo dos habitos alimentares", "type": "integer"},
//       {"name": "Frequencia do registo das atividades fisicas", "type": "integer"}
//     ],
//     "quantAnalytics": [
//       {"name": "Indice de Massa Corporal (IMC)", "type": "float"},
//       {"name": "Nivel de atividade fisica", "type": "integer"}
//     ]
//   };
//   res.json(analyticsList);
// });

// // Endpoint para Deploy da Atividade
// app.get("/deploy-atividade", (req, res) => {
//   // Lógica para processar o deploy da atividade
//   // Retorna o URL para acessar a atividade
//   const deployURL = "https://health-tracker-apds.onrender.com/atividade12345";
//   res.send(deployURL);
// });

// // Endpoint para Analytics da Atividade
// app.post("/analytics-atividade", (req, res) => {
//   // Lógica para processar o pedido de analytics da atividade
//   // Retorna os dados analíticos em formato JSON
//   const analyticsData = [
//     {
//       "inveniraStdID": 1001,
//       "quantAnalytics": [
//         {"name": "Frequencia do registo dos habitos alimentares", "value": 5},
//         {"name": "Frequencia do registo das atividades fisicas", "value": 3},
//         {"name": "Indice de Massa Corporal (IMC)", "value": 25.5},
//         {"name": "Nivel de atividade fisica", "value": 2}
//       ],
//       "qualAnalytics": [
//         {"Student activity profile": "https://health-tracker-apds.onrender.com/?APAnID=11111111"},
//         {"Actitivy Heat Map": "https://health-tracker-apds.onrender.com/?APAnID=21111111"}
//       ]
//     },
//     // Adicione outros dados conforme necessário
//   ];
//   res.json(analyticsData);
// });

// // Rota padrão para lidar com todas as outras solicitações
// app.get("/", (req, res) => {
//   res.send("Bem-vindo ao Health Tracker!");
// });

// const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

// server.keepAliveTimeout = 120 * 1000;
// server.headersTimeout = 120 * 1000;
