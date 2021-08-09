// import { HttpCode, applyDecorators } from '@nestjs/common';

// import { StandardSerializer } from './serializer.decorator';
// import { StandardApiResponse } from './standard-api-response.decorator';

// interface StandardApiInterface {
//   ResponseDTO: any;
//   status: number;
//   description?: string;
//   isArray?: boolean;
// }

// export const StandardApi = (params: StandardApiInterface) => {
//   const { ResponseDTO, status, description, isArray } = params;

//   return applyDecorators(
//     HttpCode(params.status),
//     StandardSerializer(ResponseDTO),
//     StandardApiResponse({
//       status,
//       description,
//       DTO: ResponseDTO,
//       isArray: isArray || false,
//     }),
//   );
// };
