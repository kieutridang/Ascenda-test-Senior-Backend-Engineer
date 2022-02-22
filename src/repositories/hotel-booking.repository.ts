import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HotelBooking, HotelBookingRelations} from '../models';

export class HotelBookingRepository extends DefaultCrudRepository<
  HotelBooking,
  typeof HotelBooking.prototype.id,
  HotelBookingRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(HotelBooking, dataSource);
  }
}
