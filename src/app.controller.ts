import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

@Controller('demo')
export class AppController {
  @Get('/:date')
  get(@Param('date') date: string): string {
    const date_ = new Date(date);
    // TODO how to check date successfully parsed in typescript
    /*if (!(date instanceof Date)) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }*/

    //https://stackoverflow.com/a/65031248/1545567
    const toRoman = (num, result = '') => {
      const map = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      };
      for (const key in map) {
        if (num >= map[key]) {
          if (num !== 0) {
            return toRoman(num - map[key], result + key);
          }
        }
      }
      return result;
    };

    return `${toRoman(date_.getDate())}/${toRoman(date_.getMonth() + 1)}/${toRoman(date_.getFullYear())}`;
  }
}
