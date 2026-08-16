#!/bin/bash

echo "🎨 Photopea PWA - Instalador Rápido"
echo "===================================="
echo ""

# Limpar processos
pkill -f "python3 start_pwa" 2>/dev/null
pkill -f "node server" 2>/dev/null
sleep 1

# Lançar servidor
cd "$(dirname "$0")"
python3 start_pwa.py

