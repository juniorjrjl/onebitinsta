import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Camera,  CameraOptions} from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {

  private sub: Subscription;
  public user = new User(undefined, undefined, undefined, undefined)
  private userId: number

  private cameraConfig: CameraOptions ={
    quality: 100,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }

  private gelleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true
  }

  constructor(private userService: UserService, 
              private router: Router,
              private route: ActivatedRoute,
              private camera: Camera,
              private alert: AlertController) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params.id
      this.userService.load(params.id).then((user: User) => this.user = user)
    });
  }
 
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public edit(form: NgForm){
    this.userService.edit(this.userId, form.value)
    this.backToPriorPage()
  }

  public backToPriorPage(){
    this.router.navigate(["tabs/contact"]);
  }

  async chooseImageOptions() {
    let alert = await this.alert.create({
      header: "Post image",
      message: "Please choose if want take a picture or load from your device.",
      buttons: [
        { text: 'take a picture', handler: () => this.takePicture() },
        { text: 'load from gallary', handler: () => this.loadFromGallary() }
      ]
    })
    alert.present();
  }

  private takePicture(){
    this.camera.getPicture(this.cameraConfig)
      .then(base64 => {
        this.base64Content = base64;
        this.postPhoto =  Capacitor.convertFileSrc(base64) as string;
      }, () => {});
  }

  private loadFromGallary(){
      this.camera.getPicture(this.gelleryOptions)
        .then(base64 => {
          this.base64Content = base64;
          this.postPhoto =  Capacitor.convertFileSrc(base64) as string;
        }, () => {});
  }

}
