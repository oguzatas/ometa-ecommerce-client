import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { JsLoaderService } from 'src/core/services/js-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    protected jsL: JsLoaderService
  ) {}
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.getRawValue()).subscribe((r) => {
        if (r.statusCode == HttpStatusCode.NoContent) {
          Swal.fire({
            icon: 'info',
            text: 'Kullanıcı bulunamadı',
            heightAuto: false,
          });
        }

        if (r.statusCode == HttpStatusCode.Forbidden) {
          Swal.fire({
            icon: 'info',
            text: 'Kullanıcı adı veya şifre yanlış',
            heightAuto: false,
          });
        }
        if (r.result) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.jsL.loadJs(['/assets/js/hoverable-collapse.js']);
  }
}
