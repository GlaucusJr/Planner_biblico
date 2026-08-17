# 📖 Planner Bíblico

O **Planner Bíblico** é uma aplicação web criada para acompanhar a leitura da Bíblia em ordem cronológica ao longo de um ano.

A ideia surgiu de uma experiência pessoal: eu já acompanhava minha leitura bíblica utilizando um **planner impresso**, marcando diariamente os capítulos lidos e seguindo a sequência cronológica proposta.

Com o tempo, percebi que poderia tornar esse processo mais prático, organizado e acessível.

Foi então que pensei:

> Por que não transformar esse planner físico em uma aplicação que eu pudesse acessar de qualquer dispositivo?

A partir dessa ideia nasceu o **Planner Bíblico**.

---

## ✨ Sobre o projeto

O objetivo do Planner Bíblico é tornar o acompanhamento da leitura diária mais simples e organizado, sem perder a proposta do planner tradicional.

A aplicação divide a leitura em **52 semanas**, permitindo acompanhar o progresso ao longo do ano e registrar reflexões sobre cada leitura.

Além de marcar os dias concluídos, o usuário pode escrever um resumo sobre aquilo que aprendeu, refletiu ou entendeu durante a leitura.

Dessa forma, o projeto funciona não apenas como um checklist de leitura, mas também como um pequeno diário de estudo bíblico.

---

## 🙏 Por que eu criei este projeto?

Durante minha leitura bíblica, eu utilizava um planner impresso para acompanhar a ordem cronológica dos livros e capítulos.

O método funcionava muito bem, mas comecei a perceber algumas limitações naturais do papel:

- precisava estar sempre com o planner por perto;
- não conseguia acessar minhas anotações em outros dispositivos;
- acompanhar o progresso geral exigia fazer isso manualmente;
- os resumos e reflexões ficavam espalhados entre planner e anotações;
- não havia sincronização ou backup.

Como desenvolvedor, enxerguei nisso uma oportunidade de unir duas coisas importantes para mim: **tecnologia e estudo da Bíblia**.

Decidi então criar uma versão digital desse processo, mantendo a simplicidade do planner físico, mas adicionando recursos que uma aplicação web pode oferecer.

---

## 🚀 Funcionalidades

- 📖 Plano de leitura bíblica em ordem cronológica
- 📅 Organização em 52 semanas
- ✅ Marcação das leituras concluídas
- 📊 Progresso geral da leitura
- 📈 Quantidade de dias concluídos e restantes
- 🔥 Contador de sequência de leitura
- 📝 Campo para resumo e reflexão de cada leitura
- ☁️ Salvamento automático dos dados
- 🔐 Login com conta Google
- 🔄 Sincronização entre dispositivos
- 🌙 Modo claro e escuro
- 📱 Layout responsivo para computador e celular
- 💾 Persistência dos dados utilizando Firebase

---

## 🧠 Como funciona

Cada semana possui sete dias de leitura.

Ao concluir a leitura do dia, o usuário pode marcá-la como concluída e registrar um resumo pessoal.

Exemplo:

```text
Semana 1
Dia 1

Leitura:
Gênesis 1–3

Meu resumo:
Aqui posso registrar o que aprendi, os versículos que chamaram
minha atenção e as reflexões que tive durante a leitura.
```

O progresso é salvo automaticamente na nuvem e vinculado à conta Google utilizada no login.

Isso permite começar uma leitura no computador e continuar posteriormente pelo celular ou outro dispositivo.

---

## 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando:

- **HTML5**
- **CSS3**
- **JavaScript**
- **Firebase Authentication**
- **Cloud Firestore**
- **Google Authentication**
- **Tabler Icons**

A aplicação utiliza o Firebase para autenticação dos usuários e armazenamento do progresso e dos resumos.

---

## 📂 Estrutura do projeto

```text
planner-biblico/
│
├── index.html
├── style.css
├── script.js
├── Logo.png
└── README.md
```

### `index.html`

Responsável pela estrutura da aplicação.

### `style.css`

Contém toda a identidade visual, responsividade e os modos claro e escuro.

### `script.js`

Responsável pelas funcionalidades do planner, incluindo:

- plano de leitura;
- Firebase;
- autenticação;
- sincronização;
- progresso;
- resumos;
- navegação entre semanas.

### `Logo.png`

Identidade visual do Planner Bíblico.

---

## ▶️ Como executar o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd planner-biblico
```

Como o projeto utiliza módulos JavaScript e Firebase, o recomendado é executá-lo através de um servidor local.

### Utilizando VS Code + Live Server

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Abra o arquivo `index.html`.
4. Clique em **Go Live**.

A aplicação será aberta em um endereço semelhante a:

```text
http://127.0.0.1:5500
```

---

## 🔥 Firebase

Para utilizar autenticação e sincronização, é necessário configurar um projeto no Firebase com:

- Firebase Authentication;
- login com Google;
- Cloud Firestore.

As regras do Firestore devem garantir que cada usuário tenha acesso somente aos próprios dados.

Exemplo:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

  }
}
```

---

## 💡 Ideia do projeto

O Planner Bíblico nasceu de uma necessidade simples:

**pegar algo que já fazia parte da minha rotina e usar tecnologia para torná-lo melhor.**

Em vez de abandonar o método do planner impresso, a ideia foi preservar aquilo que funcionava e melhorar a experiência através de uma aplicação.

Esse projeto representa justamente uma das coisas que mais gosto em desenvolvimento:

> observar um problema real, imaginar uma solução e transformá-la em software.

---

## 🔮 Próximas melhorias

Algumas funcionalidades que podem ser adicionadas futuramente:

- 📅 leitura correspondente à data atual;
- 🔎 pesquisa entre os resumos;
- ⭐ versículos favoritos;
- 🙏 espaço específico para oração;
- 💡 campo de aprendizados do dia;
- 📖 versículo-chave da leitura;
- 📊 dashboard anual de progresso;
- 🔥 histórico de sequência;
- 📱 versão PWA instalável;
- 🔔 lembretes de leitura;
- 🗓️ recuperação e organização de leituras atrasadas.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Glaucus Junior**.

Desenvolvido como um projeto pessoal para unir **tecnologia, organização e estudo bíblico**.

---

> _“Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.”_  
> **Salmos 119:105**
