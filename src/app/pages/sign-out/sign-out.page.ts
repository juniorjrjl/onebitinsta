import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage {

  constructor(private authService: AuthService, private router: Router, private location: Location) { }

  confirmLogout(){
    this.authService.logout();
  }

  denyLogout(){
    this.location.back();
  }

}
