# Aula: PWA, Firebase Hosting e Notificações Push
### Estudo de caso: projeto DWTSP (Contato Direto pelo WhatsApp)

> Material de apoio para a disciplina **Desenvolvimento de Plataformas Móveis**
> Baseado no código real do projeto [dwtsp](../README.MD)

---

## 1. Visão geral da arquitetura

O projeto é uma aplicação web estática (HTML/CSS/JS puro, sem framework/bundler)
hospedada no **Firebase Hosting**, transformada em **PWA (Progressive Web App)**
com suporte a **notificações push via Firebase Cloud Messaging (FCM)**.

```mermaid
flowchart LR
    A[Navegador do usuário] -->|1. acessa| B[index.html]
    B -->|2. registra| C[Service Worker\nservice-worker.js]
    B -->|3. inicializa SDK e pede permissão| D[Firebase Messaging]
    D -->|4. gera token FCM| E[Servidor/Backend ou Console Firebase]
    E -->|5. envia push| C2[firebase-messaging-sw.js]
    C -->|cacheia assets| F[Cache Storage]
    B -.->|deploy| G[Firebase Hosting]
```

Peças principais do repositório:

| Arquivo | Papel |
|---|---|
| [public/index.html](../public/index.html) | Página principal, PWA + inicialização do Firebase (client-side) |
| [public/manifest.json](../public/manifest.json) | Manifesto do PWA (ícones, nome, cores, modo de exibição) |
| [public/scripts/main.js](../public/scripts/main.js) | Registra o Service Worker de cache |
| [public/scripts/service-worker.js](../public/scripts/service-worker.js) | Service Worker de **cache offline** (install/fetch/activate) |
| [public/firebase-messaging-sw.js](../public/firebase-messaging-sw.js) | Service Worker **dedicado ao FCM** (notificações em background) |
| [firebase.json](../firebase.json) | Configuração do Firebase Hosting |
| [package.json](../package.json) | Dependência do SDK `firebase` |

---

## 2. Configuração do Firebase

### 2.1 Firebase Hosting (`firebase.json`)

```json
{
  "hosting": {
    "site": "dwtsp",
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

Pontos:
- `"public": "public"` define a pasta que é publicada (equivalente ao `dist`/`build` de outros frameworks).
- `rewrites` com `"source": "**"` redireciona **todas** as rotas para `index.html` — padrão usado em SPAs para permitir rotas do lado do cliente.
- O deploy é feito com a CLI: `firebase deploy` (requer `firebase login` previamente).

### 2.2 SDK do Firebase no cliente (`index.html`)

O projeto usa o **Firebase JS SDK v10 (modular)**, importado via CDN com `type="module"`:

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "services-sandroaf.firebaseapp.com",
  projectId: "services-sandroaf",
  storageBucket: "services-sandroaf.appspot.com",
  messagingSenderId: "8530075618",
  appId: "1:8530075618:web:476219e15e278d98d2a3bb",
  measurementId: "G-STZ7LQHZK3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
```

Ponto importante para discutir com os alunos: o `firebaseConfig` (incluindo `apiKey`) **não é um segredo** — ele identifica o projeto, não autentica requisições. A segurança real vem das **regras de segurança** (Firestore/Storage) e da configuração de domínios autorizados no console. Mesmo assim, é uma boa prática **não versionar chaves como a VAPID key diretamente no código-fonte de produção**; aqui está hardcoded para fins didáticos.

---

## 3. PWA — `manifest.json`

O manifesto é o que permite "instalar" a aplicação como um app nativo:

```json
{
  "name": "dwtsp.web.app",
  "short_name": "dwtsp",
  "start_url": ".",
  "display": "minimal-ui",
  "background_color": "#999",
  "theme_color": "#f2f2f2",
  "icons": [ /* vários tamanhos para Android, iOS e Windows 11 */ ]
}
```

Conceitos-chave:
- **`display`**: controla o "chrome" do navegador ao abrir o app instalado (`standalone`, `minimal-ui`, `fullscreen`, `browser`).
- **`start_url`**: página inicial quando o app é aberto a partir do ícone instalado.
- **`icons`**: múltiplos tamanhos/propósitos (`any` vs `maskable`) — necessário por causa das diferenças entre Android (ícones adaptativos), iOS e Windows (Tiles do Windows 11).
- O manifesto é referenciado no `<head>` do HTML: `<link rel="manifest" href="/manifest.json">`.
- Meta tags complementares usadas no `index.html`: `theme-color`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-title` — cobrem particularidades do Safari/iOS, que não segue 100% o manifest.json.

Ferramenta útil: aba **Application > Manifest** do DevTools do Chrome, e o critério de "instalabilidade" (installability criteria).

---

## 4. Service Worker de cache offline (`scripts/service-worker.js`)

### 4.1 Registro (`main.js`)

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scripts/service-worker.js')
      .then((registration) => console.log('Service Worker registrado:', registration))
      .catch((error) => console.error('Falha ao registrar o Service Worker:', error));
  });
}
```

- Feature detection (`'serviceWorker' in navigator`) antes de tentar registrar.
- Registro dentro do evento `load` para não atrasar o carregamento inicial da página.
- Service Workers só funcionam em contexto seguro (HTTPS ou `localhost`).

### 4.2 Ciclo de vida: `install` → `activate` → `fetch`

```mermaid
sequenceDiagram
    participant P as Página
    participant SW as Service Worker
    participant C as Cache Storage
    P->>SW: register()
    SW->>SW: evento install
    SW->>C: cache.addAll(resourcesToCache)
    SW->>SW: evento activate
    SW->>C: remove caches antigos (versão diferente)
    P->>SW: fetch (requisição de rede)
    SW->>C: cache.match(request)
    alt encontrado no cache
        SW-->>P: resposta do cache
    else não encontrado
        SW->>SW: fetch(request) na rede
        SW->>C: cache.put(request, response)
        SW-->>P: resposta da rede
    end
```

- **`install`**: pré-cacheia uma lista de assets estáticos (`resourcesToCache`) usando `caches.open(cacheName).addAll(...)`. Estratégia conhecida como **"cache the app shell"**.
- **`activate`**: limpa caches de versões antigas comparando o nome (`cacheName = 'meuAppCache-v1'`) — importante para **versionamento de cache** (mudar o nome força atualização).
- **`fetch`**: estratégia **"Cache First, fallback to Network"** — tenta responder do cache; se não encontrar, busca na rede e grava no cache para a próxima vez. Em caso de falha total (offline), cai no fallback: página `offline.html` para navegação, imagem padrão para `image`, ou uma resposta 503 textual.

---

## 5. Notificações Push com Firebase Cloud Messaging (FCM)

**Dois Service Workers distintos**
coexistindo no projeto.

### 5.1 Passo a passo do fluxo Push

```mermaid
sequenceDiagram
    participant U as Usuário
    participant App as index.html (cliente)
    participant Nav as Notification API
    participant FCM as Firebase Cloud Messaging
    participant SW as firebase-messaging-sw.js

    App->>Nav: Notification.requestPermission()
    Nav-->>U: exibe prompt de permissão
    U-->>Nav: concede permissão
    App->>FCM: getToken(messaging, { vapidKey })
    FCM-->>App: token único do dispositivo/navegador
    Note over App,FCM: token deveria ser enviado a um backend<br/>para associar ao usuário e permitir envio direcionado
    FCM-->>SW: envia push (evento 'push')
    SW->>SW: self.registration.showNotification(...)
```

### 5.2 Solicitação de permissão e obtenção do token (client-side, em `index.html`)

```js
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    getToken(messaging, { vapidKey: 'BDul1owA-...' })
      .then((token) => console.log('Token FCM:', token))
      .catch((err) => console.error('Erro ao obter token:', err));
  } else {
    console.log('Permissão de notificação negada');
  }
});
```

- A **VAPID key** (Voluntary Application Server Identification) é a chave pública que identifica o remetente autorizado a enviar push para esse projeto — gerada no console do Firebase (Project Settings > Cloud Messaging > Web Push certificates).
- O `token` retornado identifica **este navegador/dispositivo específico**. Em uma aplicação real, esse token deve ser enviado para um backend e persistido (associado ao usuário) para permitir o envio de notificações direcionadas.

### 5.3 Recebimento em background (`firebase-messaging-sw.js`)

```js
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
  const data = event.data.json();
  self.registration.showNotification(data.notification.title, {
    body: data.notification.body,
    icon: '/img/logo-dwtsp-96.png'
  });
});
```

- Esse arquivo **precisa ficar na raiz do escopo do site** (`/firebase-messaging-sw.js`), pois é o nome/caminho padrão que o SDK do FCM procura para lidar com mensagens em background.
- Usa a **versão "compat"** do SDK (API global `firebase.*`) via `importScripts`, porque Service Workers não suportam `import` de módulos ES do mesmo jeito que a página (limitação historicamente contornada com a versão compat).
- O tratamento manual do evento `push` (em vez de usar `messaging.onBackgroundMessage(...)`) dá controle total sobre o payload e o ícone exibido.

---

## 6. Pontos de atenção

debate/exercício com base neste projeto real:

1. **Dois Service Workers concorrentes**: `service-worker.js` (cache) é registrado em `/scripts/service-worker.js` com escopo `/scripts/`, e `firebase-messaging-sw.js` fica na raiz. Pergunta para a turma: eles conflitam? Como seria a arquitetura correta para **unificar cache offline + push** em um único Service Worker (ou como fazer dois SWs coexistirem corretamente com escopos diferentes)?
2. **Versões diferentes do SDK do Firebase** usadas em cada arquivo (`10.0.0` no `firebase-messaging-sw.js` vs `10.11.0` no `index.html`) — por que isso é um risco de manutenção?
3. **`index_firebase.html`** é o template padrão gerado pelo `firebase init hosting` e não está integrado ao app — bom exemplo de "boilerplate esquecido" para mostrar como identificar código morto num projeto real.
4. **Fallback de offline**: testar desligando a rede no DevTools (`Application > Service Workers > Offline`) e observar `offline.html` sendo servido.
5. **Segurança**: diferenciar o que é "chave pública/identificador" (apiKey, VAPID key) do que precisa ser protegido no backend (nunca existe neste projeto porque tudo é client-side).
6. **Ciclo de atualização do Service Worker**: mostrar como o navegador detecta um novo `service-worker.js` (byte a byte) e o fluxo *waiting → skipWaiting → activate*.

---
