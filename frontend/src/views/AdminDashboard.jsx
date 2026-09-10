import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  UserPlus, 
  Users, 
  BedDouble, 
  BarChart3, 
  Trash2, 
  CheckCircle,
  Sparkles,
  CalendarCheck,
  MessageSquare,
  Wrench,
  Star,
  Pencil,
  X
} from 'lucide-react';

export const AdminDashboard = ({ activeSubTab }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Create Staff Form state
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist',
    phone: ''
  });

  // Create Room Form state
  const [roomForm, setRoomForm] = useState({
    roomNumber: '',
    roomType: 'Deluxe Ocean View',
    pricePerNight: 500,
    capacity: 2,
    floor: 1,
    description: 'Luxury suite featuring plush furnishings, marble bathroom, and ocean view.',
    amenities: 'Free Wi-Fi, King Bed, Jacuzzi, Ocean View',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit Room Modal state
  const [editRoom, setEditRoom] = useState(null);        // null = modal closed, object = room being edited
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editUploadingImage, setEditUploadingImage] = useState(false);


  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [uRes, rRes, aRes, bRes, fRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/rooms'),
        axios.get('/api/admin/analytics'),
        axios.get('/api/bookings'),
        axios.get('/api/feedback')
      ]);
      setUsers(uRes.data);
      setRooms(rRes.data);
      setAnalytics(aRes.data);
      setBookings(bRes.data);
      setFeedbacks(fRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      const { data } = await axios.post('/api/admin/create-staff', staffForm);
      setMsg({ type: 'success', text: data.message });
      setStaffForm({ name: '', email: '', password: '', role: 'receptionist', phone: '' });
      fetchAdminData();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to create staff account' });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setMsg({ type: 'success', text: 'Account deleted successfully' });
      fetchAdminData();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Delete failed' });
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to remove this room from inventory?')) return;
    try {
      await axios.delete(`/api/rooms/${roomId}`);
      setMsg({ type: 'success', text: 'Room removed successfully' });
      fetchAdminData();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to delete room' });
    }
  };

  // ── Open Edit Modal ──
  const openEditModal = (rm) => {
    setEditRoom({
      _id: rm._id,
      roomNumber: rm.roomNumber,
      roomType: rm.roomType,
      pricePerNight: rm.pricePerNight,
      capacity: rm.capacity,
      floor: rm.floor,
      description: rm.description,
      amenities: Array.isArray(rm.amenities) ? rm.amenities.join(', ') : rm.amenities,
      image: rm.image
    });
    setEditImageFile(null);
    setEditImagePreview(rm.image || '');
  };

  // ── Save Updated Room ──
  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      let imageUrl = editRoom.image;

      // Upload new image to Cloudinary if admin picked a new file
      if (editImageFile) {
        setEditUploadingImage(true);
        try {
          const formData = new FormData();
          formData.append('image', editImageFile);
          const uploadRes = await axios.post('/api/upload/room-image', formData);
          imageUrl = uploadRes.data.imageUrl;
        } catch (uploadErr) {
          setEditUploadingImage(false);
          const msg = uploadErr.response?.data?.message || uploadErr.message || 'Image upload failed';
          setMsg({ type: 'error', text: `⚠ Upload Error: ${msg}` });
          return;
        }
        setEditUploadingImage(false);
      }

      const amenitiesArr = editRoom.amenities.split(',').map((a) => a.trim());
      await axios.put(`/api/rooms/${editRoom._id}`, {
        ...editRoom,
        amenities: amenitiesArr,
        image: imageUrl
      });

      setMsg({ type: 'success', text: `✅ Room ${editRoom.roomNumber} updated successfully!` });
      setEditRoom(null);
      setEditImageFile(null);
      setEditImagePreview('');
      fetchAdminData();
    } catch (err) {
      setEditUploadingImage(false);
      const errMsg = err.response?.data?.message || err.message || 'Failed to update room';
      setMsg({ type: 'error', text: `⚠ Update Error: ${errMsg}` });
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    try {
      let imageUrl = roomForm.image;

      // STEP 1: Upload image to Cloudinary if selected
      if (imageFile) {
        setUploadingImage(true);
        try {
          const formData = new FormData();
          formData.append('image', imageFile);
          const uploadRes = await axios.post('/api/upload/room-image', formData);
          imageUrl = uploadRes.data.imageUrl;
        } catch (uploadErr) {
          setUploadingImage(false);
          const uploadErrMsg = uploadErr.response?.data?.message || uploadErr.message || 'Image upload to Cloudinary failed';
          setMsg({ type: 'error', text: `⚠ Upload Error: ${uploadErrMsg}` });
          return;
        }
        setUploadingImage(false);
      }

      // STEP 2: Create room with Cloudinary image URL
      const amenitiesArr = roomForm.amenities.split(',').map((a) => a.trim());
      await axios.post('/api/rooms', {
        ...roomForm,
        amenities: amenitiesArr,
        image: imageUrl
      });

      setMsg({ type: 'success', text: `✅ Room ${roomForm.roomNumber} created successfully!` });
      setRoomForm({
        roomNumber: '',
        roomType: 'Deluxe Ocean View',
        pricePerNight: 500,
        capacity: 2,
        floor: 1,
        description: 'Luxury suite featuring plush furnishings, marble bathroom, and ocean view.',
        amenities: 'Free Wi-Fi, King Bed, Jacuzzi, Ocean View',
        image: ''
      });
      setImageFile(null);
      setImagePreview('');
      fetchAdminData();
    } catch (err) {
      setUploadingImage(false);
      const errMsg = err.response?.data?.message || err.message || 'Failed to add room';
      setMsg({ type: 'error', text: `⚠ Room Error: ${errMsg}` });
    }
  };


  const handleUpdateRoomStatus = async (roomId, newStatus) => {
    try {
      await axios.patch(`/api/rooms/${roomId}/status`, { status: newStatus });
      setMsg({ type: 'success', text: `Room status updated to ${newStatus}` });
      fetchAdminData();
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update status' });
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1380px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ color: 'var(--color-gold-dark)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Executive Headquarters
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: '0.2rem 0 0', fontSize: '2rem' }}>
            System Administration Portal
          </h1>
        </div>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(197, 168, 128, 0.3)',
          padding: '0.45rem 1rem',
          borderRadius: '50px',
          fontSize: '0.78rem',
          color: '#555A64',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          System Operational • 5-Star Certified
        </div>
      </div>

      {/* Alert Notifications */}
      {msg.text && (
        <div style={{
          backgroundColor: msg.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(225, 29, 72, 0.08)',
          color: msg.type === 'success' ? '#047857' : '#BE123C',
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(225, 29, 72, 0.3)'}`,
          fontWeight: 600,
          fontSize: '0.88rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{msg.type === 'success' ? '✓' : '⚠'} {msg.text}</span>
          <button onClick={() => setMsg({ type: '', text: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700 }}>✕</button>
        </div>
      )}

      {/* EXECUTIVE METRICS SUMMARY CARDS */}
      {analytics && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div className="card-luxury" style={{ padding: '1.6rem', borderTop: '3px solid var(--color-gold)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7A808C', textTransform: 'uppercase', letterSpacing: '1px' }}>Total System Users</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#12151C', fontFamily: 'var(--font-royal)', marginTop: '0.35rem' }}>
              {analytics.users.total}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#656B77', marginTop: '0.2rem' }}>
              Including <strong style={{ color: '#12151C' }}>{analytics.users.staff}</strong> active staff accounts
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.6rem', borderTop: '3px solid #12151C' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7A808C', textTransform: 'uppercase', letterSpacing: '1px' }}>Occupancy Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#12151C', fontFamily: 'var(--font-royal)', marginTop: '0.35rem' }}>
              {analytics.rooms.occupancyRate}%
            </div>
            <div style={{ fontSize: '0.76rem', color: '#656B77', marginTop: '0.2rem' }}>
              <strong style={{ color: '#12151C' }}>{analytics.rooms.occupied}</strong> of {analytics.rooms.total} suites occupied
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.6rem', borderTop: '3px solid #D97706' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7A808C', textTransform: 'uppercase', letterSpacing: '1px' }}>Sanitization Queue</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#B45309', fontFamily: 'var(--font-royal)', marginTop: '0.35rem' }}>
              {analytics.rooms.cleaning} Suites
            </div>
            <div style={{ fontSize: '0.76rem', color: '#656B77', marginTop: '0.2rem' }}>
              Pending Housekeeping release
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '1.6rem', borderTop: '3px solid var(--color-gold-dark)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7A808C', textTransform: 'uppercase', letterSpacing: '1px' }}>Settled Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-dark)', fontFamily: 'var(--font-royal)', marginTop: '0.35rem' }}>
              ${analytics.financials.totalRevenue}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#656B77', marginTop: '0.2rem' }}>
              From settled folio payments
            </div>
          </div>
        </div>
      )}

      {/* TAB: STAFF CREATION */}
      {activeSubTab === 'staff' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(197,168,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserPlus size={20} color="var(--color-gold-dark)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.4rem' }}>Provision Staff Account</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#656B77', marginBottom: '1.6rem', lineHeight: 1.6 }}>
              Administrator credentials required. Create verified official accounts for General Managers, Front Desk Receptionists, and Housekeeping Supervisors.
            </p>

            <form onSubmit={handleCreateStaff} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Staff Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Sophia Vance"
                  value={staffForm.name}
                  onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Official Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="receptionist@luxurystay.com"
                  value={staffForm.email}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Assigned Operational Role *
                </label>
                <select
                  value={staffForm.role}
                  onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                  className="luxury-input"
                  style={{ fontWeight: 600 }}
                >
                  <option value="manager">General Manager (Operations & Strategic Oversight)</option>
                  <option value="receptionist">Front Desk Receptionist (Check-In, Check-Out & Billing)</option>
                  <option value="housekeeping">Housekeeping Supervisor (Sanitization & Room Readiness)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Initial Secure Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={staffForm.password}
                  onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <button type="submit" className="btn-gold" style={{ justifyContent: 'center', marginTop: '0.6rem', padding: '0.82rem' }}>
                Provision Staff Credentials
              </button>
            </form>
          </div>

          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
              Active Staff Directory
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '520px', overflowY: 'auto' }}>
              {users.filter(u => u.role !== 'guest').map(st => (
                <div
                  key={st._id}
                  style={{
                    padding: '1rem 1.25rem',
                    background: '#FAF8F5',
                    borderRadius: '10px',
                    border: '1px solid #EAE5DC',
                    borderLeft: '3.5px solid var(--color-gold)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#12151C', fontSize: '0.92rem' }}>{st.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#656B77' }}>{st.email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span className="badge-gold">{st.role.toUpperCase()}</span>
                    {st.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(st._id)}
                        style={{ background: 'none', border: 'none', color: '#BE123C', cursor: 'pointer', padding: '0.3rem' }}
                        title="Revoke Credentials"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: ROOMS MANAGEMENT */}
      {activeSubTab === 'rooms' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2.5rem', alignItems: 'start' }}>
          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontSize: '1.35rem' }}>
              Add Sanctuary to Inventory
            </h3>
            <form onSubmit={handleCreateRoom} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Suite Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 501"
                  value={roomForm.roomNumber}
                  onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })}
                  className="luxury-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Sanctuary Category *
                </label>
                <select
                  value={roomForm.roomType}
                  onChange={(e) => setRoomForm({ ...roomForm, roomType: e.target.value })}
                  className="luxury-input"
                >
                  <option value="Deluxe Ocean Terrace Suite">Deluxe Ocean Terrace Suite</option>
                  <option value="Executive Garden Jacuzzi Suite">Executive Garden Jacuzzi Suite</option>
                  <option value="Grand Deluxe King Suite">Grand Deluxe King Suite</option>
                  <option value="Azure Horizon Ocean Suite">Azure Horizon Ocean Suite</option>
                  <option value="Presidential Penthouse Suite">Presidential Penthouse Suite</option>
                  <option value="Royal Monarch Suite">Royal Monarch Suite</option>
                  <option value="Imperial Sky Villa">Imperial Sky Villa</option>
                  <option value="Ambassador Diplomatic Suite">Ambassador Diplomatic Suite</option>
                  <option value="Sapphire Overwater Villa">Sapphire Overwater Villa</option>
                  <option value="Celestial Stargazer Suite">Celestial Stargazer Suite</option>
                  <option value="Mediterranean Riviera Suite">Mediterranean Riviera Suite</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                    Price / Night ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={roomForm.pricePerNight}
                    onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: Number(e.target.value) })}
                    className="luxury-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                    Floor Level
                  </label>
                  <input
                    type="number"
                    value={roomForm.floor}
                    onChange={(e) => setRoomForm({ ...roomForm, floor: Number(e.target.value) })}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Capacity field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Guest Capacity
                </label>
                <input
                  type="number"
                  min={1}
                  value={roomForm.capacity}
                  onChange={(e) => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })}
                  className="luxury-input"
                  placeholder="e.g. 2"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Curated Amenities (Comma separated)
                </label>
                <input
                  type="text"
                  value={roomForm.amenities}
                  onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
                  className="luxury-input"
                  placeholder="Free Wi-Fi, King Bed, Jacuzzi, Ocean View"
                />
              </div>

              {/* ── Room Image Upload ── */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  Suite Image (Upload to Cloudinary)
                </label>

                {/* Image preview */}
                {imagePreview && (
                  <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                    <img
                      src={imagePreview}
                      alt="Room preview"
                      style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E0D5C5' }}
                    />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontSize: '0.85rem', lineHeight: '26px', textAlign: 'center' }}
                      title="Remove image"
                    >✕</button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                  style={{ display: 'none' }}
                  id="roomImageInput"
                />
                <label
                  htmlFor="roomImageInput"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#F5F0E8', border: '1.5px dashed #C9A227', borderRadius: '8px', padding: '0.7rem 1rem', color: '#7A6A4A', fontSize: '0.88rem', fontWeight: 500, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EDE5D0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F5F0E8'}
                >
                  📷 {imageFile ? imageFile.name : 'Choose room photo (JPG / PNG / WebP, max 5 MB)'}
                </label>
              </div>

              <button
                type="submit"
                className="btn-gold"
                disabled={uploadingImage}
                style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.82rem', opacity: uploadingImage ? 0.7 : 1 }}
              >
                {uploadingImage ? '⏳ Uploading Image...' : 'Register Suite to Inventory'}
              </button>
            </form>
          </div>

          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontSize: '1.35rem' }}>
              Live Accommodations Inventory
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '560px', overflowY: 'auto' }}>
              {rooms.map((rm) => (
                <div
                  key={rm._id}
                  style={{
                    padding: '1.1rem 1.25rem',
                    background: '#FAF8F5',
                    borderRadius: '10px',
                    border: '1px solid #EAE5DC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#12151C' }}>
                      Suite {rm.roomNumber} — <span style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>{rm.roomType}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#656B77', marginTop: '0.2rem' }}>
                      Floor {rm.floor} • <strong style={{ color: '#12151C' }}>${rm.pricePerNight}</strong> / night • {rm.capacity} Guests
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <select
                      value={rm.status}
                      onChange={(e) => handleUpdateRoomStatus(rm._id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '50px',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        backgroundColor: '#12151C',
                        color: 'var(--color-gold)',
                        border: '1px solid rgba(197, 168, 128, 0.3)',
                        cursor: 'pointer',
                        letterSpacing: '0.5px'
                      }}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="OCCUPIED">OCCUPIED</option>
                      <option value="CLEANING">SANITIZING</option>
                      <option value="MAINTENANCE">UNDER CARE</option>
                    </select>

                    <button
                      onClick={() => openEditModal(rm)}
                      style={{ background: 'none', border: 'none', color: '#C9A227', cursor: 'pointer', padding: '0.3rem' }}
                      title="Edit Suite"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteRoom(rm._id)}
                      style={{ background: 'none', border: 'none', color: '#BE123C', cursor: 'pointer', padding: '0.3rem' }}
                      title="Decommission Suite"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ EDIT ROOM MODAL ══════════════ */}
      {editRoom && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '2.2rem',
            width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)', position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.35rem', color: '#12151C' }}>
                ✏️ Edit Suite — {editRoom.roomNumber}
              </h3>
              <button
                onClick={() => { setEditRoom(null); setEditImageFile(null); setEditImagePreview(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '0.25rem' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateRoom} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Room Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Suite Number</label>
                <input
                  type="text" required className="luxury-input"
                  value={editRoom.roomNumber}
                  onChange={(e) => setEditRoom({ ...editRoom, roomNumber: e.target.value })}
                />
              </div>

              {/* Room Type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Sanctuary Category</label>
                <select className="luxury-input" value={editRoom.roomType} onChange={(e) => setEditRoom({ ...editRoom, roomType: e.target.value })}>
                  <option value="Deluxe Ocean Terrace Suite">Deluxe Ocean Terrace Suite</option>
                  <option value="Executive Garden Jacuzzi Suite">Executive Garden Jacuzzi Suite</option>
                  <option value="Grand Deluxe King Suite">Grand Deluxe King Suite</option>
                  <option value="Azure Horizon Ocean Suite">Azure Horizon Ocean Suite</option>
                  <option value="Presidential Penthouse Suite">Presidential Penthouse Suite</option>
                  <option value="Royal Monarch Suite">Royal Monarch Suite</option>
                  <option value="Imperial Sky Villa">Imperial Sky Villa</option>
                  <option value="Ambassador Diplomatic Suite">Ambassador Diplomatic Suite</option>
                  <option value="Sapphire Overwater Villa">Sapphire Overwater Villa</option>
                  <option value="Celestial Stargazer Suite">Celestial Stargazer Suite</option>
                  <option value="Mediterranean Riviera Suite">Mediterranean Riviera Suite</option>
                </select>
              </div>

              {/* Price & Floor */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Price / Night ($)</label>
                  <input type="number" required className="luxury-input"
                    value={editRoom.pricePerNight}
                    onChange={(e) => setEditRoom({ ...editRoom, pricePerNight: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Floor Level</label>
                  <input type="number" className="luxury-input"
                    value={editRoom.floor}
                    onChange={(e) => setEditRoom({ ...editRoom, floor: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Capacity */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Capacity (Guests)</label>
                <input type="number" className="luxury-input"
                  value={editRoom.capacity}
                  onChange={(e) => setEditRoom({ ...editRoom, capacity: Number(e.target.value) })}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Description</label>
                <textarea className="luxury-input" rows={3} style={{ resize: 'vertical' }}
                  value={editRoom.description}
                  onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
                />
              </div>

              {/* Amenities */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Amenities (comma separated)</label>
                <input type="text" className="luxury-input"
                  value={editRoom.amenities}
                  onChange={(e) => setEditRoom({ ...editRoom, amenities: e.target.value })}
                  placeholder="Free Wi-Fi, King Bed, Jacuzzi"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#3A3F4A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Suite Image</label>

                {/* Current / Preview image */}
                {editImagePreview && (
                  <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                    <img
                      src={editImagePreview} alt="Suite preview"
                      style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E0D5C5' }}
                    />
                    <button type="button"
                      onClick={() => { setEditImageFile(null); setEditImagePreview(''); setEditRoom({ ...editRoom, image: '' }); }}
                      style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontSize: '0.85rem', lineHeight: '26px', textAlign: 'center' }}
                    >✕</button>
                  </div>
                )}

                <input type="file" accept="image/jpeg,image/png,image/webp"
                  id="editRoomImageInput" style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setEditImageFile(file);
                    setEditImagePreview(URL.createObjectURL(file));
                  }}
                />
                <label htmlFor="editRoomImageInput"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#F5F0E8', border: '1.5px dashed #C9A227', borderRadius: '8px', padding: '0.65rem 1rem', color: '#7A6A4A', fontSize: '0.88rem', fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EDE5D0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F5F0E8'}
                >
                  📷 {editImageFile ? editImageFile.name : 'Change room photo (JPG / PNG / WebP)'}
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gold"
                  disabled={editUploadingImage}
                  style={{ flex: 1, justifyContent: 'center', padding: '0.82rem', opacity: editUploadingImage ? 0.7 : 1 }}
                >
                  {editUploadingImage ? '⏳ Uploading...' : '💾 Save Changes'}
                </button>
                <button type="button"
                  onClick={() => { setEditRoom(null); setEditImageFile(null); setEditImagePreview(''); }}
                  style={{ flex: 1, padding: '0.82rem', background: '#F5F0E8', border: '1px solid #DDD5C5', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#555' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB: USER DIRECTORY */}
      {activeSubTab === 'users' && (
        <div className="card-luxury" style={{ padding: '2.2rem', overflowX: 'auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: 0, fontSize: '1.5rem' }}>
              System Accounts & Guest Directory
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#7A808C' }}>Verified roster of guests, managers, and service personnel</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0D0F14', color: 'var(--color-gold)', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Name</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Email Address</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>System Role</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Telephone</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #EFEAE0' }}>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600, color: '#12151C' }}>{u.name}</td>
                  <td style={{ padding: '0.9rem 1.25rem', color: '#656B77' }}>{u.email}</td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span className={u.role === 'admin' ? 'badge-gold' : 'badge-black'}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: '#656B77' }}>{u.phone || '—'}</td>
                  <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(225, 29, 72, 0.3)',
                          color: '#BE123C',
                          cursor: 'pointer',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 600
                        }}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: ALL BOOKINGS */}
      {activeSubTab === 'bookings' && (
        <div className="card-luxury" style={{ padding: '2.2rem', overflowX: 'auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: 0, fontSize: '1.5rem' }}>
              Master Reservations Ledger
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#7A808C' }}>Historical portfolio of all guest reservations and folio statuses</span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0D0F14', color: 'var(--color-gold)', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Booking Ref</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Primary Guest</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Sanctuary</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Stay Duration</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Total Billed</th>
                <th style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-royal)', fontSize: '0.78rem', letterSpacing: '1px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} style={{ borderBottom: '1px solid #EFEAE0' }}>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: '#12151C', fontFamily: 'var(--font-royal)' }}>
                    #{b.bookingNumber}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: '#12151C' }}>{b.guestId?.name || 'Valued Guest'}</div>
                    <div style={{ fontSize: '0.76rem', color: '#7A808C' }}>{b.guestId?.email}</div>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: '#3A3F4A' }}>
                    Suite {b.roomId?.roomNumber} ({b.roomId?.roomType})
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: '#656B77', fontSize: '0.82rem' }}>
                    {new Date(b.checkInDate).toLocaleDateString()} — {new Date(b.checkOutDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)', fontFamily: 'var(--font-royal)', fontSize: '0.95rem' }}>
                    ${b.totalAmount}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span className={b.status === 'CONFIRMED' || b.status === 'CHECKED_IN' ? 'badge-available' : 'badge-occupied'}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: GUEST FEEDBACKS */}
      {activeSubTab === 'feedback' && (
        <div className="card-luxury" style={{ padding: '2.2rem' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#12151C', margin: 0, fontSize: '1.5rem' }}>
              Guest Impressions & Reviews
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#7A808C' }}>Executive monitoring of service standards and guest satisfaction</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {feedbacks.length === 0 ? (
              <p style={{ color: '#7A808C', fontSize: '0.9rem' }}>No impressions recorded in the registry yet.</p>
            ) : (
              feedbacks.map((f) => (
                <div
                  key={f._id}
                  style={{
                    padding: '1.4rem 1.6rem',
                    background: '#FAF8F5',
                    borderRadius: '12px',
                    border: '1px solid #EAE5DC',
                    borderLeft: '4px solid var(--color-gold)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#12151C' }}>{f.guestName}</strong>
                    <div style={{ color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {[...Array(f.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                      ))}
                      <span>({f.rating}/5 Stars)</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#3A3F4A', margin: '0.4rem 0', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{f.comment}"
                  </p>
                  <div style={{ fontSize: '0.74rem', color: '#8C919D', marginTop: '0.5rem' }}>
                    Submitted on {new Date(f.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: SYSTEM ANALYTICS */}
      {activeSubTab === 'analytics' && analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
              Occupancy & Inventory Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Total Master Inventory:</span>
                <strong style={{ color: '#12151C' }}>{analytics.rooms.total} Suites</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Currently Available:</span>
                <strong style={{ color: '#047857' }}>{analytics.rooms.available} Suites</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Occupied Residences:</span>
                <strong style={{ color: '#12151C' }}>{analytics.rooms.occupied} Suites</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Pending Sanitization:</span>
                <strong style={{ color: '#B45309' }}>{analytics.rooms.cleaning} Suites</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: '#656B77' }}>Under Care & Maintenance:</span>
                <strong style={{ color: '#BE123C' }}>{analytics.rooms.maintenance} Suites</strong>
              </div>
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '2.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
              Financial & Operations Performance
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Settled Gross Revenue:</span>
                <strong style={{ color: 'var(--color-gold-dark)', fontFamily: 'var(--font-royal)', fontSize: '1.1rem' }}>${analytics.financials.totalRevenue}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>💵 Cash Counter Revenue:</span>
                <strong style={{ color: '#047857', fontFamily: 'var(--font-royal)', fontSize: '1.05rem' }}>
                  ${Number(analytics.financials.cashRevenue || 0).toLocaleString()}
                  <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#888', marginLeft: '0.4rem' }}>
                    ({analytics.financials.cashPaymentsCount || 0} payments)
                  </span>
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F0EAE1' }}>
                <span style={{ color: '#656B77' }}>Total Lifetime Bookings:</span>
                <strong style={{ color: '#12151C' }}>{analytics.bookings.total}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: '#656B77' }}>Currently Checked-In Guests:</span>
                <strong style={{ color: '#12151C' }}>{analytics.bookings.active} VIP Guests</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

