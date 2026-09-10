import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Calendar, Users, Sparkles, Star, ChevronRight, BedDouble,
  Wifi, Coffee, Shield, Award, Eye, Compass, Utensils, Anchor,
  HeartHandshake, Check, X, Phone, MapPin, Mail, ArrowRight
} from 'lucide-react';

const STATUS_CONFIG = {
  AVAILABLE:   { label: 'Available',        cls: 'badge-available',   dot: '#10b981', canBook: true  },
  OCCUPIED:    { label: 'Occupied',         cls: 'badge-occupied',    dot: '#64748b', canBook: false },
  CLEANING:    { label: 'Sanitizing',       cls: 'badge-cleaning',    dot: '#d97706', canBook: false },
  MAINTENANCE: { label: 'Under Care',       cls: 'badge-maintenance', dot: '#e11d48', canBook: false },
};

const SUITE_TYPES = [
  'ALL',
  'Deluxe Ocean Terrace Suite',
  'Executive Garden Jacuzzi Suite',
  'Grand Deluxe King Suite',
  'Azure Horizon Ocean Suite',
  'Presidential Penthouse Suite',
  'Royal Monarch Suite',
  'Imperial Sky Villa',
  'Ambassador Diplomatic Suite',
  'Sapphire Overwater Villa',
  'Celestial Stargazer Suite',
  'Mediterranean Riviera Suite',
];

export const PublicHome = ({ onOpenAuth, onSelectRoomForBooking }) => {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedSuiteForPreview, setSelectedSuiteForPreview] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Booking search bar dates (visual inputs that flow into reservation)
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [guestCount, setGuestCount] = useState('2 Guests');

  useEffect(() => { fetchRooms(); }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(r => {
    const typeMatch = filterType === 'ALL' || r.roomType === filterType;
    const statusMatch = filterStatus === 'ALL' || r.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const availableCount = rooms.filter(r => r.status === 'AVAILABLE').length;

  const handleBookClick = (room) => {
    if (selectedSuiteForPreview) {
      setSelectedSuiteForPreview(null);
    }
    if (user) {
      onSelectRoomForBooking(room);
    } else {
      onOpenAuth('register');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 6000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-cream-bg)' }}>

      {/* ── HERO SECTION ── */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        backgroundImage: 'linear-gradient(180deg, rgba(10, 12, 16, 0.45) 0%, rgba(10, 12, 16, 0.75) 70%, #0A0C10 100%), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem 6rem',
        color: '#FAF8F5'
      }}>
        <div style={{ maxWidth: '1040px', width: '100%', zIndex: 2 }}>
          
          {/* Prestige Accolade Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(10, 12, 16, 0.65)',
            border: '1px solid rgba(197, 168, 128, 0.4)',
            padding: '0.45rem 1.35rem',
            borderRadius: '50px',
            color: 'var(--color-gold)',
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '1.8rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            <Sparkles size={14} color="var(--color-gold)" />
            <span>Forbes Travel Guide 5-Star Certified • World's Leading Palace</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
            fontFamily: 'var(--font-heading)',
            color: '#FFFFFF',
            lineHeight: 1.08,
            marginBottom: '1.35rem',
            letterSpacing: '-0.02em',
            textShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
          }}>
            The Art of Refined Living.<br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Sanctuaries Beyond Compare.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(250, 248, 245, 0.85)',
            maxWidth: '680px',
            margin: '0 auto 2.2rem',
            fontWeight: 300,
            lineHeight: 1.7,
            fontFamily: 'var(--font-body)'
          }}>
            Perched along pristine turquoise shores, an iconic palace offering intuitive 24-hour butler service, Michelin-starred gastronomy, and masterfully curated suites.
          </p>

          {/* Live Availability Indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            padding: '0.45rem 1.2rem',
            borderRadius: '50px',
            color: '#A7F3D0',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.8px',
            marginBottom: '3rem',
            backdropFilter: 'blur(8px)'
          }}>
            <span className="pulse-indicator" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span>{availableCount} Sanctuaries Currently Available for Reservation</span>
          </div>

          {/* ── BESPOKE RESERVATION CONCIERGE BAR ── */}
          <div style={{
            backgroundColor: 'rgba(18, 22, 30, 0.88)',
            border: '1px solid rgba(197, 168, 128, 0.35)',
            borderRadius: '18px',
            padding: '1.6rem 2rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
              alignItems: 'flex-end'
            }}>
              {/* Suite Selection */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '0.5rem'
                }}>
                  <BedDouble size={14} /> Suite Type
                </label>
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#12151C',
                    color: '#FAF8F5',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer'
                  }}
                >
                  {SUITE_TYPES.map(t => (
                    <option key={t} value={t}>{t === 'ALL' ? 'All Suites & Villas' : t}</option>
                  ))}
                </select>
              </div>

              {/* Check-In Date */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '0.5rem'
                }}>
                  <Calendar size={14} /> Check-In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#12151C',
                    color: '#FAF8F5',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    padding: '0.62rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    colorScheme: 'dark'
                  }}
                />
              </div>

              {/* Check-Out Date */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '0.5rem'
                }}>
                  <Calendar size={14} /> Check-Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#12151C',
                    color: '#FAF8F5',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    padding: '0.62rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    colorScheme: 'dark'
                  }}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '0.5rem'
                }}>
                  <Shield size={14} /> Availability
                </label>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#12151C',
                    color: '#FAF8F5',
                    border: '1px solid rgba(197, 168, 128, 0.3)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="ALL">All Accommodations</option>
                  <option value="AVAILABLE">Available for Reservation</option>
                  <option value="OCCUPIED">Currently Occupied</option>
                  <option value="CLEANING">In Sanitization</option>
                  <option value="MAINTENANCE">Under Care</option>
                </select>
              </div>

              {/* Action Button */}
              <div>
                <a
                  href="#suites-showcase"
                  className="btn-gold"
                  style={{
                    width: '100%',
                    height: '42px',
                    fontSize: '0.82rem',
                    letterSpacing: '1px'
                  }}
                >
                  Explore Suites
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── HERITAGE & KEY ACCREDITATIONS BAR ── */}
      <section style={{
        backgroundColor: 'var(--color-obsidian)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
        padding: '2.5rem 2rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {[
            { val: 'EST. 1928', label: 'Century of Royal Heritage' },
            { val: '5.0 ★',    label: 'Forbes 5-Star Luxury Rating' },
            { val: '1:1 VIP',   label: 'Personal Butler In Every Suite' },
            { val: '3 Michelin', label: 'Star Culinary Destination' },
          ].map(({ val, label }) => (
            <div key={label} style={{ padding: '0.5rem' }}>
              <div style={{
                color: 'var(--color-gold)',
                fontSize: '1.9rem',
                fontWeight: 700,
                fontFamily: 'var(--font-royal)',
                letterSpacing: '1px',
                marginBottom: '0.35rem'
              }}>
                {val}
              </div>
              <div style={{
                fontSize: '0.74rem',
                color: 'rgba(250, 248, 245, 0.65)',
                textTransform: 'uppercase',
                letterSpacing: '1.6px',
                fontWeight: 500
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUITES & VILLAS SHOWCASE ── */}
      <section id="suites-showcase" style={{ maxWidth: '1380px', margin: '0 auto', padding: '6rem 2rem' }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            color: 'var(--color-gold-dark)',
            fontWeight: 700,
            fontSize: '0.76rem',
            letterSpacing: '3.5px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.6rem'
          }}>
            The Private Sanctuaries
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)',
            color: '#12151C',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15
          }}>
            Suites & Oceanfront Villas
          </h2>
          <div style={{
            width: '60px',
            height: '2px',
            background: 'var(--color-gold)',
            margin: '1.2rem auto',
            borderRadius: '2px'
          }} />
          <p style={{
            color: '#656B77',
            maxWidth: '620px',
            margin: '0 auto',
            fontSize: '0.96rem',
            lineHeight: 1.7
          }}>
            Every residence is an architectural masterpiece of calm opulence — curated with handcrafted furnishings, Italian marble baths, and private terraces overlooking the turquoise horizon.
          </p>

          {/* Quick Filter Counts */}
          <div style={{
            marginTop: '1.6rem',
            color: '#7A808C',
            fontSize: '0.84rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#FFFFFF',
            padding: '0.35rem 1.1rem',
            borderRadius: '50px',
            border: '1px solid rgba(197, 168, 128, 0.25)'
          }}>
            <span>Presenting <strong style={{ color: '#12151C' }}>{filteredRooms.length}</strong> of <strong style={{ color: '#12151C' }}>{rooms.length}</strong> Sanctuaries</span>
            {filterStatus === 'AVAILABLE' && (
              <span style={{ color: '#047857', fontWeight: 600 }}>• Ready for Immediate Confirmation</span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            color: 'var(--color-gold-dark)',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem'
          }}>
            <Sparkles size={32} color="var(--color-gold)" style={{ margin: '0 auto 1.2rem', display: 'block' }} />
            Curating Luxury Sanctuaries...
          </div>
        ) : filteredRooms.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(197, 168, 128, 0.2)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <Compass size={36} color="var(--color-gold)" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              No Accommodations Match This Selection
            </h3>
            <p style={{ color: '#7A808C', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Please adjust your suite type or availability filter above to explore our full collection.
            </p>
            <button
              onClick={() => { setFilterType('ALL'); setFilterStatus('ALL'); }}
              className="btn-gold"
              style={{ fontSize: '0.78rem' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Suites Grid */
          <div className="suites-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '2rem'
          }}>
            {filteredRooms.map((room) => {
              const cfg = STATUS_CONFIG[room.status] || STATUS_CONFIG.AVAILABLE;

              return (
                <div
                  key={room._id}
                  className="card-luxury"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  {/* Image Container with Ambient Badges */}
                  <div style={{
                    position: 'relative',
                    height: '270px',
                    overflow: 'hidden',
                    backgroundColor: '#12151C'
                  }}>
                    <img
                      src={room.image}
                      alt={room.roomType}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)'
                      }}
                      onMouseOver={e => e.target.style.transform = 'scale(1.07)'}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    />

                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(10, 12, 16, 0.4) 0%, transparent 40%, rgba(10, 12, 16, 0.85) 100%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Suite Number Badge (Top-Left) */}
                    <div style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: 'rgba(10, 12, 16, 0.82)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(197, 168, 128, 0.4)',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '50px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'var(--font-royal)'
                    }}>
                      Suite {room.roomNumber}
                    </div>

                    {/* Status Badge (Top-Right) */}
                    <div style={{ position: 'absolute', top: 14, right: 14 }}>
                      <span className={cfg.cls} style={{ backdropFilter: 'blur(10px)', background: 'rgba(255, 255, 255, 0.95)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Floor & Capacity Badge (Bottom-Left) */}
                    <div style={{
                      position: 'absolute',
                      bottom: 14,
                      left: 14,
                      background: 'rgba(10, 12, 16, 0.75)',
                      color: '#E8E2D8',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      Floor {room.floor} • Up to {room.capacity} Guests
                    </div>

                    {/* Price Tag (Bottom-Right) */}
                    <div style={{
                      position: 'absolute',
                      bottom: 14,
                      right: 14,
                      background: 'rgba(10, 12, 16, 0.88)',
                      color: '#FAF8F5',
                      padding: '0.38rem 0.95rem',
                      borderRadius: '8px',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      border: '1px solid rgba(197, 168, 128, 0.45)',
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'var(--font-royal)'
                    }}>
                      ${room.pricePerNight}
                      <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'rgba(250, 248, 245, 0.7)', marginLeft: '4px' }}>
                        / night
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Suite Title */}
                      <h3 style={{
                        fontSize: '1.25rem',
                        color: '#12151C',
                        marginBottom: '0.65rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1.3
                      }}>
                        {room.roomType}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: '0.86rem',
                        color: '#656B77',
                        marginBottom: '1.35rem',
                        lineHeight: 1.65,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {room.description}
                      </p>

                      {/* Amenities Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                        {room.amenities?.slice(0, 4).map((amenity, i) => (
                          <span
                            key={i}
                            style={{
                              background: 'rgba(197, 168, 128, 0.08)',
                              color: '#8C6B37',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '0.24rem 0.65rem',
                              borderRadius: '4px',
                              border: '1px solid rgba(197, 168, 128, 0.22)'
                            }}
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                        {room.amenities && room.amenities.length > 4 && (
                          <span style={{
                            color: '#8C6B37',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '0.24rem 0.4rem',
                            alignSelf: 'center'
                          }}>
                            +{room.amenities.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Maintenance Note If Applicable */}
                      {room.status === 'MAINTENANCE' && room.maintenanceNote && (
                        <div style={{
                          background: 'rgba(225, 29, 72, 0.08)',
                          border: '1px solid rgba(225, 29, 72, 0.25)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          fontSize: '0.78rem',
                          color: '#BE123C',
                          marginBottom: '1.25rem'
                        }}>
                          🔧 {room.maintenanceNote}
                        </div>
                      )}
                    </div>

                    {/* Card Actions Row */}
                    <div style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid #EFEAE0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}>
                      {/* Quick Details Trigger */}
                      <button
                        onClick={() => setSelectedSuiteForPreview(room)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#555A64',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.4rem 0',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold-dark)'}
                        onMouseOut={e => e.currentTarget.style.color = '#555A64'}
                      >
                        <Eye size={15} /> Suite Details
                      </button>

                      {/* Book CTA / Status Pill */}
                      {cfg.canBook ? (
                        <button
                          onClick={() => handleBookClick(room)}
                          className="btn-gold"
                          style={{
                            fontSize: '0.76rem',
                            padding: '0.6rem 1.25rem'
                          }}
                        >
                          Reserve Now <ChevronRight size={14} />
                        </button>
                      ) : (
                        <span className={cfg.cls} style={{ fontSize: '0.72rem', padding: '0.45rem 0.9rem' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
                          {cfg.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── INTERACTIVE SUITE QUICK-VIEW MODAL ── */}
      {selectedSuiteForPreview && (
        <div className="modal-overlay" onClick={() => setSelectedSuiteForPreview(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '280px', backgroundColor: '#0A0C10' }}>
              <img
                src={selectedSuiteForPreview.image}
                alt={selectedSuiteForPreview.roomType}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10, 12, 16, 0.3) 0%, rgba(10, 12, 16, 0.75) 100%)'
              }} />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSuiteForPreview(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'rgba(10, 12, 16, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <X size={18} />
              </button>

              {/* Title & Suite Number */}
              <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
                <span style={{
                  background: 'var(--color-gold)',
                  color: '#0A0C10',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.4rem'
                }}>
                  Suite {selectedSuiteForPreview.roomNumber} • Floor {selectedSuiteForPreview.floor}
                </span>
                <h2 style={{
                  color: '#FAF8F5',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.65rem',
                  lineHeight: 1.2
                }}>
                  {selectedSuiteForPreview.roomType}
                </h2>
              </div>
            </div>

            {/* Modal Content Body */}
            <div style={{ padding: '2rem' }}>
              {/* Specs Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '0.85rem',
                backgroundColor: 'var(--color-white-off)',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #EAE5DC',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#7A808C', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Nightly Rate</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)', fontFamily: 'var(--font-royal)' }}>
                    ${selectedSuiteForPreview.pricePerNight}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#7A808C', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Capacity</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#12151C', fontFamily: 'var(--font-royal)' }}>
                    {selectedSuiteForPreview.capacity} Guests
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#7A808C', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Service Level</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#12151C', fontFamily: 'var(--font-royal)' }}>
                    24h Butler
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  The Sanctuary Experience
                </h4>
                <p style={{ color: '#555A64', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {selectedSuiteForPreview.description}
                </p>
              </div>

              {/* Amenities List */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                  Curated Inclusions & Amenities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {selectedSuiteForPreview.amenities?.map((amenity, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#3A3F4A' }}>
                      <Check size={16} color="var(--color-gold-dark)" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#3A3F4A' }}>
                    <Check size={16} color="var(--color-gold-dark)" />
                    <span>24/7 Dedicated Butler Dispatch</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: '#3A3F4A' }}>
                    <Check size={16} color="var(--color-gold-dark)" />
                    <span>Chauffeured Airport Transfer</span>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div style={{
                paddingTop: '1.5rem',
                borderTop: '1px solid #EFEAE0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => setSelectedSuiteForPreview(null)}
                  className="btn-outline"
                  style={{ fontSize: '0.8rem' }}
                >
                  Close Details
                </button>

                {selectedSuiteForPreview.status === 'AVAILABLE' ? (
                  <button
                    onClick={() => handleBookClick(selectedSuiteForPreview)}
                    className="btn-gold"
                    style={{ fontSize: '0.82rem', padding: '0.75rem 1.6rem' }}
                  >
                    Confirm Reservation <ChevronRight size={14} />
                  </button>
                ) : (
                  <span className={STATUS_CONFIG[selectedSuiteForPreview.status]?.cls || 'badge-occupied'}>
                    {STATUS_CONFIG[selectedSuiteForPreview.status]?.label || 'Unavailable'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── THE BESPOKE EXPERIENCES SECTION ── */}
      <section id="experiences" style={{
        backgroundColor: 'var(--color-obsidian)',
        padding: '6.5rem 2rem',
        color: '#FAF8F5'
      }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              color: 'var(--color-gold)',
              fontWeight: 700,
              fontSize: '0.76rem',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Beyond The Sanctuary
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 3.6vw, 3.2rem)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)'
            }}>
              Curated Bespoke Experiences
            </h2>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'var(--color-gold)',
              margin: '1.2rem auto',
              borderRadius: '2px'
            }} />
            <p style={{
              color: 'rgba(250, 248, 245, 0.75)',
              maxWidth: '620px',
              margin: '0 auto',
              fontSize: '0.96rem',
              lineHeight: 1.7
            }}>
              From private superyacht charters across sapphire waters to thermal spa rituals, immerse in unrivaled luxury tailored exclusively for you.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: Anchor,
                title: 'Private Superyacht Charters',
                desc: 'Embark on private Mediterranean sunset sails with our resident captain, master sommelier, and private seafood grill.',
                badge: 'Maritime Concierge'
              },
              {
                icon: Sparkles,
                title: 'Imperial Thalasso Spa & Baths',
                desc: 'Experience centuries-old Turkish hammam rituals, heated magnesium plunge pools, and bespoke botanical therapies.',
                badge: 'Holistic Wellness'
              },
              {
                icon: Coffee,
                title: 'Sommelier Wine Vault',
                desc: 'Exclusive access to our subterranean cellars housing over 4,200 rare Grand Cru vintages and private tasting salons.',
                badge: 'Private Tastings'
              },
              {
                icon: Award,
                title: 'Helipad & Phantom Fleet',
                desc: 'Complimentary Rolls-Royce airport transfers and private helipad reception for seamless, discrete international arrivals.',
                badge: 'VIP Transportation'
              }
            ].map(({ icon: Icon, title, desc, badge }) => (
              <div
                key={title}
                className="card-luxury-dark"
                style={{
                  padding: '2.2rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'rgba(197, 168, 128, 0.12)',
                      border: '1px solid rgba(197, 168, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color="var(--color-gold)" />
                    </div>
                    <span style={{
                      fontSize: '0.68rem',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(197, 168, 128, 0.25)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '50px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {badge}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#FAF8F5',
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3
                  }}>
                    {title}
                  </h3>

                  <p style={{
                    color: 'rgba(250, 248, 245, 0.68)',
                    fontSize: '0.86rem',
                    lineHeight: 1.65
                  }}>
                    {desc}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <span style={{
                    fontSize: '0.76rem',
                    color: 'var(--color-gold)',
                    fontWeight: 600,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}>
                    Learn More & Inquire <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MICHELIN GASTRONOMY VENUES ── */}
      <section id="gastronomy" style={{
        padding: '6.5rem 2rem',
        backgroundColor: '#F7F3EC'
      }}>
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              color: 'var(--color-gold-dark)',
              fontWeight: 700,
              fontSize: '0.76rem',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.6rem'
            }}>
              Culinary Artistry
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 3.6vw, 3.2rem)',
              color: '#12151C',
              fontFamily: 'var(--font-heading)'
            }}>
              Three Michelin-Starred Gastronomy
            </h2>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'var(--color-gold)',
              margin: '1.2rem auto',
              borderRadius: '2px'
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: "L'Étoile Palace Dining",
                subtitle: 'Haute French Cuisine • 3 Michelin Stars',
                desc: 'Executive Chef Laurent Laurent curates multi-course degustation menus pairing rare Atlantic truffles with vintage Bordeaux.',
                img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
                hours: 'Dinner: 19:00 - 23:30'
              },
              {
                title: 'Aqua Marine Ocean Pavilion',
                subtitle: 'Mediterranean Seafood & Crudo',
                desc: 'Overwater open-air dining featuring fresh catches from local artisanal divers, grilled over fragrant olive wood embers.',
                img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
                hours: 'Lunch & Dinner: 12:00 - 23:00'
              },
              {
                title: 'The Amber Cigar & Cognac Lounge',
                subtitle: 'Private Salons & Rare Spirits',
                desc: 'Intimate mahogany-paneled sanctuary with handcrafted leather seating, rare vintage cognacs, and bespoke humidor selections.',
                img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
                hours: 'Evening: 17:00 - Late'
              }
            ].map((v) => (
              <div key={v.title} className="card-luxury" style={{ overflow: 'hidden' }}>
                <div style={{ height: '230px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={v.img}
                    alt={v.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    background: 'rgba(10, 12, 16, 0.85)',
                    color: 'var(--color-gold)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(6px)'
                  }}>
                    {v.hours}
                  </div>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <span style={{
                    color: 'var(--color-gold-dark)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {v.subtitle}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    color: '#12151C',
                    marginTop: '0.35rem',
                    marginBottom: '0.75rem'
                  }}>
                    {v.title}
                  </h3>
                  <p style={{ color: '#656B77', fontSize: '0.86rem', lineHeight: 1.65 }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── INTERNATIONAL PRESS & ACCLAIM ── */}
      <section style={{
        padding: '5rem 2rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EFEAE0',
        borderBottom: '1px solid #EFEAE0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            color: 'var(--color-gold-dark)',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '2.5rem'
          }}>
            Critical Acclaim & Recognition
          </span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              {
                outlet: 'CONDÉ NAST TRAVELER',
                quote: '“The pinnacle of understated luxury. Unmatched butler service that anticipates desires before they are spoken.”'
              },
              {
                outlet: 'FORBES TRAVEL GUIDE',
                quote: '“A rare five-star sanctuary where architectural grandeur seamlessly blends with genuine, heartfelt hospitality.”'
              },
              {
                outlet: 'ARCHITECTURAL DIGEST',
                quote: '“A breathtaking triumph of seaside design, setting the gold standard for global presidential accommodations.”'
              }
            ].map(({ outlet, quote }) => (
              <div key={outlet} style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  color: '#24272E',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '1rem'
                }}>
                  {quote}
                </p>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '1.8px',
                  color: 'var(--color-gold-dark)',
                  textTransform: 'uppercase'
                }}>
                  {outlet}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PALACE SOCIETY (VIP NEWSLETTER) ── */}
      <section style={{
        backgroundColor: 'var(--color-obsidian)',
        padding: '5rem 2rem',
        color: '#FAF8F5'
      }}>
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: 'rgba(24, 28, 38, 0.75)',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          borderRadius: '20px',
          padding: '3.5rem 2.5rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(16px)'
        }}>
          <Sparkles size={28} color="var(--color-gold)" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <span style={{
            color: 'var(--color-gold)',
            fontSize: '0.75rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>
            Privilege Club Invitation
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.2rem',
            color: '#FFFFFF',
            marginTop: '0.5rem',
            marginBottom: '0.85rem'
          }}>
            Join The Palace Society
          </h2>
          <p style={{
            color: 'rgba(250, 248, 245, 0.75)',
            fontSize: '0.92rem',
            maxWidth: '520px',
            margin: '0 auto 2rem',
            lineHeight: 1.65
          }}>
            Receive bespoke seasonal invitations, private villa previews, and priority reservations at our Michelin culinary venues.
          </p>

          {newsletterSuccess ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              color: '#A7F3D0',
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600
            }}>
              ✨ Welcome to The Palace Society. Your privileges will arrive in your private inbox.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                required
                placeholder="Enter your VIP email address..."
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                style={{
                  flexGrow: 1,
                  background: '#0D0F14',
                  border: '1px solid rgba(197, 168, 128, 0.35)',
                  padding: '0.75rem 1.1rem',
                  borderRadius: '8px',
                  color: '#FAF8F5',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.82rem' }}
              >
                Request Access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── EDITORIAL LUXURY FOOTER ── */}
      <footer style={{
        backgroundColor: '#07090C',
        color: '#FAF8F5',
        padding: '5rem 2rem 2.5rem',
        borderTop: '1px solid rgba(197, 168, 128, 0.18)'
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3.5rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
                <Sparkles size={18} color="var(--color-gold)" />
              </div>
              <span style={{
                fontFamily: 'var(--font-royal)',
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#FAF8F5'
              }}>
                LUXURYSTAY
              </span>
            </div>
            <p style={{ color: 'rgba(250, 248, 245, 0.65)', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A sanctuary of discreet luxury, bespoke hospitality, and architectural distinction. Serving royal dignitaries and discerning travelers worldwide.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-gold)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase'
            }}>
              <Award size={14} /> Five-Star Diamond Certified 2026
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-royal)',
              fontSize: '0.84rem',
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              Sanctuaries
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['Presidential Penthouse', 'Azure Horizon Ocean Suites', 'Sapphire Overwater Villas', 'Imperial Sky Residences', 'Garden Jacuzzi Retreats'].map((item) => (
                <li key={item}>
                  <a
                    href="#suites-showcase"
                    style={{
                      color: 'rgba(250, 248, 245, 0.7)',
                      fontSize: '0.84rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(250, 248, 245, 0.7)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h4 style={{
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-royal)',
              fontSize: '0.84rem',
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              Experiences & Dining
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {["L'Étoile 3-Star Michelin", 'Aqua Marine Grill', 'Imperial Thalasso Spa', 'Private Yacht Charters', '24-Hour Butler Dispatch'].map((item) => (
                <li key={item}>
                  <span style={{
                    color: 'rgba(250, 248, 245, 0.7)',
                    fontSize: '0.84rem'
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge Coordinates */}
          <div>
            <h4 style={{
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-royal)',
              fontSize: '0.84rem',
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              Concierge Coordinates
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: 'rgba(250, 248, 245, 0.75)', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={15} color="var(--color-gold)" />
                <span>1000 Ocean Boulevard, Côte d’Azur Resort Island</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={15} color="var(--color-gold)" />
                <span>+1 (800) 589-8790 • 24/7 Dedicated Line</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={15} color="var(--color-gold)" />
                <span>concierge@luxurystay.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: 'rgba(250, 248, 245, 0.45)',
          fontSize: '0.76rem'
        }}>
          <div>
            © 2026 LUXURYSTAY Palace & Resort Collection. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Hospitality</span>
            <span>Security & Discretion</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

