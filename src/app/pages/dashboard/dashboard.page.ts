import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/admin/service/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private firestoreService = inject(FirestoreService)
  teams: any[] = []
  players: any[] = []
  team_one_players:any [] = []
  team_one_name :string = ''
  team_two_players:any [] = []
  team_two_name :string = ''
  selected_team = "team_one"
  default_selected_team :any


  constructor() { }

  async ngOnInit() {
    // throw new Error('Method not implemented.');
    this.getTeams()
  }

  async getTeams() {
    this.teams = await this.firestoreService.getAllTeams()
    console.log(this.teams)
    this.default_selected_team = this.teams[0]
    console.log(this.default_selected_team)
    this.team_one_players = await this.firestoreService.getPlayersByTeam(this.teams[0]['id'])
    this.team_one_name =  this.teams[0]['name']
  }
  async getPlayers() {
    this.players = await this.firestoreService.getAllPlayers()
  }

  async onSelectTeam(event:any, team:string){
    if(team == 'team_one'){
      this.selected_team = 'team_one'
     this.team_one_name = event.detail.value['name']
      this.team_one_players = await this.firestoreService.getPlayersByTeam(event.detail.value['id'])
      console.log(this.team_one_players)
    } else {
      this.selected_team = 'team_two'
      this.team_two_name = event.detail.value['name']
      this.team_two_players = await this.firestoreService.getPlayersByTeam(event.detail.value['id'])
    }
  }

  toggleTab(){
    this.selected_team = this.selected_team == 'team_one' ? 'team_two' : 'team_one'
  }

}
