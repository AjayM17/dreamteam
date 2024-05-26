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
  team_one_players:any[] = []
  team_two_players:any[] = []
  match:any
  constructor(private firestoreService: FirestoreService, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.match = JSON.parse(params['match'])
     this.getPlayerTournamentStats()
    })
   }

  ngOnInit() {
  }

  async getPlayerTournamentStats(){
  this.team_one_players =  await this.firestoreService.getTeamPlayerTournamentStats(this.match['data']['team_one_id'], this.match['data']['tournament_id'])
  this.team_two_players = await this.firestoreService.getTeamPlayerTournamentStats(this.match['data']['team_two_id'], this.match['data']['tournament_id'])
  }

  onSegmentChange(event: any) {
    this.active_tab = event.detail.value
  }

}
