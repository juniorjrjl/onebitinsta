import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit, OnDestroy {

  private id: number;
  private sub: Subscription;

  public user: User;
  public posts: Post[];
  public isFollowing = false;
 
  constructor(private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => this.id = params.id);
  }
 
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ionViewWillEnter() {
    this.loadUser();
    this.loadPosts();
  }
 
  follow(){
    this.userService.follow(this.user)
      .then(() => this.isFollowing = true);
  }
 
  unfollow(){
    this.userService.unfollow(this.user)
      .then(() => this.isFollowing = false);
  }

  private loadUser() {
    this.userService.load(this.id)
      .then((user: User) => {
        this.user = user;
        this.isFollowing = user.isFollowing;
      });
  }
 
 
  private loadPosts() {
    this.postService.userPosts(this.id)
      .then((posts: Post[]) => this.posts = posts);
  }
}
