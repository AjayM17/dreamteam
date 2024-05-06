import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../service/firestore.service';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.page.html',
  styleUrls: ['./team-players.page.scss'],
})
export class TeamPlayersPage implements OnInit {
  private team_id:string = ''
  private team_name:string = ''
  players : any[] = []
  private activatedRoute = inject(ActivatedRoute);
  private firestoreService = inject(FirestoreService)
  constructor() { 
   this.team_id = this.activatedRoute.snapshot.params['id'];
   this.team_name = this.activatedRoute.snapshot.params['name'];
   console.log(this.team_id)
   console.log(this.team_name)
    this.getPlayers()
  }

  new_player_name = ''
  ngOnInit() {
  }

  async getPlayers(){
  this.players =  await this.firestoreService.getPlayersByTeam(this.team_id)
  console.log(this.players)
  }

  addNewPlayer(){
    const player_info = {
      name:this.new_player_name,
      score:'',
      wickets:'',
      team_id:this.team_id,
      team_name:this.team_name
    }
    console.log(player_info)
    this.firestoreService.addPlayer(player_info).subscribe(res => {
      this.new_player_name = ''
      this.getPlayers()
    })
  }
  updatePlayer(event:any, player:any,key:string){
    console.log(player)
    player['data'][key] =  event.target.value
    console.log(player)
    // this.firestoreService.updatePlayerInfo(player.id,player.data)
  }

  removePlayerFromTeam(player:any){
    console.log(player)
    player['data']['team_id'] =  ''
    this.firestoreService.updatePlayerInfo(player.id,player.data)
  }

}
