const cases = [
  {
    question: "Eu cliquei em um link suspeito enviado por e-mail. O que faço?",
    gubby: "Eu clico em qualquer link que recebo.",
    rigby: "Eu verifico o remetente antes de clicar.",
    education: {
      gubby: "Correto. Eu fui culpado porque clicar em links suspeitos pode instalar vírus e roubar dados.",
      rigby: "Errado. Eu fui cuidadoso. Sempre verifico o remetente antes de clicar em links.",
    },
  },
  {
    question: "Um colega pediu minha senha para ajudar a mexer no computador. Devo passar?",
    gubby: "Claro, eu passo minha senha e depois altero tudo.",
    rigby: "Senhas são pessoais e não devem ser compartilhadas.",
    education: {
      gubby: "Correto. Eu fui culpado. Compartilhar senhas abre caminho para invasão de contas e perda de privacidade.",
      rigby: "Errado. Eu fiz a escolha certa ao manter minha senha privada.",
    },
  },
  {
    question: "Eu postei meu endereço e telefone em um perfil público. Isso é seguro?",
    gubby: "Eu não publico nada pessoal no meu perfil.",
    rigby: "Posto meu endereço e telefone para todo mundo ver.",
    education: {
      gubby: "Errado. Eu fui cauteloso. Expor dados pessoais em público é perigoso.",
      rigby: "Correto. Eu fui culpado por compartilhar informações que podem ser usadas para golpes.",
    },
  },
  {
    question: "Recebi uma notícia duvidosa no grupo escolar. Devo compartilhar?",
    gubby: "Repito para todo mundo antes de verificar se é verdade.",
    rigby: "Eu busco a fonte antes de compartilhar qualquer notícia.",
    education: {
      gubby: "Correto. Eu fui culpado. Compartilhar fake news prejudica outras pessoas e espalha desinformação.",
      rigby: "Errado. Eu fiz a escolha segura ao checar a informação primeiro.",
    },
  },
  {
    question: "Eu mandei mensagens agressivas para um colega online. Isso está certo?",
    gubby: "Não é legal. Eu tento ajudar e pedir respeito.",
    rigby: "Eu xingo quando fico irritado e mando mensagens fortes.",
    education: {
      gubby: "Errado. Eu mostrei comportamento respeitoso online.",
      rigby: "Correto. Eu fui culpado por cyberbullying, e isso afeta outras pessoas.",
    },
  },
  {
    question: "Estou em um site não tão confiável que começa a pedir minhas informações pessoais. O que eu faço?",
    gubby: "Passo minhas informações, já que a vida é curta.",
    rigby: "Não é confiável passar informações pessoais sem ser sites de banco ou serviços seguros.",
    education: {
      gubby: "Correto. Eu fui culpado por confiar em sites inseguros e expor meus dados pessoais.",
      rigby: "Errado. Eu fiz a escolha certa ao proteger minhas informações e usar apenas sites confiáveis.",
    },
  },
  {
    question: "No tribunal, eu uso a mesma senha em vários sites. Isso é seguro?",
    gubby: "Uso a mesma senha em todos, assim é mais fácil lembrar.",
    rigby: "Cada conta precisa de uma senha forte e única.",
    education: {
      gubby: "Correto. Eu fui culpado porque repetir senhas em vários sites aumenta o risco de invasão.",
      rigby: "Errado. Eu escolhi a opção segura e protejo melhor minhas contas.",
    },
  },
  {
    question: "No tribunal, eu respondo uma pesquisa online pedindo meus dados pessoais. Isso é certo?",
    gubby: "Respondo tudo, quanto mais, melhor.",
    rigby: "Não compartilho meus dados pessoais em pesquisas duvidosas.",
    education: {
      gubby: "Correto. Eu fui culpado por entregar meus dados a fontes não confiáveis.",
      rigby: "Errado. Eu agi certo ao manter minha privacidade em pesquisas suspeitas.",
    },
  },
  {
    question: "No tribunal, eu uso Wi-Fi público sem proteção. Isso é inteligente?",
    gubby: "Conecto direto, não tenho segredo nenhum.",
    rigby: "Uso VPN ou espero por uma rede segura.",
    education: {
      gubby: "Correto. Eu fui culpado por arriscar meus dados em uma rede pública insegura.",
      rigby: "Errado. Eu estava certo ao proteger a conexão com VPN ou usar uma rede confiável.",
    },
  },
  {
    question: "No tribunal, eu guardo documentos importantes no celular sem bloqueio. Isso é seguro?",
    gubby: "Sem problema, é só para mim.",
    rigby: "Melhor manter documentos seguros e com proteção.",
    education: {
      gubby: "Correto. Eu fui culpado por não proteger informações sensíveis no dispositivo.",
      rigby: "Errado. Eu tomei a atitude correta ao proteger meus documentos pessoais.",
    },
  },
];

const bubbles = {
  judge: document.getElementById("bubble-judge"),
  gubby: document.getElementById("bubble-left"),
  rigby: document.getElementById("bubble-right"),
};

const texts = {
  judge: document.getElementById("text-judge"),
  gubby: document.getElementById("text-left"),
  rigby: document.getElementById("text-right"),
};

const characters = {
  judge: document.getElementById("character-judge"),
  gubby: document.getElementById("character-gubby"),
  rigby: document.getElementById("character-rigby"),
};

const progressText = document.getElementById("progress-text");
const decisionPanel = document.getElementById("decision-panel");
const resultPanel = document.getElementById("result-panel");
const screenOverlay = document.getElementById("screen-overlay");
const finalScene = document.getElementById("final-scene");
const votegubbyButton = document.getElementById("vote-gubby");
const voteRigbyButton = document.getElementById("vote-rigby");

let currentCase = 0;
let pontosgubby = 0;
let pontosRigby = 0;
let voteTimeout = null;

function hideAllBubbles() {
  Object.values(bubbles).forEach((bubble) => bubble.classList.remove("active"));
}

function clearCharacterHighlight() {
  Object.values(characters).forEach((character) => character.classList.remove("active"));
}

function setActiveCharacter(role) {
  clearCharacterHighlight();

  if (role === "judge") {
    characters.judge.classList.add("active");
  } else if (role === "gubby") {
    characters.gubby.classList.add("active");
  } else if (role === "rigby") {
    characters.rigby.classList.add("active");
  } else if (role === "both") {
    characters.gubby.classList.add("active");
    characters.rigby.classList.add("active");
  }
}

function updateProgress() {
  progressText.innerText = `Caso ${currentCase + 1} de ${cases.length}`;
}

function showJudge(message) {
  hideAllBubbles();
  texts.judge.innerText = message;
  bubbles.judge.classList.add("active");
  setActiveCharacter("judge");
}

function showgubby(message) {
  texts.gubby.innerText = message;
  bubbles.gubby.classList.add("active");
}

function showRigby(message) {
  texts.rigby.innerText = message;
  bubbles.rigby.classList.add("active");
}

function showVoting() {
  decisionPanel.classList.add("active");
  disableVotes(false);
}

function hideVoting() {
  decisionPanel.classList.remove("active");
}

function disableVotes(disabled) {
  votegubbyButton.disabled = disabled;
  voteRigbyButton.disabled = disabled;
  votegubbyButton.style.opacity = disabled ? "0.6" : "1";
  voteRigbyButton.style.opacity = disabled ? "0.6" : "1";
}

function startIntro() {
  updateProgress();
  hideVoting();
  resultPanel.classList.remove("visible");
  hideAllBubbles();
  clearCharacterHighlight();

  const firstIntro =
    "Ultimamente anda acontecendo crimes online envolvendo: roubo de dados, phishing e fraude digital.";
  const secondIntro =
    "Trouxemos aqui dois suspeitos desses crimes cruéis, irei fazer perguntas sobre segurança digital e vocês terão que responder corretamente, se errarem um de vocês é o culpado.";

  showJudge(firstIntro);
  setActiveCharacter("judge");

  voteTimeout = setTimeout(() => {
    showJudge(secondIntro);

    voteTimeout = setTimeout(() => {
      startCase();
    }, 15000);
  }, 15000);
}

function startCase() {
  updateProgress();
  hideVoting();
  resultPanel.classList.remove("visible");
  hideAllBubbles();
  clearCharacterHighlight();

  const activeCase = cases[currentCase];
  showJudge(activeCase.question);

  voteTimeout = setTimeout(() => {
    hideAllBubbles();
    showgubby(activeCase.gubby);
    showRigby(activeCase.rigby);
    setActiveCharacter("both");
    showVoting();
  }, 3500);
}

function registerVote(guilty) {
  if (votegubbyButton.disabled || voteRigbyButton.disabled) {
    return;
  }

  disableVotes(true);
  hideVoting();
  hideAllBubbles();

  const activeCase = cases[currentCase];

  if (guilty === "gubby") {
    pontosgubby += 1;
  } else {
    pontosRigby += 1;
  }

  showJudge(activeCase.education[guilty]);
  setActiveCharacter("judge");

  voteTimeout = setTimeout(() => {
    currentCase += 1;
    if (currentCase < cases.length) {
      startCase();
    } else {
      showFinalResult();
    }
  }, 3200);
}

function showFinalResult() {
  hideAllBubbles();
  clearCharacterHighlight();
  hideVoting();
  resultPanel.classList.remove("visible");

  let finalMessage = "";

  if (pontosgubby > pontosRigby) {
    finalMessage =
      "Após analisar todas as evidências, gubby foi considerado culpado por colocar a segurança digital em risco.";
  } else {
    finalMessage =
      "Após analisar todas as evidências, Rigby foi considerado culpado por colocar a segurança digital em risco.";
  }

  finalScene.innerHTML = `<h1>Fim da cena</h1><p>${finalMessage}</p>`;
  screenOverlay.classList.add("active");
  finalScene.classList.remove("visible");

  setTimeout(() => {
    finalScene.classList.add("visible");
  }, 500);
}

votegubbyButton.addEventListener("click", () => registerVote("gubby"));
voteRigbyButton.addEventListener("click", () => registerVote("rigby"));

window.addEventListener("load", () => {
  startIntro();
});
