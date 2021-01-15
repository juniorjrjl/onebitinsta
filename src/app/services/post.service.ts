import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { API_URL } from '../utils/constants';
import { Post } from '../models/post';
import { PostFormatter } from '../utils/post_formatter';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  async homePosts(){
    const data: any = await this.http.get<any>(`${API_URL}/api/v1/home`, { headers: this.authService.authHeader() }).toPromise();
    return this.formatPost(data);
  }

  async userPosts(userId){
    const response: any = await this.http.get<any>(`${API_URL}/api/v1/users/${userId}/posts`, { headers: this.authService.authHeader() }).toPromise();
    return this.formatPost(response);
  }

  async create(photo, description) {
    const post = { photo_base64: photo, description: description }
    const response: any = await this.http.post(`${API_URL}/api/v1/posts`, { post: post}, { headers: this.authService.authHeader() }).toPromise();
    return response;
  }

  async like(post) {
    const response: any = await this.http.post(`${API_URL}/api/v1/posts/${post.id}/likes`, {}, { headers: this.authService.authHeader() })
                                    .toPromise();
    return response;
  }
 
  async unlike(post) {
    const response: any = await this.http.delete(`${API_URL}/api/v1/posts/${post.id}/unlikes`, { headers: this.authService.authHeader() })
      .toPromise();
    return response;
  }

  async remove(post) {
    const response: any = await this.http.delete(`${API_URL}/api/v1/posts/${post.id}`, { headers: this.authService.authHeader() })
      .toPromise();
    return response;
  }

  private formatPost(data){
    let posts: Post[] = [];
    for(let post of data.data.reverse()) {
      posts.push(PostFormatter.call(post, data.included));
    }
    return posts;
  }

}
