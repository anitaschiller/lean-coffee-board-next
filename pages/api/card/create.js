import { dbConnect } from '../../../src/lib/database';
import Card from '../../../src/models/Card';
import User from '../../../src/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    await dbConnect();

    let user = await User.findOne({ name: data.name });

    if (!user) {
      user = await User.create({ name: data.name });
    }

    const newCard = await Card.create({
      content: data.content,
      user: user.id,
    });

    res.status(200).json({
      message: 'card created',
      card: newCard,
    });
  } else {
    res.status(400).json({ error: 'wrong method' });
  }
}
