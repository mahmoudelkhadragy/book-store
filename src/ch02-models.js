import { connect, disconnect } from './db.js';
import { Book } from './models/book.js';

await connect();
await Book.deleteMany({}); // clean slate (also removes chapter 1's raw docs)

// ── 1. The prediction: casting + strict mode ─────────────────────────────
const dune = await Book.create({ title: 'Dune', price: '12.5', color: 'red' });
console.log('1) saved:', dune.toObject());
console.log('   typeof price:', typeof dune.price);

// ── 2. When casting is impossible, it throws ─────────────────────────────
try {
  await Book.create({ title: 'Bad', price: 'twelve' });
} catch (err) {
  console.log('2) error:', err.name, '→', err.errors.price.message);
}

// ── 3. CRUD ──────────────────────────────────────────────────────────────
// Create (several at once)
await Book.insertMany([
  { title: 'Neuromancer', price: 9.99, author: { name: 'William Gibson', born: 1948 }, tags: ['cyberpunk'] },
  { title: 'Foundation', price: 8.5, author: { name: 'Isaac Asimov', born: 1920 }, tags: ['classic'] },
]);

// Read
const all = await Book.find({}, 'title price'); // 2nd arg = which fields to return
console.log('3) find:', all.map((b) => `${b.title} $${b.price}`));
const one = await Book.findOne({ 'author.name': 'Isaac Asimov' });
console.log('   findOne by nested field:', one.title);

// Update — by default you get the document BEFORE the change;
// returnDocument: 'after' gives you the updated one (older tutorials use { new: true }, deprecated in Mongoose 9)
const updated = await Book.findByIdAndUpdate(dune._id, { price: 14 }, { returnDocument: 'after' });
console.log('   updated price:', updated.price, '| updatedAt changed:', updated.updatedAt > updated.createdAt);

// Delete
const { deletedCount } = await Book.deleteOne({ title: 'Foundation' });
console.log('   deleted:', deletedCount, '| remaining:', await Book.countDocuments());

await disconnect();
