import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectPlatformStats, } from '@root/app/main/modules/main-page/modules/stats/store/stats.selectors';

@Component({
  selector: 'app-stats-platform',
  templateUrl: './stats-platform.component.html',
  styleUrls: ['./stats-platform.component.scss'],
})
export class StatsPlatformComponent {

  platformStats$ = this.store$.pipe(select(selectPlatformStats));

  constructor(
    private readonly store$: Store,
  ) {
  }

}
