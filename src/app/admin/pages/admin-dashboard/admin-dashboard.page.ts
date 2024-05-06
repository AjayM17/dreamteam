import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FirestoreService } from '../../service/firestore.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  private firestoreService = inject(FirestoreService)

  @ViewChild(IonModal) modal: IonModal | any;
  togglePlayerModal = false
  selected_menu_item = "teams"
  teams: any[] = []
  players: any[] = []
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  player_name: string = ''
  player_score: string = ''
  player_wicktes: string = ''
  player_team_id: string = ''
  player_team_name: string = ''
  edit = false
  player_id: string = ''

  selectMenuItem(item: string) {
    this.selected_menu_item = item
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.firestoreService.addTeam(this.name).subscribe(res => {
      this.getTeams()
    })
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  cancelPlayerModal() {
    this.modal.dismiss(null, 'cancel');
  }

  onPlayerModalWillDismiss(event: Event) {
    this.togglePlayerModal = false
  }

  confirmPlayerModal() {
    const player_info = {
      name:this.player_name,
      score:this.player_score,
      wickets:this.player_wicktes,
      team_id:this.player_team_id,
      team_name:this.player_team_name
    }
    console.log(player_info)
    if(this.edit){
      this.firestoreService.updatePlayerInfo(this.player_id,player_info)
    } else {
      this.firestoreService.addPlayer(player_info).subscribe(res => {
        this.getPlayers()
      })
    }
   
    this.modal.dismiss(this.name, 'confirm');
  }

  ngOnInit() {
    // throw new Error('Method not implemented.');
    this.getTeams()
    this.getPlayers()
   
  
  }

  async getTeams() {
    this.teams = await this.firestoreService.getAllTeams()
  }

  async getPlayers() {
    this.players = await this.firestoreService.getAllPlayers()
  }

  onSelectPlayerTeam(event: any) {
    const team = this.teams.find( team => team.id  == event.detail.value)
    this.player_team_name = team['name']
    this.player_team_id = team['id']
  }

  editPlayer(player:any){
    this.edit = true
    this.togglePlayerModal = !this.togglePlayerModal
    this.player_id = player['id']
    this.player_name = player['data']['name']
    this.player_score = player['data']['score']
    this.player_wicktes = player['data']['wickets']
    this.player_team_id = player['data']['team_id']
    this.player_team_name = player['data']['team_name']
  }

  deletePlayer(player_id:string){
    this.firestoreService.deletePlayer(player_id)
  }

  resetPlayerInfo(){
    this.player_name = ''
    this.player_score = ''
    this.player_wicktes = ''
    this.player_team_id = ''
    this.player_team_name = ''
  }
}
