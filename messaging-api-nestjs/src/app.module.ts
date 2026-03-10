import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UserOrmEntity } from './modules/users/infrastructure/typeorm/user.typeorm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserOrmEntity],
      synchronize: true, // solo en desarrollo, nunca en producción
    }),
    UsersModule,
  ],
})
export class AppModule {}