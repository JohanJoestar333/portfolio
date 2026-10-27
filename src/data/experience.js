// An array so another role can be added later without changing the
// Experience component. Most recent first.
export const experience = [
  {
    role: 'Software Quality Assurance Analyst',
    company: 'Motrix Techknowledge',
    blurb: 'Education technology company building curriculum and educational systems for schools',
    period: 'Sep 2022 to Present',
    location: 'Remote',
    bullets: [
      'Wrote and maintained 200+ documented test cases for an educational platform used to create and deliver school curriculum, covering functional, regression and acceptance (UAT) scenarios.',
      'Validated curriculum content and teaching materials, including student workbooks, delivered through APIs, using Postman to check data accuracy, structure and completeness before release.',
      'Performed manual and exploratory testing on critical features and reported defects with clear reproduction steps, screenshots and browser DevTools findings, so developers could fix issues quickly.',
      'Validated features against acceptance criteria using Behavior-Driven Development (BDD) with developers and product team members, improving UAT pass rates.',
      'Maintained and repaired Cypress automated tests (basic level) to keep regression checks reliable.',
    ],
  },
  {
    role: 'Software Quality Assurance Intern',
    company: 'Flexy E-commerce Platform',
    blurb: 'B2B and B2C e-commerce platform',
    period: 'May 2022 to Sep 2022',
    location: 'Brazil',
    bullets: [
      'Performed functional and exploratory testing on a B2B and B2C e-commerce platform, identifying 10+ high-impact issues before release.',
      'Built and ran API tests in Postman for core e-commerce flows, including product creation, user login and account creation.',
      'Created test plans and detailed test reports, and ran Cypress automated tests (basic level) as part of regression, supporting clean, stable releases.',
    ],
  },
]
