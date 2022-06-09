import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '@root/app/shared/modules/paginator/paginator.component';
import { MatButtonModule } from '@angular/material/button';
import { PageNumberPipe } from '@root/app/shared/modules/paginator/pipes/page-number.pipe';
import { NumberOfPagesPipe } from '@root/app/shared/modules/paginator/pipes/number-of-pages.pipe';


@NgModule({
  declarations: [
    PageNumberPipe,
    PaginatorComponent,
    NumberOfPagesPipe
  ],
  exports: [
    PageNumberPipe,
    PaginatorComponent,
    NumberOfPagesPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class PaginatorModule {
}
