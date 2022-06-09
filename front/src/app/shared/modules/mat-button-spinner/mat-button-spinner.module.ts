import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonSpinnerDirective } from '@root/app/shared/modules/mat-button-spinner/mat-button-spinner.directive';


@NgModule({
  declarations: [MatButtonSpinnerDirective],
  exports: [MatButtonSpinnerDirective],
  imports: [
    CommonModule
  ]
})
export class MatButtonSpinnerModule {
}
