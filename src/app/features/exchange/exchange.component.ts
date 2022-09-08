import { ErrorService } from "./../../shared/services/error.service";
import { Observable, catchError, of, ignoreElements } from "rxjs";
import { LazyLoadEvent } from "primeng/api";
import { DatePipe } from "@angular/common";
import { ExchangeService } from "src/app/shared/services/exchange.service";
import { Component, OnInit } from "@angular/core";
import { Rate } from "src/app/shared/interfaces/exchange";
import { ThemeService } from "src/app/shared/services/theme.service";
import { CustomErrorObj } from "src/app/shared/interfaces/error";

@Component({
  selector: "app-exchange",
  templateUrl: "./exchange.component.html",
})
export class ExchangeComponent implements OnInit {
  public exchangeRates$: Observable<Rate[]> | null = null;
  public exchangeRatesError$: Observable<string> | null = null;

  constructor(
    private exchangeService: ExchangeService,
    private datepipe: DatePipe,
    private themeService: ThemeService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.assignDataObs();
  }

  private assignDataObs(dateFilterValue: string | null = null): void {
    this.exchangeRates$ =
      this.exchangeService.getExchangeRatesObs(dateFilterValue);
    this.exchangeRatesError$ = this.exchangeRates$.pipe(
      ignoreElements(),
      catchError((error: CustomErrorObj) => {
        const errorMessage: string = this.errorService.getErrorMessage(error);
        return of(errorMessage);
      })
    );
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  dataTableSelectionChangeEvent = (event: LazyLoadEvent): void => {
    console.log(event);
  };

  onDateValueChange(dateValue: Date) {
    const parsedDate = this.parseDate(dateValue);
    this.assignDataObs(parsedDate);
  }

  parseDate(dateValue: Date): string | null {
    return this.datepipe.transform(dateValue, "YYYY-MM-dd");
  }
}
