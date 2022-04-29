import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Card = mongoose.models.Card ?? mongoose.model('Card', cardSchema);

export default Card;
