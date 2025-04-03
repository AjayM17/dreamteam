import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-stats-comparison',
  templateUrl: './stats-comparison.page.html',
  styleUrls: ['./stats-comparison.page.scss'],
})
export class StatsComparisonPage implements OnInit {

  active_tab = 'team_one'
  team_one_players: any[] = []
  team_two_players: any[] = []
  match: any
  constructor(private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.match = JSON.parse(params['match'])
      this.getPlayerTournamentStats()
    })
  }

  ngOnInit() {
  }

  async getPlayerTournamentStats() {
    const stats = await this.firestoreService.getTwoTeamPlayerAndStats([this.match['data']['team_one_id'], this.match['data']['team_two_id']], this.match['data']['tournament_id'])
    this.team_one_players = this.filterTeamPlayer(stats, 'team_one_id')
    console.log(this.team_one_players)
    this.team_two_players = this.filterTeamPlayer(stats, 'team_two_id')
    console.log(this.team_two_players)

  }


  filterTeamPlayer(stats: any[], team_id: any) {
    const team_team: any[] = stats.filter((stats: any) => stats['played_from_team_id'] == this.match['data'][team_id])
    const groupedById = team_team.reduce((acc, obj) => {
      const { player_id, ...rest } = obj;
      if (!acc[player_id]) {
        acc[player_id] = [];
      }

      acc[player_id].push(rest);
      return acc;
    }, {});

    console.log(groupedById)
    const team = Object.keys(groupedById).map((id) => (
      {
      id: id,
      stats: groupedById[id],
      name: groupedById[id][0]['player_name']
    }));
    return team
  }

  onSegmentChange(event: any) {
    this.active_tab = event.detail.value
  }

}
