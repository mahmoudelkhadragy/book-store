import mongoose from 'mongoose';
import { connect, disconnect } from './db.js';

await connect();

// The raw MongoDB driver underneath Mongoose: no schema, no validation, nothing.
const books = mongoose.connection.db.collection('books');
await books.deleteMany({}); // start clean so re-runs give the same output

const a = await books.insertOne({ title: 'Dune' });
const b = await books.insertOne({ title: 'Dune' });
console.log('inserted ids:', a.insertedId, b.insertedId);

// Nothing enforces a shape: this document is nested and has different fields.
await books.insertOne({
  title: 'Neuromancer',
  price: 12.5,
  author: { name: 'William Gibson', born: 1948 }, // an embedded sub-document
  tags: ['cyberpunk', 'classic'],                  // an array, stored inline
});

console.log(await books.find().toArray());

// An ObjectId isn't random: its first 4 bytes are a timestamp.
console.log('first doc created at:', a.insertedId.getTimestamp());

await disconnect();
