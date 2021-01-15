import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  @Input()
  posts: Post[];
  @Input()
  currentList = "details";
  @Input()
  showToolbar = false;

  constructor(private router: Router,
              private postService: PostService,
              private authService: AuthService,
              private alert: AlertController) { }

  changeList(newList){
    this.currentList = newList;
  }

  detailUser(user: User) {
    this.router.navigate([`tabs/user/${user.id}`]);
  }

  writeDescriptionWithHashtags(description){
    return description.replace(new RegExp(/#\w+/, "gi"), match => `<b>${match}</b>`)
  }

  like(post) {
    this.postService.like(post).then(() => {
      post.isLiked = true;
      post.likeCount += 1;
    })
  }
 
  unlike(post) {
    this.postService.unlike(post).then(() => {
      post.isLiked = false;
      post.likeCount -= 1;
    })
  }
 
  isPostOwner(post): boolean {
    return post.owner.id == this.authService.currentUser.id;
  }

  async remove(post) {
    let alert = await this.alert.create({
      header: "Remove Post",
      message: "You're about to remove your post. Do you want to proceed?",
      buttons: [
        { text: 'No', role: 'cancel' },
        { text: 'Yes', handler: () => { this.confirmExclusion(post) } }
      ]
    })
    alert.present();
  }
 
  confirmExclusion(post) {
    this.postService.remove(post).then(async () => {
      let postIndex = this.posts.indexOf(post);
      this.posts.splice(postIndex, 1);
      let alert = await this.alert.create({ header: "Removed", message: "Post successfully removed" })
      alert.present();
    }, () => {});
  }

}
