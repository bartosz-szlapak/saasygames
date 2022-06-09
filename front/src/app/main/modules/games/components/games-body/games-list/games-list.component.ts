import { Component, Input } from '@angular/core';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { Game } from '@root/app/shared/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent {
  @Input() response: PageableResponse<Game>;
}
