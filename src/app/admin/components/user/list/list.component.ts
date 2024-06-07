import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { List_User } from 'src/app/contracts/users/list_user';
import { UserService } from 'src/core/services/models/user.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/core/services/alertify.service';
import { DialogService } from 'src/core/services/common/dialog.service';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';

@Component({
  selector: 'tib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'userName',
    'nameSurname',
    'email',
    'twoFactorEnabled',
    'role',
    'delete',
  ];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerType.ball);

    const allUsers: { totalUsersCount: number; users: List_User[] } =
      await this.userService.getAllUsers(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.ball),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.alertifyService.message('Roller başarıyla atanmıştır!', {
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
      },
    });
  }
}
