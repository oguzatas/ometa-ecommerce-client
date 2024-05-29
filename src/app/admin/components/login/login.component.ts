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

  ngOnInit(): void {
    this.styleLoader.loadStyle(
      'mdi',
      '../../../../assets/vendors/mdi/css/materialdesignicons.min.css'
    );
    this.styleLoader.loadStyle(
      'vendor-base',
      '../../../../assets/vendors/css/vendor.bundle.base.css'
    );
    this.styleLoader.loadStyle(
      'admin-styles',
      '../../../../assets/css/style.css'
    );
    this.styleLoader.loadStyle(
      'google-font-roboto',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap'
    );
    this.styleLoader.loadStyle(
      'google-material-icons',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    );
  }

  ngOnDestroy(): void {
    this.styleLoader.unloadStyle('mdi');
    this.styleLoader.unloadStyle('vendor-base');
    this.styleLoader.unloadStyle('admin-styles');
    this.styleLoader.unloadStyle('google-font-roboto');
    this.styleLoader.unloadStyle('google-material-icons');
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.ball);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.ball);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
