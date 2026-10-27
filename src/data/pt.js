// Brazilian Portuguese version of the site content. Every export here mirrors
// an export from the English data files (site.js, experience.js, skills.js,
// automation.js, projects.js, certificates.js, writing.js), so to change the
// Portuguese text you edit the matching entry below.
//
// Things that are not translated on purpose: tool names (Cypress, Jira, ...),
// certificate and article titles (they are official names / published
// titles), and links.

import { site as siteEn } from './site.js'
import { certificates as certificatesEn } from './certificates.js'
import { posts as postsEn } from './writing.js'

export const site = {
  ...siteEn,
  role: 'Analista de Garantia de Qualidade de Software',
  location: 'Texas, EUA',
  focus: 'Qualidade + Automação + IA',
  status: 'Construindo meu portfólio de QA e laboratório de automação',
  linkedin: 'https://www.linkedin.com/in/thomas-pessoa-tech/?locale=pt-BR',
  resumePath: '/Thomas-Pessoa-Resume-PT.pdf',
  heroLede:
    'Analista de QA focado em testes manuais e exploratórios, regressão e testes de interface e de API. Agora evoluindo para automação com Cypress e testes assistidos por IA.',
}

export const about = [
  'Sou analista de QA e gosto de encontrar o problema antes do usuário. Desde 2022 atuo em todo o ciclo de desenvolvimento de software: transformo requisitos em casos de teste, valido critérios de aceitação, procuro casos extremos e documento defeitos para que os desenvolvedores consigam reproduzir e corrigir rápido.',
  'No dia a dia isso significa testes manuais e exploratórios, regressão antes de cada release, testes de API no Postman e automação com Cypress para os fluxos que nunca podem quebrar. Eu transito bem entre QA e desenvolvimento. Crio meus próprios sites com React e JavaScript, então consigo ler o código, entender como as peças se encaixam e conversar com os desenvolvedores na linguagem deles.',
  'Também sou muito curioso sobre IA. Gosto de usá-la para criar sites, escrever e afiar casos de teste e acelerar a automação. O julgamento humano sempre fica por cima, porque a IA até escreve o teste, mas alguém precisa decidir o que significa "correto".',
]

export const interests = [
  {
    title: 'QA com apoio de IA',
    description:
      'Uso IA para levantar cenários, reduzir trabalho repetitivo e melhorar casos de teste, com uma pessoa decidindo o que significa "correto".',
  },
  {
    title: 'Criação de sites',
    description:
      'React, Vite e JavaScript. Este portfólio é um deles e também serve como meu laboratório de testes.',
  },
  {
    title: 'Design de casos de teste',
    description:
      'Transformar requisitos vagos em casos claros e reproduzíveis: caminhos felizes, casos extremos e os caminhos negativos que ninguém planejou.',
  },
  {
    title: 'Automação de testes',
    description:
      'Suítes em Cypress para os fluxos que não podem quebrar, com verificações automáticas de acessibilidade e CI para manter tudo honesto.',
  },
]

export const experience = [
  {
    role: 'Analista de Qualidade de Software (QA)',
    company: 'Motrix Techknowledge',
    blurb: 'Empresa de tecnologia educacional que desenvolve currículos e sistemas educacionais para escolas',
    period: 'Set 2022 até o presente',
    location: 'Remoto',
    bullets: [
      'Criei e mantive mais de 200 casos de teste para uma plataforma de criação e entrega de currículos escolares, cobrindo cenários funcionais, de regressão e UAT.',
      'Validei conteúdos curriculares e materiais didáticos, incluindo apostilas, entregues via APIs, usando o Postman para conferir precisão e estrutura dos dados.',
      'Executei testes manuais e exploratórios em funcionalidades críticas e reportei defeitos com passos de reprodução, prints e evidências do DevTools.',
      'Validei funcionalidades contra critérios de aceitação usando BDD com desenvolvedores e produto, aumentando a aprovação em UAT.',
      'Mantive e corrigi testes automatizados em Cypress (nível básico) para garantir a confiabilidade da regressão.',
    ],
  },
  {
    role: 'Estagiário de Qualidade de Software (QA)',
    company: 'Flexy E-commerce Platform',
    blurb: 'Plataforma de e-commerce B2B e B2C',
    period: 'Mai 2022 a Set 2022',
    location: 'Brasil',
    bullets: [
      'Realizei testes funcionais e exploratórios em uma plataforma de e-commerce B2B e B2C, identificando mais de 10 problemas de alto impacto antes do release.',
      'Criei e executei testes de API no Postman para fluxos essenciais do e-commerce, como cadastro de produtos, login e criação de contas.',
      'Elaborei planos e relatórios de teste e executei testes em Cypress (básico) na regressão, contribuindo para releases estáveis.',
    ],
  },
]

export const skillCategories = [
  {
    id: 'testing',
    title: 'Testes',
    skills: [
      'Teste Manual',
      'Teste Funcional',
      'Teste de Regressão',
      'Teste Exploratório',
      'Teste de Fumaça (Smoke)',
      'UAT',
      'Teste de Interface',
      'Teste Negativo',
      'Teste de Acessibilidade',
    ],
  },
  {
    id: 'design',
    title: 'Design de Testes',
    skills: ['Design de Casos de Teste', 'Planejamento de Testes', 'Relatórios de Teste', 'Relato de Bugs', 'Critérios de Aceitação', 'BDD'],
  },
  {
    id: 'automation',
    title: 'Automação',
    skills: ['Cypress', 'Playwright', 'GitHub Actions (CI)'],
  },
  {
    id: 'api',
    title: 'API',
    skills: ['Postman', 'Testes de API REST'],
  },
  {
    id: 'ai',
    title: 'IA',
    skills: ['Testes com Apoio de IA', 'IA Generativa'],
  },
  {
    id: 'dev',
    title: 'Desenvolvimento e Fluxo de Trabalho',
    skills: ['Jira', 'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Fundamentos de SQL', 'Git', 'GitHub', 'Vercel', 'DevTools do navegador', 'Agile/Scrum', 'Kanban', 'ClickUp'],
  },
]

export const currentlyLearning = ['Cypress Avançado', 'Automação de Testes', 'CI/CD']

export const automationIntro = {
  title: 'Automação',
  tagline: 'Alguns testes ficam melhores quando rodam sozinhos.',
  body: 'Estou evoluindo minhas habilidades de automação com Cypress, e este portfólio é o projeto em que eu pratico. Os fluxos, as regras de validação e a acessibilidade são cobertos por uma suíte automatizada que roda no GitHub Actions a cada push. Também uso IA para agilizar as partes repetitivas, como rascunhar cenários e código base, e depois reviso e refino tudo por conta própria.',
}

export const projectsIntro = {
  title: 'Projetos',
  description:
    'Trabalho prático de QA além deste site: os artefatos que eu crio para planejar, executar e reportar testes.',
}

export const projects = [
  {
    title: 'PixelCart',
    tag: 'QA na vida real · Jira · Confluence',
    description:
      'Já se perguntou como é o QA no dia a dia? O PixelCart é uma loja de demonstração com todo o processo montado ao redor: histórias e bugs no Jira, casos de teste no Confluence e cada mudança verificada antes de ir ao ar. Escondi 3 bugs nela de propósito, depois os encontrei e registrei como eu faria no trabalho.',
    stats: [
      { value: '127', label: 'casos de teste no Confluence' },
      { value: '5', label: 'épicos no Jira' },
      { value: '3', label: 'bugs escondidos de propósito' },
    ],
    workflow: {
      title: 'Como uma mudança percorre o projeto',
      steps: [
        { tool: 'Jira', title: 'História', text: 'Escrita com critérios de aceitação e prioridade de teste.' },
        { tool: 'Confluence', title: 'Casos de teste', text: 'Escritos antes de qualquer código, uma página por módulo.' },
        { tool: 'GitHub', title: 'Desenvolvimento', text: 'Um pull request, com o link de preview publicado no ticket do Jira.' },
        { tool: 'Jira', title: 'Teste e relato', text: 'Cada falha vira um bug com passos e captura de tela.' },
        { tool: 'GitHub', title: 'Release', text: 'Regressão em staging e depois em produção. História marcada como Done.' },
      ],
    },
    flow: {
      title: 'Meu quadro do Jira',
      caption: 'Toda história passa por estes 8 status.',
      items: [
        'To Do',
        'In Development',
        'Code Review',
        'Ready To Test',
        'Ready for Staging',
        'Test in Staging',
        'Ready for production',
        'Done',
      ],
    },
    links: [
      { label: 'Ver a demonstração', href: 'https://qa-project-automation.vercel.app' },
      { label: 'Ver o projeto completo', href: 'https://github.com/JohanJoestar333/qa-project' },
    ],
  },
  {
    title: 'Planilha de Casos de Teste de QA',
    tag: 'Testes manuais · Excel',
    description:
      'Um modelo de Excel reutilizável para documentar casos de teste e bugs, criado para entrevistas de emprego e projetos pessoais. Escreva um teste, execute, registre o resultado e o painel mantém a pontuação. Sem macros e sem nada para instalar.',
    highlights: [
      '46 casos de teste manuais de exemplo escritos para uma loja de demonstração pública (busca, criação de conta, carrinho, pedido e navegadores diferentes)',
      'Listas suspensas de módulo, tipo de teste, prioridade, status e severidade, para manter os registros consistentes',
      'Painel com totais, taxa de aprovação, progresso e resultados por módulo',
      'Cenário Dado / Quando / Então para cada caso, além de uma aba de Instruções para começar',
    ],
    stack: ['Excel', 'Design de casos de teste', 'Relato de bugs'],
    links: [
      {
        label: 'Baixar a planilha',
        href: '/projects/QA-Test-Case-Workbook.xlsx',
        download: true,
      },
    ],
  },
  {
    title: 'Template de Site para Casais',
    tag: 'Desenvolvimento web · JavaScript · Firebase',
    description:
      'Um site para duas pessoas que qualquer um pode personalizar. Fotos, calendário compartilhado, lista de desejos, quizzes, músicas e até uma cabine de fotos ao vivo, tudo em um só app instalável. É um projeto pessoal que criei do zero com HTML, CSS e JavaScript puros, e é open source.',
    highlights: [
      'Instalável como app no celular, com suporte offline e modo escuro',
      'Listas, eventos e fotos compartilhados que sincronizam ao vivo entre as duas pessoas',
      'Cabine de fotos com chamada ao vivo de duas câmeras e editor de tirinhas de fotos',
      'Configuração editando um único arquivo, com hospedagem gratuita e guia passo a passo',
    ],
    stack: ['JavaScript', 'HTML e CSS', 'Firebase', 'GitHub Actions'],
    links: [
      { label: 'Ver a demonstração', href: 'https://johanjoestar333.github.io/couples-website' },
      { label: 'Ver o código', href: 'https://github.com/JohanJoestar333/couples-website' },
    ],
  },
]

export const certificatesIntro = {
  title: 'Certificados',
  description:
    'Cursos e credenciais em QA, JavaScript e IA generativa. Clique em qualquer cartão para verificar na fonte.',
}

// Same certificates, links and images as English; only the intro changes.
export const certificates = certificatesEn

export const writingIntro = {
  title: 'Artigos',
  description:
    'Onde eu penso em voz alta sobre QA, testes e IA. Um pouco de opinião, um pouco de anotações de campo: o que estou aprendendo no trabalho, o que as pesquisas dizem e as perguntas sobre qualidade que não saem da minha cabeça.',
  profileUrl: 'https://medium.com/@tomecosabs',
  profileLabel: 'Mais no Medium →',
}

// The articles are published in English, so the titles stay as published.
// The short descriptions and tags are translated.
const postsPt = {
  'https://medium.com/@tomecosabs/how-a-qa-engineer-thinks-before-writing-a-single-test-704bcad79a51': {
    description: 'Bons testes não começam clicando em botões. Começam fazendo as perguntas certas.',
    tag: 'Raciocínio de teste',
  },
  'https://medium.com/@tomecosabs/manual-testing-isnt-dead-the-job-description-changed-9a242bf3be87': {
    description: 'O que a pesquisa, e uma falha muito pública, dizem sobre onde os testadores humanos ainda importam.',
    tag: 'Teste manual',
  },
  'https://medium.com/@tomecosabs/qa-ai-why-quality-assurance-and-artificial-intelligence-are-a-perfect-match-599414834071': {
    description: 'A IA cuida da repetição. O QA entra com o julgamento. Como combinar os dois deixa os testes mais rápidos e mais profundos.',
    tag: 'QA + IA',
  },
}

export const posts = postsEn.map((post) => ({ ...post, ...(postsPt[post.url] ?? {}) }))
