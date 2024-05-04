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
  team = "team_one"


  constructor() { }

  async ngOnInit() {
    // throw new Error('Method not implemented.');
    this.getTeams()
    // this.team_one_players = await this.firestoreService.getPlayersByTeam("mOvxdzav3IkZtSpkR1UU")
  }

  async getTeams() {
    this.teams = await this.firestoreService.getAllTeams()
  }
  async getPlayers() {
    this.players = await this.firestoreService.getAllPlayers()
  }

  async onSelectTeam(event:any, team:string){
    if(team == 'team_one'){
      this.team = 'team_one'
     this.team_one_name = event.detail.value['name']
      this.team_one_players = await this.firestoreService.getPlayersByTeam(event.detail.value['id'])
      console.log(this.team_one_players)
    } else {
      this.team = 'team_two'
      this.team_two_name = event.detail.value['name']
      this.team_two_players = await this.firestoreService.getPlayersByTeam(event.detail.value['id'])
    }
  }

  toggleTab(){
    this.team = this.team == 'team_one' ? 'team_two' : 'team_one'
  }

}
