import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSiteListComponent } from './web-site-list.component';

describe('ListComponent', () => {
  let component: WebSiteListComponent;
  let fixture: ComponentFixture<WebSiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebSiteListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
