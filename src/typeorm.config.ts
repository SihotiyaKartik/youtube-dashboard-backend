import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/entity/**/*.entity.{js,ts}'],
  synchronize: true,
  ssl: true,
  migrations: ['migrations/*{.js, .ts}'],
  migrationsTableName: 'migrations_TypeORM',
};

export default typeOrmConfig;
