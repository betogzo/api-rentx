import { parse as csvParse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategoriesFromFile(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path); //removing file after reading's done
          resolve(categories);
        })
        .on('error', (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategoriesFromFile(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const alreadyExists = await this.categoriesRepository.findByName(name);

      if (!alreadyExists)
        await this.categoriesRepository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
