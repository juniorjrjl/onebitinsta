import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage {

  followers: User[] = [];
  followings: User[] = [];
  user: User;

  constructor(private router: Router, private userService: UserService) { 
    this.user = this.router.getCurrentNavigation().extras.state.user;
  }

  ionViewWillEnter() {
    this.loadFollows();
  }
 
 
  goToUserPage(user: User) {
    this.router.navigate([`tabs/user/${user.id}`]);
  }
 
 
  private loadFollows() {
    this.userService.loadFollows(this.user).then(response => {
      this.followers = response.followers;
      this.followings = response.followings;
    });
  }

}
