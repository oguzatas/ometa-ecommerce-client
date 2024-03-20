import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerType: string) {
    this.spinner.show(spinnerType);
  }

  hideSpinner(spinnerType: string) {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType {
  wheel = 'cog',
  spin = 'spin',
  ball = 'ball',
}
