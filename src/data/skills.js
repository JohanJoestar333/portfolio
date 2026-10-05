// Each category becomes one card in the "Testing Toolkit" section. To add a
// skill, drop its name into a category's `skills` array. To add a whole new
// category, copy an object and give it a `title` and a `skills` list.
export const skillCategories = [
  {
    title: 'Testing',
    skills: ['Manual Testing', 'Functional Testing', 'Regression Testing', 'Exploratory Testing', 'UI Testing', 'Negative Testing', 'Accessibility Testing'],
  },
  {
    title: 'Test Design',
    skills: ['Test Case Design', 'Test Planning', 'Bug Reporting', 'Acceptance Criteria'],
  },
  {
    title: 'Automation',
    skills: ['Cypress', 'Playwright', 'GitHub Actions (CI)'],
  },
  {
    title: 'API',
    skills: ['Postman', 'REST API Testing'],
  },
  {
    title: 'AI',
    skills: ['AI-Assisted Testing', 'Generative AI'],
  },
  {
    title: 'Development & Workflow',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'SQL Fundamentals', 'Git', 'GitHub', 'Agile/Scrum', 'ClickUp'],
  },
]

export const currentlyLearning = ['Advanced Cypress', 'Test Automation', 'CI/CD']
