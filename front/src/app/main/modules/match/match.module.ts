import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';
import { MatchRoutingModule } from '@root/app/main/modules/match/match-routing.module';
import { StoreModule } from '@ngrx/store';
import { matchReducer, STATE_NAME, } from '@root/app/main/modules/match/store/match.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatchEffects } from '@root/app/main/modules/match/store/match.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { MatchBodyComponent } from './components/match-body/match-body.component';
import { MatchSkeletonComponent } from './components/match-skeleton/match-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import { MatchDetailsComponent } from './components/match-body/match-details/match-details.component';
import {
  MatchDetailsSelectPlayerComponent
} from './components/match-body/match-details/match-details-select-player/match-details-select-player.component';
import { MatRadioModule } from '@angular/material/radio';
import {
  GetFormControlPipeModule
} from '@root/app/shared/utils/form/get-form-control-pipe/get-form-control-pipe.module';
import { GameMatchService } from '@root/app/main/modules/match/game-match/game-match.service';
import { WebsocketServiceFactory } from '@root/app/main/modules/match/game-match/websocket-service.factory';
import { TicTacToeModule } from '@root/app/shared/modules/games/tic-tac-toe/tic-tac-toe.module';


@NgModule({
  declarations: [
    MatchComponent,
    MatchBodyComponent,
    MatchSkeletonComponent,
    MatchDetailsComponent,
    MatchDetailsSelectPlayerComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    StoreModule.forFeature(STATE_NAME, matchReducer),
    EffectsModule.forFeature([MatchEffects]),
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
    TicTacToeModule,
  ],
  providers: [
    GameMatchService,
    WebsocketServiceFactory
  ]
})
export class MatchModule {
}
