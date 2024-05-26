import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleLoaderService } from 'src/core/services/style-loader.service';
import { JsLoaderService } from 'src/core/services/js-loader.service';
@Component({
  selector: 'tib-uilayout',
  templateUrl: './uilayout.component.html',
  styleUrls: ['./uilayout.component.scss'],
})
export class UilayoutComponent implements OnInit, OnDestroy {
  constructor(
    private styleLoader: StyleLoaderService,
    private jsLoaderService: JsLoaderService
  ) {}

  ngOnInit(): void {
    this.styleLoader.unloadStyle('admin-styles');
    this.styleLoader.loadStyle(
      'ui-styles',
      '../../../../assets/ui/css/style.css'
    );
    this.styleLoader.loadStyle(
      'bootstrap',
      '../../../../assets/ui/css/bootstrap.min.css'
    );
  }
  ngOnDestroy(): void {
    this.styleLoader.unloadStyle('ui-styles');
    this.styleLoader.unloadStyle('bootstrap');
  }
}
