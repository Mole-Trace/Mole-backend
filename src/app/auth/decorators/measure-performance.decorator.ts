import { UseInterceptors, applyDecorators } from '@nestjs/common';

import { PerformanceMeasurement } from '../interceptors/measure-performance.interceptor';

export const MeasurePerformance = () => {
  return applyDecorators(UseInterceptors(PerformanceMeasurement));
};
