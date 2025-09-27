const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory "database"
let cards = [];
let nextId = 1;

// 1. GET all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// 2. POST add a new card
app.post("/cards", (req, res) => {
  // Defensive: ensure req.body exists before destructuring.
  // If the client didn't send JSON or omitted Content-Type, req.body may be undefined.
  const { suit, value } = req.body || {};
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  const newCard = { id: nextId++, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// 3. GET a specific card by ID
app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  res.json(card);
});

// 4. DELETE a card by ID
app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    return res.status(404).json({ error: "Card not found" });
  }

  const deletedCard = cards.splice(cardIndex, 1)[0];
  res.json({ message: "Card deleted", card: deletedCard });
});

// Start server
app.listen(PORT, () => {
  csonsole.log(`Server running at http://localhost:${PORT}`);
});
