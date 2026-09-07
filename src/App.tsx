import { AutomationDemo } from './components/AutomationDemo'
import { CaseStudies } from './components/CaseStudies'
import { Chatbot } from './components/Chatbot'
import { ClientLogos } from './components/ClientLogos'
import { Contact } from './components/Contact'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Founders } from './components/Founders'
import { Hero } from './components/Hero'
import { LiveSystems } from './components/LiveSystems'
import { Metrics } from './components/Metrics'
import { Navbar } from './components/Navbar'
import { ProblemSection } from './components/ProblemSection'
import { Process } from './components/Process'
import { ScrollProgress } from './components/ScrollProgress'
import { Services } from './components/Services'
import { Technology } from './components/Technology'
import { Testimonials } from './components/Testimonials'
import { Trust } from './components/Trust'
import { Achievements } from './components/Achievements'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
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
        </main>
        <Footer />
        <Chatbot />
      </>
    </ThemeProvider>
  )
}

export default App