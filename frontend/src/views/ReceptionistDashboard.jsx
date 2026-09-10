import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  BedDouble, 
  CalendarCheck, 
  LogOut, 
  LogIn, 
  Receipt, 
  Printer, 
  Wrench, 
  Search,
  CheckCircle2,
  Crown,
  AlertTriangle,
  X
} from 'lucide-react';

export const ReceptionistDashboard = ({ activeSubTab }) => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [msg, setMsg] = useState('');

  // Maintenance reporting state
  const [maintData, setMaintData] = useState({ roomId: '', description: '' });

  useEffect(() => {
    fetchReceptionData();
  }, []);

  const fetchReceptionData = async () => {
    try {
      const [bRes, rRes] = await Promise.all([
        axios.get('/api/bookings'),
        axios.get('/api/rooms')
      ]);
      setBookings(bRes.data);
      setRooms(rRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      const { data } = await axios.post(`/api/bookings/${bookingId}/checkin`);
      setMsg(data.message);
      fetchReceptionData();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Check-In failed');
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      const { data } = await axios.post(`/api/bookings/${bookingId}/checkout`);
      setMsg(data.message);
      setSelectedInvoice(data.bill);
      fetchReceptionData();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Check-Out failed');
    }
  };

  const handleReportMaintenance = async (e) => {
    e.preventDefault();
    if (!maintData.roomId || !maintData.description) return;

    try {
      await axios.post('/api/housekeeping/maintenance', maintData);
      setMsg('Maintenance issue reported. Room set to MAINTENANCE status.');
      setMaintData({ roomId: '', description: '' });
      fetchReceptionData();
    } catch (err) {
      setMsg('Failed to report maintenance issue');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    const guestName = b.guestId?.name?.toLowerCase() || '';
    const roomNo = b.roomId?.roomNumber || '';
    const bNo = b.bookingNumber?.toLowerCase() || '';
    return guestName.includes(q) || roomNo.includes(q) || bNo.includes(q);
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CHECKED_IN':
        return <span className="badge-available">CHECKED-IN</span>;
      case 'CHECKED_OUT':
        return <span className="badge-occupied">CHECKED-OUT</span>;
      case 'CONFIRMED':
        return <span className="badge-gold">CONFIRMED</span>;
      case 'CANCELLED':
        return <span className="badge-maintenance">CANCELLED</span>;
      default:
        return <span className="badge-black">{status}</span>;
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1350px', margin: '0 auto' }}>
      {/* RECEPTIONIST QUICK DESK BANNER */}
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
              FRONT DESK & CONCIERGE OPERATIONS
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>DIRECT DISPATCH</span>
          </div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.4rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Guest Arrivals & Departures Console
          </h2>
          <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.5 }}>
            Execute seamless VIP check-ins, departures, folio settlement, and on-demand maintenance dispatches.
          </div>
        </div>

        {/* SEARCH BAR */}
        <div style={{ position: 'relative', width: '320px', zIndex: 1 }}>
          <Search size={16} color="var(--color-gold)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search Guest, Room #, or Folio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: '50px',
              border: '1px solid var(--color-gold-border)',
              backgroundColor: 'rgba(10, 12, 16, 0.7)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s ease'
            }}
          />
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

      {/* PRINTABLE INVOICE MODAL */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', backgroundColor: '#FFFFFF', padding: 0, overflow: 'hidden' }}>
            {/* INVOICE HEADER */}
            <div style={{
              background: 'linear-gradient(135deg, #0A0C10 0%, #1A1D24 100%)',
              padding: '2rem 2.5rem',
              color: '#FFFFFF',
              borderBottom: '2px solid var(--color-gold-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <Crown size={16} color="var(--color-gold)" />
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 700 }}>
                    THE GRAND IMPERIAL PALACE
                  </span>
                </div>
                <h3 style={{ color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                  Official Check-Out Folio
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>
                  Invoice Ref: #{selectedInvoice.invoiceNumber}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button onClick={() => window.print()} className="btn-gold" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                  <Printer size={14} /> Print Folio
                </button>
                <button onClick={() => setSelectedInvoice(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.4rem' }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* INVOICE BODY */}
            <div style={{ padding: '2.5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.25rem',
                background: 'var(--color-ivory)',
                borderRadius: '10px',
                border: '1px solid var(--color-gold-border)',
                fontSize: '0.88rem'
              }}>
                <div>
                  <div style={{ color: '#777', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Accommodations</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-obsidian)', fontSize: '1.05rem', marginTop: '0.2rem' }}>
                    ${selectedInvoice.roomCharges}
                  </div>
                  <div style={{ marginTop: '0.8rem', color: '#777', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In-Suite Dining & Services</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-obsidian)', fontSize: '1.05rem', marginTop: '0.2rem' }}>
                    ${selectedInvoice.serviceCharges}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#777', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resort Tax & Levies (10%)</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-obsidian)', fontSize: '1.05rem', marginTop: '0.2rem' }}>
                    ${selectedInvoice.taxAmount}
                  </div>
                  <div style={{ marginTop: '0.8rem', color: '#777', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Folio Settlement</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-royal)', marginTop: '0.2rem' }}>
                    ${selectedInvoice.totalAmount}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: '#777', textTransform: 'uppercase' }}>
                Itemized Summary of Charges
              </div>

              <div style={{ border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#fafafa', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem 1rem', color: '#666', fontWeight: 600 }}>Item Description</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#666', fontWeight: 600 }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items && selectedInvoice.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--color-obsidian)' }}>{item.description}</td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-obsidian)' }}>${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#888', fontStyle: 'italic' }}>
                  Settled upon checkout • Authorized signature on file
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="btn-luxury" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
                  Close Folio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: FRONT DESK OVERVIEW / CHECKIN / CHECKOUT */}
      {(activeSubTab === 'desk' || activeSubTab === 'checkin' || activeSubTab === 'checkout' || !activeSubTab) && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Guest Bookings & Desk Dispatch Control
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Real-time guest manifest, automated key check-in, and departure settlement
            </p>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid var(--color-gold-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-gold)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Booking #</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Distinguished Guest</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Suite Allocation</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Stay Itinerary</th>
                  <th style={{ padding: '1rem 1.25rem', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right', letterSpacing: '0.08em', fontSize: '0.75rem', textTransform: 'uppercase' }}>Concierge Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '3rem 1rem', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                      No guest reservations found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b._id} style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#FFFFFF', transition: 'background-color 0.2s ease' }}>
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>
                        {b.bookingNumber}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <strong style={{ color: 'var(--color-obsidian)' }}>{b.guestId?.name || 'Distinguished Guest'}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#777' }}>{b.guestId?.email}</div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-obsidian)' }}>Suite {b.roomId?.roomNumber || 'Unassigned'}</span>
                        <div style={{ fontSize: '0.75rem', color: '#777' }}>{b.roomId?.roomType}</div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#444' }}>
                        {new Date(b.checkInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} → {new Date(b.checkOutDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {getStatusBadge(b.status)}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        {b.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleCheckIn(b._id)}
                            className="btn-gold"
                            style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}
                          >
                            <LogIn size={13} /> CHECK-IN
                          </button>
                        )}
                        {b.status === 'CHECKED_IN' && (
                          <button
                            onClick={() => handleCheckOut(b._id)}
                            className="btn-luxury"
                            style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}
                          >
                            <LogOut size={13} /> CHECK-OUT & BILL
                          </button>
                        )}
                        {b.status === 'CHECKED_OUT' && (
                          <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={14} /> Settled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB: ROOM AVAILABILITY */}
      {activeSubTab === 'rooms' && (
        <div className="card-luxury" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Live Suite Availability Matrix
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Real-time occupancy status across all property accommodations
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {rooms.map((rm) => (
              <div
                key={rm._id}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-gold-border)',
                  background: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-royal)', color: 'var(--color-obsidian)' }}>
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
                  <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.2rem' }}>
                    {rm.roomType} • Floor {rm.floor}
                  </div>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#777', textTransform: 'uppercase' }}>Daily Rate</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-royal)' }}>
                    ${rm.pricePerNight} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#777' }}>/ night</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB: MAINTENANCE */}
      {activeSubTab === 'maintenance' && (
        <div className="card-luxury" style={{ padding: '2.25rem', maxWidth: '650px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: 0, color: 'var(--color-obsidian)' }}>
              Report Suite Maintenance Ticket
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#777' }}>
              Flag engineering or facilities defects directly to the operations management queue
            </p>
          </div>

          <form onSubmit={handleReportMaintenance} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-obsidian)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Select Suite
              </label>
              <select
                value={maintData.roomId}
                onChange={(e) => setMaintData({ ...maintData, roomId: e.target.value })}
                required
                className="input-luxury"
                style={{ cursor: 'pointer' }}
              >
                <option value="">-- Choose Suite --</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    Suite {r.roomNumber} ({r.roomType}) — Status: {r.status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-obsidian)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Incident Description & Defect Details
              </label>
              <textarea
                value={maintData.description}
                onChange={(e) => setMaintData({ ...maintData, description: e.target.value })}
                required
                rows="4"
                placeholder="Detail technical defect (e.g. Climate control calibration, plumbing, lighting fixtures)..."
                className="input-luxury"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '0.8rem', marginTop: '0.5rem' }}>
              <Wrench size={16} /> DISPATCH ENGINEERING TICKET
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
