import { Component, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/core/models/user';
import Swal from 'sweetalert2';
import { BaseListComponent } from '../base-list/base-list.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { UsersService } from './users.service';

@Component({
  selector: '[tib-users]',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BaseListComponent<User> {
  constructor(
    service: UsersService,
    protected modal: NgbModal,
    injector: Injector
  ) {
    super(service, modal, injector);
    this.filter = {
      username: null,
      email: null,
    };
    this.editModal = {
      component: UserModalComponent,
      options: {
        mode: 'edit',
      },
    };

    this.addModal = {
      component: UserModalComponent,
      options: {
        mode: 'add',
      },
    };
  }

  delete(id: string) {
    Swal.fire({
      title: 'Emin misin?',
      text: 'Bu işlem geri alınamaz.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Vazgeç',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Silindi!', 'Site silindi.', 'success');
      }
    });
  }
}
