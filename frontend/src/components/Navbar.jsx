import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Crown, LogOut, User, PhoneCall, Sparkles, Compass, ShieldCheck, KeyRound, Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenAuth, activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'System Admin', bg: 'rgba(197, 168, 128, 0.2)', text: '#E5D2B8', border: '#C5A880' };
      case 'manager':
        return { label: 'General Manager', bg: 'rgba(197, 168, 128, 0.15)', text: '#D4B886', border: 'rgba(197, 168, 128, 0.4)' };
      case 'receptionist':
        return { label: 'Front Desk Lead', bg: 'rgba(56, 189, 248, 0.12)', text: '#7DD3FC', border: 'rgba(56, 189, 248, 0.35)' };
      case 'housekeeping':
        return { label: 'Housekeeping Supervisor', bg: 'rgba(216, 180, 254, 0.12)', text: '#E9D5FF', border: 'rgba(216, 180, 254, 0.35)' };
      default:
        return { label: 'Valued Guest', bg: 'rgba(255, 255, 255, 0.08)', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.2)' };
    }
  };

  const scrollToSection = (id) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(10, 12, 16, 0.94)' : 'rgba(10, 12, 16, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
      transition: 'all 0.35s ease',
      boxShadow: scrolled ? '0 12px 35px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
      padding: scrolled ? '0.75rem 2.5rem' : '1.1rem 2.5rem'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(228, 213, 190, 0.15) 0%, rgba(197, 168, 128, 0.05) 100%)',
            border: '1px solid rgba(197, 168, 128, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(197, 168, 128, 0.15)',
            transition: 'all 0.3s ease'
          }}>
            <Crown size={22} color="#C5A880" strokeWidth={1.75} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                color: '#FAF8F5',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '2.5px',
                fontFamily: 'var(--font-royal)',
                lineHeight: 1
              }}>
                LUXURYSTAY
              </span>
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-gold)',
                display: 'inline-block'
              }} />
            </div>
            <span style={{
              color: 'var(--color-gold)',
              fontSize: '0.62rem',
              letterSpacing: '2.8px',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '4px',
              fontWeight: 500,
              fontFamily: 'var(--font-body)'
            }}>
              Palace Resort & Villas
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links" style={{ alignItems: 'center', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? 'var(--color-gold)' : 'rgba(250, 248, 245, 0.78)',
              fontFamily: 'var(--font-body)',
              fontWeight: activeTab === 'home' ? 600 : 400,
              fontSize: '0.84rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '0.35rem 0',
              position: 'relative',
              transition: 'color 0.25s ease'
            }}
          >
            Suites & Villas
            {activeTab === 'home' && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: '20%',
                right: '20%',
                height: '1.5px',
                background: 'var(--color-gold)',
                borderRadius: '2px'
              }} />
            )}
          </button>

          {activeTab === 'home' && (
            <>
              <button
                onClick={() => scrollToSection('experiences')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(250, 248, 245, 0.78)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '0.84rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '0.35rem 0',
                  transition: 'color 0.25s ease'
                }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(250, 248, 245, 0.78)'}
              >
                Experiences
              </button>

              <button
                onClick={() => scrollToSection('gastronomy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(250, 248, 245, 0.78)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '0.84rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '0.35rem 0',
                  transition: 'color 0.25s ease'
                }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(250, 248, 245, 0.78)'}
              >
                Dining
              </button>
            </>
          )}

          {user && (
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'dashboard' ? 'var(--color-gold)' : 'rgba(250, 248, 245, 0.78)',
                fontFamily: 'var(--font-body)',
                fontWeight: activeTab === 'dashboard' ? 600 : 400,
                fontSize: '0.84rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '0.35rem 0',
                position: 'relative',
                transition: 'color 0.25s ease'
              }}
            >
              {user.role === 'guest' ? 'Guest Sanctuary' : 'Operations Management'}
              {activeTab === 'dashboard' && (
                <span style={{
                  position: 'absolute',
                  bottom: -2,
                  left: '15%',
                  right: '15%',
                  height: '1.5px',
                  background: 'var(--color-gold)',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          )}
        </div>

        {/* Desktop User Status / Concierge Hotline / Auth Actions */}
        <div className="desktop-auth-actions" style={{ alignItems: 'center', gap: '1.25rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(22, 26, 35, 0.85)',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid rgba(197, 168, 128, 0.25)'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(197, 168, 128, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={13} color="var(--color-gold)" />
                </div>
                <span style={{ color: '#FAF8F5', fontSize: '0.82rem', fontWeight: 600 }}>
                  {user.name}
                </span>
                <span style={{
                  backgroundColor: getRoleBadge(user.role).bg,
                  color: getRoleBadge(user.role).text,
                  border: `1px solid ${getRoleBadge(user.role).border}`,
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.55rem',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px'
                }}>
                  {getRoleBadge(user.role).label}
                </span>
              </div>

              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: 'rgba(250, 248, 245, 0.75)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'; e.currentTarget.style.color = 'rgba(250, 248, 245, 0.75)'; }}
                title="Sign Out"
              >
                <LogOut size={13} /> Exit
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn-black"
                style={{ fontSize: '0.76rem', padding: '0.55rem 1.15rem' }}
              >
                <KeyRound size={13} /> Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="btn-gold"
                style={{ fontSize: '0.76rem', padding: '0.55rem 1.25rem' }}
              >
                <ShieldCheck size={14} /> Privilege Access
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'none',
            background: 'rgba(197, 168, 128, 0.12)',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            color: 'var(--color-gold)',
            borderRadius: '8px',
            padding: '0.5rem',
            cursor: 'pointer'
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-drawer" style={{
          backgroundColor: '#0D0F14',
          borderTop: '1px solid rgba(197, 168, 128, 0.2)',
          padding: '1.25rem 1.5rem 1.75rem',
          marginTop: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'modalIn 0.25s ease'
        }}>
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              border: '1px solid rgba(197, 168, 128, 0.2)'
            }}>
              <div>
                <div style={{ color: '#FAF8F5', fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{getRoleBadge(user.role).label}</div>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => { setActiveTab('home'); setMobileOpen(false); }}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === 'home' ? 'var(--color-gold)' : '#FAF8F5',
              fontSize: '0.95rem',
              textAlign: 'left',
              padding: '0.6rem 0',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Suites & Villas
          </button>

          <button
            onClick={() => { scrollToSection('experiences'); setMobileOpen(false); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#FAF8F5',
              fontSize: '0.95rem',
              textAlign: 'left',
              padding: '0.6rem 0',
              cursor: 'pointer'
            }}
          >
            Palace Experiences
          </button>

          <button
            onClick={() => { scrollToSection('gastronomy'); setMobileOpen(false); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#FAF8F5',
              fontSize: '0.95rem',
              textAlign: 'left',
              padding: '0.6rem 0',
              cursor: 'pointer'
            }}
          >
            Michelin Dining
          </button>

          {user && (
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileOpen(false); }}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'dashboard' ? 'var(--color-gold)' : '#FAF8F5',
                fontSize: '0.95rem',
                textAlign: 'left',
                padding: '0.6rem 0',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {user.role === 'guest' ? '★ Guest Sanctuary Dashboard' : '⚡ Operations Management'}
            </button>
          )}

          {!user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => { onOpenAuth('login'); setMobileOpen(false); }}
                className="btn-black"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <KeyRound size={15} /> Sign In
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileOpen(false); }}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              >
                <ShieldCheck size={16} /> Privilege Access / Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};


