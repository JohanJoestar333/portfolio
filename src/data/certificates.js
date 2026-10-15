// The Certificates section: a short intro plus one card per certificate.

export const certificatesIntro = {
  title: 'Certificates',
  description:
    'Courses and credentials across QA, JavaScript, and generative AI. Click any card to verify it at the source.',
}

// ---------------------------------------------------------------------------
// HOW TO ADD A CERTIFICATE
// 1. Drop the certificate image in public/certificates/ (WebP or JPEG under
//    ~200 KB keeps the page fast — see the README in that folder).
// 2. Copy the block below to the END of the `certificates` array and fill it
//    in. Keep the comma after the closing brace:
//
//   {
//     title: 'Course or certification name',
//     organization: 'Who issued it',
//     url: 'https://…',                      // verification / badge page (or a PDF in
//                                            // public/certificates/, e.g. '/certificates/x.pdf')
//     image: '/certificates/your-file.webp', // optional — omit for an icon
//     year: '2026',                          // optional — shown on the card
//     fit: 'contain',                        // optional — use for square badges so
//                                            // nothing gets cropped
//   },
//
// To remove one, delete its object. Order here is the display order.
// ---------------------------------------------------------------------------
export const certificates = [
  {
    title: 'Quality Assurance: plano de testes e gestão de bugs',
    organization: 'Alura',
    url: 'https://cursos.alura.com.br/certificate/9f50d11a-cbd0-4f80-991f-1203eae271d8',
    image: '/certificates/alura-qa-test-plan.webp',
  },
  {
    title: 'Getting Started with Generative AI',
    organization: 'IBM SkillsBuild',
    url: 'https://www.credly.com/badges/32ae55ea-525f-465c-85ba-2e88ddea3987/linked_in_profile',
    image: '/certificates/ibm-generative-ai.jpeg',
    fit: 'contain',
  },
  {
    title: 'Craft Precise Prompts for AI Models',
    organization: 'IBM SkillsBuild',
    // TODO: replace with the real Credly badge link for this course
    // (Credly → the badge → Share → copy link).
    url: 'https://www.credly.com/',
    image: '/certificates/ibm-craft-precise-prompts.webp',
    fit: 'contain',
  },
  {
    title: 'Build Website With AI',
    organization: 'FreeAcademy.ai',
    url: 'https://freeacademy.ai/verify/FA-2026-BWWA-XGRJGW',
    image: '/certificates/freeacademy-build-website-with-ai.webp',
    year: '2026',
    fit: 'contain',
  },
  {
    title: 'Fundamentals of Quality Assurance',
    organization: 'Alison',
    url: 'https://alison.com/verify/df15581d96',
    image: '/certificates/alison-fundamentals-of-qa.webp',
    year: '2026',
  },
  {
    title: 'Introducing AI',
    organization: 'Raspberry Pi Foundation',
    // No online verification page, so this opens the certificate PDF itself.
    url: '/certificates/raspberry-pi-introducing-ai.pdf',
    image: '/certificates/raspberry-pi-introducing-ai.webp',
    year: '2026',
    fit: 'contain',
  },
  {
    title: 'Claude 101',
    organization: 'Claude Academy',
    url: 'https://academy.claude.com/verify/40f3df09fddd65e58a5b70298cd9de29',
    image: '/certificates/claude-academy-claude-101.webp',
    year: '2026',
    fit: 'contain',
  },
  {
    title: 'Learn JavaScript Course',
    organization: 'Codecademy',
    url: 'https://www.codecademy.com/profiles/Kazeshini3/certificates/705dcb15de0da4dd9d9fc4f3274b430e',
    image: '/certificates/codecademy-learn-javascript.png',
  },
]
