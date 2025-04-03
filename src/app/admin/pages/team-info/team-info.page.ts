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

  search_key = ''
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

  search() {
    const query = this.search_key.toLowerCase();
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

  createNewPlayer() {
    if (this.search_key.trim() != '') {
      const param = {
        name: this.search_key,
        current_team_id: this.team['id']
      }
      this.firestoreService.createPlayer(param).subscribe(res => {
        this.search_key = ''
        this.search()
        this.firestoreService.presentToast('Player Created And Added In Team !')
        this.getTeamPlayers()
      })
    }
  }


  async addPlayerInTeam(player: any) {
    const param = {
      current_team_id: this.team['id']
    }
    await this.firestoreService.updatePlayerInfo(player.id, param)
    this.firestoreService.presentToast('Player Added In Team !')
    this.getAllPlayers()
    this.getTeamPlayers()
  }

  async getTeamPlayers() {
    this.team_players = await this.firestoreService.getTeamPlayers(this.team['id'])
  }

  async removePlayerFromTeam(player: any){
    const param = {
      current_team_id: ''
    }
    await this.firestoreService.updatePlayerInfo(player.id, param)
    this.firestoreService.presentToast('Player Removed From Team !')
    this.getAllPlayers()
    this.getTeamPlayers()
  }
}
