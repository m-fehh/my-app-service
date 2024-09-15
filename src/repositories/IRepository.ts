import { Model, WhereOptions  } from 'sequelize';

export interface IRepository<T extends Model> {
    create(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    findOne(query: WhereOptions<T>): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;}