import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

import { CustomSerializerInterceptor } from '../interceptors/custom-serializer.interceptor';

export const StandardSerializer = (DTO: ClassConstructor<unknown>, options?: ClassTransformOptions) => {
  return applyDecorators(UseInterceptors(new CustomSerializerInterceptor(DTO, options)));
};
