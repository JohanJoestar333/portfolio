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
//     url: 'https://…',                      // verification / badge page
//     image: '/certificates/your-file.webp', // optional — omit for an icon
//     year: '2026',                          // optional — shown on the card
//   },
//
// To remove one, delete its object. Order here is the display order.
// ---------------------------------------------------------------------------
export const certificates = [
  {
    title: 'Learn JavaScript Course',
    organization: 'Codecademy',
    url: 'https://www.codecademy.com/profiles/Kazeshini3/certificates/705dcb15de0da4dd9d9fc4f3274b430e',
    image: '/certificates/codecademy-learn-javascript.png',
  },
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
  },
]
