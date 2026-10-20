// Each category becomes one card in the "Testing Toolkit" section. To add a
// skill, drop its name into a category's `skills` array. To add a whole new
// category, copy an object and give it a `title` and a `skills` list.
export const skillCategories = [
  {
    id: 'testing',
    title: 'Testing',
    skills: ['Manual Testing', 'Functional Testing', 'Regression Testing', 'Exploratory Testing', 'UI Testing', 'Negative Testing', 'Accessibility Testing'],
  },
  {
    id: 'design',
    title: 'Test Design',
    skills: ['Test Case Design', 'Test Planning', 'Bug Reporting', 'Acceptance Criteria'],
  },
  {
    id: 'automation',
    title: 'Automation',
    skills: ['Cypress', 'Playwright', 'GitHub Actions (CI)'],
  },
  {
    id: 'api',
    title: 'API',
    skills: ['Postman', 'REST API Testing'],
  },
  {
    id: 'ai',
    title: 'AI',
    skills: ['AI-Assisted Testing', 'Generative AI'],
  },
  {
    id: 'dev',
    title: 'Development & Workflow',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'SQL Fundamentals', 'Git', 'GitHub', 'Agile/Scrum', 'ClickUp'],
  },
]

export const currentlyLearning = ['Advanced Cypress', 'Test Automation', 'CI/CD']
