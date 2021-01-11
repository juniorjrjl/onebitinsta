import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public posts: Post[] = [];

  constructor(private postService: PostService) {}

  ionViewWillEnter() {
    const homePosts = this.postService.homePosts();
    homePosts.then(response => this.posts = response);
  }

}
