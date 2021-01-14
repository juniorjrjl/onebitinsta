import { Component } from '@angular/core';
import { Camera,  CameraOptions} from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/auth.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage {

  public user: User;
  public post: Post;
  private cameraConfig: CameraOptions ={
    quality: 100,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  constructor(private authService: AuthService, 
              private userService: UserService, 
              private camera: Camera) { }

  ionVieWillEnter(){
    this.loadUser();
  }

  takePicture(){
    this.camera.getPicture(this.cameraConfig)
      .then(uri => console.log(uri), () => {})
  }

  private loadUser(){
    this.userService.load(this.authService.currentUser.id)
      .then((user: User) => this.user = user);
  }

}
