const CACHE_NAME = 'photopea-pwa-v1';
const OFFLINE_URL = '/offline.html';

// Arquivos estáticos para cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json'
];

// Instalação do service worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache aberto');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do service worker
self.addEventListener('activate', event => {
  console.log('✓ Service Worker ativado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️  Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de cache: Network First com fallback para cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Para recursos do Photopea (photopea.com)
  if (url.origin === 'https://www.photopea.com' || url.hostname === 'photopea.com') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache bem-sucedidas
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Offline: tentar servir do cache
          return caches.match(request)
            .then(response => response || createOfflineResponse());
        })
    );
    return;
  }

  // Para recursos locais
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
      .catch(() => {
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        return new Response('Recurso não disponível offline', {
          status: 503,
          statusText: 'Serviço Indisponível',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      })
  );
});

// Resposta offline personalizada
function createOfflineResponse() {
  return new Response(
    `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Photopea - Offline</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #001a33 0%, #003366 100%);
            color: white;
            text-align: center;
          }
          .offline-container {
            padding: 40px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
          }
          h1 { margin: 0 0 20px 0; }
          p { margin: 10px 0; opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <h1>📶 Sem Conexão</h1>
          <p>Você está offline. O Photopea requer conexão com a internet.</p>
          <p style="margin-top: 30px; font-size: 12px; opacity: 0.7;">
            Reconecte-se e recarregue a página.
          </p>
        </div>
      </body>
    </html>
    `,
    {
      status: 503,
      statusText: 'Offline',
      headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' })
    }
  );
}

// Sincronização em background (quando voltar online)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-photopea') {
    console.log('🔄 Sincronizando com Photopea...');
    event.waitUntil(
      fetch('https://www.photopea.com')
        .then(() => console.log('✓ Sincronizado!'))
        .catch(() => console.log('⚠️  Falha na sincronização'))
    );
  }
});
