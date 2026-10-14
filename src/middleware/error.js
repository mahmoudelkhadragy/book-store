import mongoose from 'mongoose';

// Express recognises an error handler by its 4 arguments — keep all 4 even if unused.
export function errorHandler(err, req, res, next) {
	// Bad ObjectId in the URL (e.g. /api/books/abc)
	if (err instanceof mongoose.Error.CastError) {
		return res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
	}
	// Schema rejected the data (e.g. price: "abc")
	if (err instanceof mongoose.Error.ValidationError) {
		const details = Object.values(err.errors).map((e) => e.message);
		return res.status(400).json({ error: 'Validation failed', details });
	}

	// Unique index violated (e.g. a second book with the same isbn).
	// This is a raw MongoDB error (code 11000), not a Mongoose validation error.
	if (err.code === 11000) {
		const field = Object.keys(err.keyPattern ?? {})[0] ?? 'field';
		return res.status(409).json({ error: `A book with this ${field} already exists` });
	}

	console.error(err); // unexpected: log it, but don't leak internals to the client
	return res.status(500).json({ error: 'Internal server error' });
}
