/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePanoramaComponent } from './quote-panorama.component';

describe('QuotePanoramaComponent', () => {
  let component: QuotePanoramaComponent;
  let fixture: ComponentFixture<QuotePanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePanoramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
