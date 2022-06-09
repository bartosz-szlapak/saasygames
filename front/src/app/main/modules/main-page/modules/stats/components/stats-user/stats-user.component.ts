import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserStats } from '@root/app/main/modules/main-page/modules/stats/store/stats.selectors';

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.scss'],
})
export class StatsUserComponent {

  userStats$ = this.store$.pipe(select(selectUserStats));

  constructor(
    private readonly store$: Store,
  ) {
  }

}
