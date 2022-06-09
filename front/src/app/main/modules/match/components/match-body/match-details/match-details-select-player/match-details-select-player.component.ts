import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DifficultyEnum } from '@root/app/shared/models/difficulty.enum';

@Component({
  selector: 'app-matches-details-select-player',
  templateUrl: './match-details-select-player.component.html',
  styleUrls: ['./match-details-select-player.component.scss']
})
export class MatchDetailsSelectPlayerComponent {
  @Input() formGroup: FormGroup;
  difficulty = DifficultyEnum;
}
