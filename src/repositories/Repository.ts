import { Model, Sequelize, ModelStatic, WhereOptions } from 'sequelize';
import { IRepository } from './IRepository';

export class Repository<T extends Model> implements IRepository<T> {
    private model: ModelStatic<T>;
    private sequelize: Sequelize;

    constructor(model: ModelStatic<T>, sequelize: Sequelize) {
        this.model = model;
        this.sequelize = sequelize;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data as any) as Promise<T>;
    }

    async findAll(): Promise<T[]> {
        return this.model.findAll() as Promise<T[]>;
    }

    async findById(id: number): Promise<T | null> {
        return this.model.findByPk(id) as Promise<T | null>;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const [affectedCount] = await this.model.update(data as any, {
            where: { id } as WhereOptions,
        });

        if (affectedCount > 0) {
            return this.findById(id);
        }

        return null;
    }

    async delete(id: number): Promise<boolean> { 
        const deletedCount = await this.model.destroy({
            where: { id } as WhereOptions,
        });
        return deletedCount > 0; // Retorna true se algum registro foi deletado
    }

    async findOne(query: WhereOptions<T>): Promise<T | null> {
        return this.model.findOne({ where: query }) as Promise<T | null>;
    }
}
