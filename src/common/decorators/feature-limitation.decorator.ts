import { applyDecorators, SetMetadata } from '@nestjs/common';

import { FeatureLimitationInterface } from '../interface/feature-limit.interface';

export const RestrictFeatures = (params: FeatureLimitationInterface) => {
  return applyDecorators(SetMetadata('APP_FEATURE_LIMIT', params));
};
