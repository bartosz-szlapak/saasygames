import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'log-in',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'create-account',
        loadChildren: () => import('./modules/create-account/create-account.module').then(m => m.CreateAccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
