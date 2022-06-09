import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@root/app/shared/modules/not-found/not-found.component';
import { RestoreGuard } from '@root/app/core/services/restore.guard';


const routes: Routes = [
  {
    canActivate: [RestoreGuard],
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
