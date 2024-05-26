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
    this.styleLoader.loadStyle('admin-styles', 'src/assets/css/style.css');
  }

  ngOnDestroy(): void {
    this.styleLoader.unloadStyle('admin-styles');
  }

  ngAfterViewInit(): void {
    this.jsLoader.loadJs();
  }
}
