import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ParisTemperature {
  min_temp: number;
  max_temp: number;
}

@Injectable()
export class TemperatureInParisService {
  constructor(private httpService: HttpService) {}

  retieveTemperaturesInParis(date: Date): Observable<ParisTemperature> {
    const parisWoeid = 615702;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return this.httpService
      .get<ParisTemperature[]>(
        `https://www.metaweather.com/api/location/${parisWoeid}/${year}/${month}/${day}/`,
      )
      .pipe(map((response) => (response.data as ParisTemperature[])[0]));
  }
}
