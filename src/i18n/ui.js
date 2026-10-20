// Interface text (buttons, labels, headings, aria labels) in both languages.
// Section content (about, experience, projects, ...) lives in src/data/ for
// English and src/data/pt.js for Portuguese.

export const ui = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      qaLab: 'QA Lab',
      automation: 'Automation',
      projects: 'Projects',
      certificates: 'Certificates',
      writing: 'Writing',
      contact: 'Contact',
      primary: 'Primary',
      mobile: 'Mobile',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    language: { switchTo: 'Switch to Portuguese', short: 'PT' },
    theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
    hero: {
      iTest: 'I test ',
      rotating: ['new features', 'edge cases', 'regressions', 'APIs', 'accessibility'],
      quoteA: '“I don’t just test if it works.',
      quoteB: 'I try to find out how it breaks.”',
      qaLab: 'Explore QA Lab',
      projects: 'See Projects',
      resume: 'Download Resume',
      linkedin: 'LinkedIn',
    },
    cube: {
      faces: { front: 'Manual', back: 'Regression', right: 'Functional', left: 'Exploratory', top: 'API', bottom: 'Test case writing' },
      aria: 'A pastel 3D block labelled with the kinds of testing I do: manual, regression, functional, exploratory, API, and test case writing. Drag it to spin.',
      hint: 'psst… drag me',
    },
    about: {
      title: 'A little about me',
      location: 'Location',
      role: 'Role',
      experience: 'Experience',
      focus: 'Focus',
      present: 'to Present',
      years: 'Years in QA',
      certificates: 'Certificates',
      articles: 'Articles',
      into: "What I'm into",
    },
    experience: { title: 'Experience' },
    skills: { title: 'Testing Toolkit', learning: 'Currently learning' },
    qaLab: {
      title: 'QA Lab',
      subtitle: 'This portfolio is also a testing playground.',
      intro: "Don't just read about how I test software. Try breaking something yourself.",
      tablist: 'QA Lab experiences',
      loginTab: 'Login Lab',
      formTab: 'Form Validation Lab',
    },
    automation: {
      eyebrow: 'Cypress test suite',
      counts: (tests, specs) => `${tests} tests · ${specs} specs`,
      testWord: (n) => (n === 1 ? 'test' : 'tests'),
      noteA: 'The list and counts are read from ',
      noteB: ', so they update when a spec is added. Run it yourself with ',
      noteC: '; every push also runs it in GitHub Actions.',
    },
    certificates: { empty: 'Nothing added yet. Check back soon.', alt: (title) => `${title} certificate` },
    projects: { empty: 'Nothing added yet. Check back soon.', stackLabel: 'Tools and skills' },
    writing: { empty: 'Nothing published yet. Check back soon.', readOn: (p) => `Read on ${p} →` },
    contact: {
      title: "Let's talk",
      subtitle: 'Interested in QA, testing, automation, or just found a bug I missed?',
      linkedin: 'LinkedIn',
      email: 'Email',
      resume: 'Resume',
      resumeValue: 'PDF · Download',
    },
    footer: { tagline: 'Built with React. Tested with Cypress.' },
    meta: {
      title: 'Thomas | Software QA Analyst: Manual, API & Cypress Automation Testing',
      description:
        'Thomas is a Software QA Analyst with experience in manual, exploratory, regression, API (Postman) and Cypress automation testing. Explore the interactive QA Lab, test suite, and writing on QA + AI.',
    },
    formLab: {
      appUnderTest: 'App under test',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      age: 'Age',
      message: 'Message',
      phonePlaceholder: 'Numbers only',
      submit: 'Submit',
      testResults: 'Test results',
      desc: "Each submission is graded on what it actually exercised. Checks your input didn't touch show as not tested.",
      empty: 'Submit the form to see live test results here.',
      notTested: ' (not tested)',
      submissions: 'Submissions this session:',
    },
    loginLab: {
      appUnderTest: 'App under test',
      appDesc:
        'The Login Lab is a small demo login form with a few intentional validation bugs. Log in yourself, or use the test scenarios on the right to see how the form behaves in each case.',
      email: 'Email',
      password: 'Password',
      logIn: 'Log in',
      try: 'Try',
      scenarios: 'Test scenarios',
      scenariosDesc:
        'You can test these scenarios yourself by typing into the form, or click one and the software will fill in the form, run the test for you, and log the outcome.',
      results: 'Results',
      resultsDesc:
        'Every attempt is logged here with the expected behavior, what actually happened, and whether it passed or a bug was found.',
      empty: 'No attempts yet. Try a scenario or log in above.',
      bug: 'BUG FOUND',
      pass: 'PASS',
      expected: 'Expected:',
      actual: 'Actual:',
    },
  },

  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      skills: 'Habilidades',
      qaLab: 'QA Lab',
      automation: 'Automação',
      projects: 'Projetos',
      certificates: 'Certificados',
      writing: 'Artigos',
      contact: 'Contato',
      primary: 'Principal',
      mobile: 'Celular',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    language: { switchTo: 'Mudar para inglês', short: 'EN' },
    theme: { toLight: 'Mudar para o tema claro', toDark: 'Mudar para o tema escuro' },
    hero: {
      iTest: 'Eu testo ',
      rotating: ['novas funcionalidades', 'casos extremos', 'regressões', 'APIs', 'acessibilidade'],
      quoteA: '“Eu não testo só para ver se funciona.',
      quoteB: 'Eu tento descobrir como quebra.”',
      qaLab: 'Explorar o QA Lab',
      projects: 'Ver Projetos',
      resume: 'Baixar Currículo',
      linkedin: 'LinkedIn',
    },
    cube: {
      faces: { front: 'Manual', back: 'Regressão', right: 'Funcional', left: 'Exploratório', top: 'API', bottom: 'Casos de teste' },
      aria: 'Um bloco 3D em tons pastel com os tipos de teste que eu faço: manual, regressão, funcional, exploratório, API e escrita de casos de teste. Arraste para girar.',
      hint: 'psst… me arraste',
    },
    about: {
      title: 'Um pouco sobre mim',
      location: 'Local',
      role: 'Cargo',
      experience: 'Experiência',
      focus: 'Foco',
      present: 'até o presente',
      years: 'Anos em QA',
      certificates: 'Certificados',
      articles: 'Artigos',
      into: 'Do que eu gosto',
    },
    experience: { title: 'Experiência' },
    skills: { title: 'Caixa de Ferramentas de Testes', learning: 'Aprendendo agora' },
    qaLab: {
      title: 'QA Lab',
      subtitle: 'Este portfólio também é um playground de testes.',
      intro: 'Não leia só sobre como eu testo software. Tente quebrar alguma coisa você mesmo.',
      tablist: 'Experiências do QA Lab',
      loginTab: 'Login Lab',
      formTab: 'Lab de Validação de Formulário',
    },
    automation: {
      eyebrow: 'Suíte de testes Cypress',
      counts: (tests, specs) => `${tests} testes · ${specs} specs`,
      testWord: (n) => (n === 1 ? 'teste' : 'testes'),
      noteA: 'A lista e as contagens são lidas de ',
      noteB: ', então se atualizam quando uma spec é adicionada. Rode você mesmo com ',
      noteC: '; todo push também executa a suíte no GitHub Actions.',
    },
    certificates: { empty: 'Nada adicionado ainda. Volte em breve.', alt: (title) => `Certificado: ${title}` },
    projects: { empty: 'Nada adicionado ainda. Volte em breve.', stackLabel: 'Ferramentas e habilidades' },
    writing: { empty: 'Nada publicado ainda. Volte em breve.', readOn: (p) => `Ler no ${p} →` },
    contact: {
      title: 'Vamos conversar',
      subtitle: 'Quer falar sobre QA, testes, automação, ou achou um bug que eu deixei passar?',
      linkedin: 'LinkedIn',
      email: 'E-mail',
      resume: 'Currículo',
      resumeValue: 'PDF · Baixar',
    },
    footer: { tagline: 'Feito com React. Testado com Cypress.' },
    meta: {
      title: 'Thomas | Analista de QA de Software: Testes Manuais, de API e Automação com Cypress',
      description:
        'Thomas é Analista de QA de Software com experiência em testes manuais, exploratórios, de regressão, de API (Postman) e automação com Cypress. Explore o QA Lab interativo, a suíte de testes e os artigos sobre QA + IA.',
    },
    formLab: {
      appUnderTest: 'Aplicação testada',
      name: 'Nome',
      email: 'E-mail',
      phone: 'Telefone',
      age: 'Idade',
      message: 'Mensagem',
      phonePlaceholder: 'Somente números',
      submit: 'Enviar',
      testResults: 'Resultados dos testes',
      desc: 'Cada envio é avaliado pelo que realmente exercitou. Verificações que sua entrada não tocou aparecem como não testadas.',
      empty: 'Envie o formulário para ver os resultados dos testes ao vivo aqui.',
      notTested: ' (não testado)',
      submissions: 'Envios nesta sessão:',
    },
    loginLab: {
      appUnderTest: 'Aplicação testada',
      appDesc:
        'O Login Lab é um pequeno formulário de login de demonstração com alguns bugs de validação propositais. Faça login você mesmo ou use os cenários de teste ao lado para ver como o formulário se comporta em cada caso.',
      email: 'E-mail',
      password: 'Senha',
      logIn: 'Entrar',
      try: 'Experimente',
      scenarios: 'Cenários de teste',
      scenariosDesc:
        'Você pode testar estes cenários digitando no formulário, ou clicar em um deles e o software preenche o formulário, executa o teste por você e registra o resultado.',
      results: 'Resultados',
      resultsDesc:
        'Cada tentativa é registrada aqui com o comportamento esperado, o que realmente aconteceu e se passou ou se um bug foi encontrado.',
      empty: 'Nenhuma tentativa ainda. Teste um cenário ou faça login acima.',
      bug: 'BUG ENCONTRADO',
      pass: 'PASSOU',
      expected: 'Esperado:',
      actual: 'Obtido:',
    },
  },
}

// The lab internals (scenario names, expected/actual sentences, validation
// messages) are written in English in the component code because the Cypress
// tests and the validation logic depend on them. This map translates those
// sentences at render time. Anything not listed falls back to English.
export const labPt = {
  // Login Lab scenarios
  'Empty email': 'E-mail vazio',
  'Empty password': 'Senha vazia',
  'Invalid email format': 'Formato de e-mail inválido',
  'Whitespace-only email': 'E-mail só com espaços',
  'One-character password': 'Senha de um caractere',
  'Whitespace around valid credentials': 'Espaços ao redor de credenciais válidas',
  'Incorrect credentials': 'Credenciais incorretas',
  'Valid credentials': 'Credenciais válidas',
  'Double-click Login': 'Clique duplo em Entrar',
  'Manual attempt': 'Tentativa manual',
  // Expected / actual
  'Validation message shown for the email field.': 'Mensagem de validação exibida no campo de e-mail.',
  'Validation message shown for the password field.': 'Mensagem de validação exibida no campo de senha.',
  'No validation shown, so the form was allowed to submit.': 'Nenhuma validação exibida, então o formulário foi enviado.',
  'Input accepted without a format check.': 'Entrada aceita sem verificar o formato.',
  'Input rejected as empty.': 'Entrada rejeitada por estar vazia.',
  'Input accepted as if it were a real value.': 'Entrada aceita como se fosse um valor real.',
  'Validation message shown because the password is too short.': 'Mensagem de validação exibida porque a senha é curta demais.',
  'Accepted with no minimum length check.': 'Aceita sem verificação de tamanho mínimo.',
  'Whitespace trimmed automatically; login succeeds.': 'Espaços removidos automaticamente; o login funciona.',
  'Whitespace trimmed automatically; login succeeded.': 'Espaços removidos automaticamente; o login funcionou.',
  'Login failed because the whitespace was not trimmed.': 'O login falhou porque os espaços não foram removidos.',
  '"Invalid email or password" message shown.': 'Mensagem "E-mail ou senha inválidos" exibida.',
  'Unexpected result for incorrect credentials.': 'Resultado inesperado para credenciais incorretas.',
  'Login succeeds.': 'O login funciona.',
  'Login succeeded.': 'Login realizado com sucesso.',
  'Login failed unexpectedly for valid credentials.': 'O login falhou inesperadamente com credenciais válidas.',
  'Only one login request is processed per submission.': 'Apenas uma requisição de login é processada por envio.',
  'Only one request was processed.': 'Apenas uma requisição foi processada.',
  // Validation messages and banner
  'Email is required.': 'O e-mail é obrigatório.',
  'Password is required.': 'A senha é obrigatória.',
  'Enter a valid email address.': 'Digite um endereço de e-mail válido.',
  'Invalid email or password.': 'E-mail ou senha inválidos.',
  // Form Lab
  'This field is required.': 'Este campo é obrigatório.',
  'Enter a number between 0 and 120.': 'Digite um número entre 0 e 120.',
  'Required fields': 'Campos obrigatórios',
  'Empty submission': 'Envio vazio',
  'Email validation': 'Validação de e-mail',
  'Age range': 'Faixa de idade',
  'Maximum length': 'Tamanho máximo',
  'Whitespace handling': 'Tratamento de espaços',
}

const labPatterns = [
  [
    /^(\d+) overlapping requests were processed, because the button doesn't disable while a request is pending\.$/,
    (n) => `${n} requisições sobrepostas foram processadas, porque o botão não é desabilitado enquanto uma requisição está pendente.`,
  ],
]

export function translateLab(lang, text) {
  if (lang !== 'pt' || typeof text !== 'string') return text
  if (labPt[text]) return labPt[text]
  for (const [re, fn] of labPatterns) {
    const m = text.match(re)
    if (m) return fn(...m.slice(1))
  }
  return text
}
