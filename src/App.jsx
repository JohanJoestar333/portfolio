// App.jsx is the "composition root" — it doesn't contain any content or
// logic itself, it just imports every section and stacks them in the
// order they should appear on the page. To reorder sections, change the
// order of the JSX below. To add a new section, create its component
// folder under src/components/, import it here, and drop it into the
// tree where you want it to appear (and add a matching link in
// Navbar.jsx if it should be reachable from the nav).
import ScrollProgress from './components/ScrollProgress/ScrollProgress.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import QALab from './components/QALab/QALab.jsx'
import Automation from './components/Automation/Automation.jsx'
import Projects from './components/Projects/Projects.jsx'
import Skills from './components/Skills/Skills.jsx'
import Certificates from './components/Certificates/Certificates.jsx'
import Experience from './components/Experience/Experience.jsx'
import Writing from './components/Writing/Writing.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import Marquee from './components/Marquee/Marquee.jsx'
import useInteractions from './hooks/useInteractions.js'

export default function App() {
  // Cursor glow, card spotlight/tilt, and magnetic buttons (see the hook).
  useInteractions()

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <QALab />
      <Automation />
      <Projects />
      <Certificates />
      <Writing />
      <Contact />
      <Footer />
    </>
  )
}
