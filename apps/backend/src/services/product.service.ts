import { AppDataSource } from '../data-source.js';
import { Product } from '../entities/product.entity.js';

const repo = AppDataSource.getRepository(Product);

export const ProductService = {
  async list(page: number = 1, limit: number = 10) {
    const [data, total] = await repo.findAndCount({
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  },

  async create(dto: Pick<Product, 'article' | 'name' | 'price' | 'quantity'>) {
    const product = repo.create(dto);
    return repo.save(product);
  },

  async update(
    id: number,
    dto: Partial<Pick<Product, 'article' | 'name' | 'price' | 'quantity'>>,
  ) {
    await repo.update(id, dto);
    return repo.findOneBy({ id });
  },

  async delete(id: number) {
    return repo.delete({
      id,
    });
  },
};
