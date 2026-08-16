# 🎨 Photopea Desktop App

Aplicativo desktop nativo do Photopea que funciona como um software normal, sem barra de endereços!

## 🚀 Instalação Rápida

### 1️⃣ Instalar Node.js (se não tiver)
- Baixar em: https://nodejs.org/
- Versão LTS recomendada

### 2️⃣ Setup do projeto
```bash
cd ~/photopea-pwa
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Rodar o app
```bash
npm run electron-dev
```

**Pronto!** O Photopea vai abrir como um aplicativo desktop normal! 🎉

---

## 📱 Como é

- ✅ Janela completa sem barra de endereços
- ✅ Ícone no menu Iniciar / Dock
- ✅ Menu Arquivo e Visualizar
- ✅ Funciona offline (com cache)
- ✅ Atualiza automático

---

## 🔨 Compilar para Instalador

Para criar um instalador (.exe no Windows, .dmg no Mac, .AppImage no Linux):

```bash
npm run electron-build
```

O instalador vai ficar em `dist/`

---

## ⌨️ Atalhos

| Tecla | Ação |
|-------|------|
| `Ctrl+Q` ou `Cmd+Q` | Sair |
| `Ctrl+R` | Recarregar |
| `Ctrl+Shift+I` | DevTools |
| `F11` | Tela cheia |

---

## 🔧 Troubleshooting

**"npm: command not found"**
- Node.js não está instalado
- Instale em: https://nodejs.org/

**"Electron não funciona"**
```bash
npm install electron --save-dev
npm run electron-dev
```

**"App não abre"**
```bash
rm -rf node_modules package-lock.json
npm install
npm run electron-dev
```

---

## 📦 Arquivos importantes

- `electron-main.js` - Código principal do app
- `preload.js` - Scripts de segurança
- `package.json` - Configuração do projeto

---

Desenvolvido com ❤️ para usar Photopea como um app desktop de verdade!
