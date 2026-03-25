import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/module/auth/auth.module';
import { ProjectModule } from 'src/module/project/project.module';
import { LocalityModule } from 'src/module/locality/locality.module';
import { DeveloperModule } from 'src/module/developer/developer.module';
import { BlogModule } from 'src/module/blog/blog.module';
import { TestimonialModule } from 'src/module/testimonial/testimonial.module';
import { PartnerModule } from 'src/module/partner/partner.module';
import { StatisticsModule } from 'src/module/statistics/statistics.module';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/database';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProjectModule,
    LocalityModule,
    DeveloperModule,
    BlogModule,
    TestimonialModule,
    PartnerModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
