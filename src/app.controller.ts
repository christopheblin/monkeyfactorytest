import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RomanConverterService } from './romanconverter.service';

export interface DemoResponse {
  romanDateStr: string;
  receivedDateStr: string;
}

@Controller('demo')
export class AppController {
  constructor(private romanConverterService: RomanConverterService) {}

  @Get('/:date')
  get(@Param('date') date: string): DemoResponse {
    const date_ = new Date(date);
    // TODO how to check date successfully parsed in typescript
    /*if (!(date instanceof Date)) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }*/

    const day = this.romanConverterService.toRoman(date_.getDate());
    const month = this.romanConverterService.toRoman(date_.getMonth() + 1);
    const year = this.romanConverterService.toRoman(date_.getFullYear());

    return { romanDateStr: `${day}/${month}/${year}`, receivedDateStr: date };
  }
}
