import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamInfoPage } from './team-info.page';

describe('TeamInfoPage', () => {
  let component: TeamInfoPage;
  let fixture: ComponentFixture<TeamInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
