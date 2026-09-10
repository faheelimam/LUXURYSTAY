const User = require('../models/User');
const Room = require('../models/Room');
const Feedback = require('../models/Feedback');
const Booking = require('../models/Booking');
const Bill = require('../models/Bill');
const ServiceRequest = require('../models/ServiceRequest');
const bcrypt = require('bcryptjs');

const seedInitialData = async () => {
  try {
    // Drop any obsolete/legacy indexes that clash with new schema
    try {
      await User.collection.dropIndex('username_1').catch(() => {});
    } catch (e) {}
    try {
      const Booking = require('../models/Booking');
      await Booking.collection.dropIndex('bookingId_1').catch(() => {});
    } catch (e) {}

    // 1. Seed & Sync Demo Accounts (Admin, Manager, Receptionist, Housekeeping, Guest)
    const initialUsers = [
      {
        name: 'System Admin',
        email: 'admin@luxurystay.com',
        password: 'Admin@123456',
        role: 'admin',
        phone: '+1 800-555-0199'
      },
      {
        name: 'Alexander Sterling (General Manager)',
        email: 'manager@luxurystay.com',
        password: 'Manager@123456',
        role: 'manager',
        phone: '+1 800-555-0188'
      },
      {
        name: 'Elena Rostova (Front Desk Lead)',
        email: 'receptionist@luxurystay.com',
        password: 'Reception@123456',
        role: 'receptionist',
        phone: '+1 800-555-0177'
      },
      {
        name: 'Maria Santos (Housekeeping Supervisor)',
        email: 'housekeeping@luxurystay.com',
        password: 'Clean@123456',
        role: 'housekeeping',
        phone: '+1 800-555-0166'
      },
      {
        name: 'Lord Arthur Pendelton',
        email: 'guest@luxurystay.com',
        password: 'Guest@123456',
        role: 'guest',
        phone: '+1 800-555-0155'
      }
    ];

    for (const u of initialUsers) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        await User.create(u);
        console.log(`[Seed]: Created default user ${u.email} (${u.role})`);
      } else {
        // Ensure role and password match demo credentials
        existing.role = u.role;
        existing.password = u.password;
        await existing.save(); // triggers pre('save') bcrypt hash
        console.log(`[Seed]: Synced demo credentials for ${u.email} (${u.role})`);
      }
    }

    // 2. Seed & Sync Luxury Suites Inventory
    const luxurySuites = [
      {
        roomNumber: '101',
        roomType: 'Deluxe Ocean Terrace Suite',
        pricePerNight: 350,
        capacity: 2,
        floor: 1,
        description: 'Private beachfront terrace with direct garden path, plush king-size bed, and Carrara marble bathroom with rainfall shower.',
        amenities: ['Ocean Balcony', 'King Bed', 'Rainfall Shower', 'Nespresso Coffee', 'High-Speed Wi-Fi'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '102',
        roomType: 'Executive Garden Jacuzzi Suite',
        pricePerNight: 420,
        capacity: 2,
        floor: 1,
        description: 'Serene ground-floor sanctuary featuring a secluded botanical patio with private outdoor heated jacuzzi and lounge daybeds.',
        amenities: ['Private Jacuzzi', 'Botanical Patio', 'Smart Room Controls', 'Mini Bar', 'Pillow Menu'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        status: 'OCCUPIED'
      },
      {
        roomNumber: '201',
        roomType: 'Grand Deluxe King Suite',
        pricePerNight: 480,
        capacity: 2,
        floor: 2,
        description: 'Expansive second-floor master suite with sunset panoramas, bespoke walnut furnishings, and freestanding deep soaking tub.',
        amenities: ['Sunset Panorama', 'Freestanding Soaking Tub', 'King Master Bed', 'Walk-In Wardrobe', 'Wi-Fi'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '202',
        roomType: 'Azure Horizon Ocean Suite',
        pricePerNight: 540,
        capacity: 3,
        floor: 2,
        description: 'Floor-to-ceiling panoramic glass windows offering 180-degree endless ocean horizons, dual vanities, and wine humidor.',
        amenities: ['180° Ocean View', 'Wine Humidor', 'Dual Marble Vanities', 'Bose Sound System', 'Wi-Fi'],
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
        status: 'CLEANING'
      },
      {
        roomNumber: '301',
        roomType: 'Presidential Penthouse Suite',
        pricePerNight: 980,
        capacity: 4,
        floor: 3,
        description: 'The pinnacle of bespoke luxury. Spanning the entire east penthouse wing with private infinity plunge pool and dedicated 24/7 butler service.',
        amenities: ['24/7 Private Butler', 'Infinity Plunge Pool', 'Chef Kitchenette', 'Helipad Fast-Track', 'VIP Chauffeur'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '302',
        roomType: 'Royal Monarch Suite',
        pricePerNight: 1350,
        capacity: 4,
        floor: 3,
        description: 'Palatial residence detailed with 24k gold leaf accents, private Finnish sauna, Steinway grand piano, and formal dining salon.',
        amenities: ['Private Finnish Sauna', 'Grand Piano Salon', 'Gold Leaf Finishes', 'Dom Pérignon Welcome', 'Private Dining'],
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '401',
        roomType: 'Imperial Sky Villa',
        pricePerNight: 1600,
        capacity: 6,
        floor: 4,
        description: 'Multi-level crown jewel villa with rooftop sky deck, outdoor cinema, private temperature-controlled wine cellar, and master retreat.',
        amenities: ['Rooftop Sky Deck', 'Outdoor Cinema', 'Private Wine Cellar', 'Butler Service', 'Private Elevator'],
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '402',
        roomType: 'Ambassador Diplomatic Suite',
        pricePerNight: 850,
        capacity: 4,
        floor: 4,
        description: 'Designed for dignitaries and discerning travelers, offering an 8-person conference boardroom, secure private entry, and skyline terrace.',
        amenities: ['Executive Boardroom', 'Secure Private Entry', 'Skyline Terrace', 'High-Security Safe', 'Cocktail Lounge'],
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '501',
        roomType: 'Sapphire Overwater Villa',
        pricePerNight: 1100,
        capacity: 2,
        floor: 5,
        description: 'Glass floor viewing panels over crystalline turquoise waters, direct ocean ladder access, and sunset overwater hammock.',
        amenities: ['Glass Floor Panels', 'Direct Lagoon Access', 'Overwater Hammock', 'Champagne Breakfast', 'Snorkeling Gear'],
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      },
      {
        roomNumber: '502',
        roomType: 'Celestial Stargazer Suite',
        pricePerNight: 750,
        capacity: 2,
        floor: 5,
        description: 'High-altitude boutique suite with glass retractable sunroof for nighttime stargazing, customized fireplace, and designer bathtub.',
        amenities: ['Retractable Sunroof', 'Custom Fireplace', 'Designer Bathtub', 'Stargazing Telescope', 'Molton Brown Toiletries'],
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80',
        status: 'MAINTENANCE',
        maintenanceNote: 'Retractable sunroof motor servicing in progress'
      },
      {
        roomNumber: '503',
        roomType: 'Mediterranean Riviera Suite',
        pricePerNight: 620,
        capacity: 3,
        floor: 5,
        description: 'Bright coastal decor with terracotta private terrace, handcrafted olive wood furniture, and panoramic sea views.',
        amenities: ['Terracotta Terrace', 'Sea View Lounge', 'Handcrafted Furniture', 'Italian Espresso Bar', 'Wi-Fi'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        status: 'AVAILABLE'
      }
    ];

    for (const r of luxurySuites) {
      const existingRoom = await Room.findOne({ roomNumber: r.roomNumber });
      if (!existingRoom) {
        // New room: create with all data including initial status
        await Room.create(r);
      } else {
        // Existing room: ONLY update display metadata, NEVER touch status
        // Status is managed exclusively by Admin/Receptionist/Housekeeping at runtime
        existingRoom.roomType = r.roomType;
        existingRoom.pricePerNight = r.pricePerNight;
        existingRoom.capacity = r.capacity;
        existingRoom.floor = r.floor;
        existingRoom.description = r.description;
        existingRoom.amenities = r.amenities;
        existingRoom.image = r.image;
        // ✅ STATUS IS INTENTIONALLY NOT UPDATED HERE
        // Admin/Staff changes to room status are always preserved across restarts
        await existingRoom.save();
      }
    }
    console.log(`[Seed]: Synced ${luxurySuites.length} luxury hotel suites (status preserved).`);

    // 3. Seed Initial Feedback if none exist
    const feedbackCount = await Feedback.countDocuments();
    if (feedbackCount === 0) {
      const guestUser = await User.findOne({ role: 'guest' });
      if (guestUser) {
        await Feedback.create([
          {
            guestId: guestUser._id,
            guestName: 'Lord Arthur Pendelton',
            rating: 5,
            comment: 'Outstanding 5-star experience! The presidential suite and dedicated butler service were beyond expectations.'
          },
          {
            guestId: guestUser._id,
            guestName: 'Lady Catherine Howard',
            rating: 5,
            comment: 'The ocean view from Suite 101 was breathtaking. Spotless rooms and world-class hospitality.'
          }
        ]);
        console.log('[Seed]: Created initial guest testimonials.');
      }
    }

    // 5. Seed Initial Demo Bookings & Settled Bills if none exist
    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      const guestUser = await User.findOne({ email: 'guest@luxurystay.com' }) || await User.findOne({ role: 'guest' });
      const room101 = await Room.findOne({ roomNumber: '101' });
      const room102 = await Room.findOne({ roomNumber: '102' });
      const Bill = require('../models/Bill');
      const ServiceRequest = require('../models/ServiceRequest');

      if (guestUser && room101 && room102) {
        // 5a. Past completed stay with settled PAID bill
        const pastCheckIn = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const pastCheckOut = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
        const pastBooking = await Booking.create({
          bookingNumber: 'LXS-819204',
          guestId: guestUser._id,
          roomId: room101._id,
          checkInDate: pastCheckIn,
          checkOutDate: pastCheckOut,
          totalNights: 2,
          pricePerNight: room101.pricePerNight,
          totalAmount: room101.pricePerNight * 2,
          status: 'CHECKED_OUT',
          checkedInAt: pastCheckIn,
          checkedOutAt: pastCheckOut,
          specialRequests: 'High floor, champagne on arrival'
        });

        // Add settled bill
        const room101Charges = room101.pricePerNight * 2; // 700
        const room101Service = 185;
        const room101Tax = Math.round((room101Charges + room101Service) * 0.10);
        const room101Total = room101Charges + room101Service + room101Tax;

        await Bill.create({
          invoiceNumber: 'INV-739102',
          bookingId: pastBooking._id,
          guestId: guestUser._id,
          roomId: room101._id,
          roomCharges: room101Charges,
          serviceCharges: room101Service,
          taxAmount: room101Tax,
          totalAmount: room101Total,
          paymentStatus: 'PAID',
          paymentMethod: 'CREDIT_CARD',
          paidAt: pastCheckOut,
          items: [
            { description: `Accommodation (2 Nights - ${room101.roomType})`, amount: room101Charges },
            { description: 'Imperial Osetra Caviar Service (In-Suite Dining)', amount: 185 },
            { description: 'Luxury Resort Tax & Heritage Surcharge (10%)', amount: room101Tax }
          ]
        });

        // 5b. Active checked-in stay in Room 102
        const activeCheckIn = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        const activeCheckOut = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        const activeBooking = await Booking.create({
          bookingNumber: 'LXS-942851',
          guestId: guestUser._id,
          roomId: room102._id,
          checkInDate: activeCheckIn,
          checkOutDate: activeCheckOut,
          totalNights: 3,
          pricePerNight: room102.pricePerNight,
          totalAmount: room102.pricePerNight * 3,
          status: 'CHECKED_IN',
          checkedInAt: activeCheckIn,
          specialRequests: 'Extra hypoallergenic feather pillows, late checkout'
        });

        // Add in-suite dining order for Room 102
        await ServiceRequest.create({
          roomId: room102._id,
          guestId: guestUser._id,
          type: 'ROOM_SERVICE',
          title: 'Charred A5 Miyazaki Wagyu Tenderloin',
          description: 'Truffle potato purée, glazed morel mushrooms, Barolo reduction',
          price: 180,
          status: 'COMPLETED'
        });

        console.log('[Seed]: Created demo bookings, settled bills, and active folio telemetry.');
      }
    }
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
};

module.exports = seedInitialData;
