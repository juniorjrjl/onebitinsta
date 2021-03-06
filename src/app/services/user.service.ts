import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { API_URL } from '../utils/constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService, private toast: ToastController) { }

  async load(userId){
    const response: any = await this.http.get<any>(`${API_URL}/api/v1/users/${userId}`, { headers: this.auth.authHeader() }).toPromise();
    return this.formatResponse(response);
  }

  async edit(id: number, user: User){
    const response: any = await this.http.put<any>(`${API_URL}/api/v1/users/${id}`, { user }, { headers: this.auth.authHeader() }).toPromise();
    this.showToast("Saved")
    return this.formatResponse(response);
  }

  async follow(user: User) {
    return await this.http.post(`${API_URL}/api/v1/users/${user.id}/followings`, {}, { headers: this.auth.authHeader() })
                     .toPromise();
  }
 
  async unfollow(user: User) {
    return await this.http.delete(`${API_URL}/api/v1/users/${user.id}/followings`, { headers: this.auth.authHeader() })
                     .toPromise();
    
  }
 
  async loadFollows(user: User) {
    const response: any = await this.http.get(`${API_URL}/api/v1/users/${user.id}/followings`, { headers: this.auth.authHeader() }).toPromise();
    return { 
      followers: this.formatUsersList(response.followers),
      followings: this.formatUsersList(response.followings) 
    }
  }

  private formatUsersList(response: any) {
    let users: User[] = [];
    response.data.forEach(element => users.push(this.formatUser(element)));
    return users;
  }

  formatResponse(response: any): User {
    return this.formatUser(response.data);
  }

  formatUser(data) {
    const attr = data.attributes
    return new User(data.id, attr.name, attr.email, attr.photo_url, attr.description,
                    { followers: attr.followers_count, followings: attr.followings_count,
                      isFollowing: attr.is_following, posts: attr.posts_count });
  }

  private async showToast(message: string, duration = 5000){
    const toast = await this.toast.create({
      message,
      duration
    })
    toast.present();
  }

}
