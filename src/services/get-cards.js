import Card from '../models/Card';
import { dbConnect } from '../lib/database';

export const getCards = async () => {
  await dbConnect();
  const data = await Card.find().populate('user');
  return data.map(({ id, content, user }) => ({
    id,
    content,
    name: user.name,
  }));
};
