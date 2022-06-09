import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderModule } from '@root/app/main/modules/header/header.module';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from '@root/app/main/main-routing.module';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    MainRoutingModule,
  ],
})
export class MainModule {
}
