import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { API_URL } from './constants';
import { Post } from './models/post';
import { PostFormatter } from './post_formatter';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  async homePosts(){
    const data: any = await this.http.get<any>(`${API_URL}/api/v1/home`, { headers: this.authService.authHeader() }).toPromise();
    return this.formatPost(data);
  }

  private formatPost(data){
    let posts: Post[] = [];
    for(let post of data.data.reverse()) {
      posts.push(PostFormatter.call(post, data.included));
    }
    return posts;
  }

}
