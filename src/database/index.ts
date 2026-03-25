import { Module } from "@nestjs/common";
import { envConfig, isLocalDevEnv } from "src/config/env";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: envConfig('DB_HOST'),
            port: envConfig('DB_PORT'),
            username: envConfig('DB_USER'),
            password: envConfig('DB_PASSWORD'),
            database: envConfig('DB_NAME'),
            autoLoadEntities: true,
            entities: [],
            synchronize: true,
            logging: isLocalDevEnv(),
        }),

    ],
})
export class DatabaseModule { }
