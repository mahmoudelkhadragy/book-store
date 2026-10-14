import { Book } from '../models/book.js';

export const createBook = async (req, res) => {
	const { title, price, pages, tags, author } = req.body ?? {};

	if (!title || !author) {
		return res.status(400).json({ error: 'Title and author are required' });
	}

	const newBook = await Book.create({ title, price, pages, tags, author });

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
