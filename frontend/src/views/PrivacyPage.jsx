import React, { useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Cookie,
  UserCheck,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  HelpCircle
} from 'lucide-react';

export const PrivacyPage = ({ onNavigateToHome, onNavigateToContact }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#12151C' }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0A0C10',
        padding: '5.5rem 1.5rem 4.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(197, 168, 128, 0.18) 0%, transparent 65%), linear-gradient(180deg, #0A0C10 0%, #12151C 100%)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.25)',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Rings */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 168, 128, 0.08)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1.25rem',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 600
          }}>
            <button
              onClick={onNavigateToHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250, 248, 245, 0.7)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(250, 248, 245, 0.7)')}
            >
              Palace Home
            </button>
            <ChevronRight size={13} color="var(--color-gold)" />
            <span>Privacy Policy</span>
          </div>

          {/* Badge */}
          <div className="animate-float" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            border: '1px solid rgba(197, 168, 128, 0.45)',
            padding: '0.45rem 1.4rem',
            borderRadius: '50px',
            color: 'var(--color-gold)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}>
            <ShieldCheck size={16} color="var(--color-gold)" />
            <span>Google AdSense & GDPR Compliant</span>
          </div>

          <h1 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            Privacy Policy & <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Data Protection Standards
            </span>
          </h1>

          <p style={{
            color: 'rgba(250, 248, 245, 0.82)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.75,
            fontFamily: 'var(--font-body)',
            fontWeight: 300
          }}>
            At LUXURYSTAY Palace Resort & Villas, we treat your confidentiality with the same timeless rigor
            and utmost discretion as our five-star hospitality. This policy explains our digital practices,
            advertising compliance, and user rights.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.45rem 1.1rem',
            borderRadius: '50px',
            border: '1px solid rgba(197, 168, 128, 0.25)',
            color: 'rgba(250, 248, 245, 0.7)',
            fontSize: '0.78rem'
          }}>
            <Clock size={14} color="var(--color-gold)" />
            <span>Last Updated: October 30, 2026 • Effective Immediately</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <section style={{ maxWidth: '1060px', margin: '0 auto', padding: '4.5rem 1.5rem 6rem' }}>
        {/* Quick Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.8rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'var(--color-gold-dark)'
            }}>
              <Lock size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              Zero Unauthorized Sale
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
              We never sell, rent, or trade your personal booking details, financial records, or private communication to data brokers.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.8rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'var(--color-gold-dark)'
            }}>
              <Cookie size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              Transparent Cookies
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
              Full disclosure on Google AdSense, DoubleClick DART cookies, analytics, and instant one-click opt-out mechanisms.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.8rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'var(--color-gold-dark)'
            }}>
              <UserCheck size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              GDPR & CCPA Rights
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
              Exercise your right to access, rectify, export, or permanently erase your digital footprint whenever you choose.
            </p>
          </div>
        </div>

        {/* Detailed Policy Text Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: 'clamp(2rem, 5vw, 4rem)',
          borderRadius: '24px',
          border: '1px solid rgba(197, 168, 128, 0.25)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)'
        }}>

          {/* Table of Contents Box */}
          <div style={{
            backgroundColor: 'rgba(197, 168, 128, 0.07)',
            padding: '1.75rem 2rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            marginBottom: '3rem'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-royal)',
              fontSize: '0.88rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--color-gold-dark)',
              margin: '0 0 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={16} /> Table of Contents
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '0.65rem',
              fontSize: '0.85rem'
            }}>
              <a href="#section-1" style={{ color: '#12151C', textDecoration: 'none' }}>1. Scope & Introduction</a>
              <a href="#section-2" style={{ color: '#12151C', textDecoration: 'none' }}>2. Information We Collect</a>
              <a href="#section-3" style={{ color: '#12151C', textDecoration: 'none' }}>3. How We Use Your Data</a>
              <a href="#section-4" style={{ textDecoration: 'none', fontWeight: 600, color: 'var(--color-gold-dark)' }}>4. Google AdSense & Advertising Cookies</a>
              <a href="#section-5" style={{ color: '#12151C', textDecoration: 'none' }}>5. Third-Party Partners & Vendors</a>
              <a href="#section-6" style={{ color: '#12151C', textDecoration: 'none' }}>6. Cookie Preferences & Opt-Outs</a>
              <a href="#section-7" style={{ color: '#12151C', textDecoration: 'none' }}>7. Data Protection, Security & Encryption</a>
              <a href="#section-8" style={{ color: '#12151C', textDecoration: 'none' }}>8. Your Legal Rights (GDPR & CCPA)</a>
              <a href="#section-9" style={{ color: '#12151C', textDecoration: 'none' }}>9. Children’s Privacy</a>
              <a href="#section-10" style={{ color: '#12151C', textDecoration: 'none' }}>10. Contacting Our Data Protection Officer</a>
            </div>
          </div>

          {/* Section 1 */}
          <div id="section-1" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              1. Scope & Introduction
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              Welcome to the official digital portal of <strong>LUXURYSTAY Palace Resort & Villas</strong> ("LUXURYSTAY", "we", "our", or "us").
              We operate the website accessible at <code style={{ backgroundColor: 'rgba(197, 168, 128, 0.15)', padding: '2px 6px', borderRadius: '4px', color: '#12151C' }}>https://luxurystay-bay.vercel.app</code> and
              its associated hospitality services, reservation engines, and digital guest journals.
            </p>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              This Privacy Policy applies to all individuals who browse our website, book palace accommodations, subscribe to the Palace Journal,
              or interact with our digital services. Your privacy is a matter of regal honour to us, and we are committed to transparently complying
              with international privacy regulations including the General Data Protection Regulation (EU GDPR), the California Consumer Privacy
              Act (CCPA/CPRA), and Google AdSense publisher compliance requirements.
            </p>
          </div>

          {/* Section 2 */}
          <div id="section-2" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              2. Information We Collect
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              We collect information in three ways: directly from your submissions, automatically via digital protocols, and through trusted third-party analytics.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#FAF8F5', padding: '1.25rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-gold)' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#12151C', marginBottom: '0.35rem' }}>
                  A. Personal Identity & Reservation Data
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
                  When reserving a suite, registering a guest profile, or submitting concierge inquiries, we collect your full legal name, VIP email address,
                  telephone number, dietary and wellness preferences, billing coordinates, and special anniversary or stay requests.
                </p>
              </div>

              <div style={{ backgroundColor: '#FAF8F5', padding: '1.25rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-gold)' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#12151C', marginBottom: '0.35rem' }}>
                  B. Technical Log & Browser Data
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
                  Our servers automatically log your Internet Protocol (IP) address, browser client software, device architecture, operating system,
                  referring URL, pages viewed on our domain, time spent per editorial chronicled, and timestamps.
                </p>
              </div>

              <div style={{ backgroundColor: '#FAF8F5', padding: '1.25rem 1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-gold)' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#12151C', marginBottom: '0.35rem' }}>
                  C. Cookies & Session Storage
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
                  Small telemetry files saved on your client device that memorize authentication tokens, currency preferences, active reading progress,
                  and curated advertising parameters.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              3. How We Use Your Data
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              We apply collected information exclusively for legitimate hospitality operations, security assurances, and refined user experiences:
            </p>
            <ul style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#3A3F4D', paddingLeft: '1.5rem' }}>
              <li><strong>Reservation Execution:</strong> Confirming luxury accommodations, managing check-in credentials, and coordinating butler assignments.</li>
              <li><strong>Personalized Concierge Service:</strong> Curating tailored spa treatments, yacht charters, and bespoke culinary degustations.</li>
              <li><strong>Editorial Enhancement:</strong> Analyzing which Palace Journal blogs and hospitality guides deliver highest reader engagement.</li>
              <li><strong>Regulatory Compliance & Fraud Prevention:</strong> Securing financial transactions via TLS 1.3 encryption and defending against malicious cyber intrusions.</li>
              <li><strong>Direct Communications:</strong> Sending booking confirmations, pre-arrival itinerary briefings, and privilege newsletter updates upon opt-in.</li>
            </ul>
          </div>

          {/* Section 4 - GOOGLE ADSENSE & ADVERTISING POLICY */}
          <div id="section-4" style={{
            marginBottom: '3rem',
            backgroundColor: 'rgba(197, 168, 128, 0.08)',
            padding: '2rem',
            borderRadius: '16px',
            border: '2px solid rgba(197, 168, 128, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <Sparkles size={20} color="var(--color-gold-dark)" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', margin: 0 }}>
                4. Google AdSense & Third-Party Advertising Policy
              </h2>
            </div>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#2B303A' }}>
              <strong>Important Notice Regarding Advertising:</strong> LUXURYSTAY partners with third-party advertising networks,
              principally Google AdSense, to display non-intrusive, contextually relevant advertisements alongside our public Palace Journal
              and hospitality guides.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#2B303A' }}>
                  <strong>Third-Party Vendors & Google Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on
                  a user’s prior visits to this website or other websites on the internet.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#2B303A' }}>
                  <strong>DoubleClick DART Cookie:</strong> Google’s use of advertising cookies enables it and its certified partners to serve ads
                  to our visitors based on their visit to LUXURYSTAY and/or other destinations across the web.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={18} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#2B303A' }}>
                  <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising at any time by visiting
                  the official Google Ads Settings portal at{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-gold-dark)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    https://www.google.com/settings/ads
                  </a>. Alternatively, visitors can opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-gold-dark)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    www.aboutads.info
                  </a>.
                </span>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              5. Third-Party Partners & Certified Integrations
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              To ensure impeccable operational uptime and modern digital conveniences, we contract with select world-class cloud infrastructure partners:
            </p>
            <ul style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#3A3F4D', paddingLeft: '1.5rem' }}>
              <li><strong>Hosting & Edge Delivery:</strong> Vercel Inc. (San Francisco, CA) provides serverless distribution and edge SSL termination.</li>
              <li><strong>Database & Authentication:</strong> MongoDB Atlas (Cloud Database) and Encrypted JWT Tokens (RS256 cryptographically signed).</li>
              <li><strong>Analytics:</strong> Google Analytics 4 (GA4) with IP Anonymization enabled to measure general readership demographics without identifying individuals.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div id="section-6" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              6. Cookie Preferences & Browser Controls
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              You retain total sovereignty over cookies installed on your device. Most modern browsers allow you to block, inspect, or delete cookies via their settings:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ border: '1px solid #E5DFD7', padding: '1rem', borderRadius: '10px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#12151C' }}>Google Chrome</strong>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.4rem 0 0' }}>
                  Settings → Privacy & Security → Third-party cookies → Block third-party cookies.
                </p>
              </div>
              <div style={{ border: '1px solid #E5DFD7', padding: '1rem', borderRadius: '10px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#12151C' }}>Apple Safari</strong>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.4rem 0 0' }}>
                  Preferences → Privacy → Prevent Cross-Site Tracking & Block All Cookies.
                </p>
              </div>
              <div style={{ border: '1px solid #E5DFD7', padding: '1rem', borderRadius: '10px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#12151C' }}>Mozilla Firefox</strong>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.4rem 0 0' }}>
                  Settings → Privacy & Security → Enhanced Tracking Protection (Strict).
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '1rem', fontStyle: 'italic' }}>
              *Note: Disabling technical session cookies may necessitate logging back into your Guest Sanctuary dashboard upon each visit.
            </p>
          </div>

          {/* Section 7 */}
          <div id="section-7" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              7. Data Protection, Security & Encryption
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              LUXURYSTAY employs enterprise-grade cryptographic standards. All communications between your client device and our servers
              are routed over Transport Layer Security (TLS 1.3) with 256-bit AES encryption. Guest authentication passwords are salted and
              hashed using industry-standard bcrypt algorithms. Administrative databases are protected by multi-factor authentication,
              strict role-based access control (RBAC), and automated penetration testing.
            </p>
          </div>

          {/* Section 8 */}
          <div id="section-8" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              8. Your Legal Rights (GDPR & CCPA Provisions)
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              Regardless of your citizenship or geographic origin, LUXURYSTAY extends the highest international privacy rights to all patrons:
            </p>
            <ul style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#3A3F4D', paddingLeft: '1.5rem' }}>
              <li><strong>Right to Know & Access:</strong> You may request a complete export of all personal data we retain regarding your profile and reservation history.</li>
              <li><strong>Right to Rectification:</strong> You may request immediate correction of any inaccurate or outdated information.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may instruct us to permanently purge your account records, subject only to statutory tax or audit retention duties.</li>
              <li><strong>Right to Non-Discrimination:</strong> Exercising your data privacy rights will never result in degraded hospitality service, altered room rates, or denied bookings.</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div id="section-9" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.55rem', color: '#12151C', marginBottom: '1rem' }}>
              9. Children’s Privacy (COPPA Compliance)
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#3A3F4D' }}>
              Our online reservations and editorial blogs are directed toward adult travelers and patrons over the age of 18. We do not
              knowingly harvest personal identifiable information from children under 13 years of age. If a parent or guardian discovers that
              a minor has provided personal details without consent, please contact our concierge immediately for immediate deletion.
            </p>
          </div>

          {/* Section 10 */}
          <div id="section-10" style={{
            backgroundColor: '#0D0F14',
            color: '#FAF8F5',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(197, 168, 128, 0.4)'
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
              10. Data Protection Officer (DPO) & Legal Inquiries
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(250, 248, 245, 0.8)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              For formal data privacy requests, cookie audits, or GDPR/CCPA rights execution, please address our Data Protection Directorate:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Direct Legal Dispatch
                </div>
                <div style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600 }}>
                  dpo@luxurystay.com
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.65)', marginTop: '0.2rem' }}>
                  Response guaranteed within 24 business hours.
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Physical Headquarters
                </div>
                <div style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600 }}>
                  LUXURYSTAY Palace Legal Division
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(250, 248, 245, 0.65)', marginTop: '0.2rem' }}>
                  1000 Ocean Boulevard, Côte d’Azur Resort Island
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'rgba(250, 248, 245, 0.7)' }}>
                Have specific questions regarding your upcoming stay?
              </span>
              <button
                onClick={onNavigateToContact}
                className="btn-gold"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
              >
                Connect With Concierge <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
