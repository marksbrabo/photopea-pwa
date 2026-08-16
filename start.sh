#!/bin/bash

# Script simples para rodar o servidor

echo "🎨 Iniciando Photopea PWA..."
echo ""

# Parar servidor anterior
pkill -f "node server.js" 2>/dev/null

# Aguardar
sleep 2

# Mudar para diretório
cd "$(dirname "$0")"

# Rodar servidor
echo "✓ Servidor iniciado em https://localhost:8080"
echo ""
echo "📌 Instruções:"
echo "   1. Abrir: https://localhost:8080"
echo "   2. Firefox: Menu ≡ → Instalar Photopea"
echo "   3. Confirmar a instalação"
echo ""
echo "⚠️  Certificado auto-assinado (normal, é seguro)"
echo ""

node server.js
