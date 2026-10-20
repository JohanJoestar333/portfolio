// Language switch. English is always the default; the visitor's choice is
// remembered in localStorage and applied to <html lang>, the page title, and
// the meta description. Components read text with useLang().
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ui, translateLab } from './ui.js'
import * as en from '../data/site.js'
import * as enExperience from '../data/experience.js'
import * as enSkills from '../data/skills.js'
import * as enAutomation from '../data/automation.js'
import * as enProjects from '../data/projects.js'
import * as enCertificates from '../data/certificates.js'
import * as enWriting from '../data/writing.js'
import * as pt from '../data/pt.js'

const STORAGE_KEY = 'lang'

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'pt' ? 'pt' : 'en'
  } catch {
    return 'en'
  }
}

const content = {
  en: {
    site: en.site,
    about: en.about,
    interests: en.interests,
    experience: enExperience.experience,
    skillCategories: enSkills.skillCategories,
    currentlyLearning: enSkills.currentlyLearning,
    automationIntro: enAutomation.automationIntro,
    projectsIntro: enProjects.projectsIntro,
    projects: enProjects.projects,
    certificatesIntro: enCertificates.certificatesIntro,
    certificates: enCertificates.certificates,
    writingIntro: enWriting.writingIntro,
    posts: enWriting.posts,
  },
  pt: {
    site: pt.site,
    about: pt.about,
    interests: pt.interests,
    experience: pt.experience,
    skillCategories: pt.skillCategories,
    currentlyLearning: pt.currentlyLearning,
    automationIntro: pt.automationIntro,
    projectsIntro: pt.projectsIntro,
    projects: pt.projects,
    certificatesIntro: pt.certificatesIntro,
    certificates: pt.certificates,
    writingIntro: pt.writingIntro,
    posts: pt.posts,
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStored)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = ui[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', ui[lang].meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage can be unavailable (private window); the switch still works */
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'pt' : 'en')), [])

  const value = useMemo(
    () => ({
      lang,
      toggle,
      t: ui[lang],
      c: content[lang],
      tr: (text) => translateLab(lang, text),
    }),
    [lang, toggle]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
