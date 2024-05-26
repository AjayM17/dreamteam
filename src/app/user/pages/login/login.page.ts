import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/service/firestore.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isToastOpen =  false
  message = ''
  email = 'ajay@gmail.com'
  password = '11111'
  constructor( private firestoreService: FirestoreService, private router:Router) {
   }

  ngOnInit() {
  }

  login(){
    if(this.email.trim() == ''){
      this.message = "Please Enter Email ID"
      this.setOpen(true)
      return
    }

    if(this.password.trim() == ''){
      this.message = "Please Enter Password"
      this.setOpen(true)
      return
    }
    this.firestoreService.getUser(this.email,this.password
    ).then( res => {
      this.router.navigate(['user/dashboard'])
    })
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
