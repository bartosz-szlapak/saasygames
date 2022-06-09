import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoDialogComponent } from './yes-no-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [YesNoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule.forChild(),
  ],
})
export class YesNoDialogModule {
}
