import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('A Category with this name already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
