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

	console.error(err); // unexpected: log it, but don't leak internals to the client
	return res.status(500).json({ error: 'Internal server error' });
}
