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
      gubby: "Errado. Eu fiz a escolha certa ao proteger minhas informações e usar apenas sites confiáveis.",
      rigby: "Correto. Eu fui culpado por confiar em sites inseguros e expor meus dados pessoais.",
    },
  },
  {
    question: "No tribunal, eu uso a mesma senha em vários sites. Isso é seguro?",
    gubby: "Cada conta precisa de uma senha forte e única.",
    rigby: "Uso a mesma senha em todos, assim é mais fácil lembrar.",
    education: {
      gubby: "Errado. Eu escolhi a opção segura e protejo melhor minhas contas.",
      rigby: "Correto. Eu fui culpado porque repetir senhas em vários sites aumenta o risco de invasão.",
    },
  },
  {
    question: "No tribunal, eu respondo uma pesquisa online pedindo meus dados pessoais. Isso é certo?",
    gubby: "Não compartilho meus dados pessoais em pesquisas duvidosas.",
    rigby: "Respondo tudo, quanto mais, melhor.",
    education: {
      gubby: "Errado. Eu agi certo ao manter minha privacidade em pesquisas suspeitas.",
      rigby: "Correto. Eu fui culpado por entregar meus dados a fontes não confiáveis.",
    },
  },
  {
    question: "No tribunal, eu uso Wi-Fi público sem proteção. Isso é inteligente?",
    gubby: "Uso VPN ou espero por uma rede segura.",
    rigby: "Conecto direto, não tenho segredo nenhum.",
    education: {
      gubby: "Errado. Eu estava certo ao proteger a conexão com VPN ou usar uma rede confiável.",
      rigby: "Correto. Eu fui culpado por arriscar meus dados em uma rede pública insegura.",
    },
  },
  {
    question: "No tribunal, eu guardo documentos importantes no celular sem bloqueio. Isso é seguro?",
    gubby: "Melhor manter documentos seguros e com proteção.",
    rigby: "Sem problema, é só para mim.",
    education: {
      gubby: "Errado. Eu tomei a atitude correta ao proteger meus documentos pessoais.",
      rigby: "Correto. Eu fui culpado por não proteger informações sensíveis no dispositivo.",
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
  } else if (role === "temmie") {
    if (characters.temmie) characters.temmie.classList.add("active");
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

function disableVotes(disabled) {
  votegubbyButton.disabled = disabled;
  voteRigbyButton.disabled = disabled;
  votegubbyButton.style.opacity = disabled ? "0.6" : "1";
  voteRigbyButton.style.opacity = disabled ? "0.6" : "1";
}

function playSecondQuestionInterlude() {
  showTemmie("Senhas são lEEEegaIs, a senha do meu notebook é 1234...");

  voteTimeout = setTimeout(() => {
    showJudge("CHEGA TEMMIE! acabamos de falar que senhas são pessoais.");

    voteTimeout = setTimeout(() => {
      showTemmie("hihihi, foi só uma brincadeira, nem noteBOok eu tenho.");

      voteTimeout = setTimeout(() => {
        showJudge("enfim, terceira pergunta.");
        setActiveCharacter("judge");

        voteTimeout = setTimeout(() => {
          currentCase += 1;
          startCase();
        }, 4500);
      }, 4500);
    }, 4500);
  }, 4500);
}

function playThirdQuestionInterlude() {
  showTemmie("Meu número de telefone favorito é 4002-8922");

  voteTimeout = setTimeout(() => {
    showgubby("Esse não é o número do bom dia e companhia?");

    voteTimeout = setTimeout(() => {
      showTemmie("Yaya, exatamente.");

      voteTimeout = setTimeout(() => {
        showJudge("esse tribunal está saindo do controle...");

        voteTimeout = setTimeout(() => {
          showTemmie("Fique tranquilo gatinho preto, estamos tendo uma conversa sofisticada por aqui.");

          voteTimeout = setTimeout(() => {
            showJudge("Estou perdendo minha paciência nesse tribunal, logo logo terei que mandar alguém para a cadeia se continuar assim.");

            voteTimeout = setTimeout(() => {
              showRigby("Estou ficando com medo, pórem está sendo bem interessante HAHAHA.");

              voteTimeout = setTimeout(() => {
                showJudge("Enfim, continunando.");
                setActiveCharacter("judge");

                voteTimeout = setTimeout(() => {
                  currentCase += 1;
                  startCase();
                }, 4500);
              }, 4500);
            }, 4500);
          }, 4500);
        }, 4500);
      }, 4500);
    }, 4500);
  }, 4500);
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

  showJudge(firstIntro);

  voteTimeout = setTimeout(() => {
    showJudge("Junto conosco, uma testemunha que disse que viu um de vocês agindo no crime.");

    voteTimeout = setTimeout(() => {
      showJudge("Esta é Temmie.");

      voteTimeout = setTimeout(() => {
        showTemmie("Hoiii :3");

        voteTimeout = setTimeout(() => {
          showTemmie("uma perguntinha, eu sou a testemunha?");

          voteTimeout = setTimeout(() => {
            showJudge("hum, sim, você mesma me disse que sabia quem era o suspeito.");

            voteTimeout = setTimeout(() => {
              showTemmie("Não me lembro, sou Temmie yaya.");

              voteTimeout = setTimeout(() => {
                showJudge("Como assim? você falou que um deles estava...");

                voteTimeout = setTimeout(() => {
                  showTemmie("Eu que não tô entendendo, achei que ganharia algum docinho se inventasse alguma coisa e viesse pra cá ficar atoa.");

                  voteTimeout = setTimeout(() => {
                    showJudge("É sério isso Temmie? HUum- enfim, deixa isso pra lá, vamos começar isso SEM INTERUPÇÕES.");

                    voteTimeout = setTimeout(() => {
                      showJudge(secondIntro);

                      voteTimeout = setTimeout(() => {
                        startCase();
                      }, 10000);
                    }, 10000);
                  }, 10000);
                }, 4500);
              }, 4500);
            }, 4500);
          }, 4500);
        }, 4500);
      }, 4500);
    }, 4500);
  }, 4500);
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
  }, 3200);
}

function playFourthQuestionInterlude() {
  showTemmie("Uma vez eu joguei uma bomba na escola..");

  voteTimeout = setTimeout(() => {
    showJudge("QUÊ");

    voteTimeout = setTimeout(() => {
      showRigby("QUÊ");

      voteTimeout = setTimeout(() => {
        showgubby("QUÊ");

        voteTimeout = setTimeout(() => {
          showTemmie("Brincadeirinha! eu só usei sim uma bomba, mas foi uma bomba de confete pra jogar no meu amiguinho, breeeh :P");

          voteTimeout = setTimeout(() => {
            showgubby("Meritíssimo, eu desconfio que essa suposta testemunha é a supeita desses crimes na internet, OLHA OS ABSURDOS QUE ELA ESTÁ DIZENDO-");

            voteTimeout = setTimeout(() => {
              showTemmie("AHA! parece que achamos o suspeito...o suspeito sempre acusa o outro de suspeito para não acharem que ele também é o suspeito, isso não é MUUUUITO estranho meritíssimo?");

              voteTimeout = setTimeout(() => {
                showJudge("E-eeeu...");

                voteTimeout = setTimeout(() => {
                  showTemmie("AHA! temos dois suspeitos nesta sala...o suspeito sempre gagueja com perguntas simples, parece que você é o suspeito meritíssimo.");

                  voteTimeout = setTimeout(() => {
                    showJudge("O-QUÊ? SE TÁ ME ZUANDO?");

                    voteTimeout = setTimeout(() => {
                      showTemmie("nunca...HAHAHAA.");

                      voteTimeout = setTimeout(() => {
                        showRigby("POR FAVOR MERITÍSSIMO, TERMINE DE FAZER AS PERGUNTAS, QUERO IR PRA CASA URGENTEMENTE");

                        voteTimeout = setTimeout(() => {
                          showTemmie("AHA! o suspeito sempre é o que quer ir embora mais cedo, quer se livrar da cadeia?");

                          voteTimeout = setTimeout(() => {
                            showRigby("huum-m n-não sei, v-você tá me assustando...");

                            voteTimeout = setTimeout(() => {
                              showTemmie("UH, bom saber, por favor meritíssimo, continue a fazer perguntas, mesmo nos já sabemos quem é o suspeito...");

                              voteTimeout = setTimeout(() => {
                                currentCase += 1;
                                if (currentCase < cases.length) {
                                  startCase();
                                } else {
                                  showFinalResult();
                                }
                              }, 1000);
                            }, 1000);
                          }, 1000);
                        }, 1000);
                      }, 1000);
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
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
