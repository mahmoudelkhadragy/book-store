import express from 'express';

import {
	createBook,
	getBook,
	updateBook,
} from '../controllers/books.controller.js';

const router = express.Router();

router.post('/', createBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);

export default router;
