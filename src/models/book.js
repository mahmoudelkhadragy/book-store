import mongoose from 'mongoose';

// A schema describes the shape of ONE document. It lives in your Node app;
// MongoDB itself never sees it (nothing like a CREATE TABLE is sent).
const bookSchema = new mongoose.Schema(
  {
    // Validators: every write through this model is checked, not just POST /books.
    // [value, message] is the shorthand for "the rule, and what to tell the client".
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true, // "  Dune " -> "Dune" (a sanitizer, runs before validation)
      minlength: [1, 'title cannot be empty'],
      maxlength: [200, 'title is too long (max 200)'],
    },
    price: {
      type: Number,
      min: [0, 'price cannot be negative'],
    },
    pages: {
      type: Number,
      min: [1, 'pages must be at least 1'],
      validate: {
        validator: Number.isInteger, // 300.5 pages makes no sense
        message: 'pages must be a whole number',
      },
    },
    // unique is NOT a validator: it creates a unique INDEX inside MongoDB.
    // sparse: books without an isbn (like the ones from chapter 2) are left out of the
    // index, otherwise they would all count as "isbn = null" and collide with each other.
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    publishedAt: Date,
    tags: [String],                      // an array of strings
    author: {                            // a nested object, like chapter 1's Gibson doc
      name: { type: String, required: [true, 'author.name is required'], trim: true },
      born: Number,
    },
    inStock: { type: Boolean, default: true }, // long form: type + options
  },
  {
    timestamps: true, // Mongoose adds and maintains createdAt / updatedAt for you
  },
);

// model(name, schema) → a class bound to a collection.
// Name 'Book' → collection 'books' (Mongoose lowercases and pluralises it).
export const Book = mongoose.model('Book', bookSchema);
