import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationErrorComponent } from './application-error.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ApplicationErrorComponent],
  exports: [ApplicationErrorComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
})
export class ApplicationErrorModule {
}
