import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matches-filters',
  templateUrl: './matches-filters.component.html',
  styleUrls: ['./matches-filters.component.scss']
})
export class MatchesFiltersComponent implements OnChanges {

  @Input() userName: string;
  control = new FormControl();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userName) {
      this.control.patchValue(this.userName);
    }
  }

  test(userName: string) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {userName}
    });
  }
}
