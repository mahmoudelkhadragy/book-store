import mongoose from 'mongoose';

// Node 20 can load .env itself (node --env-file=.env), so no dotenv package needed.
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is not set — did you run with --env-file=.env?');

export async function connect() {
  // One call opens a *pool* of connections (chapter 10 tunes it).
  // serverSelectionTimeoutMS: fail in 5s if Mongo is down, instead of hanging 30s (the default).
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log(`connected to db "${mongoose.connection.name}"`);
}

export async function disconnect() {
  await mongoose.disconnect();
}
