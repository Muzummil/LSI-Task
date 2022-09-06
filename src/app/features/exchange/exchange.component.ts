import { Subscription, Observable } from "rxjs";
import { LazyLoadEvent } from "primeng/api";
import { DatePipe } from "@angular/common";
import { ExchangeService } from "src/app/shared/services/exchange.service";
import { Component, OnInit } from "@angular/core";
import { ExchangeRates, Rate } from "src/app/shared/interfaces/exchange";
import { ThemeService } from "src/app/shared/services/theme.service";

@Component({
  selector: "app-exchange",
  templateUrl: "./exchange.component.html",
})
export class ExchangeComponent implements OnInit {
  public exchangeRates: Rate[] = [];
  public exchangeRates$: Observable<Rate[]>;
  public loading: boolean = false;
  private subscription: Subscription = new Subscription();
  errorMessage: string | null = null;
  constructor(
    private exchangeService: ExchangeService,
    private datepipe: DatePipe,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.changeTheme("md-light-indigo");
    // this.getExchangeRates();
    this.assignDataObs();
  }

  private assignDataObs(): void {
    this.exchangeRates$ = this.exchangeService.getExchangeRatesObs();
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  getExchangeRates = (dateFilterValue: string | null = null): void => {
    this.loading = true;
    this.subscription.add(
      this.exchangeService.getExchangeRates(dateFilterValue).subscribe(
        (res: ExchangeRates[]) => {
          this.exchangeRates = res[0].rates;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      )
    );
  };

  dataTableSelectionChangeEvent = (event: LazyLoadEvent): void => {
    // console.log(event);
    this.loading = true;
    setTimeout(() => {
      if (event.first && event.rows) {
        this.exchangeRates.slice(event.first, event.first + event.rows);
        this.loading = false;
      }
    }, 2000);
  };

  onDateValueChange(dateValue: Date) {
    // console.log(dateValue);
    const parsedDate = this.parseDate(dateValue);
    // console.log(parsedDate);
    this.getExchangeRates(parsedDate);
  }

  parseDate(dateValue: Date): string | null {
    return this.datepipe.transform(dateValue, "YYYY-MM-dd");
  }

  ngOnDestroy(): void {
    this.exchangeRates = [];
    this.loading = false;
    this.subscription.unsubscribe();
  }
}
