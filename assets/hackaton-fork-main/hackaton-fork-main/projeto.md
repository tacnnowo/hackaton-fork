Você é um desenvolvedor Front-End especializado em HTML, CSS e JavaScript.

Analise o código existente de um projeto chamado "Tribunal Hackathon" e implemente uma nova mecânica de julgamento interativo sobre Segurança Digital e Cidadania Online.

## Contexto do Projeto

Personagens:

* Larry = Juiz
* Chuck = Suspeito 1
* Rigby = Suspeito 2

Tema:

* Segurança Digital
* Cidadania Online
* Boas práticas de navegação
* Privacidade
* Fake News
* Senhas seguras
* Cyberbullying
* Proteção de dados

## Objetivo

Transformar o projeto atual em um tribunal interativo onde o usuário atua como júri.

Atualmente o sistema apenas exibe diálogos e permite uma decisão final genérica ("Inocente" ou "Culpado").

A nova versão deve permitir que o usuário tome decisões ao longo do julgamento e que essas decisões influenciem o resultado final.

---

## Requisitos Funcionais

### 1. Estrutura de Casos

Substituir o roteiro linear por uma estrutura baseada em acusações.

Cada acusação deve conter:

* Pergunta ou situação apresentada por Larry.
* Resposta de Chuck.
* Resposta de Rigby.
* Momento de votação do usuário.

Exemplo:

Acusação:
"Alguém clicou em um link suspeito enviado por e-mail."

Chuck:
"Eu clico em qualquer link que recebo."

Rigby:
"Eu verifico o remetente antes de clicar."

---

### 2. Sistema de Votação

Após cada acusação, exibir dois botões:

* Chuck é culpado
* Rigby é culpado

Ao clicar:

* Registrar a escolha.
* Avançar para a próxima acusação.

---

### 3. Sistema de Pontuação

Criar contadores:

```javascript
let pontosChuck = 0;
let pontosRigby = 0;
```

Quando o usuário escolher Chuck:

```javascript
pontosChuck++;
```

Quando escolher Rigby:

```javascript
pontosRigby++;
```

---

### 4. Resultado Final

Após todas as acusações:

Se:

```javascript
pontosChuck > pontosRigby
```

Exibir:

"Após analisar todas as evidências, Chuck foi considerado culpado por colocar a segurança digital em risco."

Caso contrário:

"Após analisar todas as evidências, Rigby foi considerado culpado por colocar a segurança digital em risco."

---

### 5. Explicação Educativa

Após cada votação:

Larry deve explicar rapidamente por que aquela atitude é correta ou incorreta.

Exemplo:

"Baixar arquivos sem verificar a origem pode instalar vírus e comprometer dados pessoais."

Objetivo:

Transformar o projeto em uma ferramenta educativa.

---

## Acusações Obrigatórias

Crie pelo menos 5 casos:

1. Download de arquivos suspeitos.
2. Compartilhamento de senhas.
3. Exposição de dados pessoais.
4. Compartilhamento de fake news.
5. Cyberbullying ou desrespeito online.

As respostas devem deixar claro qual personagem demonstra comportamento seguro e qual demonstra comportamento inseguro.

---

## Melhorias Visuais

Implementar:

### Nome dos Personagens

Exibir o nome de quem está falando nos balões.

Exemplos:

* Larry
* Chuck
* Rigby

---

### Destaque do Personagem Ativo

Quando um personagem estiver falando:

* Aumentar levemente sua escala.
* Deixá-lo com opacidade 100%.

Os demais devem ficar com opacidade reduzida.

Exemplo:

```css
.character {
    opacity: 0.5;
}

.character.active {
    opacity: 1;
    transform: scale(1.05);
}
```

---

### Indicador de Progresso

Mostrar:

```text
Caso 1 de 5
Caso 2 de 5
...
```

Durante todo o julgamento.

---

## Requisitos Técnicos

* Manter HTML, CSS e JavaScript puros.
* Não utilizar frameworks.
* Organizar o JavaScript em funções reutilizáveis.
* Evitar repetição de código.
* Utilizar arrays e objetos para armazenar os casos.
* Garantir que o sistema seja facilmente expansível para adicionar novas acusações.

---

## Qualidade do Código

O código gerado deve:

* Estar comentado.
* Possuir nomes de variáveis claros.
* Ser legível para estudantes iniciantes.
* Manter compatibilidade com navegadores modernos.

---

## Entrega

Forneça:

1. HTML atualizado.
2. CSS atualizado.
3. JavaScript atualizado.
4. Explicação das alterações realizadas.
5. Explicação da lógica do sistema de julgamento.
