import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HotelSummary, HotelSummaryRelations} from '../models';

export class HotelSummaryRepository extends DefaultCrudRepository<
  HotelSummary,
  typeof HotelSummary.prototype.id,
  HotelSummaryRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(HotelSummary, dataSource);
  }
}
