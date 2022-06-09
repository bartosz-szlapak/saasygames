import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from '@root/app/main/modules/games/games-routing.module';
import { StoreModule } from '@ngrx/store';
import { gamesReducer, STATE_NAME, } from '@root/app/main/modules/games/store/games.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GamesEffects } from '@root/app/main/modules/games/store/games.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { GamesBodyComponent } from './components/games-body/games-body.component';
import { GamesSkeletonComponent } from './components/games-skeleton/games-skeleton.component';
import { GamesListComponent } from './components/games-body/games-list/games-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';


@NgModule({
  declarations: [
    GamesComponent,
    GamesBodyComponent,
    GamesSkeletonComponent,
    GamesListComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    StoreModule.forFeature(STATE_NAME, gamesReducer),
    EffectsModule.forFeature([GamesEffects]),
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
  ],
})
export class GamesModule {
}
