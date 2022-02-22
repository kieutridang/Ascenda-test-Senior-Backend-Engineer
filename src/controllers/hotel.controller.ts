/* eslint-disable @typescript-eslint/naming-convention */
import {repository} from '@loopback/repository';
import {get, param, response} from '@loopback/rest';
import {getHotelAggregate} from '../aggregate';
import {HotelBookingWithRelations} from '../models';
import {HotelBookingRepository} from '../repositories';
import {mergeHotelData} from '../utils';

export class HotelController {
  constructor(
    @repository(HotelBookingRepository)
    private hotelBookingRepository: HotelBookingRepository,
  ) {}

  @get('/hotels/{ids}')
  @response(200, {
    description: 'Hotel model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  })
  async findById(@param.path.string('ids') ids: string): Promise<object[]> {
    const hotelIds: string[] =
      ids?.split(',')?.filter((id: string) => !!id) || [];
    const pipeline = getHotelAggregate(hotelIds);

    const hotelBookingCollection =
      this.hotelBookingRepository.dataSource?.connector?.collection(
        this.hotelBookingRepository?.modelClass?.name,
      );
    const hotels: HotelBookingWithRelations[] = await hotelBookingCollection
      .aggregate(pipeline)
      .get();

    return mergeHotelData(hotels);
  }
}
