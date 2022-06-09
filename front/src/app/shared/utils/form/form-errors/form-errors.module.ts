import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from '@root/app/shared/utils/form/form-errors/form-errors.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormErrorsKeysPipe } from './form-errors-keys.pipe';


@NgModule({
  declarations: [FormErrorsComponent, FormErrorsKeysPipe],
  exports: [FormErrorsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
})
export class FormErrorsModule {
}
