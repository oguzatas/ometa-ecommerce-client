import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from 'src/core/services/event.service';
import Swal from 'sweetalert2';
import { DetailService } from './detail.service';

/**
    *   _____                 _ _
       /  __ \               | (_)
       | /  \/ __ _ _ __   __| |_  ___
       | |    / _` | '_ \ / _` | |/ _ \
       | \__/\ (_| | | | | (_| | |  __/
        \____/\__,_|_| |_|\__,_|_|\___|
       serhatkaya.sr@gmail.com
    */
@Component({
  selector: '[tib-detail]',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnDestroy {
  destroy$ = new Subject();
  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    telegramId: new FormControl(),
    checkEvery: new FormControl(null, [Validators.required]),
    checkValue: new FormControl(null, [Validators.required]),
    https: new FormControl(null, [Validators.required]),
    maximumRetries: new FormControl(null, [Validators.required]),
    state: new FormControl(),
    ignoreSslErrors: new FormControl(null, [Validators.required]),
    lastCheck: new FormControl(),
  });
  operation: 'add' | 'edit';

  constructor(
    route: ActivatedRoute,
    public service: DetailService,
    private eventService: EventService,
    private router: Router
  ) {
    route.queryParams.subscribe((r) => {
      if (r.id) {
        this.operation = 'edit';
        this.service.getDetail(r.id);
      } else {
        this.operation = 'add';
        this.form.reset();
        this.form.patchValue({
          https: false,
          ignoreSslErrors: true,
          status: 1,
          checkEvery: 2,
        });
      }
    });

    this.service.detail$.pipe(takeUntil(this.destroy$)).subscribe((r) => {
      if (this.operation == 'edit') {
        this.form.reset();
        this.form.patchValue(r.result);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  submit() {
    if (this.form.valid) {
      if (this.operation == 'edit') {
        this.service.update(this.form.getRawValue()).subscribe((r) => {
          Swal.fire({
            toast: true,
            text: `${this.f.name.value} güncellendi.`,
            timer: 3000,
            position: 'top-right',
          });

          this.eventService.broadcast('updateinlist', r.result);
        });
      } else {
        this.service.save(this.form.getRawValue()).subscribe(
          (r) => {
            if (r.result) {
              Swal.fire({
                toast: true,
                text: `${this.f.name.value} kaydedildi`,
                timer: 3000,
                position: 'top-right',
              });

              this.eventService.broadcast('updateinlist', r.result);
              this.router.navigate(['detail'], {
                queryParams: {
                  id: r.result.id,
                },
              });
            }
          },
          (err) => {
            if (err.error) {
              if ((err.error.message = 'outof_quota')) {
                Swal.fire('Yetersiz bakiye', 'Hata', 'error');
              }
            } else {
              Swal.fire('Bilinmeyen bir hata oluştu', 'Hasta', 'error');
            }
          }
        );
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  get f() {
    return this.form.controls;
  }

  delete() {
    Swal.fire({
      title: 'Emin misin?',
      text: 'Bu işlem geri alınamaz.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Vazgeç',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(this.form.controls.id.value).subscribe((r) => {
          Swal.fire('Silindi!', 'Site silindi.', 'success');
          this.eventService.broadcast(
            'removeinlist',
            this.form.controls.id.value
          );
          this.router.navigate(['welcome']);
        });
      }
    });
  }

  reTest() {
    if (this.operation == 'edit') {
      this.service.reTest(this.form.controls.id.value).subscribe((r) => {
        this.eventService.broadcast('refreshlist', 1);
        this.form.controls.state.setValue(1);
      });
    }
  }
}
