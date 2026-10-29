import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Crown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Compass,
  Anchor,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const ContactPage = ({ onNavigateToHome, onNavigateToBlogs }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'reservations',
    preferredMethod: 'email',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const FAQS = [
    {
      q: 'What is the check-in and check-out protocol at LuxuryStay?',
      a: 'Guaranteed check-in begins at 15:00 hours, and leisurely check-out is extended until 12:00 noon. Guests arriving earlier or departing later enjoy full access to the Royal Spa, Ocean Lounge, and private beach lagoons.'
    },
    {
      q: 'Do you offer private chauffeured airport and helipad transfers?',
      a: 'Yes. Complimentary round-trip limousine transfers (Mercedes Maybach or Rolls-Royce Ghost) are included for all Royal Suites and Overwater Villas. Private helicopter charters can touch down directly at our resort helipad (Coordinates: 43.6961° N, 7.2718° E).'
    },
    {
      q: 'Can non-staying guests dine at the Michelin-starred restaurants?',
      a: 'A limited allotment of table reservations is made available to non-resident patrons 30 days in advance. Priority seating is permanently reserved for in-house villa guests.'
    },
    {
      q: 'What are your private yacht charter and marina mooring policies?',
      a: 'The LuxuryStay Private Marina features 42 berths accommodating superyachts up to 85 meters. Berth reservations must be requested at least 72 hours prior to arrival with our Harbourmaster.'
    }
  ];

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
            <span>Contact Us</span>
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
            <Crown size={15} color="var(--color-gold)" />
            <span>24/7 Royal Concierge Desk</span>
          </div>

          <h1 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            Contact Our Concierge & <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Royal Butler Dispatch
            </span>
          </h1>

          <p style={{
            color: 'rgba(250, 248, 245, 0.82)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
            fontFamily: 'var(--font-body)',
            fontWeight: 300
          }}>
            Whether you desire bespoke suite reservations, private island galas, or yacht charter itineraries,
            our Les Clefs d’Or concierges stand ready around the clock to orchestrate perfection.
          </p>
        </div>
      </section>

      {/* ── KEY DIRECT CHANNELS ── */}
      <section style={{ maxWidth: '1240px', margin: '-2.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '1.5rem'
        }}>
          {/* Card 1 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              color: 'var(--color-gold-dark)'
            }}>
              <Phone size={22} />
            </div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.35rem' }}>
              Direct Telephony
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              +1 (800) 589-8790
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#555A68', margin: '0 0 0.85rem', lineHeight: 1.5 }}>
              International & local toll-free line. Live concierge response within 3 rings.
            </p>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#059669' }} /> Open 24/7/365
            </span>
          </div>

          {/* Card 2 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              color: 'var(--color-gold-dark)'
            }}>
              <Mail size={22} />
            </div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.35rem' }}>
              Electronic Inquiries
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              concierge@luxurystay.com
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#555A68', margin: '0 0 0.85rem', lineHeight: 1.5 }}>
              Encrypted email inbox for bespoke requests, itinerary planning, and VIP arrivals.
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
              Average response: &lt; 15 mins
            </span>
          </div>

          {/* Card 3 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'rgba(197, 168, 128, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              color: 'var(--color-gold-dark)'
            }}>
              <MapPin size={22} />
            </div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.35rem' }}>
              Palace Coordinates
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: '0 0 0.5rem', color: '#12151C' }}>
              1000 Ocean Boulevard
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#555A68', margin: '0 0 0.85rem', lineHeight: 1.5 }}>
              Côte d’Azur Resort Island, French Riviera enclave.
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
              Helipad: 43.6961° N, 7.2718° E
            </span>
          </div>
        </div>
      </section>

      {/* ── FORM & CONCIERGE INFORMATION SECTION ── */}
      <section style={{ maxWidth: '1240px', margin: '4.5rem auto 0', padding: '0 1.5rem 5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '24px',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-gold-dark)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <MessageSquare size={14} /> Send a Dispatch
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', color: '#12151C', margin: '0 0 0.75rem' }}>
              Connect with Royal Concierge
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#555A68', lineHeight: 1.6, margin: '0 0 2rem' }}>
              Kindly submit your inquiry below. Our Chief Concierge or VIP Butler Lead will contact you
              promptly to assist with every meticulous detail.
            </p>

            {submitted ? (
              <div style={{
                backgroundColor: 'rgba(5, 150, 105, 0.06)',
                border: '1px solid rgba(5, 150, 105, 0.35)',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(5, 150, 105, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: '#059669'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#12151C', margin: '0 0 0.5rem' }}>
                  Inquiry Dispatched With Honor
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  Thank you, <strong>{formData.name || 'Valued Guest'}</strong>. A dedicated butler will respond to{' '}
                  <span style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      department: 'reservations',
                      preferredMethod: 'email',
                      message: ''
                    });
                  }}
                  className="btn-gold"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 1.4rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alexander Hamilton"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #D6CEBE',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      backgroundColor: '#FAF8F5'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                      VIP Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@domain.com"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #D6CEBE',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        backgroundColor: '#FAF8F5'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #D6CEBE',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        backgroundColor: '#FAF8F5'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                      Inquiry Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #D6CEBE',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        backgroundColor: '#FAF8F5',
                        color: '#12151C'
                      }}
                    >
                      <option value="reservations">Suite & Villa Reservations</option>
                      <option value="events">Private Island Weddings & Galas</option>
                      <option value="yacht">Yacht Charter & Marina Berthing</option>
                      <option value="press">Press, Media & Brand Inquiries</option>
                      <option value="general">Executive General Management</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                      Preferred Channel
                    </label>
                    <select
                      value={formData.preferredMethod}
                      onChange={(e) => setFormData({ ...formData, preferredMethod: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid #D6CEBE',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        backgroundColor: '#FAF8F5',
                        color: '#12151C'
                      }}
                    >
                      <option value="email">Email Response</option>
                      <option value="phone">Direct Phone Call</option>
                      <option value="whatsapp">Encrypted WhatsApp Text</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#12151C', marginBottom: '0.45rem' }}>
                    Your Inquiry & Special Preferences *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Kindly describe your desired dates, bespoke requirements, or specific concierge arrangements..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #D6CEBE',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      backgroundColor: '#FAF8F5',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '0.88rem',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    cursor: submitting ? 'wait' : 'pointer'
                  }}
                >
                  {submitting ? 'Transmitting Inquiries...' : (
                    <>
                      <Send size={16} /> Transmit Confidential Dispatch
                    </>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '0.25rem' }}>
                  <ShieldCheck size={14} color="#059669" />
                  <span style={{ fontSize: '0.76rem', color: '#6B7280' }}>
                    256-Bit Encrypted & Discretion Guaranteed
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Department Directory & FAQs */}
          <div>
            {/* Department Directory Table */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.04)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: '#12151C', margin: '0 0 1.25rem' }}>
                Department Directory
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid #EBE5DB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#12151C' }}>Palace Reservations & Suites</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>Ext. 101</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>reservations@luxurystay.com • Dedicated 24/7 Desk</div>
                </div>

                <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid #EBE5DB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#12151C' }}>Les Clefs d’Or Concierge Desk</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>Ext. 102</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>concierge@luxurystay.com • Butler & Charter Dispatch</div>
                </div>

                <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid #EBE5DB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#12151C' }}>Private Events & Royal Weddings</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>Ext. 104</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>galas@luxurystay.com • Bespoke Event Architects</div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '0.92rem', color: '#12151C' }}>Helipad & Marina Harbourmaster</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>VHF Ch 12</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>harbour@luxurystay.com • Superyacht Berthing & Aviation</div>
                </div>
              </div>
            </div>

            {/* Interactive FAQs Accordion */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid rgba(197, 168, 128, 0.3)',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-gold-dark)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}>
                <HelpCircle size={14} /> Quick Answers
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: '#12151C', margin: '0 0 1.25rem' }}>
                Frequently Inquired Inquiries
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid #ECE7DE',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: activeFaq === idx ? '#FAF8F5' : '#FFFFFF',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '1rem 1.25rem',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: activeFaq === idx ? 'var(--color-gold-dark)' : '#12151C'
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        size={16}
                        style={{
                          transform: activeFaq === idx ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          color: 'var(--color-gold-dark)',
                          flexShrink: 0
                        }}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div style={{ padding: '0 1.25rem 1.25rem', fontSize: '0.85rem', color: '#555A68', lineHeight: 1.65 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER TO BLOGS ── */}
      <section style={{
        backgroundColor: '#0A0C10',
        padding: '4rem 1.5rem',
        borderTop: '1px solid rgba(197, 168, 128, 0.25)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: '0 0 0.75rem' }}>
            Immerse Yourself in the Grand Chronicles
          </h3>
          <p style={{ color: 'rgba(250, 248, 245, 0.75)', fontSize: '0.92rem', margin: '0 0 1.75rem', lineHeight: 1.6 }}>
            Explore 10 curated long-form guides covering Michelin gastronomy, architectural mastery,
            wellness philosophies, and luxury yacht charters.
          </p>
          <button
            onClick={onNavigateToBlogs}
            className="btn-gold"
            style={{ padding: '0.8rem 1.8rem', fontSize: '0.84rem' }}
          >
            Read All Palace Blogs <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
