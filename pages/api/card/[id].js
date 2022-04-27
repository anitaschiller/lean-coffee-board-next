import { getCards } from '../../../src/services/get-cards';

export default function handler(req, res) {
  const { id } = req.query;
  const cards = getCards();
  const singleCard = cards.find((card) => card.id === id);

  if (req.method === 'DELETE') {
    res.status(200).json({ message: 'card deleted', card: singleCard });
  } else if (req.method === 'PUT') {
    const changedCard = JSON.parse(req.body);
    res.status(200).json({ message: 'card updated', card: changedCard });
  } else {
    response.status(200).json(singleCard);
  }
}
