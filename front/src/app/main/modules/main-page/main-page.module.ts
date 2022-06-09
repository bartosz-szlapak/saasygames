import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from '@root/app/main/modules/main-page/main-page-routing.module';
import { StatsModule } from '@root/app/main/modules/main-page/modules/stats/stats.module';


@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    StatsModule,
  ],
})
export class MainPageModule {
}
