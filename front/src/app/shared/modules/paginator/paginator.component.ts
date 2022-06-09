import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {

  @Input() page: number;
  @Input() totalPages: number;
  @Output() pageChange = new EventEmitter<number>();

  prevButtonDisabled: boolean;
  nextButtonDisabled: boolean;
  showPagination: boolean;

  ngOnChanges(): void {
    this.showPagination = this.totalPages > 1;
    this.prevButtonDisabled = this.page === 0;
    this.nextButtonDisabled = this.page === this.totalPages - 1;
  }

  changePage(page: number): void {
    this.pageChange.emit(page);
  }
}
