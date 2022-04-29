import mongoose from 'mongoose';

//const url = 'mongodb://localhost:27017/lean-coffee';
const url =
  'mongodb+srv://shop-backend-user:<password>@cluster0.0qyqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

export async function dbConnect() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('ERROR, could not connect', error.message);
  }
}
