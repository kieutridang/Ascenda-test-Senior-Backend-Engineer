import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {CrawlerService} from '../../services';

@cronJob()
class CrawlerCronjob extends CronJob {
  constructor(
    @service(CrawlerService)
    private crawlerService: CrawlerService,
  ) {
    super({
      name: 'crawler-cronjob',
      onTick: async () => {
        await crawlerService.crawler();
      },
      cronTime: '*/30 * * * * *',
      start: true,
      runOnInit: false,
      timeZone: 'Asia/Ho_Chi_Minh',
    });
  }
}

export default CrawlerCronjob;
