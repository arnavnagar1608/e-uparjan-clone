const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// MOCK DATABASE (In-Memory for Prototype)
// ==========================================
const db = {
  farmers: [], // Completely fresh start! No dummy data.
  bookings: [],
  centres: {
    'Rau Uparjan Kendra': { currentToken: 114, nextAvailableToken: 127 },
    'Sanwer Mandi': { currentToken: 45, nextAvailableToken: 50 },
    'Mhow Krishi Kendra': { currentToken: 10, nextAvailableToken: 15 }
  }
};

// ==========================================
// 1. AUTHENTICATION APIs
// ==========================================

// Register API
app.post('/api/register', (req, res) => {
  const { name, mobile, password, aadhaar, crop } = req.body;
  
  // Create a new unique Farmer ID
  const newFarmerId = `FR-MP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newFarmer = { farmerId: newFarmerId, name, mobile, password, aadhaar, crop };
  db.farmers.push(newFarmer);
  
  console.log(`[API] New Farmer Registered: ${newFarmerId}`);
  
  // Return a mock JWT token and user details
  res.status(201).json({
    message: "Registration Successful",
    token: "mock-jwt-token-12345",
    user: { farmerId: newFarmerId, name: newFarmer.name }
  });
});

// Login API
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body; // identifier can be mobile or farmerId
  
  // Check if farmer exists in database
  const farmer = db.farmers.find(f => 
    (f.mobile === identifier || f.farmerId === identifier) && f.password === password
  );

  if (!farmer) {
    return res.status(401).json({ message: "Invalid credentials! Please check your ID and Password." });
  }

  console.log(`[API] Farmer Logged In: ${farmer.farmerId}`);

  // Return success with mock JWT
  res.json({
    message: "Login Successful",
    token: "mock-jwt-token-12345",
    user: { farmerId: farmer.farmerId, name: farmer.name }
  });
});

// ==========================================
// 2. SLOT BOOKING API
// ==========================================
app.post('/api/book-slot', (req, res) => {
  const { farmerId, centre, district, crop, date, slot } = req.body;

  // 1. Validate if centre exists
  if (!db.centres[centre]) {
    db.centres[centre] = { currentToken: 1, nextAvailableToken: 1 };
  }

  // 2. Generate Farmer Token
  const generatedToken = db.centres[centre].nextAvailableToken;
  
  // 3. Increment the next available token for the future
  db.centres[centre].nextAvailableToken += 1;

  // 4. Save booking
  const newBooking = {
    bookingId: `BK-${Math.floor(Math.random() * 90000) + 10000}-2026`,
    farmerId: farmerId || 'FR-MP-2026-1234',
    centre,
    district,
    crop,
    date,
    slot,
    farmerToken: generatedToken,
    status: 'waiting' // 'waiting' -> 'accepted'
  };

  db.bookings.push(newBooking);

  console.log(`[API] New Slot Booked: ${newBooking.bookingId} - Token #${generatedToken}`);

  // 5. Send success response
  res.status(201).json({
    message: 'Slot booked successfully',
    booking: newBooking
  });
});

// ==========================================
// 2. TRACKING STATUS API
// ==========================================
app.get('/api/tracking/:farmerId', (req, res) => {
  const { farmerId } = req.params;

  // Find the farmer's active booking
  const activeBooking = db.bookings.find(b => b.farmerId === farmerId && b.status === 'waiting');

  if (!activeBooking) {
    return res.status(404).json({ message: "No active bookings found for this Farmer ID" });
  }

  // Get live queue data for the centre
  const centreData = db.centres[activeBooking.centre];

  const farmer = db.farmers.find(f => f.farmerId === farmerId);

  res.json({
    bookingDetails: activeBooking,
    farmerDetails: farmer ? { name: farmer.name } : { name: "Unknown Farmer" },
    liveQueue: {
      currentToken: centreData.currentToken,
      tokensRemaining: Math.max(0, activeBooking.farmerToken - centreData.currentToken),
      avgProcessingTime: 5 // 5 minutes per farmer
    }
  });
});

// ==========================================
// 3. ADMIN / DEV SIMULATOR API (Advance Token)
// ==========================================
app.post('/api/admin/advance-token', (req, res) => {
  const { centre } = req.body;

  if (db.centres[centre]) {
    db.centres[centre].currentToken += 1;
    console.log(`[ADMIN] Advanced token for ${centre} to #${db.centres[centre].currentToken}`);
    
    return res.json({ 
      message: 'Token advanced successfully', 
      currentToken: db.centres[centre].currentToken 
    });
  }

  res.status(404).json({ message: "Centre not found" });
});

// Simulate Procurement Success
app.post('/api/admin/simulate-success', (req, res) => {
  const { farmerId } = req.body;
  
  const bookingIndex = db.bookings.findIndex(b => b.farmerId === farmerId && b.status === 'waiting');
  if (bookingIndex !== -1) {
    db.bookings[bookingIndex].status = 'accepted';
    return res.json({ message: "Procurement successful" });
  }
  
  res.status(404).json({ message: "Active booking not found" });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ E-Uparjan Backend API is running on http://localhost:${PORT}`);
});
