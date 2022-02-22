import {model, property} from '@loopback/repository';
import {Base} from './base.model';

@model()
export class HotelSummary extends Base {
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
  DestinationId?: number;

  @property({
    type: 'string',
  })
  Name?: string;

  @property({
    type: 'number',
  })
  Latitude?: number;

  @property({
    type: 'number',
  })
  Longitude?: number;

  @property({
    type: 'string',
  })
  Address?: string;

  @property({
    type: 'string',
  })
  City?: string;

  @property({
    type: 'string',
  })
  Country?: string;

  @property({
    type: 'string',
  })
  PostalCode?: string;

  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  Facilities?: string[];

  constructor(data?: Partial<HotelSummary>) {
    super(data);
  }
}

export interface HotelSummaryRelations extends HotelSummary {
  // describe navigational properties here
}

export type HotelSummaryWithRelations = HotelSummary & HotelSummaryRelations;
