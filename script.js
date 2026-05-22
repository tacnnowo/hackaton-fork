const script = [
            { char: 'judge', text: "O réu é acusado de roubar a ração. Como se declara?" },
            { char: 'left', text: "Eu sou inocente, meritíssimo! Foi um mal-entendido." },
            { char: 'right', text: "Mentira! Eu vi ele com o focinho na minha tigela!" },
            { char: 'judge', text: "Silêncio no tribunal! Júri, qual é a decisão?" }
        ];

        let currentLine = 0;

        // Elementos do DOM
        const bubbles = {
            judge: document.getElementById('bubble-judge'),
            left: document.getElementById('bubble-left'),
            right: document.getElementById('bubble-right')
        };
        const texts = {
            judge: document.getElementById('text-judge'),
            left: document.getElementById('text-left'),
            right: document.getElementById('text-right')
        };
        const decisionPanel = document.getElementById('decision-panel');

        function hideAllBubbles() {
            bubbles.judge.classList.remove('active');
            bubbles.left.classList.remove('active');
            bubbles.right.classList.remove('active');
        }

        function nextLine() {
            if (currentLine < script.length) {
                hideAllBubbles();
                
                const line = script[currentLine];
                texts[line.char].innerText = line.text;
                bubbles[line.char].classList.add('active');
                
                currentLine++;
                
                // Vai para a próxima linha após 3.5 segundos, ou mostra os botões
                if (currentLine < script.length) {
                    setTimeout(nextLine, 3500);
                } else {
                    // Fim do roteiro, mostra o painel de decisão
                    setTimeout(() => {
                        decisionPanel.classList.add('active');
                    }, 1000);
                }
            }
        }

        // Função chamada ao clicar em "Inocente" ou "Culpado"
        function makeDecision(veredito) {
            decisionPanel.classList.remove('active');
            hideAllBubbles();
            
            bubbles.judge.classList.add('active');
            if (veredito === 'Inocente') {
                texts.judge.innerText = "O júri decidiu: INOCENTE! O réu está livre.";
            } else {
                texts.judge.innerText = "O júri decidiu: CULPADO! Sem sachê por 1 mês.";
            }
        }

        // Inicia o "jogo" após 1 segundo
        setTimeout(nextLine, 1000);
