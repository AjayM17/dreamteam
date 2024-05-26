import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchInfoPage } from './match-info.page';

describe('MatchInfoPage', () => {
  let component: MatchInfoPage;
  let fixture: ComponentFixture<MatchInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
