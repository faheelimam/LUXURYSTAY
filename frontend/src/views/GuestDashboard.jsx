import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  BedDouble, 
  CheckCircle, 
  Star, 
  UtensilsCrossed, 
  MessageSquare, 
  Crown, 
  X,
  AlertCircle
} from 'lucide-react';

export const GuestDashboard = ({ activeSubTab, selectedRoomToBook, setSelectedRoomToBook }) => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Booking Form state
  const [bookingDates, setBookingDates] = useState({
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    specialRequests: ''
  });

  // Food / Room Service Form state
  const foodMenu = [
    { title: 'Fresh Breakfast Platter & Juice', price: 15, desc: 'Fresh croissants, seasonal fruits, butter, jam, and fresh orange juice.' },
    { title: 'Club Sandwich & French Fries', price: 12, desc: 'Triple-decker grilled sandwich served with crispy potato fries.' },
    { title: 'Classic Margherita Pizza & Drink', price: 18, desc: 'Hand-tossed cheese pizza with tomato sauce and soft drink.' },
    { title: 'Grilled Chicken & Rice Meal', price: 22, desc: 'Tender grilled chicken breast served with savory rice and garden salad.' },
    { title: 'Hot Tea / Coffee & Cookies Set', price: 8, desc: 'Freshly brewed hot tea or coffee with assorted freshly baked cookies.' }
  ];

  const [serviceOrder, setServiceOrder] = useState(foodMenu[0]);

  // Feedback Form state
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/my-bookings');
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!selectedRoomToBook) return;

    try {
      await axios.post('/api/bookings', {
        roomId: selectedRoomToBook._id,
        checkInDate: bookingDates.checkInDate,
        checkOutDate: bookingDates.checkOutDate,
        specialRequests: bookingDates.specialRequests
      });
      setMsg({ type: 'success', text: `Room ${selectedRoomToBook.roomNumber} booked successfully!` });
      setSelectedRoomToBook(null);
      fetchMyBookings();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Booking failed. Please try again.' });
    }
  };

  const handleOrderRoomService = async (checkedInBooking) => {
    if (!checkedInBooking || checkedInBooking.status !== 'CHECKED_IN') {
      setMsg({ type: 'error', text: 'You can only order room service after you have checked in at the counter.' });
      return;
    }

    try {
      const rId = checkedInBooking.roomId?._id || checkedInBooking.roomId;
      const rNum = checkedInBooking.roomId?.roomNumber || 'Room';
      await axios.post('/api/billing/room-service', {
        roomId: rId,
        title: serviceOrder.title,
        price: serviceOrder.price,
        description: serviceOrder.description
      });
      setMsg({ type: 'success', text: `Order placed for "${serviceOrder.title}" ($${serviceOrder.price}) to Room ${rNum}` });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to place room service order' });
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', feedback);
      setMsg({ type: 'success', text: 'Thank you! Your feedback has been submitted successfully.' });
      setFeedback({ rating: 5, comment: '' });
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to submit feedback.' });
    }
  };

  // Find active checked-in booking (strictly CHECKED_IN for services)
  const checkedInBooking = bookings.find(b => b.status === 'CHECKED_IN');
  // Any active stay (CHECKED_IN or CONFIRMED for stay overview)
  const activeStayBooking = bookings.find(b => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED');

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Alert Message Toast */}
      {msg.text && (
        <div style={{
          backgroundColor: msg.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(225, 29, 72, 0.08)',
          color: msg.type === 'success' ? '#047857' : '#BE123C',
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(225, 29, 72, 0.3)'}`,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.9rem'
        }}>
          <span>{msg.type === 'success' ? '✓' : '⚠'} {msg.text}</span>
          <button
            onClick={() => setMsg({ type: '', text: '' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* MODAL FOR BOOKING ROOM */}
      {selectedRoomToBook && (
        <div className="modal-overlay" onClick={() => setSelectedRoomToBook(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{
              backgroundColor: '#0A0C10',
              padding: '1.4rem 1.8rem',
              color: '#FAF8F5',
              borderBottom: '1px solid rgba(197, 168, 128, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  CONFIRM ROOM BOOKING
                </span>
                <h3 style={{ margin: '0.2rem 0 0', fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>
                  Room {selectedRoomToBook.roomNumber} ({selectedRoomToBook.roomType})
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoomToBook(null)}
                style={{ background: 'none', border: 'none', color: '#FAF8F5', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{
                background: '#FAF8F5',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid #EAE5DC',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#656B77' }}>Price per night:</span>
                <strong style={{ color: 'var(--color-gold-dark)' }}>${selectedRoomToBook.pricePerNight} / night</strong>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3A3F4A', marginBottom: '0.35rem' }}>
                  Check-In Date *
                </label>
                <input
                  type="date"
                  value={bookingDates.checkInDate}
                  onChange={(e) => setBookingDates({ ...bookingDates, checkInDate: e.target.value })}
                  className="luxury-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3A3F4A', marginBottom: '0.35rem' }}>
                  Check-Out Date *
                </label>
                <input
                  type="date"
                  value={bookingDates.checkOutDate}
                  onChange={(e) => setBookingDates({ ...bookingDates, checkOutDate: e.target.value })}
                  className="luxury-input"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3A3F4A', marginBottom: '0.35rem' }}>
                  Special Requests (Optional)
                </label>
                <textarea
                  value={bookingDates.specialRequests}
                  onChange={(e) => setBookingDates({ ...bookingDates, specialRequests: e.target.value })}
                  placeholder="Any special notes for your stay (e.g. extra pillows, quiet room)..."
                  rows="3"
                  className="luxury-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gold" style={{ flex: 1, justifyContent: 'center' }}>
                  Confirm Booking
                </button>
                <button type="button" className="btn-outline" onClick={() => setSelectedRoomToBook(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CURRENT STAY OVERVIEW BANNER */}
      {activeStayBooking ? (
        <div style={{
          backgroundColor: '#0D0F14',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          color: '#FAF8F5',
          marginBottom: '2.5rem',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--color-gold)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '0.4rem'
            }}>
              <Crown size={15} /> MY CURRENT STAY
            </div>
            <h2 style={{ fontSize: '1.75rem', margin: '0.2rem 0 0.6rem', color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>
              Room {activeStayBooking.roomId?.roomNumber || 'N/A'} — {activeStayBooking.roomId?.roomType || 'Deluxe Room'}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'rgba(250, 248, 245, 0.85)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <span>📅 {new Date(activeStayBooking.checkInDate).toLocaleDateString()} to {new Date(activeStayBooking.checkOutDate).toLocaleDateString()}</span>
              <span>
                Status: {' '}
                <strong style={{
                  color: activeStayBooking.status === 'CHECKED_IN' ? '#34D399' : 'var(--color-gold)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px'
                }}>
                  {activeStayBooking.status === 'CHECKED_IN' ? 'CHECKED IN' : 'BOOKING CONFIRMED (Awaiting Check-in)'}
                </strong>
              </span>
              <span>Front Desk Support: <strong style={{ color: '#FAF8F5' }}>24/7 Available at Counter</strong></span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '14px',
          marginBottom: '2.5rem',
          border: '1px solid rgba(197, 168, 128, 0.2)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.4rem' }}>
            No Active Stay
          </h3>
          <p style={{ color: '#656B77', fontSize: '0.9rem', margin: 0 }}>
            You do not have an active room booking right now. Visit our main page to book a room.
          </p>
        </div>
      )}

      {/* SUBTAB: MY STAY & BOOKING HISTORY */}
      {(activeSubTab === 'my-bookings' || activeSubTab === 'my-stay' || !activeSubTab) && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: 0, fontSize: '1.6rem' }}>
              My Bookings
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#7A808C' }}>View all your past and upcoming room bookings</span>
          </div>

          {bookings.length === 0 ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAE5DC' }}>
              <BedDouble size={36} color="var(--color-gold)" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p style={{ color: '#7A808C', fontSize: '0.92rem' }}>No bookings found. You can select and book a room anytime.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="card-luxury"
                  style={{
                    padding: '1.5rem 1.8rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-heading)' }}>
                        Booking #{b.bookingNumber}
                      </h4>
                      <span className="badge-gold">
                        {b.status === 'CHECKED_IN' ? 'CHECKED IN' : b.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#656B77' }}>
                      Room {b.roomId?.roomNumber || 'N/A'} • {b.roomId?.roomType || 'Room'} • ({b.totalNights} Night{b.totalNights > 1 ? 's' : ''})
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#8C919D', marginTop: '0.2rem' }}>
                      Dates: {new Date(b.checkInDate).toLocaleDateString()} to {new Date(b.checkOutDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: ROOM SERVICE & DINING */}
      {activeSubTab === 'room-service' && (
        <div>
          <div style={{ marginBottom: '1.8rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: 0, fontSize: '1.6rem' }}>
              Room Service & Dining
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#7A808C' }}>Order fresh food and beverages delivered directly to your room</span>
          </div>

          {!checkedInBooking ? (
            <div style={{
              padding: '2.5rem 2rem',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #F87171',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <AlertCircle size={42} color="#DC2626" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <h3 style={{ color: '#991B1B', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                Room Service Not Available Yet
              </h3>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
                {bookings.some(b => b.status === 'CONFIRMED')
                  ? 'Your booking is confirmed, but you have NOT checked in yet. Please complete check-in at the front desk counter when you arrive to enable room service.'
                  : 'You must be currently checked in to a room to order room service. Please book a room and check in first.'}
              </p>
            </div>
          ) : (
            <div className="card-luxury" style={{ padding: '2.2rem', maxWidth: '700px' }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.85rem 1.25rem',
                borderRadius: '8px',
                color: '#047857',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={18} /> Order for Room {checkedInBooking.roomId?.roomNumber || 'Current'} (Checked In)
              </div>

              <h3 style={{ marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                Select Food or Beverage Item
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                {foodMenu.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setServiceOrder(item)}
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '10px',
                      border: serviceOrder.title === item.title ? '2px solid var(--color-gold)' : '1px solid #EAE5DC',
                      backgroundColor: serviceOrder.title === item.title ? 'rgba(197, 168, 128, 0.08)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#12151C', fontSize: '0.95rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.82rem', color: '#656B77', marginTop: '0.2rem' }}>{item.desc}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--color-gold-dark)', fontSize: '1.15rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleOrderRoomService(checkedInBooking)}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}
              >
                <UtensilsCrossed size={18} /> Place Order to Room {checkedInBooking.roomId?.roomNumber || 'Current'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: FEEDBACK */}
      {activeSubTab === 'feedback' && (
        <div className="card-luxury" style={{ padding: '2.5rem', maxWidth: '680px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', marginBottom: '0.4rem', fontSize: '1.6rem' }}>
            Give Your Feedback
          </h2>
          <p style={{ color: '#656B77', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Please let us know how your stay was and how we can make your experience even better.
          </p>

          <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#3A3F4A', marginBottom: '0.5rem' }}>
                Your Rating
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '2rem',
                      color: star <= feedback.rating ? 'var(--color-gold)' : '#D6D0C5',
                      transition: 'transform 0.2s ease',
                      padding: 0
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#3A3F4A', marginBottom: '0.5rem' }}>
                Your Comments & Feedback
              </label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                required
                rows="4"
                placeholder="Tell us about your room, service, cleanliness, or staff..."
                className="luxury-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}>
              <Star size={16} /> Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
