import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({ content: String, name: String });
const Card = mongoose.models.Card ?? mongoose.model('Card', cardSchema);

export default Card;
