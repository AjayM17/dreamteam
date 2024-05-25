import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../service/firestore.service';

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
  }

  onAlertDismiss(event:any){
    console.log(event)
    if(event['detail']['role'] == 'confirm'){
      const player_name  = event['detail']['data']['values'][0]
      console.log(player_name)
     if(player_name.trim() != ''){
      this.firestoreService.createTournament(player_name).subscribe( res => {
        console.log(res)
      })
     }
    }
  }
}
