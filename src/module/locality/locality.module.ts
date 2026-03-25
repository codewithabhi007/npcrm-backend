import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locality } from './entities/locality.entity';
import { LocalityService } from './locality.service';
import { LocalityController } from './locality.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Locality])],
    controllers: [LocalityController],
    providers: [LocalityService],
    exports: [LocalityService],
})
export class LocalityModule {}
