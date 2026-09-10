import React from 'react';
import { 
  Users, 
  BedDouble, 
  CalendarCheck, 
  Sparkles, 
  Receipt, 
  BarChart3, 
  Wrench, 
  MessageSquare,
  UserPlus,
  Compass,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react';

export const Sidebar = ({ role, activeSubTab, setActiveSubTab }) => {
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { id: 'staff', label: 'Staff Accounts', icon: UserPlus },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'rooms', label: 'Suite Inventory', icon: BedDouble },
          { id: 'bookings', label: 'All Bookings', icon: CalendarCheck },
          { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 },
          { id: 'feedback', label: 'Guest Feedbacks', icon: MessageSquare }
        ];
      case 'manager':
        return [
          { id: 'analytics', label: 'Manager Overview', icon: BarChart3 },
          { id: 'rooms', label: 'Rooms & Occupancy', icon: BedDouble },
          { id: 'bookings', label: 'Bookings & Guests', icon: CalendarCheck },
          { id: 'housekeeping', label: 'Housekeeping Status', icon: Sparkles },
          { id: 'maintenance', label: 'Maintenance Queue', icon: Wrench },
          { id: 'feedback', label: 'Guest Reviews', icon: MessageSquare }
        ];
      case 'receptionist':
        return [
          { id: 'desk', label: 'Front Desk Overview', icon: CalendarCheck },
          { id: 'rooms', label: 'Room Availability', icon: BedDouble },
          { id: 'checkin', label: 'Check-In Queue', icon: Users },
          { id: 'checkout', label: 'Check-Out & Billing', icon: Receipt },
          { id: 'maintenance', label: 'Report Maintenance', icon: Wrench }
        ];
      case 'housekeeping':
        return [
          { id: 'cleaning', label: 'Sanitization Tasks', icon: Sparkles },
          { id: 'rooms', label: 'All Rooms Overview', icon: BedDouble },
          { id: 'maintenance', label: 'Maintenance Tickets', icon: Wrench }
        ];
      default:
        return [
          { id: 'my-stay', label: 'My Current Stay', icon: BedDouble },
          { id: 'my-bookings', label: 'My Bookings', icon: CalendarCheck },
          { id: 'room-service', label: 'Room Service & Dining', icon: UtensilsCrossed },
          { id: 'feedback', label: 'Give Feedback', icon: MessageSquare }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside style={{
      width: '270px',
      backgroundColor: '#0D0F14',
      borderRight: '1px solid rgba(197, 168, 128, 0.18)',
      minHeight: 'calc(100vh - 70px)',
      padding: '1.75rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      flexShrink: 0
    }}>
      {/* Workspace Role Pill */}
      <div style={{
        padding: '0.65rem 0.95rem',
        marginBottom: '1.25rem',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(197, 168, 128, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          color: 'var(--color-gold)',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-royal)'
        }}>
          {role === 'guest' ? 'Guest Sanctuary' : `${role.toUpperCase()} SUITE`}
        </span>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
        }} />
      </div>

      {/* Nav Item Buttons */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSubTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveSubTab(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: isActive ? '1px solid rgba(197, 168, 128, 0.45)' : '1px solid transparent',
              backgroundColor: isActive ? 'rgba(197, 168, 128, 0.12)' : 'transparent',
              color: isActive ? '#FAF8F5' : 'rgba(250, 248, 245, 0.65)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.84rem',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
            onMouseOver={e => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#FAF8F5';
              }
            }}
            onMouseOut={e => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgba(250, 248, 245, 0.65)';
              }
            }}
          >
            <Icon
              size={17}
              color={isActive ? 'var(--color-gold)' : 'rgba(250, 248, 245, 0.5)'}
              strokeWidth={isActive ? 2 : 1.75}
            />
            <span style={{ flexGrow: 1 }}>{item.label}</span>
            {isActive && (
              <span style={{
                width: '4px',
                height: '14px',
                borderRadius: '2px',
                backgroundColor: 'var(--color-gold)'
              }} />
            )}
          </button>
        );
      })}
    </aside>
  );
};

