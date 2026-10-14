import express from 'express';
import mongoose from 'mongoose';

import booksRouter from './routes/books.routes.js';
import { errorHandler } from './middleware/error.js';

export function createApp() {
	const app = express();

	app.use(express.json());

	app.get('/health', (req, res) => {
		// readyState: 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
		res.json({ status: 'ok', db: mongoose.connection.readyState });
	});

	app.use('/api/books', booksRouter);

	// Must be LAST: it only catches errors from the middleware registered above it.
	app.use(errorHandler);

	return app;
}
