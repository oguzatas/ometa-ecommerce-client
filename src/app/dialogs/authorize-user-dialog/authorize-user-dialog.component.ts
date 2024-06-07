import { Component } from '@angular/core';
import { UserService } from 'src/core/services/models/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/core/services/alertify.service';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/core/services/models/role.service';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { SpinnerType } from 'src/app/base/base.component';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'tib-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss'],
})
export class AuthorizeUserDialogComponent
  extends BaseDialog<AuthorizeUserDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }
  roles: { datas: List_Role[]; totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string; selected: boolean }[];
  async ngOnInit() {
    this.spinner.show(SpinnerType.ball);
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () =>
      this.spinner.hide(SpinnerType.ball)
    );

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1,
      };
    });
  }

  // assignRoles(rolesComponent: MatSelectionList) {
  //   const roles: string[] = rolesComponent.selectedOptions.selected.map(
  //     (o) => o._text.nativeElement.innerText
  //   );
  //   this.spinner.show(SpinnerType.ball);
  //   this.userService.assignRoleToUser(
  //     this.data,
  //     roles,
  //     () => {
  //       this.spinner.hide(SpinnerType.ball);
  //     },
  //     (error) => {}
  //   );
  // }
}
