import mongoose from 'mongoose';

// Node 20 loads env files itself (node --env-file=...), so no dotenv package needed.
// MONGODB_URI comes from atlas-credentials.env (secret, git-ignored);
// MONGODB_DB comes from .env (not secret).
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is not set — run via `npm run <script>` so the env files load');

export async function connect() {
  // One call opens a *pool* of connections (chapter 10 tunes it).
  // dbName: the Atlas URI has no "/<db>" path, so we choose the database here.
  // serverSelectionTimeoutMS: fail in 5s if Mongo is unreachable, instead of hanging 30s (the default).
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB ?? 'bookstore',
    serverSelectionTimeoutMS: 5000,
  });
  console.log(`connected to db "${mongoose.connection.name}" on ${mongoose.connection.host}`);
}

export async function disconnect() {
  await mongoose.disconnect();
}
