import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  @Input()
  public user: User;
  @Input()
  public isMe = false;
  @Input()
  public isFollowing = false;

  @Output()
  public onFollow = new EventEmitter<boolean>();
  @Output()
  public onUnfollow = new EventEmitter<boolean>();

  constructor(private router: Router){}

  checkFollow(following: boolean){
    following ? this.onFollow.emit(true) : this.onUnfollow.emit(false);
  }

  openFollowPage(){
    const navigationExtras: NavigationExtras ={
      queryParams:{
        user: this.user
      }
    }
    this.router.navigate(['Follow'], navigationExtras);
  }

}
