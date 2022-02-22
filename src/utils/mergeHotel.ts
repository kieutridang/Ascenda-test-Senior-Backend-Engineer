import uniq from 'lodash/uniq';
import {HotelBookingWithRelations} from '../models';

/* eslint-disable @typescript-eslint/naming-convention */
export function mergeHotelData(hotels: HotelBookingWithRelations[]) {
  const formatedHotels = hotels?.map(
    (hotelBooking: HotelBookingWithRelations) => ({
      id: hotelBooking?.hotel_id,
      destination_id: hotelBooking?.destination_id,
      name: hotelBooking?.hotel_name,
      location: {
        lat: hotelBooking?.hotelSummaries?.[0]?.Latitude,
        lng: hotelBooking?.hotelSummaries?.[0]?.Longitude,
        address: hotelBooking?.location?.address,
        city: hotelBooking?.hotelSummaries?.[0]?.City,
        country: hotelBooking?.location?.country,
      },
      description: hotelBooking?.details,
      amenities: {
        general: [
          ...(hotelBooking?.amenities?.general
            ? hotelBooking.amenities.general
            : []),
          ...(hotelBooking?.hotelSummaries?.[0]?.Facilities
            ? hotelBooking?.hotelSummaries?.[0]?.Facilities?.map(
                (facility: string) => facility?.toLowerCase()?.trim(),
              ) || []
            : []),
        ],
        room: uniq([
          ...(hotelBooking?.amenities?.room ? hotelBooking.amenities.room : []),
          ...(hotelBooking?.hotelImages?.[0]?.amenities
            ? hotelBooking?.hotelImages?.[0]?.amenities?.map(
                (facility: string) => facility?.toLowerCase()?.trim(),
              ) || []
            : []),
        ]),
      },
      images: {
        rooms: [
          ...(hotelBooking?.images?.rooms
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              hotelBooking.images.rooms?.map((room: any) => ({
                link: room?.link,
                description: room?.caption,
              })) || []
            : []),
        ],
        site: [
          ...(hotelBooking?.images?.site
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              hotelBooking.images.site?.map((room: any) => ({
                link: room?.link,
                description: room?.caption,
              })) || []
            : []),
        ],
        amenities: [
          ...(hotelBooking?.hotelImages?.[0]?.images?.amenities
            ? hotelBooking.hotelImages[0].images.amenities
            : []),
        ],
      },
      booking_conditions: [
        ...(hotelBooking?.booking_conditions
          ? hotelBooking.booking_conditions
          : []),
      ],
    }),
  );

  return formatedHotels;
}
