import { Rate } from "src/app/shared/interfaces/exchange";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, shareReplay, take } from "rxjs";
import { environment } from "src/environments/environment";
import { ExchangeRates } from "../interfaces/exchange";

@Injectable()
export class ExchangeService {
  private API_BASE_URL: string = environment.baseAPIURL;
  constructor(private http: HttpClient) {}

  getExchangeRates(
    dateFilterValue: string | null = null
  ): Observable<ExchangeRates[]> {
    // const apiURL = this.API_BASE_URL + 'exchangerates/tables/A/' + (dateFilterValue ? dateFilterValue : '');
    const apiURL =
      "assets/exchange-rates.json?" + (dateFilterValue ? dateFilterValue : "");
    return this.http.get<ExchangeRates[]>(apiURL);
    // return this.http.get<ExchangeRates[]>(
    //   this.API_BASE_URL + 'exchangerates/tables/A/?format=json'
    // );
  }

  getExchangeRatesObs(
    dateFilterValue: string | null = null
  ): Observable<Rate[]> {
    // const apiURL = this.API_BASE_URL + 'exchangerates/tables/A/' + (dateFilterValue ? dateFilterValue : '');
    const apiURL =
      "assets/exchange-rates.json?" + (dateFilterValue ? dateFilterValue : "");
    return this.http.get<ExchangeRates[]>(apiURL).pipe(
      map((value: ExchangeRates[]) => value[0].rates),
      take(2),
      shareReplay()
    );

    // .pipe(map(1)).subscribe((res: any)=> res[0]);
    // return this.http.get<ExchangeRates[]>(
    //   this.API_BASE_URL + 'exchangerates/tables/A/?format=json'
    // );
  }
}
