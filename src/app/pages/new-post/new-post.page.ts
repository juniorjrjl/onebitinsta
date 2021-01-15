import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera,  CameraOptions} from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/post.service';
import { UserService } from 'src/app/user.service';

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
  private cameraConfig: CameraOptions ={
    quality: 100,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  constructor(private authService: AuthService, 
              private userService: UserService, 
              private postService: PostService,
              private toast: ToastController,
              private router: Router,
              private camera: Camera) { }

  ionVieWillEnter(){
    this.loadUser();
  }

  takePicture(){
    this.camera.getPicture(this.cameraConfig)
      .then(base64 => {
        this.base64Content = base64;
        this.postPhoto =  "data:image/jpeg;base64," + base64;
      }, () => {});
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
