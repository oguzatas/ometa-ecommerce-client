import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core';

import { HttpClientService } from 'src/core/services/http-client.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';

declare var $: any;

@Directive({
  selector: '[tibDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog
  ) {
    const button = _renderer.createElement('button');
    button.setAttribute('class', 'btn btn-danger');

    button.textContent = 'Sil';
    _renderer.appendChild(element.nativeElement, button);
  }

  ngAfterViewInit() {}

  @Input() id: string;
  @Input() controller: string;

  @HostListener('click')
  async onClick() {
    const td: HTMLElement = this.element.nativeElement;
    this.httpClientService
      .delete({ controller: this.controller }, this.id)
      .subscribe();
    $(td.parentElement).fadeOut(2000);
  }
}
