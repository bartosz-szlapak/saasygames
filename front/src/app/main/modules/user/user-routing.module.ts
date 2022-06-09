import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@root/app/main/modules/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
