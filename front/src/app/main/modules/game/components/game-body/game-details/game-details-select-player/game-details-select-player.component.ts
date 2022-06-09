import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DifficultyEnum } from '@root/app/shared/models/difficulty.enum';

@Component({
  selector: 'app-game-details-select-player',
  templateUrl: './game-details-select-player.component.html',
  styleUrls: ['./game-details-select-player.component.scss']
})
export class GameDetailsSelectPlayerComponent {
  @Input() formGroup: FormGroup;
  difficulty = DifficultyEnum;
}
