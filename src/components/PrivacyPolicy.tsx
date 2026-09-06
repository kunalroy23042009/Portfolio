import { SectionHeader } from './ui/SectionHeader'
import { ScrollReveal } from './ui/ScrollReveal'

export function PrivacyPolicy() {
  return (
    <section
      id="privacy"
      className="border-t border-warm-border py-20 md:py-28 lg:py-30"
    >
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader title="Privacy Policy" />
        </ScrollReveal>

        <div className="prose lg:prose-xl max-w-3xl mx-auto">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Introduction</h2>
          <p>
            FlowForge ("we", "our", "our") operates the FlowForge website and the
            FlowForge AI Assistant chatbot (collectively, the "Service"). This page
            informs visitors and users about our policies regarding the collection,
            use, and disclosure of personal data when using our Service.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect minimal information necessary to operate the Service:
          </p>
          <ul>
            <li>
              <strong>Theme preference:</strong> Your dark/light/system theme choice
              is stored in your browser's localStorage to persist your preference
              across sessions.
            </li>
            <li>
              <strong>Chatbot messages:</strong> If you interact with the FlowForge AI
              Assistant chatbot, your messages may be sent to a webhook endpoint
              (configured via <code>site.contact.webhookUrl</code>) for processing.
              If no webhook is configured, conversations are handled locally with
              mock fallback responses only.
            </li>
            <li>
              <strong>Cookies & tracking:</strong> We use essential cookies to enable
              theme persistence and basic functionality. No analytics trackers are
              active by default.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use collected information for the following purposes:
          </p>
          <ul>
            <li>
              <strong>Theme persistence:</strong> To remember your preferred display
              theme (dark, light, or system) across website visits.
            </li>
            <li>
              <strong>Chatbot functionality:</strong> To process your queries through
              the AI assistant and provide relevant responses about our automation
              services.
            </li>
            <li>
              <strong>Service improvement:</strong> To understand how the Service is
              used and maintain its functionality.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            <strong>localStorage data:</strong> Your theme preference remains stored
            until you manually clear it or use the ThemeToggle to change it.
            <br />
            <strong>Chatbot messages:</strong> Messages are held in memory during
            your session only. If a webhook is configured, retention and handling
              are governed by the webhook endpoint's policies. We do not store
              chatbot conversation history after your session ends.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            The FlowForge AI Assistant chatbot may integrate with third-party
            services via webhook URLs. If a webhook is configured, data you send
            to the chatbot may be processed by the external service you have
            configured. We do not currently integrate with Google Analytics,
            Facebook, or other third-party tracking services.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>
              Access: View the theme data stored in your localStorage.
            </li>
            <li>
              Delete: Clear your localStorage to remove the theme preference,
              or close the chatbot window to discard chat messages.
            </li>
            <li>
              Opt-out: Disable the chatbot or avoid using it if you prefer not
              to send messages.
            </li>
          </ul>

          <h2>7. Children's Privacy</h2>
          <p>
            The Service is not intended for children under 13 years of age. We
            do not knowingly collect personal data from children. If you are a
            parent or guardian and discover that your child has provided us with
            personal data, please contact us so we can delete such information.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            of any changes by posting the new Privacy Policy on this page. We
            advise reviewing this page periodically for any changes. Changes are
            effective when posted on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy,
            please contact us at <a href="mailto:hello@flowforge.example.com">
              hello@flowforge.example.com</a>.
          </p>
        </div>
      </div>
    </section>
  )
}