import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from '@root/app/main/modules/game/game-routing.module';
import { StoreModule } from '@ngrx/store';
import { gameReducer, STATE_NAME, } from '@root/app/main/modules/game/store/game.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from '@root/app/main/modules/game/store/game.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { GameBodyComponent } from './components/game-body/game-body.component';
import { GameSkeletonComponent } from './components/game-skeleton/game-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import { GameDetailsComponent } from './components/game-body/game-details/game-details.component';
import {
  GameDetailsSelectPlayerComponent
} from './components/game-body/game-details/game-details-select-player/game-details-select-player.component';
import { MatRadioModule } from '@angular/material/radio';
import {
  GetFormControlPipeModule
} from '@root/app/shared/utils/form/get-form-control-pipe/get-form-control-pipe.module';


@NgModule({
  declarations: [
    GameComponent,
    GameBodyComponent,
    GameSkeletonComponent,
    GameDetailsComponent,
    GameDetailsSelectPlayerComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    StoreModule.forFeature(STATE_NAME, gameReducer),
    EffectsModule.forFeature([GameEffects]),
    ApplicationErrorModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ToArrayModule,
    PaginatorModule,
    MatRadioModule,
    GetFormControlPipeModule,
  ],
})
export class GameModule {
}
