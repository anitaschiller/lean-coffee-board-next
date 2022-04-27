import { getCards } from '../../src/services/get-cards';

export default function handler(req, res) {
  const cards = getCards();

  cards.push({
    id: 1,
    content: 'Testy test',
    name: 'Testname',
  });

  res.status(200).json(cards);
}
