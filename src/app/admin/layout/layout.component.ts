import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { JsLoaderService } from '../../../core/services/js-loader.service';
import { StyleLoaderService } from '../../../core/services/style-loader.service';
@Component({
  selector: '[tib-layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    this.jsLoader.loadJs();
  }
}
