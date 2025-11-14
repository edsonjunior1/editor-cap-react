# Editor (React 19 + Vite)

Web app simples para criação e gerenciamento de alertas, inspirado em cenários de alerta meteorológico (CAP-like).  
Projeto focado em **arquitetura frontend moderna** usando **React 19**, **TypeScript**, **Vite**, **Redux Toolkit** e **TailwindCSS**.

## 🎯 Objetivo

Servir como projeto de portfólio para demonstrar:

- Organização de pastas por **features/domínios**
- Uso de **Redux Toolkit** para gerenciamento de estado
- Componentização de UI (botões, cards, layout)
- Preparação para deploy em plataformas como **Vercel** ou **Netlify**

## 🧱 Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

## 📁 Estrutura de pastas (resumo)

```txt
src/
  app/
    App.tsx          # Componente raiz da aplicação
    store.ts         # Configuração da store Redux
  features/
    alerts/
      components/    # Componentes específicos do domínio de alertas
      store/         # Slice Redux do domínio de alertas
      types/         # Tipagens do domínio de alertas
  shared/
    ui/              # Componentes de UI reutilizáveis (Button, Card, etc.)
    utils/           # Funções utilitárias genéricas
  main.tsx           # Ponto de entrada da aplicação

## 🚀 Rodando localmente
# instalar dependências
npm install

# modo desenvolvimento
npm run dev

# build para produção
npm run build

# preview do build
npm run preview
```
A aplicação roda por padrão em:
http://localhost:5173

## O projeto é compatível com deploy estático em:

Vercel

Netlify

Ou qualquer serviço que aceite build estático via npm run build.

Basta configurar o comando de build:
```npm run build
E o diretório de saída:
dist/
