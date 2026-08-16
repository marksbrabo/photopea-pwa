#!/bin/bash

echo "📦 Photopea Desktop App - Setup"
echo "==============================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "   Instale de: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependências
echo "📥 Instalando dependências..."
npm install

echo ""
echo "✓ Setup concluído!"
echo ""
echo "🚀 Para iniciar o app, execute:"
echo "   npm run electron-dev"
echo ""
