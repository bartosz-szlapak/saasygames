import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tic-tac-toe.component';


@NgModule({
  declarations: [
    TicTacToeComponent
  ],
  exports: [
    TicTacToeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TicTacToeModule {
}
