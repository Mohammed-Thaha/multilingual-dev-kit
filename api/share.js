import { Router } from 'express';
import { randomUUID } from 'crypto';

// In-memory store (could be replaced with Redis or DB)
const store = new Map();

export const shareRouter = Router();

// Create a share entry
// POST /api/share  { cards: [...], formData: {...} }
shareRouter.post('/', (req, res) => {
  try {
    const { cards, formData } = req.body;
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({ success: false, error: 'No cards provided' });
    }
    const id = randomUUID();
    store.set(id, { cards, formData, createdAt: Date.now() });
    return res.json({ success: true, id, url: `${process.env.PUBLIC_BASE_URL || 'http://localhost:5173'}/?share=${id}` });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Retrieve share entry
// GET /api/share/:id
shareRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!store.has(id)) {
    return res.status(404).json({ success: false, error: 'Not found' });
  }
  return res.json({ success: true, data: store.get(id) });
});

// Optional cleanup endpoint
shareRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  store.delete(id);
  return res.json({ success: true });
});
