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
      this.getTeamPlayers()
    })
  }

  ngOnInit() {
  }

  async getTeamPlayers() {
    await this.getTeamOnePlayers()
    await this.getTeamTwoPlayers()
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

  updatePlayer(event: any, player: any, type: string, team: string) {
    console.log(player?.stats[0]['match_id'])
    if (player?.stats.length == 1) {
      if (player?.stats[0]['match_id'] == null) {
        const stats: any = {
          player_id: player['id'],
          match_id: this.match['id'],
          tournament_id: this.match['data']['tournament_id'],
          played_from_team_name: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_one_name'] : this.match['data']['team_two_name'],
          played_from_team_id: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_one_id'] : this.match['data']['team_two_id'],
          played_against_team_name: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_two_name'] : this.match['data']['team_one_name'],
          played_against_team_id: player['current_team_id'] == this.match['data']['team_one_id'] ? this.match['data']['team_two_id'] : this.match['data']['team_one_id'],
          runs: '',
          wickets: ''
        }
        if (type == 'runs') {
          stats['runs'] = event.target.value
        } else {
          stats['wickets'] = event.target.value
        }
        let player_index = -1
        if (team == 'team_one') {
          player_index = this.team_one_players.findIndex(team_player => team_player['id'] == player['id'])
          this.team_one_search_results[player_index]['stats'][0]['match_id'] = this.match['id']
        } else {
          player_index = this.team_two_players.findIndex(team_player => team_player['id'] == player['id'])
          this.team_two_search_results[player_index]['stats'][0]['match_id'] = this.match['id']
        }
        this.firestoreService.addPlayerStats(stats).subscribe(res => {
          this.getTeamPlayers()
        })
      } else {
        if (type == 'runs') {
          this.firestoreService.updatePlayerStats(player.stats[0].id, {
            runs: event.target.value
          }).then(res => {
            this.getTeamPlayers()
          })
        } else {
          this.firestoreService.updatePlayerStats(player.stats[0].id, {
            wickets: event.target.value
          }).then(res => {
            this.getTeamPlayers()
          })
        }
      }

    } else {
      alert('Error: Mutiple value voilation')
    }
  }

  onSegmentChange(event: any) {
    this.active_tab = event.detail.value
  }
}
