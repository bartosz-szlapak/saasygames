import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFormControlPipe } from './get-form-control.pipe';


@NgModule({
  declarations: [GetFormControlPipe],
  exports: [
    GetFormControlPipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class GetFormControlPipeModule {
}
