import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';

const r = Router();

r.get('/', ProductController.list);
r.post('/', ProductController.create);
r.put('/:id', ProductController.update);
r.delete('/:id', ProductController.remove);

export default r;
