import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from '@root/app/main/modules/auth/modules/create-account/create-account.component';


const routes: Routes = [
  {
    path: '',
    component: CreateAccountComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CreteAccountRoutingModule {
}
