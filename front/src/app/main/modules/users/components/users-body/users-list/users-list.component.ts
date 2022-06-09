import { Component, Input } from '@angular/core';
import { User } from '@root/app/shared/models/user';
import { PageableResponse } from '@root/app/shared/models/pageable-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() usersResponse: PageableResponse<User>;
}
