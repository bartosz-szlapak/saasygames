import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeComponent } from '@root/app/main/modules/lounge/lounge.component';

const routes: Routes = [
  {
    path: '',
    component: LoungeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LoungeRoutingModule {
}
