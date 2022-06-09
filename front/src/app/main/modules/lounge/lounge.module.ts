import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoungeComponent } from './lounge.component';
import { LoungeRoutingModule } from '@root/app/main/modules/lounge/lounge-routing.module';
import { StoreModule } from '@ngrx/store';
import { loungeReducer, STATE_NAME, } from '@root/app/main/modules/lounge/store/lounge.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoungeEffects } from '@root/app/main/modules/lounge/store/lounge.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { LoungeBodyComponent } from './components/lounge-body/lounge-body.component';
import { LoungeSkeletonComponent } from './components/lounge-skeleton/lounge-skeleton.component';
import { LoungeMatchListComponent } from './components/lounge-body/lounge-match-list/lounge-match-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import { IsMatchParticipantPipe } from './pipes/is-match-participant.pipe';


@NgModule({
  declarations: [
    LoungeComponent,
    LoungeBodyComponent,
    LoungeSkeletonComponent,
    LoungeMatchListComponent,
    IsMatchParticipantPipe,
  ],
  imports: [
    CommonModule,
    LoungeRoutingModule,
    StoreModule.forFeature(STATE_NAME, loungeReducer),
    EffectsModule.forFeature([LoungeEffects]),
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
export class LoungeModule {
}
