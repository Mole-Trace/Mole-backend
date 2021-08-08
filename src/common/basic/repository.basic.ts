import { InternalServerErrorException, Logger } from '@nestjs/common';
import { isUndefined, omitBy } from 'lodash';
import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const logger = new Logger();

export class BasicRepository<Entity> extends Repository<Entity> {
  async createAndSave<T extends DeepPartial<Entity>>(
    entities: T,
    options?: SaveOptions,
  ): Promise<Entity> {
    let savedEntity: any;
    const createdEntity = this.create(entities as any);

    try {
      savedEntity = await this.save(createdEntity, options);
    } catch (e) {
      logger.error(e.message, 'QUERY');
      throw new InternalServerErrorException();
    }

    return savedEntity;
  }

  async updateById(
    id: string | number,
    data: QueryDeepPartialEntity<Entity>,
    returning = true,
  ): Promise<Entity | boolean> {
    const clearedData = omitBy(data, (key) => isUndefined(key));

    try {
      await this.update(id, clearedData as any);
    } catch (e) {
      logger.error(e.message, 'QUERY');
      throw new InternalServerErrorException();
    }

    if (returning) {
      const record = await this.findOne(id);
      return record;
    }

    return true;
  }
}
