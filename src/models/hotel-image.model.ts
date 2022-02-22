import {model, property} from '@loopback/repository';
import {Base} from './base.model';

@model()
export class HotelImage extends Base {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  Id?: string;

  @property({
    type: 'number',
  })
  destination?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  lat?: number;

  @property({
    type: 'number',
  })
  lng?: number;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  info?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  amenities?: string[];

  @property({
    type: 'object',
  })
  images?: {
    amenities: object[];
  };

  constructor(data?: Partial<HotelImage>) {
    super(data);
  }
}

export interface HotelImageRelations extends HotelImage {
  // describe navigational properties here
}

export type HotelImageWithRelations = HotelImage & HotelImageRelations;
