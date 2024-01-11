import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/core/models/user';
import Swal from 'sweetalert2';
import { UsersService } from '../users/users.service';

@Component({
  selector: '[tib-user-modal]',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  user: User;
  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    balance: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    role: new FormControl(null, [Validators.required]),
    changePassword: new FormControl(false),
  });

  mode: 'add' | 'edit';
  id: string;
  constructor(
    private activeModal: NgbActiveModal,
    private service: UsersService
  ) {}

  ngOnInit(): void {
    if (this.mode == 'edit') {
      this.service.getById(this.id).subscribe((r) => {
        this.user = r.result;
        delete r.result.password;
        this.form.patchValue(r.result);
        this.form.removeControl('password');
        this.form.controls.changePassword.valueChanges.subscribe((r) => {
          if (r && r == true) {
            this.form.addControl(
              'password',
              new FormControl(null, [Validators.required])
            );
          } else {
            this.form.removeControl('password');
          }
        });
      });
    }
  }

  close(fetchData: boolean) {
    this.activeModal.close(fetchData);
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const model = this.form.getRawValue();
      if (this.mode == 'edit' && !model.changePassword) {
        delete model.password;
      } else {
        delete model.id;
      }

      delete model.changePassword;
      switch (this.mode) {
        case 'edit':
          this.service.updateUser(model).subscribe((r) => {
            Swal.fire({
              text: `${model.name} güncellendi.`,
              toast: true,
              timer: 3000,
              position: 'top-right',
            });
            this.close(true);
          });
          break;
        case 'add':
          this.service.saveUser(model).subscribe((r) => {
            Swal.fire({
              text: 'Kullanıcı kaydedildi.',
              toast: true,
              timer: 3000,
              position: 'top-right',
            });
            this.close(true);
          });
          break;
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
