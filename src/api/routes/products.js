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

router.get(
	'/c/:c',
	async (req, res) => {
		const { params: { c } } = req;
		const results = await products.readSpecific(c);

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

router.delete(
	'/',
	async (_req, res) => {
		await products.destroyAll();

		return res.status(204).end();
	}
);

export default router;
