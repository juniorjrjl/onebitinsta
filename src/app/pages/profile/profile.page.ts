import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  public currentUser: User;
  public posts: Post[];
 
  constructor(private userService: UserService, 
              private postService: PostService, 
              private authService: AuthService,
              private router: Router) {}
 
  ionViewWillEnter(){
    this.loadUser();
    this.loadPosts(); 
  }
 
 
  newPost() {
    this.router.navigate(['/tabs/post'])
  }
 
 
  private loadUser(){
    this.userService.load(this.authService.currentUser.id)
        .then((user: User) => this.currentUser = user);
  }
 
 
  private loadPosts() {
    this.postService.userPosts(this.authService.currentUser.id)
      .then((posts: Post[]) => this.posts = posts);
  }
}
