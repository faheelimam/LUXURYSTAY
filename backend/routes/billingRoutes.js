const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const ServiceRequest = require('../models/ServiceRequest');
const Booking = require('../models/Booking');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);

// @route   GET /api/billing/invoice/:bookingId
// @desc    Get bill & invoice for a specific booking (draft or finalized)
// @access  Private (Guest, Receptionist, Manager, Admin)
router.get('/invoice/:bookingId', async (req, res) => {
  try {
    let bill = await Bill.findOne({ bookingId: req.params.bookingId })
      .populate('guestId', 'name email phone')
      .populate('roomId', 'roomNumber roomType pricePerNight');

    if (!bill) {
      // If bill not yet generated in DB, construct live calculation
      const booking = await Booking.findById(req.params.bookingId)
        .populate('guestId', 'name email phone')
        .populate('roomId', 'roomNumber roomType pricePerNight');
      
      if (!booking) return res.status(404).json({ message: 'Booking not found' });

      const roomId = booking.roomId?._id || booking.roomId;
      const serviceRequests = await ServiceRequest.find({
        roomId,
        status: 'COMPLETED'
      });

      const totalServiceCharges = serviceRequests.reduce((acc, sr) => acc + (sr.price || 0), 0);
      const roomCharge = booking.totalAmount || (booking.pricePerNight * booking.totalNights);
      const taxAmount = Math.round((roomCharge + totalServiceCharges) * 0.10);
      const grandTotal = roomCharge + totalServiceCharges + taxAmount;

      return res.json({
        invoiceNumber: 'DRAFT-' + booking.bookingNumber,
        bookingId: booking._id,
        guestId: booking.guestId,
        roomId: booking.roomId,
        roomCharges: roomCharge,
        serviceCharges: totalServiceCharges,
        taxAmount,
        totalAmount: grandTotal,
        paymentStatus: 'UNPAID',
        items: [
          { description: `Accommodation (${booking.totalNights} Night(s) - ${booking.roomId?.roomType || 'Suite'})`, amount: roomCharge },
          ...serviceRequests.map((sr) => ({ description: `Room Service: ${sr.title}`, amount: sr.price })),
          { description: 'Luxury Resort Tax & Heritage Surcharge (10%)', amount: taxAmount }
        ],
        isDraft: true
      });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/billing/:billId/pay
// @desc    Process bill payment (supports billId OR bookingId, creates bill if draft)
// @access  Private (Guest, Receptionist, Manager, Admin)
router.post('/:billId/pay', async (req, res) => {
  try {
    const { paymentMethod, bookingId } = req.body;
    let bill = null;
    const billParam = req.params.billId;

    // 1. Try finding by MongoDB ObjectId as Bill
    if (billParam && billParam !== 'undefined' && billParam !== 'null' && billParam.length === 24) {
      bill = await Bill.findById(billParam);
    }

    // 2. Try finding by bookingId
    const targetBookingId = bookingId || billParam;
    if (!bill && targetBookingId && targetBookingId.length === 24) {
      bill = await Bill.findOne({ bookingId: targetBookingId });
    }

    // 3. If bill does not exist yet (e.g. draft bill during stay), create it now from booking telemetry
    if (!bill && targetBookingId && targetBookingId.length === 24) {
      const booking = await Booking.findById(targetBookingId).populate('roomId');
      if (booking) {
        const roomId = booking.roomId?._id || booking.roomId;
        const serviceRequests = await ServiceRequest.find({
          roomId,
          status: 'COMPLETED'
        });

        const totalServiceCharges = serviceRequests.reduce((acc, sr) => acc + (sr.price || 0), 0);
        const roomCharge = booking.totalAmount || (booking.pricePerNight * booking.totalNights);
        const taxAmount = Math.round((roomCharge + totalServiceCharges) * 0.10);
        const grandTotal = roomCharge + totalServiceCharges + taxAmount;

        bill = await Bill.create({
          invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          bookingId: booking._id,
          guestId: booking.guestId,
          roomId: roomId,
          roomCharges: roomCharge,
          serviceCharges: totalServiceCharges,
          taxAmount,
          totalAmount: grandTotal,
          paymentStatus: 'UNPAID',
          items: [
            { description: `Accommodation (${booking.totalNights} Night(s) - ${booking.roomId?.roomType || 'Suite'})`, amount: roomCharge },
            ...serviceRequests.map((sr) => ({ description: `Room Service: ${sr.title}`, amount: sr.price })),
            { description: 'Luxury Resort Tax & Heritage Surcharge (10%)', amount: taxAmount }
          ]
        });
      }
    }

    if (!bill) {
      return res.status(404).json({ message: 'Bill or reservation record not found for payment settlement.' });
    }

    // Mark as PAID
    bill.paymentStatus = 'PAID';
    bill.paymentMethod = paymentMethod || 'CASH';
    bill.paidAt = new Date();
    await bill.save();

    res.json({
      message: `Folio settlement of $${bill.totalAmount.toLocaleString()} completed successfully. Thank you for staying at The Grand Imperial Palace.`,
      bill
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/billing
// @desc    Get all bills / ledger (Staff, Manager, Admin)
// @access  Private (Admin, Manager, Receptionist)
router.get('/', authorizeRoles('admin', 'manager', 'receptionist'), async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate('guestId', 'name email phone')
      .populate('roomId', 'roomNumber roomType pricePerNight')
      .populate('bookingId', 'bookingNumber checkInDate checkOutDate status')
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/billing/my-billing
// @desc    Get complete billing & payment calculation for the logged-in guest
// @access  Private (Guest)
router.get('/my-billing', async (req, res) => {
  try {
    const myBills = await Bill.find({ guestId: req.user._id })
      .populate('roomId', 'roomNumber roomType')
      .populate('bookingId', 'bookingNumber checkInDate checkOutDate')
      .sort({ createdAt: -1 });

    const totalPaid = myBills
      .filter(b => b.paymentStatus === 'PAID')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const totalUnpaidBills = myBills
      .filter(b => b.paymentStatus === 'UNPAID')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    // Also calculate active stay unbilled charges if any
    const activeBooking = await Booking.findOne({
      guestId: req.user._id,
      status: { $in: ['CONFIRMED', 'CHECKED_IN'] }
    }).populate('roomId');

    let activeStayCalculation = null;
    if (activeBooking) {
      const roomId = activeBooking.roomId?._id || activeBooking.roomId;
      const serviceRequests = await ServiceRequest.find({
        roomId,
        status: 'COMPLETED'
      });

      const totalServiceCharges = serviceRequests.reduce((acc, sr) => acc + (sr.price || 0), 0);
      const roomCharges = activeBooking.totalAmount || (activeBooking.pricePerNight * activeBooking.totalNights);
      const taxAmount = Math.round((roomCharges + totalServiceCharges) * 0.10);
      const grandTotal = roomCharges + totalServiceCharges + taxAmount;

      // Check if there is already a bill for this booking
      const existingBill = myBills.find(b => String(b.bookingId?._id || b.bookingId) === String(activeBooking._id));

      activeStayCalculation = {
        bookingId: activeBooking._id,
        bookingNumber: activeBooking.bookingNumber,
        suiteNumber: activeBooking.roomId?.roomNumber,
        suiteType: activeBooking.roomId?.roomType,
        totalNights: activeBooking.totalNights,
        pricePerNight: activeBooking.pricePerNight,
        roomCharges,
        serviceCharges: totalServiceCharges,
        taxAmount,
        grandTotal,
        serviceItems: serviceRequests.map(sr => ({ title: sr.title, price: sr.price, date: sr.createdAt })),
        isPaid: existingBill ? existingBill.paymentStatus === 'PAID' : false,
        billId: existingBill ? existingBill._id : null
      };
    }

    res.json({
      totalPaid,
      totalPending: totalUnpaidBills + (activeStayCalculation && !activeStayCalculation.isPaid ? activeStayCalculation.grandTotal : 0),
      bills: myBills,
      activeStayCalculation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/billing/room-service
// @desc    Guest requests room service or amenity charge
// @access  Private (Guest, Receptionist, Admin)
router.post('/room-service', async (req, res) => {
  try {
    const { roomId, title, price, description } = req.body;
    if (!roomId || !title || !price) {
      return res.status(400).json({ message: 'Room ID, service title, and price are required' });
    }

    const serviceRequest = await ServiceRequest.create({
      roomId,
      guestId: req.user._id,
      type: 'ROOM_SERVICE',
      title,
      description: description || 'Room service order',
      price: Number(price),
      status: 'COMPLETED' // Instantly added to room bill
    });

    // Also sync existing active bill if any
    const activeBooking = await Booking.findOne({ roomId, status: 'CHECKED_IN' });
    if (activeBooking) {
      let bill = await Bill.findOne({ bookingId: activeBooking._id });
      if (bill) {
        bill.serviceCharges = (bill.serviceCharges || 0) + Number(price);
        bill.taxAmount = Math.round(((bill.roomCharges || 0) + bill.serviceCharges) * 0.10);
        bill.totalAmount = (bill.roomCharges || 0) + bill.serviceCharges + bill.taxAmount;
        bill.items.push({
          description: `Room Service: ${title}`,
          amount: Number(price)
        });
        await bill.save();
      }
    }

    res.status(201).json({
      message: `Order '${title}' ($${price}) placed successfully and added to room charges.`,
      serviceRequest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
