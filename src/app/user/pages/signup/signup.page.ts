import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isToastOpen =  false
  email = ''
  password = ''
  confirm_password = ''
  message = ''
  
  constructor(private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

  async register(){
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

    if(this.confirm_password.trim() == ''){
      this.message = "Please Enter Confirm Password"
      this.setOpen(true)
      return
    }


    if(this.password != this.confirm_password){
      this.message = "Password And Confirm Password Should Be Same"
      this.setOpen(true)
      return
    }
  const res = await  this.firestoreService.getUser(this.email,this.password)
  if(res.length == 0){
    this.firestoreService.createUser({
      email:this.email,
      password:this.password
    }).then( res => {
      this.router.navigate(['user/login'])
    })
  }  else{
    this.message = "User Already Exists"
    this.setOpen(true)
  }

    

  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
