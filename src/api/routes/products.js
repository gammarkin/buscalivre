import { Router } from 'express';
import products from '../models/products.js';

const router = Router();

router.get(
	'/',
	async (_req, res) => {
		const results = await products.read();

		return res.status(200).json({ results });
	}
);

router.post(
	'/',
	async (req, res) => {
		const results = await products.createMany(req.body);

		return res.status(201).json(results);
	}
);


export default router;
