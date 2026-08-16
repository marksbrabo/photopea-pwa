const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Tentar usar HTTPS com certificado auto-assinado
let server;
const port = 8080;

// Verificar se mkcert está disponível (certs autenticados)
const certDir = path.join(os.homedir(), '.localhost-certs');
const certFile = path.join(certDir, 'localhost.crt');
const keyFile = path.join(certDir, 'localhost.key');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const requestHandler = (req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Service Worker pode ser acessado da raiz
  if (req.url === '/service-worker.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Service-Worker-Allowed': '/'
    });
    return res.end(fs.readFileSync(path.join(__dirname, 'service-worker.js')));
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Arquivo não encontrado, servir index.html (PWA routing)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
      } else {
        res.writeHead(500);
        res.end('Erro do servidor');
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Service-Worker-Allowed': '/',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(data);
    }
  });
};

// Tentar HTTPS primeiro
if (fs.existsSync(certFile) && fs.existsSync(keyFile)) {
  try {
    const options = {
      cert: fs.readFileSync(certFile),
      key: fs.readFileSync(keyFile)
    };
    server = https.createServer(options, requestHandler);
    console.log('✓ Usando certificado HTTPS existente');
  } catch (err) {
    console.log('⚠️  Erro ao carregar certificado, usando HTTP');
    server = http.createServer(requestHandler);
  }
} else {
  // Criar certificado auto-assinado na primeira execução
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  try {
    const { exec } = require('child_process');

    // Tentar gerar com openssl
    const command = `openssl req -x509 -newkey rsa:2048 -keyout "${keyFile}" -out "${certFile}" -days 365 -nodes -subj "/CN=localhost"`;

    exec(command, (error) => {
      if (!error && fs.existsSync(certFile) && fs.existsSync(keyFile)) {
        console.log('✓ Certificado HTTPS criado em', certDir);
        const options = {
          cert: fs.readFileSync(certFile),
          key: fs.readFileSync(keyFile)
        };
        server = https.createServer(options, requestHandler);
        startServer();
      } else {
        console.log('⚠️  Usando HTTP (openssl não disponível)');
        server = http.createServer(requestHandler);
        startServer();
      }
    });
  } catch (err) {
    console.log('⚠️  Usando HTTP por padrão');
    server = http.createServer(requestHandler);
    startServer();
  }
}

function startServer() {
  server.listen(port, 'localhost', () => {
    const protocol = server instanceof https.Server ? 'https' : 'http';
    const url = `${protocol}://localhost:${port}`;

    console.log('\n' + '='.repeat(50));
    console.log('🎨 Photopea PWA - Servidor Local');
    console.log('='.repeat(50));
    console.log(`✓ Servidor rodando em: ${url}`);
    console.log('\n📌 Para instalar no navegador:');
    console.log('   1. Abrir o link acima');
    console.log('   2. Ícone de instalar aparecerá na barra de URL');
    console.log('   3. Clicar e confirmar a instalação');
    console.log('\n💡 Navegadores suportados:');
    console.log('   ✓ Chrome/Edge/Brave (mais fácil)');
    console.log('   ✓ Firefox (requer HTTPS - já ativado)');
    console.log('   ✓ Safari (limitado, tente "Adicionar à tela de início")');
    console.log('\n⌨️  Pressione Ctrl+C para parar o servidor\n');
  });
}

// Se não inicializou async acima, iniciar agora
if (!server) {
  setTimeout(startServer, 100);
}

// Tratar encerramen
process.on('SIGINT', () => {
  console.log('\n\n👋 Servidor encerrado');
  process.exit(0);
});
