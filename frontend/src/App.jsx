import React, { useState, useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { PublicHome } from './views/PublicHome';
import { GuestDashboard } from './views/GuestDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { ManagerDashboard } from './views/ManagerDashboard';
import { ReceptionistDashboard } from './views/ReceptionistDashboard';
import { HousekeepingDashboard } from './views/HousekeepingDashboard';

const MainContent = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'dashboard'
  const [activeSubTab, setActiveSubTab] = useState('staff'); // sidebar subtab
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedRoomToBook, setSelectedRoomToBook] = useState(null);

  const handleOpenAuth = (mode) => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  const handleSelectRoomForBooking = (room) => {
    setSelectedRoomToBook(room);
    setActiveTab('dashboard');
    setActiveSubTab('my-stay');
  };

  // Helper default subtabs per role
  const getDefaultSubTab = (role) => {
    switch (role) {
      case 'admin': return 'staff';
      case 'manager': return 'analytics';
      case 'receptionist': return 'desk';
      case 'housekeeping': return 'cleaning';
      default: return 'my-stay';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onOpenAuth={handleOpenAuth}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (user) setActiveSubTab(getDefaultSubTab(user.role));
        }}
      />

      {activeTab === 'home' ? (
        <PublicHome
          onOpenAuth={handleOpenAuth}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />
      ) : (
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar
            role={user ? user.role : 'guest'}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />

          <main style={{ flexGrow: 1, backgroundColor: 'var(--color-cream-bg)', overflowY: 'auto' }}>
            {user?.role === 'admin' && <AdminDashboard activeSubTab={activeSubTab} />}
            {user?.role === 'manager' && <ManagerDashboard activeSubTab={activeSubTab} />}
            {user?.role === 'receptionist' && <ReceptionistDashboard activeSubTab={activeSubTab} />}
            {user?.role === 'housekeeping' && <HousekeepingDashboard activeSubTab={activeSubTab} />}
            {user?.role === 'guest' && (
              <GuestDashboard
                activeSubTab={activeSubTab}
                selectedRoomToBook={selectedRoomToBook}
                setSelectedRoomToBook={setSelectedRoomToBook}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={handleCloseAuth}
        initialMode={authModal.mode}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
