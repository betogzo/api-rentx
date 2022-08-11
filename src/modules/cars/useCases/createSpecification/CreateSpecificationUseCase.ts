import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExists = await this.specificationsRepository.findByName(name);

    if (alreadyExists)
      throw new AppError(`Specification '${name}' already exists!`, 400);

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
