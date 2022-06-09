import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { jwtStateReducer, STATE_NAME } from '@root/app/core/modules/jwt-state/store/jwt-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { JwtStateEffects } from '@root/app/core/modules/jwt-state/store/jwt-state.effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_NAME, jwtStateReducer),
    EffectsModule.forFeature([JwtStateEffects]),
  ],
})
export class JwtStateModule {
}
