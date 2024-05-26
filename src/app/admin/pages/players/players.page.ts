import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  players:any[] = []
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
    }
  ];
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getPlayers()
  }

  onAlertDismiss(event:any){
    if(event['detail']['role'] == 'confirm'){
      const player_name  = event['detail']['data']['values'][0]
     if(player_name.trim() != ''){
      this.firestoreService.createPlayer(player_name).subscribe( res => {
        this.getPlayers()
      })
     }
    }
  }

  async getPlayers(){
    this.players = await this.firestoreService.getAllPlayers()
  }
}
