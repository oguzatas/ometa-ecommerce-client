import { AfterViewInit, Component } from '@angular/core';
import { JsLoaderService } from '../services/js-loader.service';

@Component({
  selector: '[tib-layout]',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  constructor(protected jsLoader: JsLoaderService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.jsLoader.loadJs();
  }
}
