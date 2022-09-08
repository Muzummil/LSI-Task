import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExchangeService } from "./services/exchange.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestsInterceptor } from "./interceptors/requests.interceptors";
import { CacheService } from "./services/cache.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ExchangeService,
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
