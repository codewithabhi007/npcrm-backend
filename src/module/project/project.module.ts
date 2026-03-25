import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { LocalityModule } from '../locality/locality.module';
import { DeveloperModule } from '../developer/developer.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        LocalityModule,
        DeveloperModule,
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectModule {}
