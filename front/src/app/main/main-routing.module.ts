import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@root/app/main/main.component';
import { IsLoggedGuard } from '@root/app/main/services/is-logged.guard';
import { IsAdminGuard } from '@root/app/main/services/is-admin.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
      {
        canActivate: [IsLoggedGuard],
        path: 'games',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/games/games.module').then(m => m.GamesModule),
          },
          {
            path: ':gameId',
            loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule),
          }
        ]
      },
      {
        path: 'matches',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/matches/matches.module').then(m => m.MatchesModule),
          },
          {
            path: ':matchId',
            loadChildren: () => import('./modules/match/match.module').then(m => m.MatchModule),
          }
        ]
      },
      {
        path: 'lounge',
        loadChildren: () => import('./modules/lounge/lounge.module').then(m => m.LoungeModule),
      },

      {
        canActivate: [IsLoggedGuard, IsAdminGuard],
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
          },
          {
            path: ':userId',
            loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
