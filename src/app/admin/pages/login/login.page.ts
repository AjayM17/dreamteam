import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = 'ajay@gmail.com'
  password = '12345'
  constructor(private router:Router) {
    console.log('admin login')
   }

  ngOnInit() {
  }

  login(){
    if(this.email == "ajay@gmail.com" && this.password == "12345"){
      this.router.navigate(['admin/dashboard'])
    }
  }
}
