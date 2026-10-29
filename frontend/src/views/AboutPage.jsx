import React, { useEffect } from 'react';
import {
  Crown,
  Sparkles,
  Award,
  Compass,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Heart,
  Globe,
  Users,
  Feather,
  Leaf,
  Wine,
  Star
} from 'lucide-react';

export const AboutPage = ({ onNavigateToHome, onNavigateToBlogs, onNavigateToContact }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const LEADERS = [
    {
      name: 'Jean-Luc Laurent',
      role: 'General Manager & Managing Director',
      bio: 'With over 28 years directing Europe’s most revered grand palatial hotels across Paris, Monaco, and St. Moritz, Jean-Luc oversees every nuance of guest discretion and bespoke luxury.',
      experience: '28+ Years Palace Leadership',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Chef Elena Rostova',
      role: 'Culinary Director & Executive Chef',
      bio: 'Holder of three Michelin stars, Chef Elena transforms wild Mediterranean botanicals and hand-dived seafood into sensory culinary symphonies at L’Étoile and Le Grand Pavillon.',
      experience: '3 Michelin Stars Recipient',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Concierge & Head Butler',
      bio: 'An esteemed governor of Les Clefs d’Or International, Marcus commands our 24/7 royal butler service, orchestrating private yacht expeditions, helipad logistics, and unlisted access.',
      experience: 'Les Clefs d’Or International Governor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lady Camille Desmarais',
      role: 'Director of Biophilic Architecture & Ecology',
      bio: 'Camille bridges historic architectural preservation with regenerative marine biology, directing our 100% solar lagoon energy initiatives and private coral reef restoration nurseries.',
      experience: 'Master of Architectural Conservation',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const ACCOLADES = [
    {
      title: 'Forbes 5-Star Hotel Rating',
      year: '2024, 2025 & 2026',
      desc: 'Awarded the highest global hospitality tier for immaculate personalized service, guest sanctuary privacy, and architectural grandeur.'
    },
    {
      title: 'World Luxury Hotel Awards',
      year: 'Global Winner — Best Luxury Palace Resort',
      desc: 'Recognized worldwide as the premier secluded coastal resort across the Mediterranean and Atlantic basins.'
    },
    {
      title: 'Condé Nast Traveler Gold List',
      year: 'Ranked #1 Resort in Western Europe',
      desc: 'Voted by international connoisseurs and discerning voyagers as an irreplaceable benchmark of timeless splendor.'
    },
    {
      title: 'Michelin Guide 3 Keys Distinction',
      year: 'Top Hospitality Accreditation',
      desc: 'Honored with the inaugural three-key accreditation celebrating properties that transcend ordinary travel into life-altering voyages.'
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
            <span>About Us</span>
          </div>

          {/* Prestige Badge */}
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
            <span>A Century of Timeless Splendor (1924–2026)</span>
          </div>

          <h1 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            The Legacy of LuxuryStay & <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              The Art of Regal Living
            </span>
          </h1>

          <p style={{
            color: 'rgba(250, 248, 245, 0.82)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            maxWidth: '740px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
            fontFamily: 'var(--font-body)',
            fontWeight: 300
          }}>
            Perched on the private cliffs of the Côte d’Azur, LUXURYSTAY Palace Resort & Villas stands as an
            eternal testament to haute hospitality, architectural poetry, and uncompromised privacy.
          </p>
        </div>
      </section>

      {/* ── STATS COUNTER BAR ── */}
      <section style={{ maxWidth: '1240px', margin: '-2.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.05)',
          padding: '2rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-gold-dark)', fontWeight: 700, lineHeight: 1 }}>
              1924
            </div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
              Founding Heritage
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-gold-dark)', fontWeight: 700, lineHeight: 1 }}>
              142
            </div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
              Sanctuary Suites & Villas
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-gold-dark)', fontWeight: 700, lineHeight: 1 }}>
              3 Stars
            </div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
              Michelin Accolades
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-gold-dark)', fontWeight: 700, lineHeight: 1 }}>
              99.4%
            </div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '1.8px', textTransform: 'uppercase', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
              VIP Guest Loyalty
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY & ARCHITECTURAL PHILOSOPHY ── */}
      <section style={{ maxWidth: '1240px', margin: '5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div>
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
              <Feather size={14} /> Our Genesis & Heritage
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
              color: '#12151C',
              lineHeight: 1.2,
              margin: '0 0 1.5rem'
            }}>
              Conceived as a Royal Haven, <br />
              <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                Perfected Through Generations
              </span>
            </h2>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '1.25rem' }}>
              Originally constructed in the Roaring Twenties as a grand coastal manor for sovereign dignitaries
              and literary visionaries, LUXURYSTAY was envisioned as a realm where privacy was sacrosanct and
              hospitality was practiced not as a commercial service, but as a fine art.
            </p>
            <p style={{ fontSize: '0.94rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '1.75rem' }}>
              Through over a century of meticulous preservation and multi-million-euro contemporary restoration,
              the palace retains its handcrafted Italian limestone archways and gilded bronze chandeliers, now
              seamlessly intertwined with state-of-the-art climate intelligence, private yacht marina slips, and
              curated acoustic tranquility.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={20} color="var(--color-gold-dark)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#12151C' }}>Historic Monument Preservation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Leaf size={20} color="#059669" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#12151C' }}>100% Zero-Carbon Lagoon</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(197, 168, 128, 0.35)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"
                alt="LuxuryStay Palace Facade"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 60%, rgba(10, 12, 16, 0.85) 100%)'
              }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Est. 1924 Côte d’Azur
                </span>
                <div style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginTop: '0.25rem' }}>
                  The Majestic Grand Colonnade & Ocean Pavilion
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FOUR SACRED PILLARS OF LUXURYSTAY ── */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '6rem 1.5rem', margin: '6rem 0 0', borderTop: '1px solid #ECE7DE', borderBottom: '1px solid #ECE7DE' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
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
              <Sparkles size={14} /> The Four Sacred Pillars
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', color: '#12151C', margin: '0 0 1rem' }}>
              Defining Haute Hospitality Across Every Touchpoint
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#555A68', lineHeight: 1.7, margin: 0 }}>
              True luxury is not defined by excess, but by the effortless precision of thoughtful details.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: '#FAF8F5',
              padding: '2.25rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--color-gold-dark)'
              }}>
                <Crown size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.65rem', color: '#12151C' }}>
                Unquestioned Discretion
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.65, margin: 0 }}>
                Every reservation is governed by strict non-disclosure standards. Private elevator corridors,
                subterranean chauffeur entries, and confidential guest rosters ensure total serenity.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FAF8F5',
              padding: '2.25rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--color-gold-dark)'
              }}>
                <Wine size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.65rem', color: '#12151C' }}>
                Michelin Gastronomy
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.65, margin: 0 }}>
                Three Michelin stars across our oceanfront dining rooms, paired with a 15,000-bottle subterranean
                cave curated by master sommeliers, featuring rare imperial vintages dating back to 1945.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FAF8F5',
              padding: '2.25rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--color-gold-dark)'
              }}>
                <Heart size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.65rem', color: '#12151C' }}>
                Holistic Thalasso Spa
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.65, margin: 0 }}>
                Heated seawater thermal therapy, volcanic mineral baths, and bespoke treatments formulated
                from wild alpine botanicals harvest-fresh each season.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FAF8F5',
              padding: '2.25rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(197, 168, 128, 0.3)'
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(197, 168, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                color: 'var(--color-gold-dark)'
              }}>
                <Leaf size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '0 0 0.65rem', color: '#12151C' }}>
                Ecological Stewardship
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#555A68', lineHeight: 1.65, margin: 0 }}>
                100% solar-assisted lagoon architecture, complete elimination of single-use plastics, and
                an active marine nursery cultivating 5,000 coral fragments in the surrounding sanctuary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE LEADERSHIP & E-E-A-T TEAM ── */}
      <section style={{ maxWidth: '1240px', margin: '6rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
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
            <Users size={14} /> Executive Leadership
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', color: '#12151C', margin: '0 0 1rem' }}>
            Meet the Curators of Your Sanctuary
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#555A68', lineHeight: 1.7, margin: 0 }}>
            Every unforgettable stay is sculpted by world-renowned hospitality masters, culinary artisans, and master concierges.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '2rem'
        }}>
          {LEADERS.map((leader, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 168, 128, 0.3)',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.3s'
              }}
            >
              <div style={{ height: '260px', overflow: 'hidden' }}>
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {leader.role}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: '0 0 0.5rem', color: '#12151C' }}>
                  {leader.name}
                </h3>
                <div style={{ display: 'inline-block', backgroundColor: 'rgba(197, 168, 128, 0.12)', padding: '0.25rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '0.85rem' }}>
                  {leader.experience}
                </div>
                <p style={{ fontSize: '0.84rem', color: '#555A68', lineHeight: 1.6, margin: 0 }}>
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCOLADES & HONORS ── */}
      <section style={{ maxWidth: '1240px', margin: '6rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          backgroundColor: '#0D0F14',
          color: '#FAF8F5',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          border: '1px solid rgba(197, 168, 128, 0.35)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-gold)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <Award size={15} /> Industry Distinctions
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', color: '#FFFFFF', margin: '0 0 1rem' }}>
              International Honors & Accolades
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(250, 248, 245, 0.75)', lineHeight: 1.6, margin: 0 }}>
              Endorsed by the world’s most exacting luxury rating authorities and connoisseur societies.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '2rem'
          }}>
            {ACCOLADES.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '2rem 1.75rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(197, 168, 128, 0.25)'
                }}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.85rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {item.year}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFFFFF', margin: '0 0 0.65rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'rgba(250, 248, 245, 0.72)', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION SECTION ── */}
      <section style={{ maxWidth: '1240px', margin: '5rem auto 6rem', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          borderRadius: '24px',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.04)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#12151C', margin: '0 0 1rem' }}>
            Write Your Chapter in Our Timeless Story
          </h2>
          <p style={{ fontSize: '0.94rem', color: '#555A68', maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
            Experience the harmony of historic nobility and modern coastal serenity. Reserve your palace suite,
            read our long-form chronicles, or speak directly with our concierge team.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onNavigateToHome}
              className="btn-gold"
              style={{ padding: '0.85rem 2rem', fontSize: '0.86rem' }}
            >
              Explore Suites & Villas <ArrowRight size={15} />
            </button>
            <button
              onClick={onNavigateToBlogs}
              className="btn-black"
              style={{ padding: '0.85rem 2rem', fontSize: '0.86rem' }}
            >
              Read Palace Blogs
            </button>
            <button
              onClick={onNavigateToContact}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(197, 168, 128, 0.5)',
                color: '#12151C',
                padding: '0.85rem 2rem',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
