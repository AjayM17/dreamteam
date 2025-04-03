import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-tournaments-info',
  templateUrl: './tournaments-info.page.html',
  styleUrls: ['./tournaments-info.page.scss'],
})
export class TournamentsInfoPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal | undefined;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  tournament: any
  active_tab = 'teams'
  teams: any[] = []
  matches: any[] = []
  team_one_id: string = ''
  team_one_name: string = ''
  team_two_id: string = ''
  team_two_name: string = ''
  match_date: string = "2023-11-02T01:22:00"
  public teamAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
  public teamAlertInputs = [
    {
      placeholder: 'Enter Team Name',
    }
  ];

  constructor(private router:Router, private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.tournament = JSON.parse(params['tournament'])
    })
  }

  ngOnInit() {
    this.getTeams()
    this.getMatches()
  }

  onSegmentChange(event: any) {
    this.active_tab = event.detail.value
  }

  onTeamAlertDismiss(event: any) {
    if(event.detail.role == "confirm"){
      const team = {
        name: event.detail.data.values[0],
        tournament_id: this.tournament['id']
      }
      this.firestoreService.addTeam(team).subscribe(res => {
        this.getTeams()
      })
    }
  }

  async getTeams() {
    this.teams = await this.firestoreService.getTournamentTeams(this.tournament['id'])
  }

  async getMatches() {
    this.matches = await this.firestoreService.getTournamentMatches(this.tournament['id'])
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(this.name, 'confirm');
    const match = {
      tournament_id:this.tournament['id'],
      team_one_id: this.team_one_id,
      team_one_name: this.team_one_name,
      team_two_id: this.team_two_id,
      team_two_name: this.team_two_name,
      match_date: this.match_date
    }
    if (this.team_one_id == '') {
      alert('Select Team 1')
      return
    }

    if (this.team_two_id == '') {
      alert('Select Team 2')
      return
    }
    this.firestoreService.createMatch(match).subscribe(res => {
      this.getMatches()
    })

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  onSelectTeam(event: any, team: string) {
    if (team == 'team_one') {
      this.team_one_id = event.detail.value['id']
      this.team_one_name = event.detail.value['name']
    } else {
      this.team_two_id = event.detail.value['id']
      this.team_two_name = event.detail.value['name']
    }
  }

  players(team:any){
    const navigationExtras: NavigationExtras = {
      queryParams:{ team: JSON.stringify(team)}
     }
     this.router.navigate(['admin/dashboard/team-info'],navigationExtras)
  }

  matchInfo(match:any){
    const navigationExtras: NavigationExtras = {
      queryParams:{ match: JSON.stringify(match)}
     }
     this.router.navigate(['admin/dashboard/match-info'],navigationExtras)
  }
}
