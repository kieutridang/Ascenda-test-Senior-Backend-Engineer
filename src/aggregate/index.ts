/* eslint-disable @typescript-eslint/naming-convention */
import {AggregationPipeline} from '../types';

export function getHotelAggregate(
  hotelIds: string[],
  destinationIds: number[],
): AggregationPipeline {
  const pipeline: AggregationPipeline = [
    {
      $match: {
        $or: [
          {
            hotel_id: {
              $in: hotelIds,
            },
          },
          {
            destination_id: {
              $in: destinationIds,
            },
          },
        ],
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
