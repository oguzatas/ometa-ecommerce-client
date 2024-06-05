import { Component } from '@angular/core';
import { StyleLoaderService } from 'src/core/services/style-loader.service';
import { JsLoaderService } from 'src/core/services/js-loader.service';

@Component({
  selector: 'tib-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss'],
})
export class AuthlayoutComponent {
  constructor(
    protected jsLoader: JsLoaderService,
    private styleLoader: StyleLoaderService
  ) {}

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
}
