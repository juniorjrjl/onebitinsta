import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { API_URL } from '../utils/constants';
import { Post } from '../models/post';
import { User } from '../models/user';
import { PostFormatter } from '../utils/post_formatter';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private auth: AuthService) { }
 
  async search(search: string) {
    const data: any = await this.http.get(`${API_URL}/api/v1/search?search=${search}`, { headers: this.auth.authHeader() })
                                .toPromise();
   return  { users: this.formatUsersList(data.users), posts: this.formatPost(data.posts) };
  }
 
 
  private formatPost(data) {
    let posts: Post[] = [];
    for (let post of data.data) {
      posts.push(PostFormatter.call(post, data.included));
    }
    return posts;
  }
 
 
  private formatUsersList(response: any) {
    let users: User[] = [];
    response.data.forEach(element => users.push(this.formatUser(element)));
    return users;
  }
 
 
  private formatUser(data) {
    const attr = data.attributes
    return new User(data.id, attr.name, attr.email, attr.photo_url, attr.description,
      {
        followers: attr.followers_count, followings: attr.followings_count,
        isFollowing: attr.is_following, posts: attr.posts_count
      });
  }
  
}
