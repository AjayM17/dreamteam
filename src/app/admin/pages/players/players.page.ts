import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  isAlertOpen = false
  action = 'add'
  isSheetOpen = false
  editPlayer = { id: '', name :''}
  players:any[] = []
  public actionSheetButtons = [
    {
      text: 'Edit',
      role: 'edit'
    },
    // {
    //   text: 'Delete',
    //   role: 'delete'
    // },
    {
      text: 'Cancel',
      role: 'cancel'
    },
  ];
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Enter Player Name',
      value :''
    }
  ];
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getPlayers()
  }

  toggleActionSheet(player:any){
    this.editPlayer = player
    this.isSheetOpen = !this.isSheetOpen
  }

  closeActionSheet(event:any){
    this.isSheetOpen = false
    if(event.detail.role == 'edit'){
      this.toggleAction('edit')
    }
   
  }

  onAlertPresent(event:any){
   
    this.alertInputs = [
      {
        placeholder: 'Enter Player Name',
        value : this.action == 'add' ? '' : this.editPlayer['name']
      }
    ];
  }

  async onAlertDismiss(event:any){
    this.isAlertOpen = false
    if(event['detail']['role'] == 'confirm'){
      const player_name  = event['detail']['data']['values'][0]
     if(player_name.trim() != ''){
      if(this.action == 'add'){
        const hasPlayerIndex = this.players.findIndex( player => player.name.toLowerCase() == player_name.toLowerCase())
        if(hasPlayerIndex == -1){
          this.firestoreService.createPlayer({name:player_name}).subscribe( res => {
            this.getPlayers()
          })
        }
      } else if(this.action == 'edit'){
        const param = {
          name: player_name
        }
        await this.firestoreService.updatePlayerInfo(this.editPlayer.id, param)
        this.getPlayers()
      }
     }
    }
  }

  toggleAction(type:string){
    this.action = type
    this.isAlertOpen = true
  }

  async getPlayers(){
    this.players = await this.firestoreService.getAllPlayers()
  }
}
