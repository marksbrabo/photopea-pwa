#!/usr/bin/env python3
"""
Script simples para servir Photopea PWA com HTTPS
"""
import os
import ssl
import sys
import signal
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Configurações
PORT = 8080
CERT_DIR = Path.home() / ".localhost-certs"
CERT_FILE = CERT_DIR / "localhost.crt"
KEY_FILE = CERT_DIR / "localhost.key"

class PWAHandler(SimpleHTTPRequestHandler):
    """Handler customizado para PWA"""

    def end_headers(self):
        # Headers necessários para PWA
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def do_GET(self):
        # Service Worker na raiz
        if self.path == '/service-worker.js':
            self.path = '/service-worker.js'

        # PWA routing - servir index.html para rotas não encontradas
        if not os.path.exists(self.translate_path(self.path)):
            if self.path.startswith('/'):
                self.path = '/index.html'

        super().do_GET()

    def log_message(self, format, *args):
        """Log customizado"""
        if '200' in format:
            print(f"  ✓ {args[0]}")
        elif '404' in format:
            print(f"  ⚠️  404: {args[0]}")

def main():
    # Verificar certificados
    if not CERT_FILE.exists() or not KEY_FILE.exists():
        print("❌ Certificado não encontrado!")
        print(f"   Caminho esperado: {CERT_FILE}")
        print("\n   Para criar, execute:")
        print(f"   mkdir -p {CERT_DIR}")
        print(f"   openssl req -x509 -newkey rsa:2048 \\")
        print(f"     -keyout {KEY_FILE} \\")
        print(f"     -out {CERT_FILE} \\")
        print(f"     -days 365 -nodes -subj '/CN=localhost'")
        sys.exit(1)

    # Mudar para diretório do app
    os.chdir(Path(__file__).parent)

    # Criar servidor
    server = HTTPServer(('localhost', PORT), PWAHandler)

    # Configurar HTTPS
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(str(CERT_FILE), str(KEY_FILE))
    server.socket = context.wrap_socket(server.socket, server_side=True)

    # Exibir mensagens
    print("\n" + "="*55)
    print("🎨 PHOTOPEA PWA - Servidor Local")
    print("="*55)
    print(f"\n✓ Servidor rodando em: https://localhost:{PORT}")
    print("\n📌 COMO INSTALAR NO FIREFOX:")
    print("   1. Abrir: https://localhost:8080")
    print("   2. Ícone ⚙️ (canto superior direito)")
    print("   3. Selecionar 'Instalar Photopea'")
    print("   4. Confirmar")
    print("\n⚠️  Certificado auto-assinado (seguro, ignore aviso)")
    print("\n📊 Navegadores suportados:")
    print("   ✓ Firefox (melhor)")
    print("   ✓ Chrome / Edge / Brave")
    print("   ✓ Safari (limitado)")
    print("\n⌨️  Pressione Ctrl+C para parar\n")

    # Handler para Ctrl+C
    def signal_handler(sig, frame):
        print('\n\n👋 Servidor encerrado')
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    # Iniciar
    try:
        server.serve_forever()
    except Exception as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
