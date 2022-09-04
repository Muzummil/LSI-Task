import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExchangeRoutingModule } from './exchange-routing.module';

import { ExchangeComponent } from './exchange.component';
import { ExchangeTableComponent } from './components/exchange-table/exchange-table.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ExchangeComponent, ExchangeTableComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ExchangeRoutingModule,
    TableModule,
    CalendarModule,
    SharedModule,
    ButtonModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ConverterModule {}
