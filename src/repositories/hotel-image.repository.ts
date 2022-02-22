import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HotelImage, HotelImageRelations} from '../models';

export class HotelImageRepository extends DefaultCrudRepository<
  HotelImage,
  typeof HotelImage.prototype.id,
  HotelImageRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(HotelImage, dataSource);
  }
}
