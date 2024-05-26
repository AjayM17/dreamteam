import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirestoreService } from '../../../service/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  matches:any[] = []
  constructor(private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getAllMatches()
  }

  getAllMatches(){
    this.firestoreService.getAllMatches().then( res => {
      this.matches = res
    })
  }

  goToStats(match:any){
    const navigationExtras: NavigationExtras = {
      queryParams:{ match: JSON.stringify(match)}
     }
     this.router.navigate(['user/stats-comparison'],navigationExtras)
  }
}
