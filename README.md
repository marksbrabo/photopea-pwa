# Photopea PWA - Editor de Imagens Instalável

Um Progressive Web App do Photopea que permite usar o editor de imagens profissional como um app nativo, sem precisar abrir o navegador toda vez.

## 🚀 Como Usar

### Opção 1: Serve Local (Recomendado para desenvolvimento)

```bash
# Instalar dependências (opcional, apenas para server)
npm install -g http-server

# Iniciar servidor local
http-server .

# Abrir em http://localhost:8080
```

### Opção 2: Hospedar Online

1. **GitHub Pages:**
   - Fazer push para um repositório GitHub
   - Ativar GitHub Pages nas configurações
   - Acessar em `https://seu-usuario.github.io/photopea-pwa`

2. **Netlify:**
   - Fazer drag & drop da pasta no Netlify
   - Automaticamente hospedará em um domínio

3. **Vercel:**
   - Fazer push para GitHub
   - Conectar repositório ao Vercel
   - Implantação automática

4. **Seu servidor próprio:**
   - Copiar arquivos para servidor web (Apache, Nginx)
   - Servir com HTTPS (requisito para PWA)

## 📱 Como Instalar como App

### Windows / Linux (Chrome, Edge)
1. Abrir em um navegador (http://localhost:8080)
2. Clicar no ícone "Instalar" na barra de URL (canto direito)
3. Clicar em "Instalar"
4. O app aparecerá no menu Iniciar e área de trabalho

### macOS (Chrome, Edge)
1. Abrir em um navegador
2. Menu → Mais ferramentas → Criar atalho
3. Marcar "Abrir como janela"
4. Clicar "Criar"
5. O app aparecerá no Launchpad

### iPhone / iPad (Safari)
1. Abrir em Safari
2. Ícone de compartilhamento (canto inferior)
3. "Adicionar à tela de início"
4. Nomear e adicionar

### Android (Chrome)
1. Abrir em Chrome
2. Menu → "Instalar app" ou "Instalar Photopea"
3. Confirmar
4. O app aparecerá na tela inicial

## ✨ Funcionalidades

- ✅ Instala como app nativo (sem precisar do navegador)
- ✅ Funciona offline (com cache de arquivos estáticos)
- ✅ Sincroniza automaticamente quando voltar online
- ✅ Ícone no menu Iniciar / Dock / Tela inicial
- ✅ Acesso rápido via atalhos
- ✅ Tema escuro automático
- ✅ Responsivo para desktop e mobile

## 🔧 Arquivos Principais

- `index.html` - Página principal com iframe do Photopea
- `manifest.json` - Metadados do app PWA
- `service-worker.js` - Cache e sincronização offline
- `style.css` - Estilos globais
- `offline.html` - Página de offline

## 📋 Requisitos

- ✅ Navegador moderno (Chrome, Edge, Safari, Firefox - versão recente)
- ✅ Conexão com internet (Photopea é online)
- ✅ HTTPS (se hospedar online; localhost funciona sem HTTPS)

## ⚙️ Personalização

### Alterar cores/tema
Editar `manifest.json`:
```json
{
  "theme_color": "#001a33",
  "background_color": "#ffffff"
}
```

### Alterar ícone
Editar os SVG nos arquivos `index.html` e `manifest.json`

## 🐛 Troubleshooting

**"Não consegui instalar"**
- Verificar se está usando HTTPS (obrigatório online)
- Aguardar carregamento completo da página
- Tentar em outro navegador

**"Offline não funciona"**
- Photopea é um app online, offline mostra aviso
- É possível descarregar imagens quando online
- Service worker faz cache de arquivos estáticos

**"Não aparece ícone de instalar"**
- Aguardar 30 segundos após carregar a página
- Tentar recarregar (F5)
- Verificar console (F12) para erros

## 📝 Notas

- Photopea é um software pago (mas tem versão gratuita)
- Todas as edições são feitas no servidor do Photopea
- Os projetos podem ser salvos na sua conta do Photopea
- Este PWA é apenas um wrapper do Photopea online

## 🔗 Links Úteis

- [Photopea.com](https://www.photopea.com)
- [MDN - Progressive Web Apps](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)

---

Desenvolvido com ❤️ para usar Photopea sem abrir o navegador toda vez.
