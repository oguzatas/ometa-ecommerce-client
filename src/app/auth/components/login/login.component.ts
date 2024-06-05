import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { StyleLoaderService } from 'src/core/services/style-loader.service';
import { UserAuthService } from 'src/core/services/models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'tib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent {
  constructor(
    private styleLoader: StyleLoaderService,
    private userAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.ball);
      switch (user.provider) {
        case 'GOOGLE':
          await userAuthService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.ball);
          });
          break;
        case 'FACEBOOK':
          await userAuthService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.ball);
          });
          break;
      }
    });
  }

  onSubmit(usernameOrEmail: string, password: string) {
    console.log('Form submitted', { usernameOrEmail, password });
    this.login(usernameOrEmail, password);
  }

  async login(usernameOrEmail: string, password: string) {
    console.log('Login attempt', { usernameOrEmail, password });
    this.showSpinner(SpinnerType.ball);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
        else this.router.navigate(['/']);
      });
      this.hideSpinner(SpinnerType.ball);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin() {
    this.socialAuthService.signIn('GOOGLE');
  }
}
