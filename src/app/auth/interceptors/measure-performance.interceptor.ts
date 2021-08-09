// import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
// import * as boxen from 'boxen';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// import { colours } from '../constants';

// const logger = new Logger();

// @Injectable()
// export class PerformanceMeasurement implements NestInterceptor {
//   private printLog(t1: Date, t2: Date, handlerName: string) {
//     const time = +t2 - +t1;
//     let content = '';
//     // add handler name
//     content += `${colours.fg.black}handler : ${handlerName}`;
//     // add execute time
//     content += `\n${colours.fg.black}execute time : ${time}ms`;

//     let backgroundColor: string;

//     if (time < 300) {
//       backgroundColor = 'greenBright';
//     } else if (time > 300 && time < 1000) {
//       backgroundColor = 'yellowBright';
//     } else if (time > 1000) {
//       backgroundColor = 'redBright';
//     }

//     const box = boxen(content, {
//       padding: 1,
//       align: 'center',
//       float: 'center',
//       borderStyle: 'bold',
//       borderColor: 'blue',
//       backgroundColor,
//     });

//     // eslint-disable-next-line no-console
//     console.log(box);
//   }

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const t1 = new Date();

//     const handlerName = context.getHandler().name;
//     const className = context.getClass().name;

//     return next.handle().pipe(
//       tap(() => {
//         if (process.env.NODE_ENV === 'production') {
//           logger.warn(
//             `PerformanceMeasurement decorator cannot execute in production in class << ${className}.${handlerName} >>`,
//           );
//           return;
//         }

//         const t2 = new Date();

//         this.printLog(t1, t2, handlerName);

//         return;
//       }),
//     );
//   }
// }
