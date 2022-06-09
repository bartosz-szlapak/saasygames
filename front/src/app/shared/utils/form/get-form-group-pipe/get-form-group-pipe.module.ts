import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFormGroupPipe } from './get-form-group.pipe';


@NgModule({
  declarations: [GetFormGroupPipe],
  exports: [
    GetFormGroupPipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class GetFormGroupPipeModule {
}
