import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.page.html',
  styleUrls: ['./match-info.page.scss'],
})
export class MatchInfoPage implements OnInit {

  match: any
  active_tab = 'team_one'
  team_one_players: any[] = []
  team_one_search_results: any[] = []
  team_two_search_results: any[] = []
  team_two_players: any[] = []
  constructor(private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.match = JSON.parse(params['match'])
      const dateObject = new Date(this.match['data']['match_date']);
      const timestamp = dateObject.getTime();
      firestoreService.getTimeStamp()
      this.getTeamPlayers()
    })
  }

  ngOnInit() {
  }

  async getTeamPlayers() {
    this.firestoreService.showLoading()
    await this.getTeamOnePlayers()
    await this.getTeamTwoPlayers()
    this.firestoreService.dismissLoading()
  }

  async getTeamOnePlayers() {
    this.team_one_players = await this.firestoreService.getTeamPlayersWithMatchStat(this.match['data']['team_one_id'], this.match['id'])
    this.team_one_search_results = [...this.team_one_players]
  }
  async getTeamTwoPlayers() {
    this.team_two_players = await this.firestoreService.getTeamPlayersWithMatchStat(this.match['data']['team_two_id'], this.match['id'])
    this.team_two_search_results = [...this.team_two_players]
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    if (this.active_tab == 'team_one') {
      this.team_one_search_results = this.team_one_players.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
    } else {
      this.team_two_search_results = this.team_two_players.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
    }
  }

  togglePlayerStats(player: any,  team: string) {
    if (player.stats.id == null) {
      const stats: any = {
        player_id: player['id'],
        player_name:player['name'],
        match_id: this.match['id'],
        match_time: this.match['data']['match_date'],
        tournament_id: this.match['data']['tournament_id'],
        played_from_team_name: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_one_name'] : this.match['data']['team_two_name'],
        played_from_team_id: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_one_id'] : this.match['data']['team_two_id'],
        played_against_team_name: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_two_name'] : this.match['data']['team_one_name'],
        played_against_team_id: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_two_id'] : this.match['data']['team_one_id'],
        runs: '',
        wickets: ''
      }
      this.firestoreService.addPlayerStats(stats).subscribe(res => {
        player.stats.id = res.id
        if (team == 'team_one') {
         
          this.updatePlayerStats(this.team_one_players,player)
          this.updatePlayerStats(this.team_one_search_results,player)
        } else {
         
          this.updatePlayerStats(this.team_two_players,player)
          this.updatePlayerStats(this.team_two_search_results,player)
        }
      })
    } else {
      this.firestoreService.deletePlayerStats(player.stats.id).then( res => {
        player.stats.id = null
        player.stats.data.runs = null
        player.stats.data.wickets = null
        if (team == 'team_one') {
          this.updatePlayerStats(this.team_one_players,player)
          this.updatePlayerStats(this.team_one_search_results,player)
        } else {
          this.updatePlayerStats(this.team_two_players,player)
          this.updatePlayerStats(this.team_two_search_results,player)
        }
      })
    }

  }


  updatePlayerStats(team:any[],player:any){
    team.forEach(tplayer => {
      if (tplayer.id == player['id']) {
        tplayer.stats = player['stats']
        return
      }
    });
  }
  updatePlayer(event: any, player: any, type: string, team: string) {
    if(player.stats.id != null){
      if (type == 'runs') {
            this.firestoreService.updatePlayerStats(player.stats.id, {
              runs: event.target.value
            })
          } else {
            this.firestoreService.updatePlayerStats(player.stats.id, {
              wickets: event.target.value
            })
          }
    }
  }

  onSegmentChange(event: any) {
    this.active_tab = event.detail.value
  }
}
