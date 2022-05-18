import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      return '';
      // throw new BadRequestException('Value is undefined');
    } else if (value !== 'string') {
      return `${value}`;
    }
    return value;
  }
}
