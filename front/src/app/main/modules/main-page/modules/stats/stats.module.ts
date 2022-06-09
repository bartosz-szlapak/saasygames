import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StoreModule } from '@ngrx/store';
import { STATE_NAME, statsReducer, } from '@root/app/main/modules/main-page/modules/stats/store/stats.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StatsEffects } from '@root/app/main/modules/main-page/modules/stats/store/stats.effects';
import { ApplicationErrorModule } from '@root/app/shared/modules/application-error/application-error.module';
import { StatsPlatformComponent } from './components/stats-platform/stats-platform.component';
import { StatsSkeletonComponent } from './components/stats-skeleton/stats-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToArrayModule } from '@root/app/shared/pipes/to-array/to-array.module';
import { PaginatorModule } from '@root/app/shared/modules/paginator/paginator.module';
import {
  StatsUserComponent
} from '@root/app/main/modules/main-page/modules/stats/components/stats-user/stats-user.component';


@NgModule({
  declarations: [
    StatsComponent,
    StatsPlatformComponent,
    StatsSkeletonComponent,
    StatsUserComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_NAME, statsReducer),
    EffectsModule.forFeature([StatsEffects]),
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
  exports: [
    StatsComponent
  ]
})
export class StatsModule {
}
