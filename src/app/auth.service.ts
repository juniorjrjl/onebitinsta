import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { API_URL } from './constants';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser: {} = null;
  private ifSignedIn = () => {};
  private ifSignedOut = () => {};

  constructor(private http: HttpClient, private storage: Storage, private toast: ToastController){}

  config(ifSignedIn = () => {}, ifSignedOut = () => {}){
    this.ifSignedIn = ifSignedIn;
    this.ifSignedOut = ifSignedOut;
  }

  checkLogin(){
    this.storage.get('user').then((user) =>{
      this._currentUser = user;
      this._currentUser == null ? this.ifSignedOut() : this.ifSignedIn;
    });
  }

  login(email: string, password: string){
    this.http.post<String>(`${API_URL}/users/sign_in`, { user: { email: email, password: password }  })
    .subscribe((data) => {
      this.setUser(data);
      this.ifSignedIn();
    }, (data) => this.showToast(data.error.error));
  }

  private setUser(user){
    this._currentUser = user;
    this.storage.set('user', user);
  }

  private async showToast(message, duration = 5000){
    const toast = await this.toast.create({
      message,
      duration
    })
    toast.present();
  }

}
