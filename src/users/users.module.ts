import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { ReportsModule } from 'src/reports/reports.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,AuthService,
  {
    provide:APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }],
})
export class UsersModule {}
