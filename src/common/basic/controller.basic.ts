import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  applyDecorators,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const BasicController = (route: string, apiTagName?: string) => {
  return applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    ApiTags(apiTagName?.toUpperCase() || route?.toUpperCase()),
    Controller(route),
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    ),
  );
};
