import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from '@root/app/main/modules/match/match.component';

const routes: Routes = [
  {
    path: '',
    component: MatchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MatchRoutingModule {
}
