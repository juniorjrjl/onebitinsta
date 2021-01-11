import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { API_URL } from './constants';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser: {email: string, authentication_token: string} = null;
  private ifSignedIn = () => {};
  private ifSignedOut = () => {};

  constructor(private http: HttpClient, private storage: Storage, private toast: ToastController){}

  authHeader(){
    return new HttpHeaders({
      'X-User-Email': this._currentUser.email,
      'X-User-Token': this._currentUser.authentication_token
    })
  }

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
    this.http.post<String>(`${API_URL}/users/sign_in`, { user: { email, password }  })
    .subscribe((data) => {
      this.setUser(data);
      this.ifSignedIn();
    }, (data) => this.showToast(data.error.error));
  }

  signUp(user){
    this.http.post<String>(`${API_URL}/users`, { user })
    .subscribe((data) => {
      this.ifSignedIn();
      this.setUser(data);
      this.showToast("Signed up successfully", 200);
    }, (data) => this.showToast(data.error.error));
  }

  logout(){
    this.storage.remove('user');
    this._currentUser = null;
    this.ifSignedOut();
    this.showToast("Signed out successfullye", 2000)
  }

  private setUser(user){
    this._currentUser = user;
    this.storage.set('user', user);
  }

  private async showToast(message: string, duration = 5000){
    const toast = await this.toast.create({
      message,
      duration
    })
    toast.present();
  }

}
