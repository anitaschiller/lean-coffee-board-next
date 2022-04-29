import { dbConnect } from '../../../src/lib/database';
import Card from '../../../src/models/Card';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    await dbConnect();

    const newCard = await Card.create({ ...data });

    res.status(200).json({
      message: 'card created',
      card: newCard,
    });
  } else {
    res.status(400).json({ error: 'wrong method' });
  }
}
