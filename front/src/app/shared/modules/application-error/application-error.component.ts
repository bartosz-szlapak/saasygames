import { Component, Input } from '@angular/core';
import { APPLICATION_ERROR_MESSAGE } from '@root/app/shared/modules/application-error/translations';

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.scss'],
})
export class ApplicationErrorComponent {
  @Input() statusCode: number;
  @Input() message: string;
  defaultMessage = APPLICATION_ERROR_MESSAGE;
}
