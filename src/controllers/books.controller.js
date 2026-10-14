import { Book } from '../models/book.js';

export const createBook = async (req, res) => {
	// Pick fields by name (not Book.create(req.body)) so clients can't set inStock, createdAt...
	// No "is title present?" check here any more: the schema owns that rule.
	const { title, price, pages, isbn, tags, author } = req.body ?? {};

	const newBook = await Book.create({ title, price, pages, isbn, tags, author });

	return res.status(201).json(newBook);
};

export const getBook = async (req, res) => {
	const { id } = req.params;

	const book = await Book.findById(id);

	if (!book) {
		return res.status(404).json({ error: 'Book not found' });
	}

	return res.json(book);
};
