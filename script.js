const cases = [
  {
    question: "Alguém clicou em um link suspeito enviado por e-mail.",
    chuck: "Eu clico em qualquer link que recebo.",
    rigby: "Eu verifico o remetente antes de clicar.",
    education: {
      chuck: "Correto. Chuck foi culpado porque clicar em links suspeitos pode instalar vírus e roubar dados.",
      rigby: "Errado. Rigby foi cuidadoso. Sempre verifique o remetente antes de clicar em links.",
    },
  },
  {
    question: "Um colega pediu a sua senha para ajudar a mexer no computador.",
    chuck: "Claro, eu passo minha senha e depois altero tudo.",
    rigby: "Senhas são pessoais e não devem ser compartilhadas.",
    education: {
      chuck: "Correto. Compartilhar senhas abre caminho para invasão de contas e perda de privacidade.",
      rigby: "Errado. Rigby fez a escolha certa ao manter a senha privada.",
    },
  },
  {
    question: "Alguém postou endereço e telefone em um perfil público.",
    chuck: "Eu não publico nada pessoal no meu perfil.",
    rigby: "Posto meu endereço e telefone para todo mundo ver.",
    education: {
      chuck: "Errado. Chuck foi cauteloso. Expor dados pessoais em público é perigoso.",
      rigby: "Correto. Rigby foi culpado por compartilhar informações que podem ser usadas para golpes.",
    },
  },
  {
    question: "Uma notícia duvidosa começou a circular no grupo escolar.",
    chuck: "Repito para todo mundo antes de verificar se é verdade.",
    rigby: "Eu busco a fonte antes de compartilhar qualquer notícia.",
    education: {
      chuck: "Correto. Compartilhar fake news prejudica outras pessoas e espalha desinformação.",
      rigby: "Errado. Rigby fez a escolha segura ao checar a informação primeiro.",
    },
  },
  {
    question: "Alguém mandou mensagens agressivas para um colega online.",
    chuck: "Não é legal. Eu tento ajudar e pedir respeito.",
    rigby: "Eu xingo quando fico irritado e mando mensagens fortes.",
    education: {
      chuck: "Errado. Chuck mostrou comportamento respeitoso online.",
      rigby: "Correto. Rigby foi culpado por cyberbullying, e isso afeta outras pessoas.",
    },
  },
];

const bubbles = {
  judge: document.getElementById("bubble-judge"),
  chuck: document.getElementById("bubble-left"),
  rigby: document.getElementById("bubble-right"),
};

const texts = {
  judge: document.getElementById("text-judge"),
  chuck: document.getElementById("text-left"),
  rigby: document.getElementById("text-right"),
};

const characters = {
  judge: document.getElementById("character-judge"),
  chuck: document.getElementById("character-chuck"),
  rigby: document.getElementById("character-rigby"),
};

const progressText = document.getElementById("progress-text");
const decisionPanel = document.getElementById("decision-panel");
const resultPanel = document.getElementById("result-panel");
const voteChuckButton = document.getElementById("vote-chuck");
const voteRigbyButton = document.getElementById("vote-rigby");

let currentCase = 0;
let pontosChuck = 0;
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
  } else if (role === "chuck") {
    characters.chuck.classList.add("active");
  } else if (role === "rigby") {
    characters.rigby.classList.add("active");
  } else if (role === "both") {
    characters.chuck.classList.add("active");
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

function showChuck(message) {
  texts.chuck.innerText = message;
  bubbles.chuck.classList.add("active");
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
  voteChuckButton.disabled = disabled;
  voteRigbyButton.disabled = disabled;
  voteChuckButton.style.opacity = disabled ? "0.6" : "1";
  voteRigbyButton.style.opacity = disabled ? "0.6" : "1";
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
    showChuck(activeCase.chuck);
    showRigby(activeCase.rigby);
    setActiveCharacter("both");
    showVoting();
  }, 3500);
}

function registerVote(guilty) {
  if (voteChuckButton.disabled || voteRigbyButton.disabled) {
    return;
  }

  disableVotes(true);
  hideVoting();
  hideAllBubbles();

  const activeCase = cases[currentCase];

  if (guilty === "chuck") {
    pontosChuck += 1;
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
  let finalMessage = "";

  if (pontosChuck > pontosRigby) {
    finalMessage =
      "Após analisar todas as evidências, Chuck foi considerado culpado por colocar a segurança digital em risco.";
  } else {
    finalMessage =
      "Após analisar todas as evidências, Rigby foi considerado culpado por colocar a segurança digital em risco.";
  }

  resultPanel.innerText = finalMessage;
  resultPanel.classList.add("visible");
}

voteChuckButton.addEventListener("click", () => registerVote("chuck"));
voteRigbyButton.addEventListener("click", () => registerVote("rigby"));

window.addEventListener("load", () => {
  startCase();
});
