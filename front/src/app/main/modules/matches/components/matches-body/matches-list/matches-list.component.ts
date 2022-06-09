import { Component, Input } from '@angular/core';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Match } from '@root/app/shared/models/match';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
})
export class MatchesListComponent {
  @Input() response: PageableResponse<Match>;
}
