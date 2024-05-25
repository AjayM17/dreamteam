import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentsInfoPage } from './tournaments-info.page';

describe('TournamentsInfoPage', () => {
  let component: TournamentsInfoPage;
  let fixture: ComponentFixture<TournamentsInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
