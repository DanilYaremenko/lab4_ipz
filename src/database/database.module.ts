import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const entities = getMetadataArgsStorage()
          .tables.map((tbl) => tbl.target as Function)
          .filter((entity) => entity.name.toLowerCase().includes('entity'));

        return {
          type: 'postgres',
          host: config.db.pg.host,
          port: parseInt(config.db.pg.port, 10),
          username: config.db.pg.user,
          password: config.db.pg.password,
          database: config.db.pg.name,
          entities,
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const entities = getMetadataArgsStorage()
          .tables.map((tbl) => tbl.target as Function)
          .filter((entity) =>
            entity.toString().toLowerCase().includes('entity'),
          );

        return {
          type: 'mongodb',
          url: config.db.mongo.uri,
          database: config.db.mongo.name,
          synchronize: true,
          entities,
          logging: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
