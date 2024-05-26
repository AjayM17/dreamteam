import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FirestoreService } from '../../../service/firestore.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.page.html',
  styleUrls: ['./team-info.page.scss'],
})
export class TeamInfoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  team: any
  all_players: any[] = []
  team_players: any[] = []
  search_result: any[] = []
  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) {
    activatedRoute.queryParams.subscribe(params => {
      this.team = JSON.parse(params['team'])
    })
  }

  ngOnInit() {
    this.getTeamPlayers()
    this.getAllPlayers()
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.search_result = this.all_players.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }
  async getAllPlayers() {
    this.all_players = await this.firestoreService.getAllPlayers()
    this.search_result = [...this.all_players]
  }


  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal?.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async addPlayer(player: any) {
    this.modal?.dismiss(null, '');
    const param = {
      current_team_id: this.team['id']
    }
    await this.firestoreService.updatePlayerInfo(player.id, param)
    this.getTeamPlayers()

  }

  async getTeamPlayers() {
    this.team_players = await this.firestoreService.getTeamPlayers(this.team['id'])
  }

}
