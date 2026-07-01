const cases = [
  {
    question: "Eu cliquei em um link suspeito enviado por e-mail. O que faço?",
    gubby: "Eu verifico o remetente antes de clicar.",
    rigby: "Eu clico em qualquer link que recebo.",
    education: {
      gubby: "RIGBY INOCENTE. Sempre verificoar o remetente antes de clicar em links.",
      rigby: "GUBBY INOCENTE. clicar em links suspeitos pode instalar vírus e roubar dados.",
    },
  },
  {
    question: "Um colega pediu minha senha para ajudar a mexer no computador. Devo passar?",
    gubby: "Senhas são pessoais e não devem ser compartilhadas.",
    rigby: "Claro, eu passo minha senha e depois altero tudo.",
    education: {
      gubby: "RIGBY INOCENTE. Eu fiz a escolha certa ao manter minha senha privada.",
      rigby: "GUBBY INOCENTE. Compartilhar senhas abre caminho para invasão de contas e perda de privacidade.",
    },
  },
  {
    question: "Eu postei meu endereço e telefone em um perfil público. Isso é seguro?",
    gubby: "Posto meu endereço e telefone para todo mundo ver.",
    rigby: "Eu não publico nada pessoal no meu perfil.",
    education: {
      gubby: "RIGBY INOCENTE. compartilhar informações que podem ser usadas para não é maneiro.",
      rigby: "GUBBY INOCENTE. Eu fui cauteloso. Expor dados pessoais em público é perigoso.",
    },
  },
  {
    question: "Recebi uma notícia duvidosa no grupo escolar. Devo compartilhar?",
    gubby: "Eu busco a fonte antes de compartilhar qualquer notícia.",
    rigby: "Repito para todo mundo antes de verificar se é verdade.",
    education: {
      gubby: "RIGBY INOCENTE. A escolha segura ao checar a informação primeiro.",
      rigby: "GUBBY INOCENTE. Compartilhar fake news prejudica outras pessoas e espalha desinformação.",
    },
  },
  {
    question: "Eu mandei mensagens agressivas para um colega online. Isso está certo?",
    gubby: "Eu xingo quando fico irritado e não quero saber como as pessoas se sentem.",
    rigby: "Não é legal. Eu tento ajudar e pedir respeito.",
    education: {
      gubby: "RIGBY INOCENTE. Cyberbullying machuca outras pessoas.",
      rigby: "GUBBY INOCENTE. Eu mostrei comportamento respeitoso online.",
    },
  },
  {
    question: "Estou em um site não tão confiável que começa a pedir minhas informações pessoais. O que eu faço?",
    gubby: "Não é confiável passar informações pessoais sem ser sites de banco ou serviços seguros.",
    rigby: "Passo minhas informações, já que a vida é curta.",
    education: {
      gubby: "RIGBY INOCENTE. Eu fiz a escolha certa ao proteger minhas informações e usar apenas sites confiáveis.",
      rigby: "GUBBY INOCENTE. Eu fui culpado por confiar em sites inseguros e expor meus dados pessoais.",
    },
  },
  {
    question: "No tribunal, eu uso a mesma senha em vários sites. Isso é seguro?",
    gubby: "Cada conta precisa de uma senha forte e única.",
    rigby: "Uso a mesma senha em todos, assim é mais fácil lembrar.",
    education: {
      gubby: "RIGBY INOCENTE. Eu escolhi a opção segura e protejo melhor minhas contas.",
      rigby: "GUBBY INOCENTE. Eu fui culpado porque repetir senhas em vários sites aumenta o risco de invasão.",
    },
  },
  {
    question: "No tribunal, eu respondo uma pesquisa online pedindo meus dados pessoais. Isso é certo?",
    gubby: "Não compartilho meus dados pessoais em pesquisas duvidosas.",
    rigby: "Respondo tudo, quanto mais, melhor.",
    education: {
      gubby: "RIGBY INOCENTE. Eu agi certo ao manter minha privacidade em pesquisas suspeitas.",
      rigby: "GUBBY INOCENTE. Eu fui culpado por entregar meus dados a fontes não confiáveis.",
    },
  },
  {
    question: "No tribunal, eu uso Wi-Fi público sem proteção. Isso é inteligente?",
    gubby: "Uso VPN ou espero por uma rede segura.",
    rigby: "Conecto direto, não tenho segredo nenhum.",
    education: {
      gubby: "RIGBY INOCENTE. Eu estava certo ao proteger a conexão com VPN ou usar uma rede confiável.",
      rigby: "GUBBY INOCENTE. Eu fui culpado por arriscar meus dados em uma rede pública insegura.",
    },
  },
  {
    question: "No tribunal, eu guardo documentos importantes no celular sem bloqueio. Isso é seguro?",
    gubby: "Melhor manter documentos seguros e com proteção.",
    rigby: "Sem problema, é só para mim.",
    education: {
      gubby: "RIGBY INOCENTE. Eu tomei a atitude correta ao proteger meus documentos pessoais.",
      rigby: "GUBBY INOCENTE. Eu fui culpado por não proteger informações sensíveis no dispositivo.",
    },
  },
];

const bubbles = {
  judge: document.getElementById("bubble-judge"),
  gubby: document.getElementById("bubble-right"),
  rigby: document.getElementById("bubble-left"),
  temmie: document.getElementById("bubble-temmie"),
};

const texts = {
  judge: document.getElementById("text-judge"),
  gubby: document.getElementById("text-right"),
  rigby: document.getElementById("text-left"),
  temmie: document.getElementById("text-temmie"),
};

const characters = {
  judge: document.getElementById("character-judge"),
  gubby: document.getElementById("character-gubby"),
  rigby: document.getElementById("character-rigby"),
  temmie: document.getElementById("character-temmie"),
};

const progressText = document.getElementById("progress-text");
const decisionPanel = document.getElementById("decision-panel");
const resultPanel = document.getElementById("result-panel");
const finalScene = document.getElementById("final-scene");
const votegubbyButton = document.getElementById("vote-gubby");
const voteRigbyButton = document.getElementById("vote-rigby");
const screenOverlay = document.getElementById("screen-overlay");
const startScreen = document.getElementById("start-screen");

let currentCase = 0;
let pontosgubby = 0;
let pontosRigby = 0;
let dialogueQueue = [];
let dialogueIndex = -1;
let dialogueCompleteCallback = null;
let dialogueActive = false;
const nextDialogueButton = document.getElementById("next-dialogue");

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
  } else if (role === "temmie") {
    if (characters.temmie) characters.temmie.classList.add("active");
  } else if (role === "both") {
    characters.gubby.classList.add("active");
    characters.rigby.classList.add("active");
  }
}

function updateProgress() {
  progressText.innerText = `${currentCase + 1} de ${cases.length}`;
}

function showJudge(message) {
  hideAllBubbles();
  texts.judge.innerText = message;
  bubbles.judge.classList.add("active");
  setActiveCharacter("judge");
}

function showgubby(message) {
  hideAllBubbles();
  texts.gubby.innerText = message;
  bubbles.gubby.classList.add("active");
  setActiveCharacter("gubby");
}

function showRigby(message) {
  hideAllBubbles();
  texts.rigby.innerText = message;
  bubbles.rigby.classList.add("active");
  setActiveCharacter("rigby");
}

function showCaseOptions(gubbyMessage, rigbyMessage) {
  hideAllBubbles();
  texts.gubby.innerText = gubbyMessage;
  texts.rigby.innerText = rigbyMessage;
  bubbles.gubby.classList.add("active");
  bubbles.rigby.classList.add("active");
  setActiveCharacter("both");
}

function showTemmie(message) {
  hideAllBubbles();
  texts.temmie.innerText = message;

  // se a mensagem for longa, aplicar classe que torna o balão retangular deitado
  const longThreshold = 80; // caracteres
  const hasLineBreak = /\n/.test(message);
  const isLong = message.length > longThreshold || hasLineBreak;
  if (isLong) {
    bubbles.temmie.classList.add("temmie-wide");
  } else {
    bubbles.temmie.classList.remove("temmie-wide");
  }

  bubbles.temmie.classList.add("active");
  setActiveCharacter("temmie");
}

function showVoting() {
  decisionPanel.classList.add("active");
  disableVotes(false);
}

function hideVoting() {
  decisionPanel.classList.remove("active");
}

function setDialogueButtonVisible(visible) {
  const dialogControls = document.getElementById("dialog-controls");

  if (dialogControls) {
    dialogControls.style.display = visible ? "flex" : "none";
  }

  if (nextDialogueButton) {
    nextDialogueButton.style.display = visible ? "inline-flex" : "none";
  }
}

function showStartScreen() {
  if (startScreen) {
    startScreen.style.display = "flex";
  }
  hideVoting();
  setDialogueButtonVisible(false);
}

function hideStartScreen() {
  if (startScreen) {
    startScreen.style.display = "none";
    startScreen.classList.remove("fade-out");
  }
}

let startTimeout = null;

function fadeOutStartScreen(callback) {
  if (!startScreen) {
    callback();
    return;
  }
  startScreen.classList.add("fade-out");
  const onTransitionEnd = (event) => {
    if (event.propertyName === "opacity") {
      startScreen.removeEventListener("transitionend", onTransitionEnd);
      hideStartScreen();
      callback();
    }
  };
  startScreen.addEventListener("transitionend", onTransitionEnd);
}

function scheduleStart(delayedStart = 5000) {
  if (startTimeout) {
    clearTimeout(startTimeout);
    startTimeout = null;
  }

  startTimeout = setTimeout(() => {
    fadeOutStartScreen(() => {
      startIntro();
    });
  }, delayedStart);
}

function displayDialogueStep(step) {
  if (!step) return;

  if (step.type === "message") {
    const { role, message, focus } = step;
    if (role === "judge") {
      showJudge(message);
    } else if (role === "gubby") {
      showgubby(message);
    } else if (role === "rigby") {
      showRigby(message);
    } else if (role === "temmie") {
      showTemmie(message);
    }

    if (focus) {
      setActiveCharacter(focus);
    }
  }
}

function startDialogueSequence(sequence, onComplete = null) {
  disableVotes(true);
  dialogueQueue = sequence;
  dialogueIndex = -1;
  dialogueCompleteCallback = onComplete;
  dialogueActive = true;
  setDialogueButtonVisible(true);
  advanceDialogue();
}

function advanceDialogue() {
  if (!dialogueActive) return;

  dialogueIndex += 1;

  if (dialogueIndex >= dialogueQueue.length) {
    dialogueActive = false;
    setDialogueButtonVisible(false);

    if (dialogueCompleteCallback) {
      const callback = dialogueCompleteCallback;
      dialogueCompleteCallback = null;
      callback();
    }
    return;
  }

  displayDialogueStep(dialogueQueue[dialogueIndex]);
}

function disableVotes(disabled) {
  votegubbyButton.disabled = disabled;
  voteRigbyButton.disabled = disabled;
  votegubbyButton.style.opacity = disabled ? "0.6" : "1";
  voteRigbyButton.style.opacity = disabled ? "0.6" : "1";
}

function playSecondQuestionInterlude() {
  startDialogueSequence([
    { type: "message", role: "temmie", message: "Senhas são lEEEegaIs, a senha do meu notebook é 1234...", focus: "temmie" },
    { type: "message", role: "judge", message: "CHEGA TEMMIE! acabamos de falar que senhas são pessoais.", focus: "judge" },
    { type: "message", role: "temmie", message: "hihihi, foi só uma brincadeira, nem noteBOok eu tenho.", focus: "temmie" },
    { type: "message", role: "judge", message: "enfim, terceira pergunta.", focus: "judge" },
  ], () => {
    currentCase += 1;
    startCase();
  });
}

function playThirdQuestionInterlude() {
  startDialogueSequence([
    { type: "message", role: "temmie", message: "Meu número de telefone favorito é 4002-8922", focus: "temmie" },
    { type: "message", role: "gubby", message: "Esse não é o número do bom dia e companhia?", focus: "gubby" },
    { type: "message", role: "temmie", message: "Yaya, exatamente.", focus: "temmie" },
    { type: "message", role: "judge", message: "esse tribunal está saindo do controle...", focus: "judge" },
    { type: "message", role: "temmie", message: "Fique tranquilo gatinho preto, estamos tendo uma conversa sofisticada por aqui.", focus: "temmie" },
    { type: "message", role: "judge", message: "Estou perdendo minha paciência nesse tribunal, logo logo terei que mandar alguém para a cadeia se continuar assim.", focus: "judge" },
    { type: "message", role: "rigby", message: "Estou ficando com medo, pórem está sendo bem interessante HAHAHA.", focus: "rigby" },
    { type: "message", role: "judge", message: "Enfim, continunando.", focus: "judge" },
  ], () => {
    currentCase += 1;
    startCase();
  });
}

function startIntro() {
  updateProgress();
  hideVoting();
  resultPanel.classList.remove("visible");
  hideAllBubbles();
  clearCharacterHighlight();

  const firstIntro =
    "Ultimamente andam acontecendo crimes online envolvendo: roubo de dados, phishing e fraude digital.";
  const secondIntro =
    "Trouxemos aqui dois suspeitos desses crimes cruéis, irei fazer perguntas sobre segurança digital e vocês terão que responder corretamente, se errarem, um de vocês será o culpado.";

  startDialogueSequence([
    { type: "message", role: "judge", message: firstIntro, focus: "judge" },
    { type: "message", role: "judge", message: "Junto conosco, uma testemunha que disse que viu um de vocês agindo no crime.", focus: "judge" },
    { type: "message", role: "judge", message: "Esta é Temmie.", focus: "judge" },
    { type: "message", role: "temmie", message: "Hoiii :3", focus: "temmie" },
    { type: "message", role: "temmie", message: "uma perguntinha, eu sou a testemunha?", focus: "temmie" },
    { type: "message", role: "judge", message: "hum, sim, você mesma me disse que sabia quem era o suspeito.", focus: "judge" },
    { type: "message", role: "temmie", message: "Não me lembro, sou Temmie yaya.", focus: "temmie" },
    { type: "message", role: "judge", message: "Como assim? você falou que um deles estava...", focus: "judge" },
    { type: "message", role: "temmie", message: "Eu que não tô entendendo, achei que ganharia algum docinho se inventasse alguma coisa e viesse pra cá ficar atoa.", focus: "temmie" },
    { type: "message", role: "judge", message: "É sério isso Temmie? HUum- enfim, deixa isso pra lá, vamos começar isso SEM INTERUPÇÕES.", focus: "judge" },
    { type: "message", role: "judge", message: secondIntro, focus: "judge" },
    { type: "message", role: "judge", message: "Já que somos apenas animais, vamos descobrir o culpado dessa forma, não prescisamos se preocupar em pagar advogados e nem impostos...", focus: "judge" },
  ], () => {
    startCase();
  });
}

function startCase() {
  updateProgress();
  hideVoting();
  resultPanel.classList.remove("visible");
  hideAllBubbles();
  clearCharacterHighlight();

  const activeCase = cases[currentCase];
  startDialogueSequence([
    { type: "message", role: "judge", message: activeCase.question, focus: "judge" },
  ], () => {
    showCaseOptions(activeCase.gubby, activeCase.rigby);
    showVoting();
  });
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

  startDialogueSequence([
    { type: "message", role: "judge", message: activeCase.education[guilty], focus: "judge" },
  ], () => {
    if (currentCase === 1) {
      playSecondQuestionInterlude();
    } else if (currentCase === 2) {
      playThirdQuestionInterlude();
    } else if (currentCase === 3) {
      playFourthQuestionInterlude();
    } else {
      currentCase += 1;
      if (currentCase < cases.length) {
        startCase();
      } else {
        showFinalResult();
      }
    }
  });
}

function playFourthQuestionInterlude() {
  startDialogueSequence([
    { type: "message", role: "temmie", message: "Uma vez eu joguei uma bomba na escola...", focus: "temmie" },
    { type: "message", role: "judge", message: "QUÊ", focus: "judge" },
    { type: "message", role: "rigby", message: "QUÊ", focus: "rigby" },
    { type: "message", role: "gubby", message: "QUÊ", focus: "gubby" },
    { type: "message", role: "temmie", message: "Brincadeirinha! eu só usei sim uma bomba, mas foi uma bomba de confete pra jogar no meu amiguinho, breeeh :P", focus: "temmie" },
    { type: "message", role: "gubby", message: "Meritíssimo, eu desconfio que essa suposta testemunha é a supeita desses crimes na internet, OLHA OS ABSURDOS QUE ELA ESTÁ DIZENDO-", focus: "gubby" },
    { type: "message", role: "temmie", message:"EU NÃO COMETI NENHUM CRIME ONLINE, só cometi alguns crimes reais...", focus: "temmie"},
    {type:  "message", role: "gubby", message: "ehhh, MESMO ASSIM! VOCÊ ESTÁ CONFESSANDO UM CRIME! JOGAR CONFETES NOS AMIGUINHOPS É ERRADO!", focus: "gubby"},
    { type: "message", role: "temmie", message: "AHA! parece que achamos o suspeito...o suspeito sempre acusa o outro de suspeito para não acharem que ele também é o suspeito, isso não é MUUUUITO estranho meritíssimo?", focus: "temmie" },
    { type: "message", role: "judge", message: "E-eeeu...", focus: "judge" },
    { type: "message", role: "temmie", message: "AHA! temos dois suspeitos nesta sala...o suspeito sempre gagueja com perguntas simples, parece que você é o suspeito meritíssimo.", focus: "temmie" },
    { type: "message", role: "judge", message: "O-QUÊ? SE TÁ ME ZUANDO?", focus: "judge" },
    { type: "message", role: "temmie", message: "nunca...HAHAHAA.", focus: "temmie" },
    { type: "message", role: "rigby", message: "POR FAVOR MERITÍSSIMO, TERMINE DE FAZER AS PERGUNTAS, QUERO IR PRA CASA URGENTEMENTE", focus: "rigby" },
    { type: "message", role: "temmie", message: "AHA! o suspeito sempre é o que quer ir embora mais cedo, quer se livrar da cadeia?", focus: "temmie" },
    { type: "message", role: "rigby", message: "huum-m n-não sei, v-você tá me assustando...", focus: "rigby" },
    { type: "message", role: "temmie", message: "UH, bom saber, por favor meritíssimo, continue a fazer perguntas, mesmo nos já sabemos quem é o suspeito...", focus: "temmie" },
  ], () => {
    currentCase += 1;
    if (currentCase < cases.length) {
      startCase();
    } else {
      showFinalResult();
    }
  });
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
nextDialogueButton.addEventListener("click", () => {
  if (dialogueActive) {
    advanceDialogue();
  }
});

window.addEventListener("load", () => {
  showStartScreen();
  scheduleStart(5000);
});
