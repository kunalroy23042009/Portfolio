import { lazy, Suspense } from 'react'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Chatbot } from './components/Chatbot'

// Below-the-fold sections are code-split so the initial bundle stays small.
// ThemeProvider lives in main.tsx — do not wrap again here.
const ProblemSection = lazy(() =>
  import('./components/ProblemSection').then((m) => ({ default: m.ProblemSection }))
)
const Services = lazy(() =>
  import('./components/Services').then((m) => ({ default: m.Services }))
)
const Process = lazy(() =>
  import('./components/Process').then((m) => ({ default: m.Process }))
)
const AutomationDemo = lazy(() =>
  import('./components/AutomationDemo').then((m) => ({ default: m.AutomationDemo }))
)
const CaseStudies = lazy(() =>
  import('./components/CaseStudies').then((m) => ({ default: m.CaseStudies }))
)
const LiveSystems = lazy(() =>
  import('./components/LiveSystems').then((m) => ({ default: m.LiveSystems }))
)
const Metrics = lazy(() =>
  import('./components/Metrics').then((m) => ({ default: m.Metrics }))
)
const Achievements = lazy(() =>
  import('./components/Achievements').then((m) => ({ default: m.Achievements }))
)
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials }))
)
const ClientLogos = lazy(() =>
  import('./components/ClientLogos').then((m) => ({ default: m.ClientLogos }))
)
const Technology = lazy(() =>
  import('./components/Technology').then((m) => ({ default: m.Technology }))
)
const Founders = lazy(() =>
  import('./components/Founders').then((m) => ({ default: m.Founders }))
)
const Trust = lazy(() => import('./components/Trust').then((m) => ({ default: m.Trust })))
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })))
const FinalCTA = lazy(() =>
  import('./components/FinalCTA').then((m) => ({ default: m.FinalCTA }))
)
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact }))
)
const PrivacyPolicy = lazy(() =>
  import('./components/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
)
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
)

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-terracotta focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <ProblemSection />
          <Services />
          <Process />
          <AutomationDemo />
          <CaseStudies />
          <LiveSystems />
          <Metrics />
          <Achievements />
          <Testimonials />
          <ClientLogos />
          <Technology />
          <Founders />
          <Trust />
          <FAQ />
          <FinalCTA />
          <Contact />
          <PrivacyPolicy />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Chatbot />
    </>
  )
}

export default App
