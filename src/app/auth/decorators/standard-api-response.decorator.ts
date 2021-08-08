import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const arrayConfig = (DTO) => {
  return {
    type: 'array',
    items: {
      $ref: getSchemaPath(DTO),
    },
  };
};

const objectConfig = (DTO) => {
  return {
    type: 'object',
    $ref: getSchemaPath(DTO),
  };
};

export const StandardApiResponse = ({ DTO, isArray, description, status }) => {
  return applyDecorators(
    ApiExtraModels(DTO),
    ApiResponse({
      description,
      status,
      content: {
        'application-json': {
          schema: {
            properties: {
              data: isArray ? arrayConfig(DTO) : objectConfig(DTO),
              metadata: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  size: { type: 'number' },
                  page: { type: 'number' },
                },
              },
            },
          },
        },
      },
    }),
  );
};
