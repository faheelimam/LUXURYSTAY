import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  BedDouble, 
  AlertCircle,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const HousekeepingDashboard = ({ activeSubTab }) => {
  const [cleaningRooms, setCleaningRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  // Maintenance form
  const [maintForm, setMaintForm] = useState({ roomId: '', description: '' });

  useEffect(() => {
    fetchHousekeepingData();
  }, []);

  const fetchHousekeepingData = async () => {
    try {
      const [cRes, rRes] = await Promise.all([
        axios.get('/api/housekeeping/cleaning-rooms'),
        axios.get('/api/rooms')
      ]);
      setCleaningRooms(cRes.data);
      setAllRooms(rRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCleaned = async (roomId) => {
    try {
      const { data } = await axios.post(`/api/housekeeping/clean/${roomId}`);
      setMsg(data.message);
      fetchHousekeepingData();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleReportMaintenance = async (e) => {
    e.preventDefault();
    if (!maintForm.roomId || !maintForm.description) return;
    try {
      await axios.post('/api/housekeeping/maintenance', maintForm);
      setMsg('Maintenance reported! Room flagged for repair.');
      setMaintForm({ roomId: '', description: '' });
      fetchHousekeepingData();
    } catch (err) {
      setMsg('Failed to submit maintenance request');
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1350px', margin: '0 auto' }}>
      {/* HOUSEKEEPING HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0C10 0%, #1A1D24 100%)',
        color: '#FFFFFF',
        padding: '2rem 2.5rem',
        borderRadius: '16px',
        border: '1px solid var(--color-gold-border)',
        boxShadow: 'var(--shadow-luxury)',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(197, 168, 128, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--color-gold)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              HOUSEKEEPING & SANITIZATION BOARD
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>WHITE-GLOVE TURNOVER</span>
          </div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.4rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Sanitization & Maintenance Queue
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.5 }}>
            Transition checked-out suites into pristine, five-star accommodations with one-click verification.
          </div>
        </div>

        <div style={{ textAlign: 'right', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-royal)', lineHeight: 1 }}>
              {cleaningRooms.length}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
              Pending Turnovers
            </div>
          </div>
          <button
            onClick={fetchHousekeepingData}
            className="btn-gold-outline"
            style={{ padding: '0.6rem 1rem', fontSize: '0.78rem' }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {msg && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#166534',
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} color="#166534" />
          {msg}
        </div>
      )}

      {/* SUBTAB: CLEANING TASKS */}
      {(activeSubTab === 'cleaning' || !activeSubTab) && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles color="var(--color-gold)" size={20} /> Active Sanitization & Inspection Queue
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
                Accommodations scheduled for deep linen refreshment, luxury amenities restock, and ozone sanitization
              </p>
            </div>
          </div>

          {cleaningRooms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 2rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', color: '#166534' }}>
              <ShieldCheck size={40} style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ margin: '0 0 0.3rem', fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>
                All Luxury Suites Sanitized & Verified
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                Zero suites currently pending cleaning. The entire property is staged for guest arrival.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {cleaningRooms.map((rm) => (
                <div
                  key={rm._id}
                  style={{
                    padding: '1.75rem',
                    borderRadius: '12px',
                    border: rm.status === 'CLEANING' ? '1.5px solid var(--color-gold)' : '1.5px solid #f87171',
                    backgroundColor: rm.status === 'CLEANING' ? 'var(--color-gold-light)' : '#fef2f2',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.35rem', margin: 0, fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
                        Suite {rm.roomNumber}
                      </h4>
                      {rm.status === 'CLEANING' ? (
                        <span className="badge-cleaning">CLEANING</span>
                      ) : (
                        <span className="badge-maintenance">MAINTENANCE</span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.2rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-obsidian)' }}>{rm.roomType}</span> • Floor {rm.floor}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.6rem', lineHeight: 1.5 }}>
                      Full linen replacement, marble polish, luxury bathroom amenities restock, and minibar inventory replenishment.
                    </div>

                    {rm.status === 'MAINTENANCE' && (
                      <div style={{ fontSize: '0.82rem', color: '#991b1b', marginTop: '0.6rem', fontWeight: 600, padding: '0.5rem', background: '#fff', borderRadius: '6px' }}>
                        Defect: {rm.maintenanceNote}
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    {rm.status === 'CLEANING' && (
                      <button
                        onClick={() => handleMarkCleaned(rm._id)}
                        className="btn-gold"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.65rem' }}
                      >
                        <CheckCircle2 size={16} /> VERIFY CLEANED & AVAILABLE
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: ALL ROOMS OVERVIEW */}
      {activeSubTab === 'rooms' && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Complete Accommodation Inventory Telemetry
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Master overview of all suites across the property
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {allRooms.map((rm) => (
              <div
                key={rm._id}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: rm.status === 'CLEANING' ? '1.5px solid var(--color-gold)' : '1px solid var(--color-gold-border)',
                  background: rm.status === 'CLEANING' ? 'var(--color-gold-light)' : '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
                      Suite {rm.roomNumber}
                    </strong>
                    {rm.status === 'AVAILABLE' ? (
                      <span className="badge-available">AVAILABLE</span>
                    ) : rm.status === 'OCCUPIED' ? (
                      <span className="badge-occupied">OCCUPIED</span>
                    ) : rm.status === 'CLEANING' ? (
                      <span className="badge-cleaning">CLEANING</span>
                    ) : (
                      <span className="badge-maintenance">MAINTENANCE</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{rm.roomType} • Floor {rm.floor}</div>
                </div>

                {rm.status === 'CLEANING' && (
                  <button
                    onClick={() => handleMarkCleaned(rm._id)}
                    className="btn-gold"
                    style={{ fontSize: '0.72rem', padding: '0.45rem', marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={13} /> Mark Cleaned
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB: MAINTENANCE REPORT */}
      {activeSubTab === 'maintenance' && (
        <div className="card-luxury" style={{ padding: '2.25rem', maxWidth: '650px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Wrench size={20} color="var(--color-obsidian)" /> Report Suite Defect or Repair Need
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Discovered during turnover inspection? Flag to Engineering immediately.
            </p>
          </div>

          <form onSubmit={handleReportMaintenance} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-obsidian)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Select Suite
              </label>
              <select
                value={maintForm.roomId}
                onChange={(e) => setMaintForm({ ...maintForm, roomId: e.target.value })}
                required
                className="input-luxury"
                style={{ cursor: 'pointer' }}
              >
                <option value="">-- Choose Suite --</option>
                {allRooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    Suite {r.roomNumber} ({r.roomType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-obsidian)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Incident Description & Defect Details
              </label>
              <textarea
                value={maintForm.description}
                onChange={(e) => setMaintForm({ ...maintForm, description: e.target.value })}
                required
                rows="4"
                placeholder="Detail technical problem encountered during turnover..."
                className="input-luxury"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '0.8rem', marginTop: '0.5rem' }}>
              <AlertCircle size={16} /> FLAG SUITE FOR ENGINEERING REPAIR
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
