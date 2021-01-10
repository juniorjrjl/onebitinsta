import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage {

  constructor(private auth: AuthService, private router: Router, private location: Location) { }

  confirmLogout(){
    this.auth.logout();
  }

  denyLogout(){
    //this.router.navigate([".."]);
    this.location.back();
  }

}
