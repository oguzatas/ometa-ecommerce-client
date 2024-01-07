import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSite } from 'src/core/models/website';
import { BaseService } from '../base-list/base.service';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService extends BaseService<WebSite> {
  constructor(protected http: HttpClient) {
    super(http, 'website');
  }
}
