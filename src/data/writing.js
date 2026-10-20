// The Writing section: a short intro plus one card per article.

export const writingIntro = {
  title: 'Writing',
  description:
    "Where I think out loud about QA, testing, and AI. Part opinion, part field notes: what I'm learning on the job, what the research says, and the questions I can't stop asking about quality.",
  // Shown under the list. Remove `profileUrl` to hide the link.
  profileUrl: 'https://medium.com/@tomecosabs',
  profileLabel: 'More on Medium →',
}

// ---------------------------------------------------------------------------
// HOW TO ADD A POST
// Copy the block below to the TOP of the `posts` array (newest first), fill
// it in, and keep the comma after the closing brace:
//
//   {
//     title: 'Your article title',
//     description: 'One sentence on what the reader will get out of it.',
//     url: 'https://medium.com/@you/your-article',
//     tag: 'QA',              // optional — small label above the title
//     date: 'Oct 2026',       // optional — shown next to the tag
//     platform: 'Medium',     // optional — defaults to Medium ("Read on …")
//   },
//
// To remove a post, delete its object. Order here is the display order.
// ---------------------------------------------------------------------------
export const posts = [
  {
    title: 'How a QA Engineer Thinks Before Writing a Single Test',
    description: "Good testing doesn't start with clicking buttons. It starts with asking the right questions.",
    url: 'https://medium.com/@tomecosabs/how-a-qa-engineer-thinks-before-writing-a-single-test-704bcad79a51',
    tag: 'Test thinking',
  },
  {
    title: 'Manual Testing Isn\u2019t Dead. The Job Description Changed.',
    description: 'What the research, and one very public failure, say about where human testers still matter.',
    url: 'https://medium.com/@tomecosabs/manual-testing-isnt-dead-the-job-description-changed-9a242bf3be87',
    tag: 'Manual testing',
  },
  {
    title: 'QA + AI: Why Quality Assurance and Artificial Intelligence Are a Perfect Match',
    description: 'AI can handle the repetition. QA provides the judgment. How combining the two makes testing faster and deeper.',
    url: 'https://medium.com/@tomecosabs/qa-ai-why-quality-assurance-and-artificial-intelligence-are-a-perfect-match-599414834071',
    tag: 'QA + AI',
  },
]
