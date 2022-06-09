import { Component, Input } from '@angular/core';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';
import { Store } from '@ngrx/store';
import { joinMatch } from '@root/app/main/modules/lounge/store/lounge.actions';

@Component({
  selector: 'app-lounge-match-list',
  templateUrl: './lounge-match-list.component.html',
  styleUrls: ['./lounge-match-list.component.scss'],
})
export class LoungeMatchListComponent {
  @Input() response: PageableResponse<Match>;
  @Input() userId: string;

  constructor(
    private readonly store$: Store
  ) {
  }

  join(matchId: string): void {
    this.store$.dispatch(joinMatch({matchId}));
  }
}
