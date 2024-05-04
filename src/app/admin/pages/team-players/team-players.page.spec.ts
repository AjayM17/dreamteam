import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamPlayersPage } from './team-players.page';

describe('TeamPlayersPage', () => {
  let component: TeamPlayersPage;
  let fixture: ComponentFixture<TeamPlayersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
