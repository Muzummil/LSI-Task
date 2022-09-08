import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Table } from "primeng/table";
import { Rate } from "src/app/shared/interfaces/exchange";
@Component({
  selector: "app-converter-exchange-table",
  templateUrl: "./exchange-table.component.html",
  styleUrls: ["./exchange-table.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeTableComponent implements OnInit {
  @Input() dataList: Rate[] = [];
  @Input() errorMessage: string | null | undefined = null;
  @Input() loading: boolean = false;
  @Output() pageNumber: number = 0;
  @Output() dataTableSelectionChangeEvent: EventEmitter<LazyLoadEvent> =
    new EventEmitter<LazyLoadEvent>();
  @Output() dateChangeEvent: EventEmitter<Date> = new EventEmitter<Date>();

  totalRecords: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataList"]) {
      this.totalRecords = changes["dataList"].currentValue.length;
    }
  }

  loadCustomers(event: LazyLoadEvent) {
    this.dataTableSelectionChangeEvent.next(event);
  }

  onDateFilterChange(event: Date) {
    this.dateChangeEvent.next(event);
  }

  clear(table: Table) {
    table.clear();
  }
}
