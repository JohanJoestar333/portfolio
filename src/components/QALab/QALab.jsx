import { useState } from 'react'
import LoginLab from './LoginLab/LoginLab.jsx'
import FormLab from './FormLab/FormLab.jsx'
import BugHunter from './BugHunter/BugHunter.jsx'
import Reveal from '../Reveal/Reveal.jsx'
import './QALab.css'

// This section is a simple tab switcher: only one of the three
// experiences below is mounted at a time (whichever matches `activeTab`).
// To add a fourth QA Lab experience: build it as its own component folder
// (like LoginLab/, FormLab/, BugHunter/), then add one line here.
const TABS = [
  { id: 'login', label: 'Login Lab', Component: LoginLab },
  { id: 'form', label: 'Form Validation Lab', Component: FormLab },
  { id: 'bugs', label: 'Bug Hunter', Component: BugHunter },
]

export default function QALab() {
  // activeTab just stores which tab's id is currently selected — "login"
  // by default, so Login Lab is what visitors see first.
  const [activeTab, setActiveTab] = useState('login')
  // Look up the matching Component for the active tab. The `?.` (optional
  // chaining) means this won't throw even if, somehow, activeTab didn't
  // match anything in TABS — Active would just be undefined.
  const Active = TABS.find((tab) => tab.id === activeTab)?.Component

  return (
    <section id="qa-lab" className="section qa-lab">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <h2>QA Lab</h2>
            <p>This portfolio is also a testing playground.</p>
          </div>

          <p className="qa-lab__intro">Don't just read about how I test software. Try breaking something yourself.</p>
        </Reveal>

        {/* This Reveal wraps the tabs AND the panel below, but only plays
            once when it first scrolls into view — switching tabs
            afterwards doesn't replay it, since it's the same element the
            whole time and viewport={{ once: true }} only fires once. */}
        <Reveal delay={0.1}>
          {/* role="tablist" / role="tab" / aria-selected are the standard
              ARIA pattern for tabs, so screen readers announce this as a
              tab group rather than a row of unrelated buttons. */}
          <div className="qa-lab__tabs" role="tablist" aria-label="QA Lab experiences">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`qa-lab__tab ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`qa-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Only the active tab's component is ever rendered here — the
              other two aren't mounted at all, so their state resets each
              time you switch away and back. */}
          <div role="tabpanel" data-testid="qa-tabpanel">
            {Active && <Active />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
