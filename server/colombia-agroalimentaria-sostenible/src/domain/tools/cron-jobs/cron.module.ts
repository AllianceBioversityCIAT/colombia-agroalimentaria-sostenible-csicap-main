import { Module } from '@nestjs/common';
import { ClarisaCron } from './clarisa.cron';
import { AgressoToolsModule } from '../agresso/agresso-tools.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SelfApp } from '../broker/self.app';

@Module({
  imports: [
    AgressoToolsModule,
    ScheduleModule.forRoot({
      cronJobs: true,
    }),
  ],
  providers: [ClarisaCron, SelfApp],
})
export class CronModule {}
