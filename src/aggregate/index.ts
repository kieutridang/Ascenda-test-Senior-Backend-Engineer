/* eslint-disable @typescript-eslint/naming-convention */
import {AggregationPipeline} from '../types';

export function getHotelAggregate(hotelIds: string[]): AggregationPipeline {
  const pipeline: AggregationPipeline = [
    {
      $match: {
        hotel_id: {
          $in: hotelIds,
        },
      },
    },
    {
      $lookup: {
        from: 'HotelImage',
        localField: 'hotel_id',
        foreignField: 'Id',
        as: 'hotelImages',
      },
    },
    {
      $lookup: {
        from: 'HotelSummary',
        localField: 'hotel_id',
        foreignField: 'Id',
        as: 'hotelSummaries',
      },
    },
    {
      $addFields: {
        id: '$hotel_id',
      },
    },
  ];

  return pipeline;
}
