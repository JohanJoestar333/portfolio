// Add your certificates here. Each one needs four fields:
//   - title: the name of the course/certification
//   - organization: who issued it
//   - url: where clicking the card should go (a verification page, a
//     Credly badge, the issuer's certificate page — whatever proves it's
//     real)
//   - image: path to a photo of the certificate. Drop the actual image
//     file in public/certificates/ (see the README in that folder) and
//     reference it here as '/certificates/your-file.jpg'. Leave this out
//     entirely (or set it to null) to show a plain placeholder icon
//     instead of a broken image while you're still collecting photos.
//
// To add one: copy an object below, fill in the four fields, add a comma
// after the previous entry. To remove one: delete its object. Order here
// is the order they're displayed in.
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
    image: '/certificates/alura-qa-test-plan.png',
  },
  {
    title: 'Getting Started with Generative AI',
    organization: 'IBM SkillsBuild',
    url: 'https://www.credly.com/badges/32ae55ea-525f-465c-85ba-2e88ddea3987/linked_in_profile',
    image: '/certificates/ibm-generative-ai.jpeg',
  },
]
