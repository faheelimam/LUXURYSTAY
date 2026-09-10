import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart3, 
  BedDouble, 
  CalendarCheck, 
  Wrench, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Star, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign 
} from 'lucide-react';

export const ManagerDashboard = ({ activeSubTab }) => {
  const [analytics, setAnalytics] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [cleaningRooms, setCleaningRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchManagerData();
  }, []);

  const fetchManagerData = async () => {
    try {
      const [aRes, rRes, fRes, bRes, cRes] = await Promise.all([
        axios.get('/api/admin/analytics'),
        axios.get('/api/rooms'),
        axios.get('/api/feedback'),
        axios.get('/api/bookings'),
        axios.get('/api/housekeeping/cleaning-rooms')
      ]);
      setAnalytics(aRes.data);
      setRooms(rRes.data);
      setFeedbacks(fRes.data);
      setBookings(bRes.data);
      setCleaningRooms(cRes.data);
    } catch (err) {
      console.error('Error fetching manager data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveMaintenance = async (roomId) => {
    try {
      await axios.post(`/api/housekeeping/resolve-maintenance/${roomId}`);
      setMsg('Maintenance issue resolved. Sent to Cleaning Queue.');
      fetchManagerData();
    } catch (err) {
      setMsg('Failed to resolve maintenance issue');
    }
  };

  const handleUpdateRoomStatus = async (roomId, newStatus) => {
    try {
      await axios.patch(`/api/rooms/${roomId}/status`, { status: newStatus });
      setMsg(`Room status updated to ${newStatus}`);
      fetchManagerData();
    } catch (err) {
      setMsg('Failed to update room status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return <span className="badge-available">AVAILABLE</span>;
      case 'OCCUPIED':
        return <span className="badge-occupied">OCCUPIED</span>;
      case 'CLEANING':
        return <span className="badge-cleaning">CLEANING</span>;
      case 'MAINTENANCE':
        return <span className="badge-maintenance">MAINTENANCE</span>;
      default:
        return <span className="badge-black">{status}</span>;
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1350px', margin: '0 auto' }}>
      {/* EXECUTIVE HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0C10 0%, #171A21 100%)',
        border: '1px solid var(--color-gold-border)',
        borderRadius: '16px',
        padding: '2rem 2.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-luxury)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
              EXECUTIVE OPERATIONS COMMAND
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>HOTEL OPERATIONS SUITE</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontSize: '2rem', margin: '0 0 0.4rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
            General Management Console
          </h2>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', maxWidth: '550px', lineHeight: 1.5 }}>
            Real-time telemetry across guest accommodations, turnover logistics, occupancy analytics, and revenue yield.
          </p>
        </div>

        <button
          onClick={fetchManagerData}
          className="btn-gold-outline"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            fontSize: '0.8rem',
            letterSpacing: '0.08em'
          }}
        >
          <RefreshCw size={14} /> REFRESH TELEMETRY
        </button>
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
          <CheckCircle size={18} color="#166534" />
          {msg}
        </div>
      )}

      {/* MANAGER KPI SUMMARY CARDS */}
      {analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="card-luxury" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-gold)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
                Occupancy Rate
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197,168,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <BedDouble size={16} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)', lineHeight: 1 }}>
              {analytics.rooms.occupancyRate}%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.6rem' }}>
              <strong style={{ color: 'var(--color-obsidian)' }}>{analytics.rooms.occupied}</strong> of {analytics.rooms.total} Suites Occupied
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-gold)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
                Gross Hotel Revenue
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197,168,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <DollarSign size={16} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-royal)', color: 'var(--color-gold)', lineHeight: 1 }}>
              ${analytics.financials?.totalRevenue ? Number(analytics.financials.totalRevenue).toLocaleString() : 0}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.6rem' }}>
              <strong style={{ color: '#047857' }}>${Number(analytics.financials?.totalRevenue || 0).toLocaleString()}</strong> Collected • <strong style={{ color: 'var(--color-gold)' }}>${Number(analytics.financials?.pendingReceivables || 0).toLocaleString()}</strong> Pending
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#3b2042' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
                Sanitization Queue
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(88,28,135,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b21a8' }}>
                <Sparkles size={16} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-royal)', color: '#4a154b', lineHeight: 1 }}>
              {analytics.rooms.cleaning}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.6rem' }}>
              Awaiting Housekeeping Turnover
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#b91c1c' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
                Engineering Tickets
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(185,28,28,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b91c1c' }}>
                <Wrench size={16} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, fontFamily: 'var(--font-royal)', color: '#991b1b', lineHeight: 1 }}>
              {analytics.rooms.maintenance}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.6rem' }}>
              Suites Requiring Service
            </div>
          </div>
        </div>
      )}

      {/* REVENUE & PAYMENT CALCULATION STREAMS BREAKDOWN */}
      {analytics && analytics.financials && (
        <div className="card-luxury" style={{ padding: '2rem 2.25rem', marginBottom: '2.5rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <DollarSign size={16} color="var(--color-gold)" />
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                  FINANCIAL PERFORMANCE & REVENUE CALCULATION
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
                Real-Time Yield & Payment Telemetry
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="badge-available" style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}>
                {analytics.financials.paidCount || 0} Cash Transactions
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-gold-border)' }}>
              <div style={{ fontSize: '0.72rem', color: '#777', textTransform: 'uppercase', fontWeight: 600 }}>Suite Accommodations</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-obsidian)', fontFamily: 'var(--font-royal)', marginTop: '0.3rem' }}>
                ${Number(analytics.financials.roomRevenue || 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>Paid Room Charges</div>
            </div>

            <div style={{ background: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-gold-border)' }}>
              <div style={{ fontSize: '0.72rem', color: '#777', textTransform: 'uppercase', fontWeight: 600 }}>In-Suite Dining & Services</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-obsidian)', fontFamily: 'var(--font-royal)', marginTop: '0.3rem' }}>
                ${Number(analytics.financials.serviceRevenue || 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>Room Service Orders</div>
            </div>

            <div style={{ background: 'var(--color-ivory)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-gold-border)' }}>
              <div style={{ fontSize: '0.72rem', color: '#777', textTransform: 'uppercase', fontWeight: 600 }}>Hotel Taxes (10%)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-obsidian)', fontFamily: 'var(--font-royal)', marginTop: '0.3rem' }}>
                ${Number(analytics.financials.taxCollected || 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>10% Taxes Collected</div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', padding: '1.25rem', borderRadius: '10px', border: '2px solid #047857' }}>
              <div style={{ fontSize: '0.72rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700 }}>💵 Total Cash Counter Revenue</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-royal)', marginTop: '0.3rem' }}>
                ${Number(analytics.financials.totalRevenue || 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
                {analytics.financials.paidCount || 0} Cash Payments at Counter
              </div>
            </div>
          </div>

          {/* RECENT SETTLED TRANSACTIONS TABLE */}
          {analytics.financials.recentTransactions && analytics.financials.recentTransactions.length > 0 && (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-obsidian)', marginBottom: '0.75rem' }}>
                Recent Folio Settlements & Transactions
              </div>
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-obsidian)', color: 'var(--color-gold)', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Invoice #</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Guest</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Suite</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Room Fee</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Dining</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Tax</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Total Paid</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Method</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.financials.recentTransactions.map((tx) => (
                      <tr key={tx._id} style={{ borderBottom: '1px solid #f5f5f5', backgroundColor: '#FFFFFF' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>{tx.invoiceNumber}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <strong>{tx.guestName}</strong>
                          <div style={{ fontSize: '0.7rem', color: '#888' }}>{tx.guestEmail}</div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>Suite {tx.roomNumber}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>${tx.roomCharges}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>${tx.serviceCharges}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>${tx.taxAmount}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--color-gold)', fontSize: '0.9rem' }}>${tx.totalAmount}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{ fontSize: '0.72rem', background: '#e6f4ea', color: '#137333', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 700 }}>
                            CASH
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#666' }}>
                          {new Date(tx.paidAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className="badge-available">PAID</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: ROOMS & OCCUPANCY OR OVERVIEW */}
      {(activeSubTab === 'analytics' || activeSubTab === 'rooms' || !activeSubTab) && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
                Live Suite Operational Matrix
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
                Direct status overrides and operational telemetry for all property accommodations
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge-available">AVAILABLE ({rooms.filter(r => r.status === 'AVAILABLE').length})</span>
              <span className="badge-occupied">OCCUPIED ({rooms.filter(r => r.status === 'OCCUPIED').length})</span>
              <span className="badge-cleaning">CLEANING ({rooms.filter(r => r.status === 'CLEANING').length})</span>
              <span className="badge-maintenance">MAINTENANCE ({rooms.filter(r => r.status === 'MAINTENANCE').length})</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {rooms.map((rm) => {
              const isMaintenance = rm.status === 'MAINTENANCE';
              const isCleaning = rm.status === 'CLEANING';
              const isOccupied = rm.status === 'OCCUPIED';

              return (
                <div
                  key={rm._id}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: isMaintenance 
                      ? '1.5px solid #f87171' 
                      : isCleaning 
                      ? '1.5px solid var(--color-gold)' 
                      : isOccupied 
                      ? '1px solid #d1d5db' 
                      : '1px solid var(--color-gold-border)',
                    backgroundColor: isMaintenance 
                      ? '#fef2f2' 
                      : isCleaning 
                      ? 'var(--color-gold-light)' 
                      : isOccupied 
                      ? '#fafafa' 
                      : '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
                        Suite {rm.roomNumber}
                      </strong>
                      <select
                        value={rm.status}
                        onChange={(e) => handleUpdateRoomStatus(rm._id, e.target.value)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '50px',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          letterSpacing: '0.05em',
                          backgroundColor: 'var(--color-obsidian)',
                          color: 'var(--color-gold)',
                          border: '1px solid var(--color-gold-border)',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="OCCUPIED">OCCUPIED</option>
                        <option value="CLEANING">CLEANING</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                      </select>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.2rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-obsidian)' }}>{rm.roomType}</span> • Floor {rm.floor}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-hover)', fontWeight: 700, marginTop: '0.4rem' }}>
                      ${rm.pricePerNight} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#777' }}>/ night</span>
                    </div>

                    {isMaintenance && (
                      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fff', borderRadius: '8px', border: '1px dashed #fca5a5' }}>
                        <div style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertTriangle size={14} /> {rm.maintenanceNote || 'Defect reported'}
                        </div>
                        <button
                          onClick={() => handleResolveMaintenance(rm._id)}
                          className="btn-gold"
                          style={{ fontSize: '0.72rem', padding: '0.4rem 0.8rem', marginTop: '0.6rem', width: '100%', justifyContent: 'center' }}
                        >
                          <CheckCircle size={13} /> Mark Repaired
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB: BOOKINGS & GUESTS */}
      {activeSubTab === 'bookings' && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Master Bookings & Guest Ledger
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Historical and active reservations across all property suites
            </p>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid var(--color-gold-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-gold)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Folio #</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Distinguished Guest</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Suite Allocation</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Stay Itinerary</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Settlement</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#FFFFFF', transition: 'background-color 0.2s ease' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-obsidian)', fontFamily: 'var(--font-body)' }}>
                      {b.bookingNumber}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <strong style={{ color: 'var(--color-obsidian)' }}>{b.guestId?.name || 'Distinguished Guest'}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#777' }}>{b.guestId?.email}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-obsidian)' }}>Suite {b.roomId?.roomNumber || 'N/A'}</span>
                      <div style={{ fontSize: '0.75rem', color: '#777' }}>{b.roomId?.roomType}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#444' }}>
                      {new Date(b.checkInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} → {new Date(b.checkOutDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-gold)', fontSize: '0.95rem' }}>
                      ${b.totalAmount}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {getStatusBadge(b.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB: HOUSEKEEPING STATUS */}
      {activeSubTab === 'housekeeping' && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Suites Awaiting Housekeeping Sanitization
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Turnaround queue requiring luxury housekeeping inspection and staging
            </p>
          </div>

          {cleaningRooms.length === 0 ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', color: '#166534' }}>
              <ShieldCheck size={36} style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ margin: '0 0 0.3rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>All Suites Sanitized & Inspected</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>The property inventory is currently 100% prepared for guest arrivals.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {cleaningRooms.map((rm) => (
                <div
                  key={rm._id}
                  style={{
                    padding: '1.5rem',
                    background: 'var(--color-gold-light)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-gold-border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
                      Suite {rm.roomNumber}
                    </strong>
                    <span className="badge-cleaning">IN CLEANING</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{rm.roomType} • Floor {rm.floor}</div>
                  <div style={{ fontSize: '0.8rem', color: '#777', marginTop: '0.5rem' }}>Housekeeping staff assigned for full sanitization protocol</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: MAINTENANCE QUEUE */}
      {activeSubTab === 'maintenance' && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Engineering & Maintenance Queue
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Active technical incidents flagged for facilities repair
            </p>
          </div>

          {rooms.filter(r => r.status === 'MAINTENANCE').length === 0 ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', color: '#166534' }}>
              <CheckCircle size={36} style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ margin: '0 0 0.3rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Zero Active Engineering Incidents</h4>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>All suites and fixtures are functioning to five-star standards.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {rooms.filter(r => r.status === 'MAINTENANCE').map((rm) => (
                <div
                  key={rm._id}
                  style={{
                    padding: '1.5rem',
                    background: '#fef2f2',
                    borderRadius: '12px',
                    border: '1px solid #fecaca',
                    borderLeft: '4px solid #b91c1c',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
                        Suite {rm.roomNumber}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>({rm.roomType})</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#991b1b', fontWeight: 600, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertTriangle size={15} /> Defect Details: {rm.maintenanceNote || 'Maintenance flagged by concierge/housekeeping'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleResolveMaintenance(rm._id)}
                    className="btn-gold"
                    style={{ fontSize: '0.78rem', padding: '0.6rem 1.25rem' }}
                  >
                    <CheckCircle size={14} /> MARK REPAIRED & DISPATCH CLEANING
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: GUEST REVIEWS */}
      {activeSubTab === 'feedback' && (
        <div className="card-luxury" style={{ padding: '2.25rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Guest Satisfaction & Accolades
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Unfiltered evaluations submitted by guests following stay settlement
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {feedbacks.length === 0 ? (
              <p style={{ color: '#888', fontStyle: 'italic' }}>No guest feedback submitted yet.</p>
            ) : (
              feedbacks.map((f) => (
                <div
                  key={f._id}
                  style={{
                    padding: '1.5rem',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid var(--color-gold-border)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-obsidian)' }}>{f.guestName || 'Anonymous Guest'}</strong>
                      <div style={{ display: 'flex', gap: '2px', color: 'var(--color-gold)' }}>
                        {[...Array(f.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="var(--color-gold)" strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 1rem' }}>
                      "{f.comment}"
                    </p>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
                    Logged on {new Date(f.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
