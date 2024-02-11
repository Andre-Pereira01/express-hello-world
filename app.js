const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Padrão Singleton para o Logger
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = this;
    return this;
  }

  log(message) {
    console.log(message);
  }
}

// Padrão Decorator para atividades de análise
class ActivityAnalysis {
  getResults() {
    return "Results from the base analysis";
  }
}

class QuantitativeAnalysis extends ActivityAnalysis {
  getResults() {
    return "Quantitative Analysis Results";
  }
}

class QualitativeAnalysis extends ActivityAnalysis {
  getResults() {
    return "Qualitative Analysis Results";
  }
}

class AnalysisDecorator extends ActivityAnalysis {
  constructor(analysis) {
    super();
    this.analysis = analysis;
  }

  getResults() {
    return this.analysis.getResults();
  }
}
class ComparativeAnalysisDecorator extends AnalysisDecorator {
  constructor(analysis1, analysis2) {
    super();
    this.analysis1 = analysis1;
    this.analysis2 = analysis2;
  }

  getResults() {
    const baseResults1 = this.analysis1.getResults();
    const baseResults2 = this.analysis2.getResults();
    
    // Realiza uma análise comparativa entre os resultados das duas análises
    const comparativeResults = "Comparative Analysis Results: Analysis 1 vs Analysis 2";

    return `${baseResults1}\n${baseResults2}\n${comparativeResults}`;
  }
}

// Padrão Observer para atividades
class ActivityObserver {
  update(activityData) {
    Logger.instance.log("Activity Observer: Atualizado com novos dados -", activityData);
  }
}

class ActivitySubject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(activityData) {
    this.observers.forEach(observer => observer.update(activityData));
  }
}

// Cria uma instância do Logger (Singleton)
const logger = new Logger();

// Cria instâncias de observadores
const activityObserver = new ActivityObserver();

// Cria uma instância do Subject
const activitySubject = new ActivitySubject();

// Adiciona o Observer ao Subject
activitySubject.addObserver(activityObserver);

// Endpoint para demonstração
app.get("/demo", (req, res) => {
  // Simulação de novos dados da atividade com novos dados
  const novosDadosAtividade = {
    habitos: "Alimentação saudável",
    calorias: 1800,
    peso: 68,
    altura: 1.76,
    pressao_arterial: "118/78",
    niveis_glicose: 88,
    passos_diarios: 10500,
    horas_sono_noite: 7.5,
    atividades_desportivas: "Corrida, Natação, Yoga",
    tempo_gasto_atividades_fisicas: "75 minutos",
  };

  // Notifica observadores sobre os novos dados
  activitySubject.notifyObservers(novosDadosAtividade);

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

// Endpoint de fallback para outras rotas
app.get("*", (req, res) => {
  res.send("Rota não encontrada. Por favor, verifique o URL.");
});

const server = app.listen(port, () => logger.log(`App listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
