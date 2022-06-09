import { Component, Input } from '@angular/core';
import { User } from '@root/app/shared/models/user';
import { UserStatusEnum } from '@root/app/shared/models/user-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '@root/app/shared/modules/yes-no-dialog/yes-no-dialog.component';
import { Store } from '@ngrx/store';
import { banUser } from '@root/app/main/modules/user/store/user.actions';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
})
export class UserContentComponent {
  @Input() user: User;
  userStatusEnum = UserStatusEnum

  constructor(
    private dialog: MatDialog,
    private store$: Store,
  ) {
  }

  ban(id: number) {
    this.dialog.open(YesNoDialogComponent, {data: {title: 'Confirm banning user'}})
      .afterClosed()
      .subscribe(value => {
        if (!value) {
          return;
        }

        this.store$.dispatch(banUser({id}));
      })
  }
}
