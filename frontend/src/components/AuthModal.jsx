import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, KeyRound, Crown } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { data } = await axios.post('/api/auth/register', formData);
        login(data, data.token);
        onClose();
      } else {
        const { data } = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        login(data, data.token);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          boxShadow: '0 30px 70px rgba(10, 12, 16, 0.45)'
        }}
      >
        {/* Luxury Header Banner */}
        <div style={{
          backgroundColor: '#0A0C10',
          padding: '1.5rem 1.8rem',
          borderBottom: '1px solid rgba(197, 168, 128, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(197, 168, 128, 0.15)',
              border: '1px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Crown size={18} color="var(--color-gold)" />
            </div>
            <div>
              <h3 style={{
                color: '#FAF8F5',
                margin: 0,
                fontSize: '1.15rem',
                fontFamily: 'var(--font-royal)',
                letterSpacing: '1px'
              }}>
                {mode === 'register' ? 'Create Account' : 'Sign In'}
              </h3>
              <span style={{
                color: 'var(--color-gold)',
                fontSize: '0.66rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                display: 'block',
                marginTop: '2px'
              }}>
                LuxuryStay Palace & Resort
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.75)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseOut={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#F3EFEA',
          padding: '0.4rem',
          borderBottom: '1px solid #E8E2D8'
        }}>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              background: mode === 'login' ? '#FFFFFF' : 'transparent',
              color: mode === 'login' ? '#12151C' : '#7A808C',
              border: 'none',
              borderRadius: '6px',
              padding: '0.65rem 0',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              background: mode === 'register' ? '#FFFFFF' : 'transparent',
              color: mode === 'register' ? '#12151C' : '#7A808C',
              border: 'none',
              borderRadius: '6px',
              padding: '0.65rem 0',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            Create Guest Account
          </button>
        </div>

        {/* Modal Form Body */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          {error && (
            <div style={{
              backgroundColor: 'rgba(225, 29, 72, 0.08)',
              color: '#BE123C',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              fontSize: '0.82rem',
              border: '1px solid rgba(225, 29, 72, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>• {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {mode === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#8C6B37" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Lord Alexander Montgomery"
                      value={formData.name}
                      onChange={handleChange}
                      className="luxury-input"
                      style={{ paddingLeft: '2.4rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                    Direct Telephone
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#8C6B37" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 019-2831"
                      value={formData.phone}
                      onChange={handleChange}
                      className="luxury-input"
                      style={{ paddingLeft: '2.4rem' }}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#8C6B37" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="vip.guest@luxurystay.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="luxury-input"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#8C6B37" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="luxury-input"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '0.5rem',
                padding: '0.82rem',
                fontSize: '0.84rem',
                letterSpacing: '1px'
              }}
            >
              {loading ? 'Please wait...' : mode === 'register' ? 'Create Account' : 'Sign In'}
            </button>
          </form>



          {/* Mode Switcher */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.84rem', color: '#656B77' }}>
            {mode === 'login' ? (
              <span>
                New Guest?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Create Guest Account
                </button>
              </span>
            ) : (
              <span>
              Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

