import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  constructor(private auth: AuthService, private route: Router) { }

  onSignUp(form: NgForm){
    this.auth.signUp(form.value);
  }

  backToLoginPage(){
    this.route.navigate(["signIn"]);
  }

}
