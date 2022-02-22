/* eslint-disable @typescript-eslint/naming-convention */
import {model, property} from '@loopback/repository';
import {HotelImageWithRelations, HotelSummaryRelations} from '.';
import {Base} from './base.model';

@model()
export class HotelBooking extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  hotel_id?: string;

  @property({
    type: 'number',
  })
  destination_id?: number;

  @property({
    type: 'string',
  })
  hotel_name?: string;

  @property({
    type: 'object',
  })
  location?: {
    address: string;
    country: string;
  };

  @property({
    type: 'string',
  })
  details?: string;

  @property({
    type: 'object',
  })
  amenities?: {
    room: string[];
    general: string[];
  };

  @property({
    type: 'object',
  })
  images?: {
    site: object[];
    rooms: object[];
  };

  @property({
    type: 'array',
    itemType: 'string',
  })
  booking_conditions?: string[];

  constructor(data?: Partial<HotelBooking>) {
    super(data);
  }
}

export interface HotelBookingRelations extends HotelBooking {
  hotelImages: HotelImageWithRelations[];
  hotelSummaries: HotelSummaryRelations[];
}

export type HotelBookingWithRelations = HotelBooking & HotelBookingRelations;
