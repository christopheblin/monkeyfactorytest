import { Injectable } from '@nestjs/common';

@Injectable()
export class RomanConverterService {
  // https://stackoverflow.com/a/65031248/1545567
  toRoman(num, result = '') {
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
          return this.toRoman(num - map[key], result + key);
        }
      }
    }
    return result;
  }
}
