import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from '@root/app/main/modules/matches/matches-routing.module';
import { StoreModule } from '@ngrx/store';
import { matchesReducer, STATE_NAME, } from '@root/app/main/modules/matches/store/matches.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatchesEffects } from '@root/app/main/modules/matches/store/matches.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { MatchesBodyComponent } from './components/matches-body/matches-body.component';
import { MatchesSkeletonComponent } from './components/matches-skeleton/matches-skeleton.component';
import { MatchesListComponent } from './components/matches-body/matches-list/matches-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import { UserNamesPipe } from './pipes/user-names.pipe';
import { MatchesFiltersComponent } from './components/matches-body/matches-filters/matches-filters.component';


@NgModule({
  declarations: [
    MatchesComponent,
    MatchesBodyComponent,
    MatchesSkeletonComponent,
    MatchesListComponent,
    UserNamesPipe,
    MatchesFiltersComponent,
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule,
    StoreModule.forFeature(STATE_NAME, matchesReducer),
    EffectsModule.forFeature([MatchesEffects]),
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
export class MatchesModule {
}
