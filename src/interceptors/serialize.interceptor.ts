import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(map((data: any) => this.transformData(data)));
  }

  transformData(data) {
    return plainToClass(this.dto, data, {
      excludeExtraneousValues: true,
    });
  }
}

export function SerializeArray(dto: ClassConstructor) {
  return UseInterceptors(new SerializeArrayInterceptor(dto));
}

class SerializeArrayInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const entityInterceptor = new SerializeInterceptor(this.dto);

    return next
      .handle()
      .pipe(
        map((data: any[]) =>
          data.map((value) => entityInterceptor.transformData(value)),
        ),
      );
  }
}
