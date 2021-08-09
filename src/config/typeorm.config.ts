import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  logging: true,
});
