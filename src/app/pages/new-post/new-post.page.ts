import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage {

  public user: User;
  public post: Post;
  private base64Content = "";
  public postPhoto = "";

  constructor(private authService: AuthService, 
              private userService: UserService, 
              private postService: PostService,
              private toast: ToastController,
              private router: Router) { }

  ionVieWillEnter(){
    this.loadUser();
  }

  createPost(form: NgForm) {
    this.postService.create(this.base64Content, form.value.description).then(async (response: any) => {

      let toast = await this.toast.create({ message: "Post created successfully", duration: 3000 })
      toast.present();
      this.postPhoto = "";
    }, (response: any) => response.error.errors
        .forEach(async error => {
          let toast = await this.toast.create({ message: error, duration: 2000 })
          toast.present();
        }))
  }

  private loadUser(){
    this.userService.load(this.authService.currentUser.id)
      .then((user: User) => this.user = user);
  }

}
