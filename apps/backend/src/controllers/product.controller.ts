import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';

export const ProductController = {
  async list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const result = await ProductService.list(page, limit);
    res.json(result);
  },

  async create(req: Request, res: Response) {
    const { article, name, price, quantity } = req.body;
    if (!article || !name || !price || quantity == null) {
      return res
        .status(400)
        .json({ message: 'article, name, price, quantity required' });
    }
    try {
      const item = await ProductService.create({
        article,
        name,
        price,
        quantity,
      });
      res.status(201).json(item);
    } catch (e: any) {
      res.status(500).json({ message: 'create failed' });
    }
  },

  async update(req: Request, res: Response) {
    const item = await ProductService.update(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  },

  async remove(req: Request, res: Response) {
    const result = await ProductService.delete(Number(req.params.id));
    if (result.affected === 0)
      return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  },
};
