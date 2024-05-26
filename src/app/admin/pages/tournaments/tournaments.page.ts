import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../service/firestore.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {

  tournaments:any[] = []
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
      placeholder: 'Enter Tournament Name',
    }
  ];
  constructor(private firestoreService: FirestoreService,private router:Router) { }

  async ngOnInit() {
   this.getTournaments()
  }

  onAlertDismiss(event:any){
    if(event['detail']['role'] == 'confirm'){
      const tournament_name  = event['detail']['data']['values'][0]
     if(tournament_name.trim() != ''){
      this.firestoreService.createTournament(tournament_name).subscribe( res => {
        this.getTournaments()
      })
     }
    }
  }

  tournamentInfo(tournament:any){
    const navigationExtras: NavigationExtras = {
     queryParams:{ tournament: JSON.stringify(tournament)}
    }
    this.router.navigate(['admin/dashboard/tournaments-info'],navigationExtras)
  }

  async getTournaments(){
    this.tournaments = await this.firestoreService.getTournaments()
  }
}
