import mongoose from 'mongoose';

// A schema describes the shape of ONE document. It lives in your Node app;
// MongoDB itself never sees it (nothing like a CREATE TABLE is sent).
const bookSchema = new mongoose.Schema(
  {
    title: String,                       // shorthand for { type: String }
    price: Number,
    pages: Number,
    publishedAt: Date,
    tags: [String],                      // an array of strings
    author: {                            // a nested object, like chapter 1's Gibson doc
      name: String,
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
