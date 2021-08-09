// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
// import { ClassConstructor, plainToClass } from 'class-transformer';
// import { serialize } from 'class-transformer';
// import { isArray, isEmpty, isObject } from 'lodash';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class CustomSerializerInterceptor implements NestInterceptor {
//   DTO: any;
//   customOptions: ClassTransformOptions;

//   TypeOfData = 'DataType';

//   private defaultOptions: ClassTransformOptions = {
//     enableCircularCheck: true, // circle check fot nested class
//     strategy: 'excludeAll', // default strategy to strip all field expect exposed property
//     excludeExtraneousValues: true, // strip unexposed property
//     enableImplicitConversion: true, // check type
//     excludePrefixes: ['_'],
//     exposeDefaultValues: undefined,
//   };

//   constructor(DTO: ClassConstructor<unknown>, options?: ClassTransformOptions) {
//     this.DTO = DTO;
//     this.customOptions = options;
//   }

//   private serializeResponse(DTO: ClassConstructor<unknown>, data: any | any[], options: ClassTransformOptions) {
//     data = data?.data || data;

//     let serializedData = plainToClass(DTO, data, options);

//     serializedData = JSON.parse(serialize(serializedData));

//     if (isArray(serializedData)) {
//       serializedData = serializedData.filter((item) => !isEmpty(item));
//     }

//     return serializedData;
//   }

//   private TypeOf(data: any): string {
//     if (isArray(data)) return 'array';
//     else if (isObject(data)) return 'object';
//     else return typeof data;
//   }

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map(async (data) => {
//         const result = { metadata: {}, data: null };

//         const serializedData = this.serializeResponse(this.DTO, data, this.customOptions || this.defaultOptions);

//         result.data = serializedData;

//         if (data.metaData) {
//           data.metaData[this.TypeOfData] = this.TypeOf(serializedData);

//           result.metadata = data.metaData;
//         } else {
//           result.metadata[this.TypeOfData] = this.TypeOf(serializedData);
//         }

//         return result;
//       }),
//     );
//   }
// }
