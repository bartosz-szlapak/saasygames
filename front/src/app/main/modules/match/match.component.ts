import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { requestMatch } from '@root/app/main/modules/match/store/match.actions';

@Component({
  selector: 'app-my-matches',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {

  constructor(
    private readonly store$: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.matchId;
    this.store$.dispatch(requestMatch({id}));
  }
}
