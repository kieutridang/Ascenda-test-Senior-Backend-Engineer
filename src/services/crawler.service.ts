/* eslint-disable @typescript-eslint/naming-convention */
import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import omit from 'lodash/omit';
import {api} from '../API';
import {HotelBooking, HotelImage, HotelSummary} from '../models';
import {
  HotelBookingRepository,
  HotelImageRepository,
  HotelSummaryRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CrawlerService {
  constructor(
    @repository(HotelSummaryRepository)
    private hotelSummaryRepository: HotelSummaryRepository,
    @repository(HotelImageRepository)
    private hotelImageRepository: HotelImageRepository,
    @repository(HotelBookingRepository)
    private hotelBookingRepository: HotelBookingRepository,
  ) {}

  private async upsertHotelSummary(hotelSummary: HotelSummary): Promise<void> {
    const foundHotelSummary = await this.hotelSummaryRepository.findOne({
      where: {
        Id: {
          eq: hotelSummary.Id,
        },
      },
    });
    if (foundHotelSummary?.id) {
      await this.hotelSummaryRepository.updateById(
        foundHotelSummary.id,
        hotelSummary,
      );
    } else {
      await this.hotelSummaryRepository.create(hotelSummary);
    }
  }

  private async upsertHotelImage(hotelImage: HotelImage): Promise<void> {
    const foundHotelImage = await this.hotelImageRepository.findOne({
      where: {
        Id: {
          eq: hotelImage.Id,
        },
      },
    });
    if (foundHotelImage?.id) {
      await this.hotelImageRepository.updateById(
        foundHotelImage.id,
        hotelImage,
      );
    } else {
      await this.hotelImageRepository.create(hotelImage);
    }
  }

  private async upsertHotelBooking(hotelBooking: HotelBooking): Promise<void> {
    const foundHotelBooking = await this.hotelBookingRepository.findOne({
      where: {
        hotel_id: {
          eq: hotelBooking.hotel_id,
        },
      },
    });
    if (foundHotelBooking?.id) {
      await this.hotelBookingRepository.updateById(
        foundHotelBooking.id,
        hotelBooking,
      );
    } else {
      await this.hotelBookingRepository.create(hotelBooking);
    }
  }

  private async syncHotelSummary(): Promise<void> {
    const response = await api.get(
      'http://www.mocky.io/v2/5ebbea002e000054009f3ffc',
    );

    if (Array.isArray(response.data) && response.data?.length > 0) {
      for (const hotelSummary of response.data) {
        await this.upsertHotelSummary(hotelSummary);
      }
    }
  }

  private async syncHotelImage(): Promise<void> {
    const response = await api.get(
      'http://www.mocky.io/v2/5ebbea1f2e00002b009f4000',
    );

    if (Array.isArray(response.data) && response.data?.length > 0) {
      for (const hotelImage of response.data) {
        const newHotelImage = new HotelImage({
          ...omit(hotelImage, 'id'),
          Id: hotelImage.id,
        });
        await this.upsertHotelImage(newHotelImage);
      }
    }
  }

  private async syncHotelBooking(): Promise<void> {
    const response = await api.get(
      'http://www.mocky.io/v2/5ebbea102e000029009f3fff',
    );

    if (Array.isArray(response.data) && response.data?.length > 0) {
      for (const hotelBooking of response.data) {
        await this.upsertHotelBooking(hotelBooking);
      }
    }
  }

  public async crawler(): Promise<void> {
    await this.syncHotelSummary();
    await this.syncHotelImage();
    await this.syncHotelBooking();
  }
}
