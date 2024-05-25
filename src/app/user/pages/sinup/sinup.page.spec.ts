import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinupPage } from './sinup.page';

describe('SinupPage', () => {
  let component: SinupPage;
  let fixture: ComponentFixture<SinupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SinupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
