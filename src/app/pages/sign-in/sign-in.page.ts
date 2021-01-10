import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {

  constructor(private auth: AuthService, private router: Router) { }

  onLogin(form: NgForm){
    this.auth.login(form.value.email, form.value.password);
  }

  goToSignUpPage(){
    this.router.navigate(["signUp"])
  }

}
